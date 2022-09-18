import Link from 'next/link'

import BunnyQuestion from '../svgElements/BunnyQuestion'
import YellowCircle from '../svgElements/YellowCircle'
import BlueEllipse from '../svgElements/BlueEllipse'
import RedCircle from '../svgElements/RedCircle'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import BackTAZ from '../ArrowNavigators/BackTAZ'

const QuestionsBoardComponent = ({ questions, clearIdentity }) => (
  <div className="grid">
    <div className="col-start-1 row-start-1 fixed">
      <div className="absolute top-[175px] left-[380px]">
        <BunnyQuestion />
      </div>
      <div className="absolute top-[218px] -left-[51px]">
        <YellowCircle />
      </div>
      <div className="absolute top-[360px] left-[320px]">
        <BlueEllipse />
      </div>
      <div className="absolute top-[659px] left-[9px]">
        <RedCircle />
      </div>
    </div>

    <div className="col-start-1 row-start-1 px-6 py-8">
      <Link href="/experiences-page">
        <div className="flex max-w-[76px] max-h-[32px] bg-black ml-1 mt-1 mb-12 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
          <BackTAZ />
          <h1>TAZ</h1>
        </div>
      </Link>
      <div>
        <h2 className="relative inline-block ml-3 mb-2 text-4xl text-black font-extrabold">ASK AND ANSWER</h2>
      </div>
      <div>
        <h2 className="relative inline-block ml-3 mb-2 text-4xl text-black font-extrabold">QUESTIONS FREELY</h2>
      </div>
      <div>
        <h3 className="relative inline-block ml-3 text-lg text-brand-blue tracking-wide">More details about what</h3>
      </div>
      <div>
        <h3 className="relative inline-block ml-3 mb-4 text-lg text-brand-blue tracking-wide">makes this anonymous</h3>
      </div>

      <div className="z-0  min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg mb-20">
        {questions.map((question) => (
          <Link href={`/answers/${question.messageId}`} key={question.id}>
            <div className="flex w-full flex-row items-center border-brand-blue p-4 cursor-pointer">
              <p className="text-brand-brown opacity-[85%] text-sm leading-5 w-[100%]">{question.messageContent}</p>
              <SelectorArrow />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
)

export default QuestionsBoardComponent
