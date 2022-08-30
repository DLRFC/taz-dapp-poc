import { ethers } from 'ethers'
import dotenv from 'dotenv'
import Semaphore from '../utils/Semaphore.json'

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
  console.log('called')

  if (res.method === 'GET') {
    res.status(200).json('Hello World')
  } else if (req.method === 'POST') {
    const { identityCommitment } = req.body
    console.log(semaphoreContract)
    console.log(identityCommitment)

    const tx = await semaphoreContract.addMember(1080, identityCommitment)
    const response = await tx.wait()

    console.log(tx)
    console.log(response)

    res.status(201).json(response)
  }
}
