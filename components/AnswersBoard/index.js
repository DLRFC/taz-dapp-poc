import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import RedCircle from '../svgElements/RedCircle'
import YellowCircle from '../svgElements/YellowCircle'
import BlueEllipse from '../svgElements/BlueEllipse'
import ConvoBubbles from '../svgElements/ConvoBubbles'
import BackArrow from '../svgElements/BackArrow'
// import BackToTopArrow from '../svgElements/BackToTopArrow'
import Footer from '../Footer'

function AnswersBoard({ messageId, question, answers }) {
  // const [showTopBtn, setShowTopBtn] = useState(false)

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     if (window.scrollY > 20) {
  //       setShowTopBtn(true)
  //     } else {
  //       setShowTopBtn(false)
  //     }
  //   })
  // }, [])

  // const goToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   })
  // }

  return (
    <div className="grid mb-20">
      <div className="z-10 col-start-1 row-start-1 px-6 py-8">
        <div className="z-0 p-4 min-w-[200px] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
          <div className="mb-4 border-0">
            <Link href="/questions" className="cursor-pointer">
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
      {/* <div className="fixed bottom-24 right-2 z-30 flex justify-end">
        <Link href="/answer-question-page">
          <button
            type="button"
            className="rounded-full bg-brand-yellow px-4 py-2 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          >
            Answer this question
          </button>
        </Link>
      </div>
      {showTopBtn && (
        <div className="fixed bottom-24 left-2 z-30 flex justify-end">
          <button onClick={goToTop}>
            <BackToTopArrow size={40} fill="#1E1E1E" />
          </button>
        </div>
      )} */}
    </div>
  )
}

export default AnswersBoard
