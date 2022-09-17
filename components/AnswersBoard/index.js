import Link from 'next/link'
import { useEffect, useState } from 'react'
import RedCircle from '../svgElements/RedCircle'
import YellowCircle from '../svgElements/YellowCircle'
import BlueEllipse from '../svgElements/BlueEllipse'
import ConvoBubbles from '../svgElements/ConvoBubbles'
import BackArrow from '../svgElements/BackArrow'

const AnswersBoard = (props) => {
  const { messageId } = props

  const [answers, setAnswers] = useState(props.answers)
  const [question, setQuestion] = useState(props.question)

  return (
    <div className="grid">
      <div className="col-start-1 row-start-1 fixed">
        <div className="absolute top-[150px] -left-[30px]">
          <BlueEllipse />
        </div>
        <div className="absolute top-[369px] -left-[91px]">
          <YellowCircle />
        </div>
        <div className="absolute top-[300px] left-[360px]">
          <RedCircle />
        </div>
      </div>

      <div className="col-start-1 row-start-1 px-6 py-8">
        <div className="z-0 p-4 min-w-[200px] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
          <div className="mb-4 border-0">
            <Link href="/questions" className="cursor-pointer">
              <BackArrow />
            </Link>
          </div>
          <p className="border-0" style={{ borderTopWidth: '0px' }}>
            {question.messageContent}
          </p>
          {/* <div className="flex justify-end border-0 mb-4" style={{ borderTopWidth: '0px' }}>
            <button
              type="button"
              onClick={props.openAnswerModal}
              className="rounded-full bg-brand-yellow mt-2 px-3 py-1 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
            >
              Answer this question
            </button>
          </div> */}
          {answers.map((answer) => (
            <div
              className="flex flex-row align-top"
              key={answer.id}
              style={{ borderTopWidth: '0px', borderBottomWidth: '1px' }}
            >
              <div className="flex-col m-4">
                <ConvoBubbles />
              </div>
              <div className="flex-col ml-4 text-xs my-4 text-brand-gray">{answer.messageContent}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnswersBoard
