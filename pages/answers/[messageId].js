import { useState, useEffect } from 'react'
import { router } from 'next'
import axios from 'axios'
import { ethers } from 'ethers'
import AnswersBoard from '../../components/AnswersBoard'
import AnswerModal from '../../components/AnswerModal'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import ProcessingModal from '../../components/ProcessingModal'
import { Subgraphs } from '../../hooks/subgraphs'

const { API_REQUEST_TIMEOUT } = require('../../config/goerli.json')

export default function Answers({ messageId, questionProp, answersProp }) {
  const [generateFullProof] = useGenerateProof()
  const [answerModalIsOpen, setAnswerModalIsOpen] = useState(false)
  const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
  const [question, setQuestion] = useState(questionProp)
  const [answer, setAnswer] = useState()
  const [identityKey, setIdentityKey] = useState('')
  const [answers, setAnswers] = useState(answersProp)
  const [steps, setSteps] = useState([])
  const [fact, setFact] = useState([])
  // const [isMember, setIsMember] = useState(false)

  const parentMessageId = messageId

  const closeAnswerModal = () => {
    setAnswerModalIsOpen(false)
  }

  const openAnswerModal = () => {
    setAnswerModalIsOpen(true)
  }

  const internalCloseProcessingModal = () => {
    setProcessingModalIsOpen(false)
  }

  const closeProcessingModal = () => {
    setProcessingModalIsOpen(true)
  }

  const openProcessingModal = () => {
    setProcessingModalIsOpen(true)
  }

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    closeAnswerModal()
    openProcessingModal()

    setSteps([
      { status: 'processing', text: 'Generate zero knowledge proof' },
      { status: 'queued', text: 'Submit transaction with proof and answer' },
      { status: 'queued', text: 'Update answers from on-chain events' }
    ])

    const messageContent = answer
    const messageId = ethers.utils.id(messageContent)
    const signal = messageId.slice(35)
    console.log('ANSWERS PAGE | signal', signal)
    const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } = await generateFullProof(
      identityKey,
      signal
    )

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'processing', text: 'Submit transaction with proof and answer' },
      { status: 'queued', text: 'Update answers from on-chain events' }
    ])

    const body = {
      parentMessageId,
      messageId,
      messageContent,
      merkleTreeRoot,
      groupId,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof
    }
    console.log('ANSWERS PAGE | body', body)

    const postResponse = await axios.post('/api/postMessage', body, {
      timeout: API_REQUEST_TIMEOUT
    })

    console.log('ANSWERS PAGE | postResponse.status', postResponse.status)
    console.log('ANSWERS PAGE | postResponse.data.hash', postResponse.data.hash)

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'complete', text: 'Submit transaction with proof and answer' },
      { status: 'processing', text: 'Update answers from on-chain events' }
    ])

    // Solution below adds the new record to state, as opposed to refreshing.
    if (postResponse.status === 201) {
      const newAnswer = {
        id: Math.round(Math.random() * 100000000000).toString(),
        messageId: postResponse.data.hash,
        messageContent
      }
      const updatedAnswers = [newAnswer].concat(answers)
      setAnswers(updatedAnswers)

      console.log('ANSWERS PAGE | updatedAnswers', updatedAnswers)
      console.log('ANSWERS PAGE | answers', answers)

      // Save answer to local storage
      window.localStorage.setItem('savedAnswer', JSON.stringify(newAnswer))
    }

    // router.reload(window.location.pathname)

    setTimeout(internalCloseProcessingModal, 2000)
  }

  const updateFromLocalStorage = () => {
    const savedAnswer = JSON.parse(window.localStorage.getItem('savedAnswer'))
    const found = answers.some((element) => savedAnswer && element.messageContent === savedAnswer.messageContent)
    if (found) {
      window.localStorage.removeItem('savedAnswer')
    } else if (savedAnswer) {
      const updatedAnswers = [savedAnswer].concat(answers)
      setAnswers(updatedAnswers)
    }
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const rotateFact = () => {
    const facts = [
      'Proving time is the time it takes for a proof to be completed.',
      'Sempahore identities are given to all Semaphore group members. They are comprised of three parts: identity commitment, trapdoor, and nullifier.',
      'Trapdoor and nullifier values are the private values of the Semaphore identity. To avoid fraud, the owner must keep both values secret.',
      'Semaphore uses the Poseidon hash function to create the identity commitment from the identity private values. Identity commitments can be made public, similarly to Ethereum addresses.',
      'Semaphore identities can be generated deterministically or randomly. Deterministic identities can be generated from the hash of a secret message.'
    ]

    let newIndex = facts.indexOf(fact) + 1
    if (newIndex === facts.length) newIndex = 0
    setFact(facts[newIndex])
  }

  useEffect(() => {
    let identityKeyTemp = ''
    if (identityKeyTemp === '') {
      identityKeyTemp = window.localStorage.getItem('identity')
      setIdentityKey(identityKeyTemp)
      // setIsMember(true)
    }

    // Check local storage for any questions pending tx finalization
    updateFromLocalStorage()

    rotateFact()
  }, [])

  useEffect(() => {
    setTimeout(rotateFact, 8000)
  }, [fact])

  return (
    <div className="min-h-[700px]">
      {question === 0 ? null : (
        <div className="sticky top-[225px] z-30 flex justify-between mx-2 min-w-[200px]">
          <button type="button" onClick={scrollToTop}>
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
            onClick={openAnswerModal}
            className="rounded-full bg-brand-yellow px-4 py-2 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          >
            Answer this question
          </button>
        </div>
      )}

      <ProcessingModal isOpen={processingModalIsOpen} closeModal={closeProcessingModal} steps={steps} fact={fact} />
      <AnswerModal
        isOpen={answerModalIsOpen}
        closeModal={closeAnswerModal}
        handleAnswerChange={handleAnswerChange}
        handleSubmit={handleSubmit}
      />
      <AnswersBoard question={question} answers={answers} openAnswerModal={openAnswerModal} messageId={messageId} />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const subgraphs = new Subgraphs()
  const data = await subgraphs.getAnswers(query.messageId)

  // console.log('ANSWERS PAGE | query.messageid', query.messageId)
  console.log('ANSWERS PAGE | fetched answers', data)

  return {
    props: { messageId: query.messageId, questionProp: data.question || 0, answersProp: data.answers }
  }
}
