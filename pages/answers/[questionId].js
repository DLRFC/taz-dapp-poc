import { useState, useEffect } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import { useGenerateProof } from '../../hooks/useGenerateProof'

const Answers = (props) => {
  const [generateFullProof] = useGenerateProof()
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState()
  // const [isMember, setIsMember] = useState(false)
  const [identityKey, setIdentityKey] = useState('')
  const [generateFullProof] = useGenerateProof()
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState()
  // const [isMember, setIsMember] = useState(false)
  const [identityKey, setIdentityKey] = useState('')

  const { messageId: parentMessageId } = props

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
      parentMessageId: parentMessageId,
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
}

export default Answers
