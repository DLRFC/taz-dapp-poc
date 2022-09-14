// import Button from '../Button'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import Link from 'next/link'

const QuestionsBoardComponent = ({ questions, clearIdentity }) => {
  return (
    <div className="px-6 py-8">
      <div className="z-0  min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-gray-500 bg-white drop-shadow-lg">
        {questions.map((question) => (
          <Link href={'/answers-board-page/' + question.messageId} key={question.id}>
            <div className="flex w-full flex-row items-center border-brand-gray p-4 cursor-pointer">
              <p className="text-brand-brown text-sm leading-5 w-[100%]">{question.messageContent}</p>
              <SelectorArrow />
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
