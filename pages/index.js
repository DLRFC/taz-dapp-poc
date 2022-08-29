import { useState } from 'react'
// import dynamic from 'next/dynamic'
import { Identity } from '@semaphore-protocol/identity'
// import { Group } from '@semaphore-protocol/group'

import QuestionForm from '../components/QuestionForm'
import ValidateInvitation from '../components/ValidateInvitation'

// import { ethers } from 'ethers'

// const QrReader = dynamic(() => import('react-qr-reader'), {
//   ssr: false,
// })
// const { generateProof } = require('@semaphore-protocol/proof')
// const { verifyProof } = require('@semaphore-protocol/proof')
// const { packToSolidityProof } = require('@semaphore-protocol/proof')

export default function Home() {
  // const [selected, setSelected] = useState('environment')
  // const [startScan, setStartScan] = useState(false)
  // const [loadingScan, setLoadingScan] = useState(false)
  // const [data, setData] = useState('')
  const [testIdentity, setTestIdentity] = useState('')
  // const [trapdoor, setTrapdoor] = useState('')
  // const [nullifier, setNullifier] = useState('')
  // const [identityCommitment, setIdentityCommitment] = useState('')

  // const handleScan = async (scanData) => {
  //   setLoadingScan(true)
  //   console.log(`loaded data data`, scanData)
  //   if (scanData && scanData !== '') {
  //     console.log(`loaded >>>`, scanData)
  //     setData(scanData)
  //     setStartScan(false)
  //     setLoadingScan(false)
  //     // setPrecScan(scanData);
  //   }
  // }
  // const handleError = (err) => {
  //   console.error(err)
  // }

  const handleGenerateId = () => {
    const newIdentity = new Identity()
    // const group = new Group()

    const newIdentityCommitment = newIdentity.generateCommitment()

    setTestIdentity(newIdentityCommitment)

    const exportIdentity = newIdentity.toString()
    console.log(exportIdentity)
  }

  return (
    <div className="flex flex-col gap-y-5 items-center justify-center">
      <h1>Hello World</h1>
      <button
        className="bg-green-700 p-3 rounded-lg text-gray-200"
        onClick={handleGenerateId}
      >
        Generate Id
        {testIdentity}
      </button>

      <QuestionForm />
      <ValidateInvitation />
    </div>
  )
}
