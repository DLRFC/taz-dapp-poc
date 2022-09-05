import { create as ipfsHttpClient } from "ipfs-http-client";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env.local" });
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);
const abi = TazNFT.abi;
const address = process.env.TAZ_NFT_CONTRACT_ADDRESS;

const nftContract = new ethers.Contract(address, abi, signer);

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default async function handler(req, res) {
  if (res.method === "GET") {
    res.status(405).json("GET not allowed");
  } else if (req.method === "POST") {
    
    // get fileUrl and canvasId from frontend
    const { fileUrl, canvasId } = req.body;

    if (!fileUrl || !canvasId) {
      res.status(400).json("Needs to have fileUrl and canvas Id");
    }

    const data = JSON.stringify({
      canvasId: canvasId,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      console.log(added);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);

      // Send transaction to minting contract with url as param

      const tx = await nftContract.mint(url, { gasLimit: 15000000 });
      console.log(tx);

      const response = await tx.wait(3);
      console.log(response);

      res.status(201).json("Canvas minted");
    } catch (error) {
      res.status(500).json("Error: ", error.message);
    }
  }
}
