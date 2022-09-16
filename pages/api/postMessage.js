import { ethers } from 'ethers'
import dotenv from 'dotenv'
// import Semaphore from '../utils/Semaphore.json'
import TazMessage from '../utils/TazMessage.json'
import { TAZMESSAGE_CONTRACT } from '../../config/goerli.json'

dotenv.config({ path: '../../.env.local' })
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider)
const tazMessageAbi = TazMessage.abi
const tazMessageAddress = TAZMESSAGE_CONTRACT

// console.log("tazMessageAddress", tazMessageAddress)
// console.log("tazMessageAbi", TazMessage)

const tazMessageContract = new ethers.Contract(tazMessageAddress, tazMessageAbi, signer)

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

    const bytes32Signal = ethers.utils.formatBytes32String(signal)

    //   console.log("messageId", messageId)
    //   console.log("messageContent", messageContent)
    //   console.log("groupId", groupId)
    //   console.log("bytes32Signal", bytes32Signal)
    //   console.log("nullifierHash", nullifierHash)
    //   console.log("externalNullifier", externalNullifier)
    //   console.log("solidityProof", solidityProof)

    let tx = null

    // If a parentMessageId is not the default, reply. Otherwise, add new question.

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
        const response = await tx.wait(3)
        console.log(response)
        console.log('Reply Message Success!')

        res.status(201).json(response)
      } catch (error) {
        console.log('Reply to Message transaction failed!')
        console.log(error)
        res.status(403).json(error)
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
        tx = await tazMessageContract.addMessage(
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
        console.log(tx)

        const response = await tx.wait(3)
        console.log(response)
        res.status(201).json(response)
      } catch (error) {
        console.log('Add Message transaction failed!')
        console.log(error)
        res.status(403).json(error)
      }
    }
  }
}
