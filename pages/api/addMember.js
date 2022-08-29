import { ethers } from 'ethers'
import dotenv from 'dotenv'
import Semaphore from '../utils/Semaphore.json'

dotenv.config({ path: '../../.env.local' })
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider)
const semaphoreAbi = Semaphore.abi
const semaphoreAddress = '0x7E309d777161b268b87c484CD979b7361b19c39C'
const semaphoreContract = new ethers.Contract(
  semaphoreAddress,
  semaphoreAbi,
  signer,
)

export default async function handler(req, res) {
  console.log('called')

  if (res.method === 'GET') {
    res.status(200).json('Hello World')
  } else if (req.method === 'POST') {
    const { identityCommitment } = req.body
    console.log(semaphoreContract)
    console.log(identityCommitment)

    const tx = await semaphoreContract.addMember(42, identityCommitment)
    const response = await tx.wait()

    console.log(tx)
    console.log(response)

    res.status(201).json(response)
  }
}
