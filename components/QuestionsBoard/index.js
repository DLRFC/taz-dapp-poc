import QuestionsBoardComponent from './View'
import { useEffect, useState } from 'react'
import axios from 'axios'

const SUGBRAPH_TAZ_MESSAGE =
  'https://api.thegraph.com/subgraphs/name/dlrfc/taz-message-goerli'

const QuestionsBoard = (props) => {
  const [questions, setQuestions] = useState([])

  const fetchQuestions = async () => {
    // Construct query for subgraph
    const postData = {
      query: `
      {
        messageAddeds(
          orderBy: timestamp
          where: {parentMessageId: ""}
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

  return <QuestionsBoardComponent questions={questions} />
}

export default QuestionsBoard
