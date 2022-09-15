import { useState, useEffect } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import QuestionsBoard from '../../components/QuestionsBoard'
import QuestionModal from '../../components/QuestionModal'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import LoadingModal from '../../components/LoadingModal/Index.js'

const { API_REQUEST_TIMEOUT, GROUP_ID } = require('../../config/goerli.json')

const Questions = () => {
  const [generateFullProof] = useGenerateProof()
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState()
  // const [isMember, setIsMember] = useState(false)
  const [identityKey, setIdentityKey] = useState('')

  useEffect(() => {
    let identityKeyTemp = ''
    if (identityKeyTemp === '') {
      identityKeyTemp = window.localStorage.getItem('identity')
      setIdentityKey(identityKeyTemp)
      // setIsMember(true)
    }
  })

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // TO DO handle
    const messageContent = question
    const messageId = ethers.utils.id(messageContent)
    const signal = messageId
    const { fullProofTemp, solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } =
      await generateFullProof(identityKey, signal)

    const body = {
      parentMessageId: '',
      messageId,
      messageContent,
      merkleTreeRoot,
      groupId,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof
    }
    console.log('body', body)
    alert(`Submit question: ${question}`)

    await axios.post('/api/postMessage', body, {
      timeout: API_REQUEST_TIMEOUT
    })
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className="sticky top-[400px] z-30 flex justify-between mx-2 min-w-[200px]">
        <button onClick={scrollToTop}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#1E1E1E" />
            <path
              d="M16.6607 13.219V21.3337H15.3387V13.219L11.7931 16.795L10.8584 15.8523L15.9997 10.667L21.1409 15.8523L20.2063 16.795L16.6607 13.219Z"
              fill="#EFAD5F"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={openModal}
          className="rounded-full bg-brand-yellow px-4 py-2 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
        >
          Ask a question
        </button>
      </div>
      <QuestionModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleQuestionChange={handleQuestionChange}
        handleSubmit={handleSubmit}
      />
      <QuestionsBoard />
    </>
  )
}

export default Questions
