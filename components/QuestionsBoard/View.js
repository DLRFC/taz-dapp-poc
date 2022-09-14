import Button from '../Button'
import Link from 'next/link'

const QuestionsBoardComponent = ({ questions, clearIdentity }) => {
  return (
    <div className="px-6 py-8">
      <div className="index-[10] relative divide-y overflow-y-auto rounded-md border-2 border-gray-500 bg-white drop-shadow-lg">
        {questions.map((question) => (
          <Link href={'/answers-board-page/' + question.messageId} key={question.id}>
            <div className="flex w-full flex-row items-center border-brand-gray p-4 cursor-pointer">
              <p className="text-brand-brown text-sm leading-5 w-[100%]">{question.messageContent}</p>
              <svg
                className="w-7 ml-10"
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.53446 5.50005L0.853516 1.78755L1.905 0.727051L6.63744 5.50005L1.905 10.2731L0.853516 9.21255L4.53446 5.50005Z"
                  fill="black"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center  flex-col m-6 text-brand-2xs text-brand-gray">
        <button className="mb-3 text-lg" onClick={clearIdentity}>
          Logout
        </button>
        {/* &#8220;who am I?&#8221;&nbsp;&ndash;&nbsp; */}
        <a href="" className="underline mt-3">
          @PrivacyScaling
        </a>
      </div>
    </div>
  )
}

export default QuestionsBoardComponent
