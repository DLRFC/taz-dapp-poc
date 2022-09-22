import { useState, useEffect } from 'react'
import { router } from 'next'
import axios from 'axios'
import { ethers } from 'ethers'
import QuestionsBoard from '../../components/QuestionsBoard'
import QuestionModal from '../../components/QuestionModal'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import ProcessingModal from '../../components/ProcessingModal'
import { Subgraphs } from '../../hooks/subgraphs'
import BackToTopArrow from '../../components/svgElements/BackToTopArrow'

const { API_REQUEST_TIMEOUT, FACT_ROTATION_INTERVAL } = require('../../config/goerli.json')
const { FACTS } = require('../../data/facts.json')

export default function Questions({ questionsProp }) {
  const [generateFullProof] = useGenerateProof()
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false)
  const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
  const [question, setQuestion] = useState()
  const [identityKey, setIdentityKey] = useState('')
  const [questions, setQuestions] = useState(questionsProp)
  const [steps, setSteps] = useState([])
  const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])
  const [showTopBtn, setShowTopBtn] = useState(false)

  const closeQuestionModal = () => {
    setQuestionModalIsOpen(false)
  }

  const openQuestionModal = () => {
    setQuestionModalIsOpen(true)
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
    const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } = await generateFullProof(
      identityKey,
      signal
    )

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

    const postResponse = await axios.post('/api/postMessage', body, {
      timeout: API_REQUEST_TIMEOUT
    })

    console.log('QUESTIONS PAGE | postResponse.status', postResponse.status)
    console.log('QUESTIONS PAGE | postResponse.data.hash', postResponse.data.hash)

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'complete', text: 'Submit transaction with proof and question' },
      { status: 'processing', text: 'Update questions from on-chain events' }
    ])

    // Solution below adds the new record to state, as opposed to refreshing.
    if (postResponse.status === 201) {
      const newQuestion = {
        id: Math.round(Math.random() * 100000000000).toString(),
        messageId: postResponse.data.hash,
        messageContent
      }
      const updatedQuestions = [newQuestion].concat(questions)
      setQuestions(updatedQuestions)

      console.log('QUESTIONS PAGE | updatedQuestions', updatedQuestions)

      // Save question to local storage
      window.localStorage.setItem('savedQuestion', JSON.stringify(newQuestion))
    } else if (postResponse.status === 203) {
      alert('Your Transaction have failed please try submitting again')
      internalCloseProcessingModal()
    }

    // router.reload(window.location.pathname)

    setTimeout(internalCloseProcessingModal, 2000)
  }

  const updateFromLocalStorage = () => {
    const savedQuestion = JSON.parse(window.localStorage.getItem('savedQuestion'))
    const found = questions.some((element) => savedQuestion && element.messageContent === savedQuestion.messageContent)
    if (found) {
      window.localStorage.removeItem('savedQuestion')
    } else if (savedQuestion) {
      const updatedQuestions = [savedQuestion].concat(questions)
      setQuestions(updatedQuestions)
    }
  }

  // const scrollToTop = () => {
  //   window.scrollTo(0, 0)
  // }

  const rotateFact = () => {
    setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
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
  }, [])

  useEffect(() => {
    setTimeout(rotateFact, FACT_ROTATION_INTERVAL)
  }, [fact])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-[700px]">
      <div className="fixed bottom-24 right-2 z-30 flex justify-end">
        <button
          type="button"
          className="rounded-full bg-brand-yellow px-4 py-2 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          onClick={openQuestionModal}
        >
          Ask a question
        </button>
      </div>
      {showTopBtn && (
        <div className="fixed bottom-24 left-2 z-30 flex justify-end">
          <button onClick={goToTop}>
            <BackToTopArrow size={40} fill="#1E1E1E" />
          </button>
        </div>
      )}
      {/* <div className="sticky top-[400px] z-30 flex justify-between mx-2 min-w-[200px]">
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
      </div> */}
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

export async function getServerSideProps() {
  const subgraphs = new Subgraphs()
  const questions = await subgraphs.getQuestions()

  // console.log('QUESTIONS PAGE | fetched questions', questions)

  return {
    props: { questionsProp: questions }
  }
}
