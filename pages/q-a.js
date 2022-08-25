import { useState } from "react";
import React from 'react'
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group"
const { generateProof } =require("@semaphore-protocol/proof")
const { verifyProof } = require("@semaphore-protocol/proof")
const { packToSolidityProof } = require("@semaphore-protocol/proof");

  
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
    const handleGenerateProof = () => {
        const newIdentity = new Identity()
        //Generate Group
        //Generate Proof
        //Verify Proof Off Chain
        //Verify Proof On Chain
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
  