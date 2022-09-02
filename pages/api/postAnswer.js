import { ethers } from 'ethers'
import dotenv from 'dotenv'
// import Semaphore from '../utils/Semaphore.json'
import TazMessage from '../utils/TazMessage.json'

dotenv.config({ path: '../../.env.local' })
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider)
const tazMessageAbi = TazMessage.abi
// const semaphoreAddress = process.env.SEMAPHORE_CONTRACT_ADDRESS
const tazMessageAddress = process.env.TAZ_MESSAGE_CONTRACT_ADDRESS

// const semaphoreContract = new ethers.Contract(
//   semaphoreAddress,
//   tazMessageAbi,
//   signer,
// )

const tazMessageContract = new ethers.Contract(
  tazMessageAddress,
  tazMessageAbi,
  signer,
)

export default async function handler(req, res) {
  console.log('called')

  try {
    if (res.method === 'GET') {
      res.status(200).json('Hello World')
    } else if (req.method === 'POST') {
      // Need to read these data but they are giving back undefined
      const {
        parentMessageId,
        messageId,
        messageContent,
        externalNullifier,
        solidityProof,
        signal,
        nullifierHash,
      } = req.body
      // console.log(semaphoreContract);
      console.log('-------------Solidity Proof')
      console.log(solidityProof)
      console.log('-------------External Nullifier')

      console.log(externalNullifier)
      console.log('-------------Signal')

      console.log(signal)
      console.log('-------------NullifierHash')
      console.log(nullifierHash)

      const bytes32Signal = ethers.utils.formatBytes32String(signal)

      console.log(bytes32Signal)

      // function replyToMessage(
      //   uint256 parentMessageId,
      //   uint256 messageId,
      //   string memory messageContent,
      //   uint256 groupId,
      //   bytes32 signal,
      //   uint256 nullifierHash,
      //   uint256 externalNullifier,
      //   uint256[8] calldata proof) external {

      const tx = await tazMessageContract.replyToMessage(
        parentMessageId,
        messageId,
        messageContent,
        1080,
        bytes32Signal,
        nullifierHash,
        externalNullifier,
        solidityProof,
        { gasLimit: 1500000 },
      )
      const response = await tx.wait(3)

      // console.log(tx);
      console.log(response)

      res.status(201).json(response)
    }
  } catch (err) {
    console.log(err)
    res.status(403).json({ error: err })
  }
}
