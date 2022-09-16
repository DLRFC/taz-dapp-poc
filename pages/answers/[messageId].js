import { useState, useEffect } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import { useGenerateProof } from '../../hooks/useGenerateProof'

const Answers = (props) => {
  const [generateFullProof] = useGenerateProof()
  const [isOpen, setIsOpen] = useState(false)
  const [answer, setAnswer] = useState()
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
    setAnswer(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // TO DO handle
    const messageContent = answer
    const messageId = ethers.utils.id(messageContent)
    const signal = messageId
    const { fullProofTemp, solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } =
      await generateFullProof(identityKey, signal)

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
    console.log('body', body)
    alert(`Submit question: ${answer}`)

    await axios.post('/api/postMessage', body, {
      timeout: API_REQUEST_TIMEOUT
    })
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }
  return <h1>Hello World</h1>
}

export default Answers
