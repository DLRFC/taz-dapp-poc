import { ethers } from 'ethers'
import dotenv from 'dotenv'
// import Semaphore from '../utils/Semaphore.json'
import TazMessage from '../utils/TazMessage.json'

dotenv.config({ path: '../../.env.local' })
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider)
const tazMessageAbi = TazMessage.abi
const tazMessageAddress = process.env.TAZ_MESSAGE_CONTRACT_ADDRESS

// console.log("tazMessageAddress", tazMessageAddress)
// console.log("tazMessageAbi", TazMessage)

const tazMessageContract = new ethers.Contract(
  tazMessageAddress,
  tazMessageAbi,
  signer,
)

export default async function handler(req, res) {
  if (res.method === 'GET') {
    res.status(405).json('GET not allowed')
  } else if (req.method === 'POST') {
    const {
      parentMessageId,
      messageId,
      messageContent,
      groupId,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof,
    } = req.body

    console.log('LOG | Body: ', req.body)

    const bytes32Signal = ethers.utils.formatBytes32String(signal)

    console.log('-------------Solidity Proof')
    console.log(solidityProof)
    console.log('-------------External Nullifier')
    console.log(externalNullifier)
    console.log('-------------Signal')
    console.log(signal)
    console.log('-------------NullifierHash')
    console.log(nullifierHash)
    console.log('-------------Bytes32Signal')
    console.log(bytes32Signal)

    let tx = null

    // If a parentMessageId is not the default, reply. Otherwise, add new question.

    if (parentMessageId !== '') {
      console.log('LOG | Transacting reply')

      try {
        tx = await tazMessageContract.replyToMessage(
          parentMessageId,
          messageId,
          messageContent,
          groupId,
          bytes32Signal,
          nullifierHash,
          externalNullifier,
          solidityProof,
          { gasLimit: 1500000 },
        )
        console.log(tx)
        const response = await tx.wait()
        console.log(response)
        response.status(201).json(response)
      } catch (error) {
        console.log('Reply to Message transaction failed!')
        console.log(error)
        res.status(403).json(error)
      }
    } else {
      console.log('LOG | Add Message')

      try {
        tx = await tazMessageContract.addMessage(
          messageId,
          messageContent,
          groupId,
          bytes32Signal,
          nullifierHash,
          externalNullifier,
          solidityProof,
          { gasLimit: 1500000 },
        )
        console.log(tx)

        const response = await tx.wait()
        console.log(response)
        res.status(201).json(response)
      } catch (error) {
        console.log('Reply to Message transaction failed!')
        console.log(error)
        res.status(403).json(error)
      }
    }
  }
}
