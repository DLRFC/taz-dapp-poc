import { ethers } from 'ethers'
import dotenv from 'dotenv'
import Semaphore from '../utils/Semaphore.json'
import faunadb from 'faunadb'

dotenv.config({ path: '../../.env.local' })
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider)

const semaphoreAbi = Semaphore.abi
const semaphoreAddress = '0x99aAb52e60f40AAC0BFE53e003De847bBDbC9611'
const semaphoreContract = new ethers.Contract(
  semaphoreAddress,
  semaphoreAbi,
  signer,
)

export default async function handler(req, res) {
  const { invitation, identityCommitment } = req.body
  // Checking invitation

  if (req.method === 'GET') {
    res.status(400).json({
      error: 'Ensure that you are sending a POST request to this endpoint',
    })
  } else if (!invitation) {
    res
      .status(400)
      .json({ error: 'Request needs to have an invitation string' })
  } else if (req.method === 'POST') {
    try {
      const secret = process.env.FAUNA_SECRET_KEY
      const query = faunadb.query
      const client = new faunadb.Client({ secret })

      const dbs = await client.query(
        query.Map(
          query.Paginate(query.Match(query.Index('all_codes')), {
            size: 10000,
          }),
          query.Lambda('codeRef', query.Get(query.Var('codeRef'))),
        ),
      )

      const match = dbs.data.filter((code) => code.data.code === invitation)

      let isValid

      if (match[0] && !match[0].data.isUsed) {
        isValid = true

        client
          .query(
            query.Update(query.Ref(match[0].ref), {
              data: {
                isUsed: true,
              },
            }),
          )
          .then((ret) => console.log(ret))
      } else {
        isValid = false
      }
      // Calling the tx
      if (isValid) {
        const tx = await semaphoreContract.addMember(1080, identityCommitment)
        const response = await tx.wait(3)

        res.status(201).json(response)
      } else {
        res.status(401).json({ Error: 'Invalid code' })
      }
    } catch (error) {
      res.status(403).json({ Error: error.message })
    }
  }
}
