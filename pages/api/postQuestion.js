import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config({path: '../../.env.local'});
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

export default function handler(req, res) {
    const { question } = req.body;
    console.log("Backend received this input from the fontend: ", question);
    
    // send transaction to smart contract with question as argument
    
    // send response with any data back to the client afterwards (just an example:)
    res.send(`Your question "${question}" has been handled by the backend`);
  }
  