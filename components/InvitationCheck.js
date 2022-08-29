import { useState } from 'react'
import Header from './Header'
import axios from 'axios'
import Link from 'next/link'

// Page 1 it will check Invitation
export const InvitationCheck = () => {
  const [invitation, setInvitation] = useState('test-code-15')
  const [response, setResponse] = useState('')

  const validate = async () => {
    const apiResponse = await axios.post('/api/validateInvitation', {
      invitation,
    })
    console.log('Is code valid and not used yet? ', apiResponse.data.isValid)

    setResponse(apiResponse.data.isValid)
    console.log(response)
  }

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

      <div className="flex flex-col items-center overflow-hidden rounded-md px-3 text-brand-gray2">
        <div className="h-[586px] py-3 w-full px-4 z-10">
          <p className="py-5 font-bold mb-3 px-3 text-xl">Get started?</p>
          <button className="bg-gray-300 w-full p-2 rounded-lg border-2 border-brand-gray2 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] mb-8">
            Scan Invitation QR Code
          </button>
          <p className="py-5 font-bold mb-3 px-3 text-xl">
            Paste Invitation Code
          </p>

          <input className="border-2 border-black w-full mb-3 py-2 rounded-lg "></input>
          <button
            className="bg-gray-300 w-full p-2 rounded-lg border-2 border-brand-gray2 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
            onClick={validate}
          >
            Submit
          </button>

          {response ? (
            <Link href="/generate-id-page">
              <p className="bg-gray-100 p-2 mt-2">{response}</p>

              <button> Next Page</button>
            </Link>
          ) : null}
        </div>
        <Link href="/generate-id-page">
          <button> Go To Generate Id Page (Test)</button>
        </Link>
        <button onClick={() => setInvitation('10')}></button>
      </div>
      <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black"></div>
    </div>
  )
}
