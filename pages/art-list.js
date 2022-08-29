// import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import { Identity } from '@semaphore-protocol/identity'
// import { Group } from '@semaphore-protocol/group'
const Sketch = dynamic(() => import('react-p5'), {
  ssr: false,
})
// const { generateProof } = require('@semaphore-protocol/proof')
// const { verifyProof } = require('@semaphore-protocol/proof')
// const { packToSolidityProof } = require('@semaphore-protocol/proof')

export default function GenerativeArt() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 400).parent(canvasParentRef)
  }

  const draw = (p5) => {
    p5.background(255, 130, 20)
    p5.ellipse(100, 100, 100)
    p5.ellipse(300, 100, 100)
  }

  // const handleGenerateProof = () => {
  //   const newIdentity = new Identity()
  //   // Generate Group
  //   // Generate Proof
  //   // Verify Proof Off Chain
  //   // Verify Proof On Chain
  // }

  return (
    <div className="flex items-center justify-center flex-col gap-y-5 mt-10">
      <h1 className="text-3xl font-bold text-gray-700">Generative Art</h1>
      <Sketch setup={setup} draw={draw} />

      <button className="bg-blue-300 text-gray-700 font-bold p-5 mt-3 rounded-2xl">
        Generate Proof
      </button>
      <h1>Proof</h1>
      <button className="bg-blue-300 text-gray-700 font-bold p-5 mt-3 rounded-2xl">
        Submit Question
      </button>
      <h1>Submited</h1>
      <button className="bg-blue-300 text-gray-700 font-bold p-5 mt-3 rounded-2xl">
        Mint Nft
      </button>
      <h1>Minted!</h1>
    </div>
  )
}
