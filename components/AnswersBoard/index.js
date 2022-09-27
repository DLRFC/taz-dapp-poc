import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { textChangeRangeNewSpan } from 'typescript'
import RedCircle from '../svgElements/RedCircle'
import BlueCircle from '../svgElements/BlueCircle'
import YellowEllipse from '../svgElements/YellowEllipse'
import BunnyQ2 from '../svgElements/BunnyQ2'
import ConvoBubbles from '../svgElements/ConvoBubbles'
import BackArrow from '../svgElements/BackArrow'
// import BackToTopArrow from '../svgElements/BackToTopArrow'
import Footer from '../Footer'

function AnswersBoard({ messageId, txHash, question, answers }) {
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
    <div className="grid mb-[200px]">
      <div className="z-0 col-start-1 row-start-1 fixed">
        <div className="absolute top-[70px] -left-[140px]">
          <YellowEllipse />
        </div>
        <div className="absolute top-[300px] left-[320px]">
          <BlueCircle />
        </div>
        <div className="absolute top-[450px] left-[-51px]">
          <RedCircle />
        </div>
        <div className="absolute top-[500px] left-[29px]">
          <BunnyQ2 />
        </div>
      </div>

      <div className="z-20 col-start-1 row-start-1 px-6 py-8 text-brand-brown">
        <div className="p-4 min-w-[200px] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
          <div className="mb-4 border-0">
            <Link href="/questions" className="cursor-pointer">
              <div className="cursor-pointer">
                <BackArrow />
              </div>
            </Link>
          </div>
          {messageId === '0' && txHash.length > 0 ? (
            <div className="p-4">
              <p className="text-brand-red pb-4">Question is still being processed.</p>
              <p className="text-sm">
                You can check your transaction on{' '}
                <a className="py-2 underline" href={`https://goerli.etherscan.io/tx/${txHash}`}>
                  Etherscan
                </a>
                .
              </p>
            </div>
          ) : (
            <div style={{ borderTopWidth: '0px' }}>
              <p className="px-2 text-brand-3xs text-brand-gray50 font-medium">
                qID {question.messageId ? question.messageId.toLocaleString() : '0'}
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
                  qID {answer.messageId ? answer.messageId.toLocaleString() : '0'}
                </p>
                <p className="px-4 leading-[1.3rem]">{answer.messageContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="z-10 fixed bottom-0 w-full flex-col bg-black py-5">
        <Footer />
      </div>
    </div>
  )
}

export default AnswersBoard
