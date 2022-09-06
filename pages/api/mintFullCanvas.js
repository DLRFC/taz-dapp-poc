import { ethers } from "ethers";
import dotenv from "dotenv";
import faunadb from "faunadb";
import { Web3Storage, File } from "web3.storage";
import { Blob } from "@web-std/blob";
import { TAZTOKEN_CONTRACT } from "../../config/goerli.json";

import TazToken from "../utils/TazToken.json";

dotenv.config({ path: "../../.env.local" });
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);
const signerAddress = signer.getAddress();
const abi = TazToken.abi;
const contractAddress = TAZTOKEN_CONTRACT;
const nftContract = new ethers.Contract(contractAddress, abi, signer);

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

        // Convert base64 string to Blob
        const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
          const byteCharacters = Buffer.from(b64Data, "base64").toString(
            "binary"
          ); 
          const byteArrays = [];
          for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
          ) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
          const blob = new Blob(byteArrays, { type: contentType });
          return blob;
        };

        const web3StorageApiToken = process.env.WEB3_STORAGE_API_TOKEN;

        // Image data
        const contentType = "image/png";
        const b64Data = imageUri;
        const blobForServingImage = b64toBlob(b64Data, contentType); // Use for serving an image

        const web3StorageClient = new Web3Storage({
          token: web3StorageApiToken,
          endpoint: new URL("https://api.web3.storage"),
        });

        const dataFileArrayForServingImage = [
          new File([blobForServingImage], "image.png"),
        ];

        let ipfsUrl;

        await web3StorageClient
          .put(dataFileArrayForServingImage, { wrapWithDirectory: false })
          .then((dataCid) => {
            ipfsUrl = "https://" + dataCid + ".ipfs.dweb.link";
            console.log("IPFS url created: ", ipfsUrl);
          });

        // Send transaction to TazToken contract

        try {
          const tx = await nftContract.safeMint(signerAddress, ipfsUrl, {
            gasLimit: 15000000,
          });
          console.log(tx);

          const response = await tx.wait(3);
          console.log(response);

          // Reset canvas in database
          await client.query(
            query.Update(query.Ref(match.ref), {
              data: {
                tiles: ["", "", "", "", "", "", "", "", ""],
              },
            })
          );

          // Send response to frontend
          res.status(201).json("Canvas NFT minted");
        } catch (error) {
          console.log(error);
          res.status(500).json("Error: ", error);
        }
      }
    } catch (error) {
      res.status(500).json("Error: ", error);
    }
  }
}
