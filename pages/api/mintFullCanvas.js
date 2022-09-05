import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import { fromString } from "uint8arrays/from-string";
import dotenv from "dotenv";
import faunadb from "faunadb";

dotenv.config({ path: "../../.env.local" });
// const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);
// const abi = TazNFT.abi;
// const address = process.env.TAZ_NFT_CONTRACT_ADDRESS;
// const nftContract = new ethers.Contract(address, abi, signer);

export default async function handler(req, res) {
  if (res.method === "GET") {
    res.status(405).json("GET not allowed");
  } else if (req.method === "POST") {
    try {
      // make connection to DB
      const secret = process.env.FAUNA_SECRET_KEY;
      const client = new faunadb.Client({ secret });
      const query = faunadb.query;
      // get fileUrl and canvasId from frontend
      const { imageUri, canvasId } = req.body;

      if (!imageUri || !canvasId) {
        res.status(400).json("Needs to have fileUrl and canvas Id");
      }

      // Check DB if canvas with canvasId is full

      // Query all 5 canvases from the database
      const dbs = await client.query(
        query.Map(
          query.Paginate(query.Match(query.Index("all_canvases")), {
            size: 10000,
          }),
          query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
        )
      );

      // Find the matching canvas based on the canvasId
      const match = dbs.data.filter(
        (canvas) => canvas.data.canvasId === canvasId
      )[0];

      // Check if canvas array does not have empty tiles
      if (match.data.tiles.includes("")) {
        res.status(400).json("Canvas is not full yet");
      } else {
        console.log("canvas is full");

        // add image to IPFS *** Need to have working IPFS RPC API endpoint
        // const ipfsClient = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

        // const data = JSON.stringify({
        //   image: imageUri
        // });

        // const added = await ipfsClient.add(data);
        // console.log(added);
        // const url = `https://ipfs.infura.io/ipfs/${added.path}`;

        // Send transaction to minting contract 

        // const tx = await nftContract._safeMint(url, { gasLimit: 15000000 });
        // console.log(tx);

        // const response = await tx.wait(3);
        // console.log(response);

        // Reset the canvas in the database
        client.query(
          query.Update(query.Ref(match.ref), {
            data: {
              tiles: ["", "", "", "", "", "", "", "", ""],
            },
          })
        );

        res.status(201).json("Canvas minted");
      }
    } catch (error) {
      res.status(500).json("Error: ", error);
    }
  }
}
