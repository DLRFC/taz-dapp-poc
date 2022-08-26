import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config({path: '../../.env.local'});
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

export default function handler(req, res) {
  res.send("test");
    // send transaction with member as argument to smart contract

    const identityCommitment = "req.identity"
    const semaphoreAddress = "";
    const semaphoreAbi=""
    const provider = ""
    // const signer = new ethers.Wallet("").connect(provider)
    // const semaphoreContract = new ethers.Contract(semaphoreAddress,semaphoreAbi,provider);

    // const addMemberTx = await semaphoreContract.addMember(42,identityCommitment);
    // const finalTx = await addMemberTx.wait()

    // return finalTx;

  }
  