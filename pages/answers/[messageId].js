import { useState, useEffect } from 'react'
import { router } from 'next'
import axios from 'axios'
import { ethers } from 'ethers'
import AnswersBoard from '../../components/AnswersBoard'
import AnswerModal from '../../components/AnswerModal'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import ProcessingModal from '../../components/ProcessingModal'
import { Subgraphs } from '../../hooks/subgraphs'
import BackToTopArrow from '../../components/svgElements/BackToTopArrow'

const { API_REQUEST_TIMEOUT, FACT_ROTATION_INTERVAL, CHAINED_MODAL_DELAY } = require('../../config/goerli.json')
const { FACTS } = require('../../data/facts.json')

export default function Answers({ messageId, txHash, questionProp, answersProp }) {
  const [generateFullProof] = useGenerateProof()
  const [answerModalIsOpen, setAnswerModalIsOpen] = useState(false)
  const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
  const [question, setQuestion] = useState(questionProp)
  const [answer, setAnswer] = useState()
  const [identityKey, setIdentityKey] = useState('')
  const [answers, setAnswers] = useState(answersProp)
  const [steps, setSteps] = useState([])
  const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])
  const [showTopBtn, setShowTopBtn] = useState(false)

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
    setTimeout(openProcessingModal, CHAINED_MODAL_DELAY)

    setSteps([
      { status: 'processing', text: 'Generate zero knowledge proof' },
      { status: 'queued', text: 'Submit transaction with proof and answer' },
      { status: 'queued', text: 'Update answers from on-chain events' }
    ])

    const messageContent = answer
    const signal = ethers.utils.id(messageContent).slice(35)
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
      messageContent,
      merkleTreeRoot,
      groupId,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof
    }
    console.log('ANSWERS PAGE | body', body)
    try {
      const postResponse = await axios.post('/api/postMessage', body, {
        timeout: API_REQUEST_TIMEOUT
      })
      if (postResponse.status === 201) {
        const newAnswer = {
          id: Math.round(Math.random() * 100000000000).toString(),
          parentMessageId,
          messageId: 0,
          txHash: postResponse.data.hash,
          messageContent
        }
        const updatedAnswers = [newAnswer].concat(answers)
        setAnswers(updatedAnswers)

        console.log('ANSWERS PAGE | updatedAnswers', updatedAnswers)
        console.log('ANSWERS PAGE | answers', answers)

        console.log('ANSWERS PAGE | postResponse.status', postResponse.status)
        console.log('ANSWERS PAGE | postResponse.data.hash', postResponse.data.hash)

        // Save answer to local storage
        window.localStorage.setItem('savedAnswer', JSON.stringify(newAnswer))
      } else if (postResponse.status === 203) {
        alert('Tx Failed, please try again!')
        internalCloseProcessingModal()
      }
    } catch (error) {
      alert('Tx Failed, please try again!')
      internalCloseProcessingModal()
    }

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'complete', text: 'Submit transaction with proof and answer' },
      { status: 'processing', text: 'Update answers from on-chain events' }
    ])

    // Solution below adds the new record to state, as opposed to refreshing.

    // router.reload(window.location.pathname)

    setTimeout(internalCloseProcessingModal, 2000)
  }

  const updateFromLocalStorage = () => {
    const savedAnswer = JSON.parse(window.localStorage.getItem('savedAnswer'))
    const found = answers.some((element) => savedAnswer && element.messageContent === savedAnswer.messageContent)
    if (found) {
      window.localStorage.removeItem('savedAnswer')
    } else if (savedAnswer && savedAnswer.parentMessageId === parentMessageId) {
      const updatedAnswers = [savedAnswer].concat(answers)
      setAnswers(updatedAnswers)
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
    <div className="min-h-[700px] h-auto flex flex-col">
      {messageId !== '0' && (
        <div className="fixed bottom-[50%] right-2 z-30 flex justify-end">
          <button
            type="button"
            className="rounded-full bg-brand-yellow ring-1 ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
            onClick={openAnswerModal}
          >
            Answer this question
          </button>
        </div>
      )}
      {showTopBtn && (
        <div className="fixed bottom-[25%] left-2 z-30 flex justify-end">
          <button onClick={goToTop}>
            <BackToTopArrow />
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
      <AnswersBoard
        question={question}
        answers={answers}
        openAnswerModal={openAnswerModal}
        messageId={messageId}
        txHash={txHash}
      />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const subgraphs = new Subgraphs()
  const data = await subgraphs.getAnswers(query.messageId)

  // console.log('ANSWERS PAGE | query.messageid', query.messageId)
  console.log('ANSWERS PAGE | fetched answers', data)

  return {
    props: {
      messageId: query.messageId,
      txHash: query.txHash || '',
      questionProp: data.question,
      answersProp: data.answers
    }
  }
}
