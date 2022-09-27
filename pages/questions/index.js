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

const { API_REQUEST_TIMEOUT, FACT_ROTATION_INTERVAL, CHAINED_MODAL_DELAY } = require('../../config/goerli.json')
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
    setTimeout(openProcessingModal, CHAINED_MODAL_DELAY)

    setSteps([
      { status: 'processing', text: 'Generate zero knowledge proof' },
      { status: 'queued', text: 'Submit transaction with proof and question' },
      { status: 'queued', text: 'Update questions from on-chain events' }
    ])

    const messageContent = question
    const signal = ethers.utils.id(messageContent).slice(35)
    console.log('QUESTIONS PAGE | signal', signal)
    const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } = await generateFullProof(
      identityKey,
      signal
    )

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'processing', text: 'Submit transaction with proof and question' },
      { status: 'queued', text: 'Update questions from on-chain events' }
    ])

    const body = {
      parentMessageId: 0,
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
      const postResponse = await axios.post('/api/postMessage', body, {
        timeout: API_REQUEST_TIMEOUT
      })
      if (postResponse.status === 201) {
        const newQuestion = {
          id: Math.round(Math.random() * 100000000000).toString(),
          messageId: 0,
          txHash: postResponse.data.hash,
          messageContent
        }
        const updatedQuestions = [newQuestion].concat(questions)
        setQuestions(updatedQuestions)

        console.log('QUESTIONS PAGE | updatedQuestions', updatedQuestions)
        console.log('QUESTIONS PAGE | postResponse.status', postResponse.status)
        console.log('QUESTIONS PAGE | postResponse.data.hash', postResponse.data.hash)

        // Save question to local storage
        window.localStorage.setItem('savedQuestion', JSON.stringify(newQuestion))
      } else if (postResponse.status === 203) {
        alert('Your Transaction have failed please try submitting again')
        internalCloseProcessingModal()
      }
    } catch (error) {
      alert('Your Transaction have failed please try submitting again')
      internalCloseProcessingModal()
    }

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'complete', text: 'Submit transaction with proof and question' },
      { status: 'processing', text: 'Update questions from on-chain events' }
    ])

    // Solution below adds the new record to state, as opposed to refreshing.

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
    const windowHeight = window.outerHeight
    window.addEventListener('scroll', () => {
      if (window.scrollY > windowHeight) {
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
      <div className="fixed bottom-[37%] right-2 z-30 flex justify-end">
        <button
          type="button"
          className="rounded-full bg-brand-yellow ring-1 ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          onClick={openQuestionModal}
        >
          Ask a question
        </button>
      </div>
      {showTopBtn && (
        <div className="fixed bottom-[25%] left-2 z-30 flex justify-end">
          <button onClick={goToTop}>
            <BackToTopArrow />
          </button>
        </div>
      )}

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
