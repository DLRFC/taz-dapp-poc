import { useState, useEffect } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import AnswersBoard from '../../components/AnswersBoard'
import AnswerModal from '../../components/AnswerModal'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import ProcessingModal from '../../components/ProcessingModal'
import { TAZMESSAGE_SUBGRAPH } from '../../config/goerli.json'

const { API_REQUEST_TIMEOUT } = require('../../config/goerli.json')

export default function Answers(props) {
  const [generateFullProof] = useGenerateProof()
  const [answerModalIsOpen, setAnswerModalIsOpen] = useState(false)
  const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
  const [question, setQuestion] = useState(props.questionProp)
  const [answer, setAnswer] = useState()
  const [identityKey, setIdentityKey] = useState('')
  const [answers, setAnswers] = useState(props.answersProp)
  const [steps, setSteps] = useState([])
  // const [isMember, setIsMember] = useState(false)

  const parentMessageId = props.messageId

  useEffect(() => {
    let identityKeyTemp = ''
    if (identityKeyTemp === '') {
      identityKeyTemp = window.localStorage.getItem('identity')
      setIdentityKey(identityKeyTemp)
      // setIsMember(true)
    }
  })

  const closeAnswerModal = () => {
    setAnswerModalIsOpen(false)
  }

  const openAnswerModal = () => {
    setAnswerModalIsOpen(true)
  }

  const closeProcessingModal = () => {
    setProcessingModalIsOpen(false)
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

    setSteps(['Generating zero knowledge proof'])

    const messageContent = answer
    const messageId = ethers.utils.id(messageContent)
    const signal = messageId.slice(35)
    console.log('ANSWERS PAGE | signal', signal)
    const { fullProofTemp, solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } =
      await generateFullProof(identityKey, signal)

    setSteps(['Generated zero knowledge proof', 'Submitting message transaction'])

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

    await axios.post('/api/postMessage', body, {
      timeout: API_REQUEST_TIMEOUT
    })

    setSteps(['Generated zero knowledge proof', 'Submitted message transaction', 'Question successfully added'])

    const updatedAnswers = [
      {
        id: Math.round(Math.random() * 100000000000).toString(),
        messageId,
        messageContent
      }
    ].concat(answers)

    console.log('ANSWERS PAGE | updatedAnswers', updatedAnswers)

    setAnswers(updatedAnswers)

    setTimeout(closeProcessingModal, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <ProcessingModal isOpen={processingModalIsOpen} closeModal={closeProcessingModal} steps={steps} />
      <AnswerModal
        isOpen={answerModalIsOpen}
        closeModal={closeAnswerModal}
        handleAnswerChange={handleAnswerChange}
        handleSubmit={handleSubmit}
      />
      <AnswersBoard question={question} answers={answers} openAnswerModal={openAnswerModal} />
    </>
  )
}

export async function getServerSideProps({ query }) {
  // const subgraphs = new Subgraphs()
  // const images = await subgraphs.getMintedTokens()

  console.log('ANSWERS PAGE | query.messageid', query.messageId)

  const fetchAnswers = async () => {
    // Construct query for subgraph
    const postData = {
      query: `
      {
        parentMessageAddeds: messageAddeds(
          orderBy: messageId
          first: 1
          where: {messageId: "${query.messageId}"}
          orderDirection: desc
        ) {
          id
          messageContent
          messageId
        }
        messageAddeds(
          orderBy: timestamp
          where: {parentMessageId: "${query.messageId}"}
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
      const question = result.data.data.parentMessageAddeds[0]
      const answers = result.data.data.messageAddeds
      data = { question, answers }
    } catch (err) {
      console.log('Error fetching subgraph data: ', err)
    }
    return data
  }

  const data = await fetchAnswers()

  // console.log('ANSWERS PAGE | fetched answers', data)

  return {
    props: { messageId: query.messageId, questionProp: data.question, answersProp: data.answers }
  }
}
