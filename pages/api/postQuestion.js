import { ethers } from "ethers";
import dotenv from "dotenv";
import { comments } from '../../data/comments'

dotenv.config({path: '../../.env.local'});
// const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


export default function handler(req, res) {
    if(req.method === 'GET'){
        res.status(200).json(comments)
    }

    if(req.method === 'POST'){

        
        
        const newComment = { id: comments.length+1, text: question};
        comments.push(newComment)

        const test = req.body;
        const result = "test result"
        console.log(req.body)
        console.log(solidityProof);
        console.log(externalNullifier);
        console.log(signal);
        console.log(nullifierHash);
        console.log(JSON.stringify(test));

        res.status(201).json(nullifierHash)

                    
        res.status(201).json(comments);
    }
 
    
    // send transaction to smart contract with question as argument


     // send transaction with member as argument to smart contract

  
    //  const semaphoreAddress = "";
    //  const semaphoreAbi=""
    //  const provider = ""

    //  const fullSolidityProof="req.fullProof" // from (req body)
    //  const nullifierHash = "req.nullifierHash" // from (req body)
    //  const signal = "parse32Bytes(req.signal)" // need to check the exact ethers parsing method
    //  const externalNullifier = "req.externalNullifier" // (from req body)
    //  const groupId = 42
     

     // const signer = new ethers.Wallet("").connect(provider)
     // const semaphoreContract = new ethers.Contract(semaphoreAddress,semaphoreAbi,provider);
 
     // const postQuesttion = await semaphoreContract.verifyProof(groupId,signal,nullifierHash,externalNullifier,fullSolidityProof);
     // const finalTx = await addMemberTx.wait()
 
     // return finalTx;


  }
  