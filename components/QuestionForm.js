import { useState } from "react";
import axios from "axios";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const postQuestion = async () => {
    const response = await axios.post("/api/postQuestion", { question });
    console.log(response.data);
    setResponse(response.data);
  };

  return (
    <div>
      <div className="flex my-3">
        <input
          className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Question"
          type="text"
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        ></input>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded ml-2"
          onClick={() => postQuestion()}
        >
          Submit
        </button>
      </div>
      {response ? <p className="bg-gray-100 p-2 mt-2">{response}</p> : ""}
    </div>
  );
};

export default QuestionForm;
