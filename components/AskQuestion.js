import { useState, useEffect } from 'react'
import Header from './Header'
import Link from 'next/link'
import axios from 'axios'
import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { useRouter } from 'next/router'
import LoadingModal from './loadingModal.js'

// import { useIdentity } from './IdentityProvider'
const { generateProof } = require('@semaphore-protocol/proof')
const { verifyProof } = require('@semaphore-protocol/proof')
const { packToSolidityProof } = require('@semaphore-protocol/proof')
const { Subgraph } = require('@semaphore-protocol/subgraph')

// 3. Ask Question Page
const AskQuestion = () => {
  const [signal, setSignal] = useState('Select Signal')
  const [isLoading, setIsLoading] = useState(false)
  const [localIdentity, setLocalIdentity] = useState()
  const [loadingMessage, setLoadingMessage] = useState('')
  const [loadingProof, setLoadingProof] = useState('')

  const router = useRouter()

  useEffect(() => {
    // setter
    // console.log(window)
    // console.log(window.localStorage)
    let identityKey = ''
    // console.log(window)
    // console.log(window.localStorage)
    if (identityKey === '') {
      identityKey = window.localStorage.getItem('identity')
    }
    setLocalIdentity(identityKey)
    // console.log(identityKey)
  })

  const handleAskButton = async () => {
    console.log(signal)
    setIsLoading(true)
    setLoadingMessage('1. Generating Zero Knowledge Proof')
    try {
      const identity = new Identity(localIdentity)
      const identityCommitment = identity.generateCommitment()
      console.log(identityCommitment)
      console.log('Identity Key')
      console.log(localIdentity)

      // Generate Group
      const group = new Group(16)
      const subgraph = new Subgraph('goerli')

      const { members } = await subgraph.getGroup('1080', { members: true })
      console.log('Members')
      console.log(members)

      group.addMembers(members)

      console.log(group.root)

      // Generate Proof
      const externalNullifier = Math.round(Math.random() * 1000000000)

      const fullProof = await generateProof(
        identity,
        group,
        externalNullifier,
        signal,
        {
          zkeyFilePath: '/semaphore.zkey',
          wasmFilePath: '/semaphore.wasm',
        },
      )
      console.log('Proof')
      console.log(fullProof)
      const { nullifierHash } = fullProof.publicSignals
      const solidityProof = packToSolidityProof(fullProof.proof)
      console.log('NullifierHash')
      console.log(nullifierHash)

      // Verify Proof Off Chain
      // Fetch Verification Key
      const verificationKey = await fetch(
        'https://www.trusted-setup-pse.org/semaphore/16/semaphore.json',
      ).then(function (res) {
        return res.json()
      })

      const res = await verifyProof(verificationKey, fullProof)
      console.log('Verification')
      console.log(res)

      setLoadingMessage(
        '2. Proof have been Generated, we are now submiting your Question Transaction',
      )
      setLoadingProof(solidityProof)
      const messageId = externalNullifier
      const messageContent = signal

      const body = {
        // parentMessageId,
        messageId,
        messageContent,
        externalNullifier,
        signal,
        nullifierHash,
        solidityProof,
      }
      console.log(body)

      const response = await axios.post('/api/testVerifyProof', body)
      console.log(response)
      console.log(response.data)
      // go to the next page
      setLoadingMessage('3. Transaction Succesfuly Submitted!')
      router.push('/questions-page')
    } catch (error) {
      setIsLoading(false)
      // Custom error depending on points of failure
      alert(error)
    }
  }

  const onClose = () => {
    setIsLoading(!isLoading)
  }

  const clearIdentity = () => {
    console.log('clear')
    window.localStorage.removeItem('identity')
  }

  return (
    <div className="p-4 font-sans bg-brand-beige">
      {isLoading ? (
        <div className="absolute top-[0px] left-[0px] z-20">
          <LoadingModal
            onClose={onClose}
            loadingMessage={loadingMessage}
            loadingProof={loadingProof}
          />
        </div>
      ) : null}
      <Header />
      <svg
        className="absolute -left-2 top-[370px]"
        width="69"
        height="100"
        viewBox="0 0 69 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
      </svg>
      <svg
        className="absolute right-[0px] top-[642px]"
        width="121"
        height="160"
        viewBox="0 0 121 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
      </svg>

      <div className="flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-gray shadow-xl">
        <div className="flex w-full justify-between border-b-2 border-brand-gray bg-brand-beige2 p-3">
          <Link href="/questions-page">
            <div className="cursor-pointer">Back</div>
          </Link>
          <div>Q&A</div>
          <div></div>
        </div>

        <div className="h-[586px] bg-white py-3 w-full px-4 z-10">
          <p className="py-5 font-bold">Got a question?</p>
          <p className="py-2 w-[80%] mb-3 text-xs">
            Ask it anonymously below. Look for your question projected in the
            TAZ
          </p>
          <input
            className="border-2 border-brand-gray w-full my-3 py-2 rounded-lg"
            onChange={(e) => {
              setSignal(e.target.value)
            }}
          ></input>
          {isLoading ? (
            <button className="bg-brand-beige2 w-full p-2 rounded-lg border-2 border-brand-gray shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              Waiting for transaction
            </button>
          ) : (
            <button
              className="bg-brand-beige2 w-full p-2 rounded-lg border-2 border-brand-gray shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
              onClick={handleAskButton}
            >
              Ask
            </button>
          )}
        </div>
        {/* <button
          className="bg-brand-beige2 w-full p-2 rounded-lg border-2 border-brand-gray shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
          onClick={onClose}
        >
          Check Modal
        </button> */}
      </div>

      <div className="flex justify-between w-[70%] py-6 text-white  z-[5]">
        <p className="underline">Share your feedback & claim your POAP!</p>
        <p className="ml-10">X</p>
        <div className="bg-black absolute w-full h-[20%] bottom-[50px] left-0 -z-10"></div>
      </div>
      <Link href="questions-page">
        <button>Go to Questions Board Page(Test)</button>
      </Link>
      <button className="p-4" onClick={clearIdentity}>
        Clear Cache
      </button>
    </div>
  )
}

export default AskQuestion
