import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import QuestionsBoardComponent from './View'

const QuestionsBoard = ({ questions }) => {
  const router = useRouter()

  const clearIdentity = () => {
    console.log('clear')
    window.localStorage.removeItem('identity')
    router.push('/')
  }

  return <QuestionsBoardComponent questions={questions} clearIdentity={clearIdentity} />
}

export default QuestionsBoard
