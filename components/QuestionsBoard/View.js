import Link from 'next/link'

import BunnyQuestion from '../svgElements/BunnyQuestion'
import YellowCircle from '../svgElements/YellowCircle'
import BlueEllipse from '../svgElements/BlueEllipse'
import RedCircle from '../svgElements/RedCircle'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import BackTAZ from '../ArrowNavigators/BackTAZ'
import Footer from '../Footer'

const QuestionsBoardComponent = ({ questions, clearIdentity }) => (
  <div className="grid">
    <div className="z-0 col-start-1 row-start-1 fixed">
      <div className="absolute top-[142px] -left-[51px]">
        <YellowCircle />
      </div>
      <div className="absolute top-[360px] left-[320px]">
        <BlueEllipse />
      </div>
      <div className="absolute top-[500px] left-[9px]">
        <RedCircle />
      </div>
    </div>

    <div className="z-10 col-start-1 row-start-1">
      <Link href="/experiences-page">
        <div className="flex max-w-[76px] max-h-[32px] bg-black ml-9 mb-10 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
          <BackTAZ />
          <h1>TAZ</h1>
        </div>
      </Link>
      <div className="px-6 pt-3 pb-2">
        <div>
          <h2 className="ml-3 text-[24px] leading-5 font-extrabold">ASK AND ANSWER</h2>
        </div>
        <div>
          <h2 className="ml-3 mb-1 text-[24px] font-extrabold">QUESTIONS FREELY</h2>
        </div>
        <div>
          <h3 className="mx-3 pr-20 text-brand-body text-brand-blue">
            More details about what makes this anonymous and copy about this long.
          </h3>
        </div>
      </div>
    </div>

    <div className="z-10 col-start-1 row-start-2 px-6">
      <div className="z-20 min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg">
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

    <div className="z-30 relative flex items-center flex-col bg-black mt-20 py-5">
      <Footer />
    </div>
    <div className="absolute overflow-hidden top-36 md:top-20 -right-0">
      <BunnyQuestion />
    </div>
  </div>
)

export default QuestionsBoardComponent
