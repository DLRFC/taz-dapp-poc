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
    // Need to read these data but they are giving back undefined
    const { externalNullifier, solidityProof, signal, nullifierHash } = req.body
    // console.log(semaphoreContract);
    console.log(solidityProof)
    console.log(externalNullifier)
    console.log(signal)
    console.log(nullifierHash)

    const bytes32Signal = ethers.utils.formatBytes32String(signal)

    console.log(bytes32Signal)

    const tx = await semaphoreContract.verifyProof(
      42,
      bytes32Signal,
      nullifierHash,
      externalNullifier,
      solidityProof,
      { gasLimit: 1500000 },
    )
    const response = await tx.wait()

    // console.log(tx);
    console.log(response)

    res.status(201).json(response)
  }
}
