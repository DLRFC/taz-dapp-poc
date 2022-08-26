import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config({path: '../../.env.local'});
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

export default function handler(req, res) {
    const { invitation } = req.body;
    console.log("Backend received this input from the fontend: ", invitation);
    
    // send transaction to smart contract with invitation string as argument
    
    // send response with any data back to the client afterwards. (just an example:)
    res.send(`Your invitation code "${invitation}" has been validated by the backend`);
  }
  