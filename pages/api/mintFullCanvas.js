import { ethers } from 'ethers'
import dotenv from 'dotenv'
import faunadb from 'faunadb'
import { Web3Storage, File } from 'web3.storage'
import { TAZTOKEN_CONTRACT } from '../../config/goerli.json'
import { fetchWalletIndex, b64toBlob } from '../../helpers/helpers'
import TazToken from '../utils/TazToken.json'

dotenv.config({ path: '../../.env.local' })

export default async function handler(req, res) {
  const secret = process.env.FAUNA_SECRET_KEY
  const client = new faunadb.Client({ secret })
  const { query } = faunadb

  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
  const { abi } = TazToken
  const contractAddress = TAZTOKEN_CONTRACT

  if (res.method === 'GET') {
    res.status(405).json('GET not allowed')
  } else if (req.method === 'POST') {
    try {
      const { imageUri, canvasId, groupId, signal, nullifierHash, externalNullifier, merkleTreeRoot, solidityProof } =
        req.body

      if (!imageUri || !canvasId || !groupId || !signal || !nullifierHash || !externalNullifier || !solidityProof) {
        res
          .status(400)
          .json('Needs to have imageUri, canvasId, groupId, signal, nullifierHash, externalNullifier, solidityProof')
      }

      const dbs = await client.query(
        query.Map(
          query.Paginate(query.Match(query.Index('all_canvases')), {
            size: 10000
          }),
          query.Lambda('canvasRef', query.Get(query.Var('canvasRef')))
        )
      )

      const match = dbs.data.filter((canvas) => canvas.data.canvasId === canvasId)[0]

      if (match.data.tiles.includes('')) {
        res.status(400).json('Canvas is not full yet')
      } else {
        console.log('canvas is full')

        const web3StorageApiToken = process.env.WEB3_STORAGE_API_TOKEN

        const contentType = 'image/png'
        const b64Data = imageUri.replace('data:image/png;base64,', '')
        const blobForServingImage = b64toBlob(b64Data, contentType)

        const web3StorageClient = new Web3Storage({
          token: web3StorageApiToken,
          endpoint: new URL('https://api.web3.storage')
        })

        const dataFileArrayForServingImage = [new File([blobForServingImage], 'image.png')]

        let ipfsUrl

        await web3StorageClient.put(dataFileArrayForServingImage, { wrapWithDirectory: false }).then((dataCid) => {
          ipfsUrl = `https://${dataCid}.ipfs.dweb.link`
          console.log('IPFS url created: ', ipfsUrl)
        })

        try {
          const currentIndex = await fetchWalletIndex()
          const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
          const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
          const signerAddress = await signer.getAddress()
          const nftContract = new ethers.Contract(contractAddress, abi, signer)
          const signalBytes32 = ethers.utils.formatBytes32String(signal)
          const tx = await nftContract.safeMint(
            signerAddress,
            ipfsUrl,
            groupId,
            merkleTreeRoot,
            signalBytes32,
            nullifierHash,
            externalNullifier,
            solidityProof,
            {
              gasLimit: 15000000
            }
          )
          console.log(tx)

          await client.query(
            query.Update(query.Ref(match.ref), {
              data: {
                tiles: ['', '', '', '', '', '', '', '', '']
              }
            })
          )

          res.status(201).json({ tx, ipfsUrl })
        } catch (e) {
          console.log(e)
          res.status(401).json(e)
        }
      }
    } catch (error) {
      res.status(500).json('Error in catch 2: ', error)
    }
  }
}
