import Header from './Header'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import axios from 'axios'

const SUGBRAPH_TAZ_MESSAGE =
  'https://api.thegraph.com/subgraphs/name/dlrfc/taz-message-goerli'

// Page 4 Page List of all Questions

const QuestionsBoard = (props) => {
  const [questions, setQuestions] = useState([])
  // const router = useRouter()
  // const { messageId } = router.query

  const fetchQuestions = async () => {
    // Construct query for subgraph
    const postData = {
      query: `
      {
        messageAddeds(
          orderBy: messageId
          where: {parentMessageId: 0}
          orderDirection: desc
        ) {
          id
          messageContent
          messageId
          parentMessageId
        }
      }
      `,
    }
    // Fetch data

    let data = []
    try {
      const result = await axios.post(SUGBRAPH_TAZ_MESSAGE, postData)
      data = result.data.data.messageAddeds
    } catch (err) {
      console.log('Error fetching subgraph data: ', err)
    }
    return data
  }

  useEffect(() => {
    const doAsync = async () => {
      setQuestions(await fetchQuestions())
    }
    doAsync()
  }, [])

  return (
    <div className="px-6 py-8 font-sans">
      <Header />

      <svg
        className="absolute -left-2 top-[230px]"
        width="69"
        height="100"
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

      <div className="mb-[34px] flex ml-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_114_381)">
            <path
              d="M7.828 10.9999H20V12.9999H7.828L13.192 18.3639L11.778 19.7779L4 11.9999L11.778 4.22192L13.192 5.63592L7.828 10.9999Z"
              fill="#BD5141"
            />
          </g>
          <defs>
            <clipPath id="clip0_114_381">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="ml-2 text-brand-orange text-sm font-bold">
          Back to apps
        </span>
      </div>

      <div className="index-[10] relative divide-y overflow-y-auto rounded-md border-2 border-gray-500 bg-white drop-shadow-lg">
        <div className="flex items-center justify-between py-4 px-8 bg-brand-beige">
          <p className="text-2xl text-brand-gray">Q&amp;A</p>
          <Link href="/ask-question-page">
            <button className="flex justify-between bg-white border-[1px] border-brand-gray py-1 px-3 shadow-[-3px_3px_0px_0px_rgba(71,95,111)]">
              <p className="text-brand-gray tracking-tighter">Ask a question</p>
              <svg
                className="ml-3 mt-1 scale-[120%]"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.45752 7.49992C0.45752 3.81802 3.41692 0.833252 7.06753 0.833252C10.7181 0.833252 13.6775 3.81802 13.6775 7.49992C13.6775 11.1818 10.7181 14.1666 7.06753 14.1666C3.41692 14.1666 0.45752 11.1818 0.45752 7.49992ZM7.06753 2.16659C4.14704 2.16659 1.77952 4.5544 1.77952 7.49992C1.77952 10.4455 4.14704 12.8333 7.06753 12.8333C9.98803 12.8333 12.3555 10.4455 12.3555 7.49992C12.3555 4.5544 9.98803 2.16659 7.06753 2.16659Z"
                  fill="#BD5141"
                />
                <path
                  transform="translate(3, 3)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.72857 1.16667C4.72857 0.79848 4.43264 0.5 4.06757 0.5C3.7025 0.5 3.40657 0.79848 3.40657 1.16667V3.83333H0.762563C0.397506 3.83333 0.101562 4.1318 0.101562 4.5C0.101562 4.8682 0.397506 5.16667 0.762563 5.16667H3.40657V7.83333C3.40657 8.20153 3.7025 8.5 4.06757 8.5C4.43264 8.5 4.72857 8.20153 4.72857 7.83333V5.16667H7.37257C7.73764 5.16667 8.03357 4.8682 8.03357 4.5C8.03357 4.1318 7.73764 3.83333 7.37257 3.83333H4.72857V1.16667Z"
                  fill="#BD5141"
                />
              </svg>
            </button>
          </Link>
        </div>

        {questions.map((question) => (
          <Link
            href={'/answers-board-page/' + question.messageId}
            key={question.id}
          >
            <div className="flex w-full flex-row items-center border-b-[1px] border-brand-gray p-3 cursor-pointer">
              <p className="text-brand-gray leading-5 w-[100%]">
                {question.messageContent}
              </p>
              <svg
                className="w-7 ml-10"
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.53446 5.50005L0.853516 1.78755L1.905 0.727051L6.63744 5.50005L1.905 10.2731L0.853516 9.21255L4.53446 5.50005Z"
                  fill="black"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center m-6 text-brand-2xs text-brand-gray">
        &#8220;who am I?&#8221;&nbsp;&ndash;&nbsp;
        <a href="" className="underline">
          @PrivacyScaling
        </a>
      </div>
    </div>
  )
}

export default QuestionsBoard
