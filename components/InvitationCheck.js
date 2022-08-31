import { useState, useRef } from 'react'
import Header from './Header'
import axios from 'axios'
import Link from 'next/link'
import QrReader from 'react-qr-reader'
import { useRouter } from 'next/router'

import { useIdentityLogin } from './IdentityProvider'

// Page 1 it will check Invitation
export default function InvitationCheck() {
  const [selected, setSelected] = useState('environment')
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')
  const identityLogin = useIdentityLogin()
  const [invitation, setInvitation] = useState('test-code-15')
  const [response, setResponse] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const qrRef = useRef(null)

  const handleScan = async (scanData) => {
    setLoadingScan(true)
    try {
      console.log(`loaded data data`, scanData)
      if (scanData && scanData !== '') {
        console.log(`loaded >>>`, scanData)
        setData(scanData)
        setStartScan(false)
        setLoadingScan(false)
      }
    } catch {
      console.log('error')
    }
  }

  const handleSignUpButton = async () => {
    setIsSignUp(!isSignUp)
  }

  const validate = async () => {
    setIsLoading(true)

    const apiResponse = await axios.post('/api/validateInvitation', {
      invitation,
    })
    console.log('Is code valid and not used yet? ', apiResponse.data.isValid)

    // console.log(apiResponse.data.isValid)
    setResponse(apiResponse.data.isValid)

    if (apiResponse.data.isValid) {
      console.log(response)
      console.log('moving to generate Id Page')
      router.push(`/generate-id-page?invitation=${invitation}`)
    } else if (apiResponse.data.isValid === false) {
      setIsLoading(false)
      alert('Invalid Invitation code')
    }
  }

  const handleStartScan = () => {
    try {
      setStartScan(!startScan)
    } catch {
      console.log('error')
    }
  }

  const handleUploadQrCode = () => {
    qrRef.current.openImageDialog()
  }

  const handleError = (err) => {
    console.error(err)
  }

  const handleScanQrCode = (result) => {
    if (result) {
      console.log(result)
      console.log('Scanned!')
      // window.localStorage.setItem('identity', result)
      identityLogin(result)
      // Add if Identity is part of the Group
      router.push(`/ask-question-page`)
    }
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
      {!isSignUp ? (
        <div className="flex flex-col items-center overflow-hidden rounded-md px-3 text-brand-gray2">
          <div className="h-[586px] py-3 w-full px-4 z-10">
            <div>
              <p className="py-5 font-bold mb-3 px-3 text-xl">Get started?</p>
              <button
                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8"
                onClick={handleSignUpButton}
              >
                I`m new to TAZ
              </button>
              <button
                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8"
                onClick={handleUploadQrCode}
              >
                I`ve been here before
              </button>
              <QrReader
                className="border-0"
                ref={qrRef}
                delay={300}
                onError={handleError}
                onScan={handleScanQrCode}
                legacyMode
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center overflow-hidden rounded-md px-3 text-brand-gray2">
          <div className="h-[600px] py-3 w-full px-4 z-10">
            <p className="py-5 font-bold mb-3 px-3 text-xl">Get started?</p>
            {isLoading ? (
              <button className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-[180px]">
                Checking Invitation Code
              </button>
            ) : (
              <div>
                <button
                  className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8"
                  onClick={handleStartScan}
                >
                  {startScan ? 'Stop Scan' : 'Scan Invitation QR Code'}
                </button>

                {startScan ? (
                  <div className="flex items-center justify-center flex-col mb-10">
                    <select
                      className="mb-3"
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      <option value={'environment'}>Back Camera</option>
                      <option value={'user'}>Front Camera</option>
                    </select>
                    <QrReader
                      facingMode={selected}
                      delay={1000}
                      onError={handleError}
                      onScan={handleScan}
                      style={{ width: '300px' }}
                    />
                  </div>
                ) : (
                  <div>
                    <p className="py-5 font-bold mb-3 px-3 text-xl">
                      Paste Invitation Code
                    </p>
                    <input
                      className="border-2 border-black w-full mb-3 py-2 rounded-lg"
                      onChange={(e) => setInvitation(e.target.value)}
                    ></input>
                  </div>
                )}

                {data ? (
                  <div>
                    <p className="font-bold">QrCode Key is:</p>
                    <p>{data}</p>
                  </div>
                ) : null}
                <button
                  className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-[180px]"
                  onClick={validate}
                >
                  Submit
                </button>

                <button
                  className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-20"
                  onClick={handleSignUpButton}
                >
                  Back
                </button>
              </div>
            )}

            {/* {response ? (
              <div>
                <Link href="/generate-id-page">
                  <p className="bg-gray-100 p-2 mt-2">{response}</p>
                  <button> Next Page</button>
                </Link>
              </div>
            ) : null} */}
          </div>
        </div>
      )}

      <Link href={{ pathname: '/generate-id-page', query: { invitation } }}>
        <button className=" p-2 rounded-lg border-2 border-brand-gray2 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] mt-10">
          Go To Generate Id Page(Test)
        </button>
      </Link>
      <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black"></div>
    </div>
  )
}
