import BunnyQuestion from '../svgElements/BunnyQuestion'
import YellowCircle from '../svgElements/YellowCircle'
import BlueEllipse from '../svgElements/BlueEllipse'
import RedCircle from '../svgElements/RedCircle'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import BackArrow from '../ArrowNavigators/BackArrow'
import Link from 'next/link'

const QuestionsBoardComponent = ({ questions, clearIdentity }) => {
  return (
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
            <BackArrow />
            <h1>TAZ</h1>
          </div>
        </Link>
        <div>
          <h2 className="relative inline-block ml-1 mb-2 text-4xl text-black">ASK AND ANSWER</h2>
        </div>
        <div>
          <h2 className="relative inline-block ml-1 mb-2 text-4xl text-black">QUESTIONS FREELY</h2>
        </div>
        <div>
          <h3 className="relative inline-block ml-1 text-l text-black font-extrabold">More details about what</h3>
        </div>
        <div>
          <h3 className="relative inline-block ml-1 mb-4 text-l text-black">makes this anonymous</h3>
        </div>

        <div className="z-0  min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg">
          {questions.map((question) => (
            <Link href={`/answers/${question.messageId}`} key={question.id}>
              <div className="flex w-full flex-row items-center border-brand-blue p-4 cursor-pointer">
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
    </div>
  )
}

export default QuestionsBoardComponent
