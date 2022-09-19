import { useState, useEffect } from 'react'
import { router } from 'next'
import axios from 'axios'
import { ethers } from 'ethers'
import QuestionsBoard from '../../components/QuestionsBoard'
import QuestionModal from '../../components/QuestionModal'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import ProcessingModal from '../../components/ProcessingModal'
import { Subgraphs } from '../../hooks/subgraphs'
import { TAZMESSAGE_SUBGRAPH } from '../../config/goerli.json'

const { API_REQUEST_TIMEOUT } = require('../../config/goerli.json')

export default function Questions({ questionsProp }) {
  const [generateFullProof] = useGenerateProof()
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false)
  const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
  const [question, setQuestion] = useState()
  const [identityKey, setIdentityKey] = useState('')
  const [questions, setQuestions] = useState(questionsProp)
  const [steps, setSteps] = useState([])
  const [fact, setFact] = useState([])

  const closeQuestionModal = () => {
    setQuestionModalIsOpen(false)
  }

  const openQuestionModal = () => {
    setQuestionModalIsOpen(true)
  }

  const closeProcessingModal = () => {
    setProcessingModalIsOpen(false)
  }

  const openProcessingModal = () => {
    setProcessingModalIsOpen(true)
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    closeQuestionModal()
    openProcessingModal()

    setSteps([
      { status: 'processing', text: 'Generate zero knowledge proof' },
      { status: 'queued', text: 'Submit transaction with proof and question' },
      { status: 'queued', text: 'Update answers from on-chain events' }
    ])

    const messageContent = question
    const messageId = ethers.utils.id(messageContent)
    const signal = messageId.slice(35)
    console.log('QUESTIONS PAGE | signal', signal)
    const { fullProofTemp, solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } =
      await generateFullProof(identityKey, signal)

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'processing', text: 'Submit transaction with proof and question' },
      { status: 'queued', text: 'Update answers from on-chain events' }
    ])

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
    console.log('QUESTIONS PAGE | body', body)

    try {
      await axios.post('/api/postMessage', body, {
        timeout: API_REQUEST_TIMEOUT
      })
      setSteps(['Generated zero knowledge proof', 'Submitted message transaction', 'Answer successfully added'])
    } catch (error) {
      console.log(error)
      setSteps(['Generated zero knowledge proof', 'Submitted message transaction', 'Answer successfully added'])
    }
    closeProcessingModal()


    // Solution below adds the new record to state, as opposed to refreshing.
    // const updatedQuestions = [
    //   {
    //     id: Math.round(Math.random() * 100000000000).toString(),
    //     messageId,
    //     messageContent
    //   }
    // ].concat(questions)
    // console.log('QUESTIONS PAGE | udpatedQuestions', updatedQuestions)
    // setQuestions(updatedQuestions)

    router.reload(window.location.pathname)


    setTimeout(closeProcessingModal, 3000)
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
  }, [])

  useEffect(() => {
    setTimeout(rotateFact, 6000)
  }, [fact])

  return (
    <div className="min-h-[700px]">

      <div className="sticky top-[400px] z-30 flex justify-between mx-2 min-w-[200px]">
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
          onClick={openQuestionModal}
          className="rounded-full bg-brand-yellow px-4 py-2 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
        >
          Ask a question
        </button>
      </div>
      <ProcessingModal isOpen={processingModalIsOpen} closeModal={closeProcessingModal} steps={steps} fact={fact} />
      <QuestionModal
        isOpen={questionModalIsOpen}
        closeModal={closeQuestionModal}
        handleQuestionChange={handleQuestionChange}
        handleSubmit={handleSubmit}
      />
      <QuestionsBoard questions={questions} />
    </div>
  )
}

export async function getServerSideProps(context) {
  // const subgraphs = new Subgraphs()
  // const images = await subgraphs.getMintedTokens()

  const fetchQuestions = async () => {
    // Construct query for subgraph
    const postData = {
      query: `
      {
        messageAddeds(
          orderBy: timestamp
          where: {parentMessageId: ""}
          orderDirection: desc
        ) {
          id
          messageContent
          messageId
          parentMessageId
        }
      }
      `
    }
    // Fetch data

    let data = []
    try {
      const result = await axios.post(TAZMESSAGE_SUBGRAPH, postData)
      data = result.data.data.messageAddeds
    } catch (err) {
      console.log('Error fetching subgraph data: ', err)
    }
    return data
  }

  const questions = await fetchQuestions()

  // console.log('QUESTIONS PAGE | fetched questions', questions)

  return {
    props: { questionsProp: questions }
  }
}
