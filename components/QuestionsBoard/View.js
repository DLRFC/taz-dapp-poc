// import Button from '../Button'
import Link from 'next/link'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import BackArrow from '../ArrowNavigators/BackArrow'

const QuestionsBoardComponent = ({ questions, clearIdentity }) => (
  <div className="px-6 py-8">
    <Link href="/experiences-page">
      <div className="flex max-w-[76px] max-h-[32px] bg-black ml-1 mt-1 mb-12 px-1 text-xl text-brand-beige2 cursor-pointer">
        <BackArrow />
        <h1>TAZ</h1>
      </div>
    </Link>
    <div>
      <h2 className="inline-block ml-1 mb-2 px-1 text-4xl text-black">ASK AND ANSWER</h2>
    </div>
    <div>
      <h2 className="inline-block ml-1 mb-2 px-1 text-4xl text-black">QUESTIONS FREELY</h2>
    </div>
    <div>
      <h3 className="inline-block ml-1 mb-2 px-1 py-5 text-gl text-black">
        More details about what makes this anonymous
      </h3>
    </div>
    <svg
      className="absolute -right-2 top-[200px] -z-1"
      width="69"
      height="120"
      viewBox="0 0 69 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M143.903 72.4515C143.903 111.913 111.913 143.903 72.4515 143.903C32.9899 143.903 1 111.913 1 72.4515C1 32.9899 32.9899 1 72.4515 1C111.913 1 143.903 32.9899 143.903 72.4515ZM5.34882 72.4515C5.34882 109.511 35.3917 139.554 72.4515 139.554C109.511 139.554 139.554 109.511 139.554 72.4515C139.554 35.3917 109.511 5.34882 72.4515 5.34882C35.3917 5.34882 5.34882 35.3917 5.34882 72.4515Z"
        stroke="#1E1E1E"
        strokeWidth="1.24316"
        fill="#EAE1DA"
      />
      <path
        d="M79.7284 71.493L114.696 71.3685L114.591 41.8953L75.2934 42.0352L75.4104 74.9101L79.7284 71.493ZM81.4455 76.3991L70.5342 85.0344L70.3725 39.5966C70.3702 38.9452 70.6267 38.3196 71.0857 37.8573C71.5447 37.3951 72.1685 37.1341 72.8198 37.1318L117.03 36.9744C117.681 36.9721 118.307 37.2286 118.769 37.6876C119.231 38.1466 119.492 38.7704 119.494 39.4218L119.617 73.8071C119.619 74.4585 119.363 75.0842 118.904 75.5464C118.445 76.0087 117.821 76.2696 117.169 76.272L81.4455 76.3991ZM92.5648 64.0789L97.477 64.0614L97.4945 68.9736L92.5823 68.9911L92.5648 64.0789ZM86.5438 51.3604C86.8572 49.7623 87.618 48.286 88.7376 47.1034C89.8573 45.9208 91.2898 45.0805 92.8684 44.6802C94.447 44.2799 96.1068 44.3361 97.6547 44.8423C99.2025 45.3486 100.575 46.2839 101.612 47.5396C102.649 48.7953 103.308 50.3196 103.513 51.9353C103.717 53.5509 103.459 55.1915 102.767 56.666C102.076 58.1405 100.98 59.3883 99.607 60.2643C98.2341 61.1402 96.6407 61.6083 95.0121 61.6141L92.556 61.6228L92.5386 56.7106L94.9947 56.7019C95.6924 56.6993 96.375 56.4987 96.9632 56.1234C97.5514 55.748 98.0209 55.2134 98.3171 54.5817C98.6132 53.9499 98.724 53.247 98.6363 52.5548C98.5486 51.8626 98.2662 51.2096 97.8219 50.6716C97.3776 50.1336 96.7896 49.7329 96.1265 49.516C95.4633 49.2992 94.7522 49.2751 94.0758 49.4465C93.3995 49.618 92.7858 49.978 92.3061 50.4847C91.8264 50.9913 91.5004 51.6238 91.3661 52.3085L86.5438 51.3604Z"
        stroke="#1E1E1E"
        strokeWidth="1.24316"
        fill="#EAE1DA"
      />
      <path
        d="M26.4334 79.6122C21.8091 84.2365 19.497 91.1728 17.1849 114.294C22.8157 117.954 30.5035 125.947 37.994 130.479C51.0085 138.353 63.4274 142.075 63.4274 139.727C63.4274 116.606 61.1152 84.2365 54.1789 84.2365C59.728 67.5892 53.4082 64.9688 49.5546 65.7395C61.1152 26.4333 44.9304 31.0575 42.6182 40.306C42.6182 26.4332 35.6819 31.0573 31.0576 40.3061C29.2079 42.1558 27.2041 61.1152 26.4334 70.3637V79.6122Z"
        stroke="#1E1E1E"
        strokeWidth="1.24316"
        fill="#EAE1DA"
      />
    </svg>

    <div className="z-0  min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg">
      {questions.map((question) => (
        <Link href={`/answers-board-page/${question.messageId}`} key={question.id}>
          <div className="flex w-full flex-row items-center border-brand-blue p-4 cursor-pointer">
            <p className="text-brand-brown  text-sm leading-5 w-[100%]">{question.messageContent}</p>
            <SelectorArrow />
          </div>
        </Link>
      ))}
    </div>
    <div className="flex items-center justify-center  flex-col m-6 text-brand-2xs text-brand-gray">
      {/* <button className="mb-3 text-lg" onClick={clearIdentity}>
        Logout
      </button> */}
      {/* &#8220;who am I?&#8221;&nbsp;&ndash;&nbsp; */}
      <a href="" className="underline mt-3">
        @PrivacyScaling
      </a>
    </div>
  </div>
)

export default QuestionsBoardComponent
