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

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className="sticky top-[400px] z-30 flex justify-between mx-2 min-w-[200px]">
        <button onClick={scrollToTop}>
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
          onClick={openModal}
          className="rounded-full bg-brand-yellow px-4 py-2 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
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
