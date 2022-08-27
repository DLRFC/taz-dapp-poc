import { useState } from "react";
import React from 'react'
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group"
const { generateProof } =require("@semaphore-protocol/proof")
const { verifyProof } = require("@semaphore-protocol/proof")
const { packToSolidityProof } = require("@semaphore-protocol/proof");
import axios from 'axios';

  
export default function QandA() {

    const items = [{
        id:1,
        content:"What is the Name of the Dapp?"
    },
    {
        id:2,
        content:"What can Semaphore be used for?"
    },
    {
        id:3,
        content:"How do I generate a Proof on Semaphore?"
    },
    {
        id:3,
        content:"I really Loved the Devcon Experience! Thank You for all the Team!"
    },
]
    const handleGenerateProof = async () => {
        const newIdentity = new Identity()
        const identityCommitment = newIdentity.generateCommitment()

        console.log(identityCommitment);

        //Generate Group
        const group = new Group();
        group.addMember(identityCommitment);

        //Subgraph - fetch from subgraph all the group members
        // group.addMember([member1,member2,member3...member100]);

        //there 100 members

        //Generate Proof
        const externalNullifier = 10;
        const signal = "This is my Signal";

        const fullProof = await generateProof(newIdentity,group,externalNullifier,signal, {
            zkeyFilePath: "https://www.trusted-setup-pse.org/semaphore/20/semaphore.zkey",
            wasmFilePath: "https://www.trusted-setup-pse.org/semaphore/20/semaphore.wasm"
        })

        const { nullifierHash } = fullProof.publicSignals
        const solidityProof = packToSolidityProof(fullProof.proof)

        const body ={
            externalNullifier:externalNullifier,
            signal: signal,
            nullifierHash : nullifierHash,
            solidityProof : solidityProof
        }

        const response = await axios.post('/api/testVerifyProof', JSON.stringify(body));
        console.log(response);
        console.log(response.data);


        //Verify Proof Off Chain
        // Fetch Verification Key
        // const verificationKey = await fetch(
        // 'https://www.trusted-setup-pse.org/semaphore/20/semaphore.json',
        // ).then(function (res) {
        // return res.json()
        // })

        // const res = await verifyProof(verificationKey, fullProof);
        // console.log("Verification");
        // console.log(res);
        

      
    }
    
  
    
    return (
            <div className="flex justify-center items-center px-4 py-4 flex-col mt-10">
                <h1 className="font-bold text-2xl">Question and Answer</h1>

                <input className="bg-gray-300 p-10 mt-3 rounded-2xl" placeholder="Question or Feedback"/>
                <button className="bg-blue-300 p-5 mt-3 rounded-2xl" onClick={handleGenerateProof}>Generate Proof</button>
                <button className="bg-blue-300 p-5 mt-3 rounded-2xl">Submit Question</button>

                

                <h1 className="font-bold text-2xl mt-10">Questions</h1>
                

                <ul role="list" className="divide-y divide-gray-200 mt-10">
                    {items.map((item) => (
                        <li key={item.id} className="px-4 py-4 sm:px-0 flex items-center justify-center">
                        {item.id}. {item.content}
                        </li>
                    ))}
                </ul>
            </div>)
  }
  