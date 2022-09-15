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
      <div className="flex col-start-1 row-start-1 fixed">
        <div className="absolute top-[130px] -left-[51px]">
          <RedCircle />
        </div>
        <div className="absolute top-[295px] left-[279px]">
          <YellowCircle />
        </div>
        <div className="absolute top-[320px] left-[175px]">
          <BunnyQuestion />
        </div>
        <div className="absolute top-[590px] -left-[10px]">
          <BlueEllipse />
        </div>
      </div>

      <div className="flex col-start-1 row-start-1 px-6 py-8">
        <Link href="/experiences-page">
          <div className="relative inline-block bg-black ml-1 mt-1 mb-12 px-1 text-xl text-brand-beige2 cursor-pointer">
            <BackArrow />
            <h1>TAZ</h1>
          </div>
        </Link>
        <div>
          <h2 className="relative inline-block ml-1 mb-2 px-1 text-4xl text-black">ASK AND ANSWER</h2>
        </div>
        <div>
          <h2 className="relative inline-block ml-1 mb-2 px-1 text-4xl text-black">QUESTIONS FREELY</h2>
        </div>
        <div>
          <h3 className="relative inline-block ml-1 mb-2 px-1 py-5 text-gl text-black">
            More details about what makes this anonymous
          </h3>
        </div>

        <div className="z-0  min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg">
          {questions.map((question) => (
            <Link href={'/answers-board-page/' + question.messageId} key={question.id}>
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
