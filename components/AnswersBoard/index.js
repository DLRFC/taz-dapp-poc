import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '../Button'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import BackArrow from '../ArrowNavigators/BackArrow'

const AnswersBoard = (props) => {
  const { messageId } = props

  const [answers, setAnswers] = useState(props.answers)
  const [question, setQuestion] = useState(props.question)

  return (
    <div className="px-6 py-8">
      <svg
        className="absolute -left-2 top-[320px] -z-1"
        width="69"
        height="120"
        viewBox="0 0 69 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
      </svg>
      <svg
        className="absolute right-[0px] top-[520px]"
        width="121"
        height="160"
        viewBox="0 0 121 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
        <path
          transform="translate(-9, 0)"
          d="M5.86415 0.843262L7.73372 2.72888L3.99457 6.50008L7.73372 10.2714L5.86415 12.157L0.255371 6.50008L5.86415 0.843262Z"
          fill="#475F6F"
        />
      </svg>

      <div className="z-0 p-4 min-w-[200px] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
        <div className="mb-4 border-0">
          <Link href="/questions" className="cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.871 5.24952H12V6.74952H2.871L6.894 10.7725L5.8335 11.833L0 5.99952L5.8335 0.166016L6.894 1.22652L2.871 5.24952Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
          </Link>
        </div>
        <p className="border-0" style={{ borderTopWidth: '0px' }}>
          {question.messageContent}
        </p>
        <div className="flex justify-end border-0 mb-4" style={{ borderTopWidth: '0px' }}>
          <button
            type="button"
            onClick={props.openAnswerModal}
            className="rounded-full bg-brand-yellow mt-2 px-3 py-1 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          >
            Answer this question
          </button>
        </div>
        {answers.map((answer) => (
          <div
            className="flex flex-row align-top"
            key={answer.id}
            style={{ borderTopWidth: '0px', borderBottomWidth: '1px' }}
          >
            <div className="flex-col m-4">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.455 13L0 16.5V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H16C16.2652 0 16.5196 0.105357 16.7071 0.292893C16.8946 0.48043 17 0.734784 17 1V13H4.455ZM3.763 11H15V2H2V12.385L3.763 11ZM7 15H17.237L19 16.385V6H20C20.2652 6 20.5196 6.10536 20.7071 6.29289C20.8946 6.48043 21 6.73478 21 7V20.5L16.545 17H8C7.73478 17 7.48043 16.8946 7.29289 16.7071C7.10536 16.5196 7 16.2652 7 16V15Z"
                  fill="#D9D4D1"
                />
              </svg>
            </div>
            <div className="flex-col ml-4 text-xs my-4 text-brand-gray">{answer.messageContent}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center  flex-col m-6 text-brand-2xs text-brand-gray">
        <a href="" className="underline mt-3">
          @PrivacyScaling
        </a>
      </div>
    </div>
  )
}

export default AnswersBoard
