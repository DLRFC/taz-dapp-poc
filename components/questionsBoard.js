import Header from './Header'
import Link from 'next/link'

// Page 4 Page List of all Questions
const QuestionsBoard = () => {
  return (
    <div className="p-4 font-sans bg-brand-beige">
      <Header />
      <svg
        className="absolute -left-2 top-[370px]"
        width="69"
        height="100"
        viewBox="0 0 69 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
      </svg>
      <svg
        className="absolute right-[0px] top-[642px]"
        width="121"
        height="160"
        viewBox="0 0 121 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
      </svg>

      <div className="index-[10] relative h-[554px] divide-y overflow-y-auto rounded-md border-2 border-gray-500 bg-white">
        <div className="border-b-1 flex items-center justify-between border-gray-700 p-3">
          <p className="text-3xl font-bold">Q&A</p>
          <button className="flex gap-2 border-2 border-black p-2 shadow-[-3px_3px_0px_0px_rgba(0,0,0)]">
            <p>Ask a question</p>
            <p>+</p>
          </button>
        </div>
        <Link href="/answers-board-page">
          <div className="border-b-1 flex w-full flex-row items-center border-gray-700 py-4 px-5">
            <p className="w-[90%]">
              How lorem ipsum lorem ipsu lorem ipsu lorem ipsu How lorem ipsum
              lorem ipsu lorem ipsu lorem ipsu How lorem ipsum lorem ipsu lorem
              ipsu lorem ipsu
            </p>

            <p className="-mr-3">X</p>
          </div>
        </Link>
        <div className="border-b-1 flex w-full flex-row items-center py-3 px-6">
          <p className="w-[90%]">
            How lorem ipsum lorem ipsu lorem ipsu lorem ipsu How lorem ipsum
            lorem ipsu lorem ipsu lorem ipsu How lorem ipsum lorem ipsu lorem
            ipsu lorem ipsu
          </p>
          <p className="-mr-3">X</p>
        </div>
        <div className="flex w-full flex-row items-center py-3 px-5">
          <p className="w-[90%]">
            How lorem ipsum lorem ipsu lorem ipsu lorem ipsu How lorem ipsum
            lorem ipsu lorem ipsu lorem ipsu How lorem ipsum lorem ipsu lorem
            ipsu lorem ipsu
          </p>
          <p className="-mr-3">X</p>
        </div>
      </div>
      <div className="flex justify-center p-5">Who I am? - @PrivacyScaling</div>
    </div>
  )
}

export default QuestionsBoard
