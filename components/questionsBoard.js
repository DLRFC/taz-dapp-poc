import Header from './Header'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'

const SUGBRAPH_TAZ_MESSAGE = "https://api.thegraph.com/subgraphs/name/dlrfc/taz-message-goerli";

// Page 4 Page List of all Questions

const QuestionsBoard = (props) => {

  const [questions, setQuestions] = useState([]);
  
  const fetchQuestions = async () => {
    // Construct query for subgraph
    const postData = {
      query: `
      {
        messageAddeds(orderBy: messageId, where: {parentMessageId: 0}) {
          id
          messageContent
          messageId
          parentMessageId
        }
      }
      ` 
    };
    // Fetch data
    const result = await axios.post(SUGBRAPH_TAZ_MESSAGE, postData);
    const data = result.data.data.messageAddeds;
    return data;
  }

 useEffect(() => {
    const doAsync = async () => {setQuestions(await fetchQuestions()); }
    doAsync();
  }, []);


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
        {console.log("questions:", questions)}
        {questions.map(question => (
        
          <Link href={"/answers-board-page/" + question.messageId}>
            <div className="border-b-1 flex w-full flex-row items-center border-gray-700 py-4 px-5">
              <p className="w-[90%]">
                {question.messageContent}
              </p>
              <p className="-mr-3">X</p>
            </div>
          </Link>   
        
        ))}

      </div>
      <div className="flex justify-center p-5">Who I am? - @PrivacyScaling</div>
    </div>
  )
}

export default QuestionsBoard
