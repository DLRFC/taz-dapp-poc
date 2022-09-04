import { useState } from 'react'
import axios from 'axios'
import ValidateInvitationComponent from './View'

const ValidateInvitation = () => {
  const [invitation, setInvitation] = useState('')
  const [response, setResponse] = useState('')

  const validate = async () => {
    const response = await axios.post('/api/validateInvitation', {
      invitation,
    })
    console.log('Is code valid and not used yet? ', response.data.isValid)
    setResponse(response.data.isValid)
  }

  return (
    <ValidateInvitationComponent
      invitation={invitation}
      validate={validate}
      response={response}
    />
  )
}

export default ValidateInvitation
