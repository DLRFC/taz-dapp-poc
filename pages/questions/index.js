import { useState } from 'react'
import QuestionsBoard from '../../components/QuestionsBoard'
import QuestionModal from '../../components/QuestionModal'

const Questions = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleSubmit = (event) => {
    // TO DO handle
    alert('Submit question: ' + question)
    event.preventDefault()
  }

  return (
    <>
      <div className="sticky top-[400px] z-20">
        <button
          type="button"
          onClick={openModal}
          className="absolute right-2 rounded-full bg-brand-yellow px-4 py-1 drop-shadow text-sm font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
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
