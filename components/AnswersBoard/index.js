import Link from 'next/link'
import RedCircle from '../svgElements/RedCircle'
import YellowCircle from '../svgElements/YellowCircle'
import BlueEllipse from '../svgElements/BlueEllipse'
import ConvoBubbles from '../svgElements/ConvoBubbles'
import BackArrow from '../svgElements/BackArrow'

const AnswersBoard = ({ messageId, question, answers }) => (
  <div className="z-0 grid mb-20">
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

    <div className="z-10 col-start-1 row-start-1 px-6">
      <div className="z-0 p-2 min-w-[200px] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
        <div className="mx-3 mb-5 mt-3 border-0">
          <Link href="/questions">
            <div className="cursor-pointer">
              <BackArrow />
            </div>
          </Link>
        </div>
        {question === 0 ? (
          <div className="p-4">
            <p className="text-brand-red pb-4">Question is still being processed.</p>
            <p className="text-sm">
              You can check your transaction on{' '}
              <a className="py-2 underline" href={`https://goerli.etherscan.io/tx/${messageId}`}>
                Etherscan
              </a>
              .
            </p>
          </div>
        ) : (
          <div style={{ borderTopWidth: '0px' }}>
            <p className="px-2 text-brand-3xs text-brand-gray50 font-medium">
              qID {question.messageNum.toLocaleString()}
            </p>
            <p
              className="px-2 pb-4"
              style={
                answers.length > 0
                  ? { borderTopWidth: '0px', borderBottomWidth: '1px', borderColor: '#EAE1DA' }
                  : { borderTopWidth: '0px', borderBottomWidth: '0px' }
              }
            >
              {question.messageContent}
            </p>
          </div>
        )}

        {/* <div className="flex justify-end border-0 mb-4" style={{ borderTopWidth: '0px' }}>
            <button
              type="button"
              onClick={props.openAnswerModal}
              className="rounded-full bg-brand-yellow mt-2 px-3 py-1 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
            >
              Answer this question
            </button>
          </div> */}

        {answers.map((answer, index) => (
          <div
            className="flex flex-row align-top last:border-b-0"
            key={answer.id}
            style={
              index + 1 === answers.length
                ? { borderTopWidth: '0px', borderBottomWidth: '0px' }
                : { borderTopWidth: '0px', borderBottomWidth: '1px', borderColor: '#EAE1DA' }
            }
          >
            <div className="flex-col px-2 py-4">
              <ConvoBubbles />
            </div>

            <div className="flex-col py-3 text-xs text-brand-brown">
              <p className="px-4 pb-2 text-brand-3xs text-brand-gray50 font-medium">
                qID {answer.messageNum ? answer.messageNum.toLocaleString() : '0'}
              </p>
              <p className="px-4 leading-[1.3rem]">{answer.messageContent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default AnswersBoard
