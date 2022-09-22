import { ethers } from 'ethers'
import dotenv from 'dotenv'
// import Semaphore from '../utils/Semaphore.json'
import TazMessage from '../utils/TazMessage.json'
import { TAZMESSAGE_CONTRACT } from '../../config/goerli.json'
import fetchWalletIndex from '../../helpers/fetchWalletIndex';

dotenv.config({ path: '../../.env.local' })

const tazMessageAbi = TazMessage.abi
const tazMessageAddress = TAZMESSAGE_CONTRACT

export default async function handler(req, res) {
  console.log('api called')

  if (res.method === 'GET') {
    res.status(405).json('GET not allowed')
  } else if (req.method === 'POST') {
    console.log('Post APi called')

    const {
      parentMessageId,
      messageId,
      messageContent,
      groupId,
      merkleTreeRoot,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof
    } = req.body

    console.log('LOG | Body: ', req.body)
    // Connect to Wallet
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
    const currentIndex= await fetchWalletIndex()
    const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
    const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
    const tazMessageContract = new ethers.Contract(tazMessageAddress, tazMessageAbi, signer)
    const bytes32Signal = ethers.utils.formatBytes32String(signal)

    let tx = null

    if (parentMessageId !== '') {
      console.log('BACKEND LOG | Transacting reply')

      try {
        tx = await tazMessageContract.replyToMessage(
          parentMessageId,
          messageId,
          messageContent,
          groupId,
          merkleTreeRoot,
          bytes32Signal,
          nullifierHash,
          externalNullifier,
          solidityProof,
          { gasLimit: 15000000 }
        )
        console.log('Transaction Finished!')
        // const response = await tx.wait(1)
        console.log(tx)
        console.log('Reply Message Success!')

        res.status(201).json(tx)
      } catch (error) {
        console.log('Reply to Message transaction failed!')
        console.log(error)
        res.status(203).json(error)
      }
    } else {
      console.log('BACKEND LOG | Add Message')

      // function addMessage(
      //   string memory messageId,
      //   string memory messageContent,
      //   uint256 groupId,
      //   uint256 merkleTreeRoot,
      //   bytes32 signal,
      //   uint256 nullifierHash,
      //   uint256 externalNullifier,
      //   uint256[8] calldata proof) external {

      try {
        // Fetch nonce(based on wallet)
        tx = await tazMessageContract.addMessage(
          messageId,
          messageContent,
          groupId,
          merkleTreeRoot,
          bytes32Signal,
          nullifierHash,
          externalNullifier,
          solidityProof,
          { gasLimit: 1500000 }
        )
        // Update nonce++ of that wallet
        // console.log(tx)

        // const response = await tx.wait(1)
        console.log(tx)
        res.status(201).json(tx)
      } catch (error) {
        console.log('Add Message transaction failed!')
        console.log(error)
        res.status(203).json(error)
      }
    }
  }
}
