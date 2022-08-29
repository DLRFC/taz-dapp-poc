import { useState } from 'react'
import axios from 'axios'

const ValidateInvitation = () => {
  const [invitation, setInvitation] = useState('test-code-15')
  const [response, setResponse] = useState('')

  const validate = async () => {
    setInvitation('test-code-15')
    const response = await axios.post('/api/validateInvitation', {
      invitation,
    })
    console.log('Is code valid and not used yet? ', response.data.isValid)
    setResponse(response.data.isValid)
  }

  return (
    <div>
      <p className="bg-gray-100 p-2 mt-2">{invitation}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded ml-2"
        onClick={() => validate()}
      >
        Validate Invitation
      </button>
      {response ? <p className="bg-gray-100 p-2 mt-2">{response}</p> : ''}
    </div>
  )
}

export default ValidateInvitation
