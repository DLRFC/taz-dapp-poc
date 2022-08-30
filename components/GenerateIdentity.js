import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { Identity } from '@semaphore-protocol/identity'
import Header from './Header'
import QRCode from 'qrcode'
import { useIdentityLogin } from './IdentityProvider'

// Page 3 will Generate Identity and Join Group
export const GenerateIdentity = (props) => {
  const { invitation } = props;

  const identityLogin = useIdentityLogin()
  const [imageUrl, setImageUrl] = useState('')
  const handleJoinButton = async () => {
    const identity = new Identity('secret-message2')
    const identityCommitment = identity.generateCommitment().toString()
    const identityKey = identity.toString()
    identityLogin(identityKey)
    console.log(identityCommitment)

    const response = await axios.post('./api/addMember', { identityCommitment, invitation })

    try {
      const responseQR = await QRCode.toDataURL(identityKey)
      setImageUrl(responseQR)
    } catch (error) {
      console.log(error)
    }

    console.log(response.data)
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
      <div className="flex flex-col items-center rounded-md px-3">
        <div className="z-10 mt-3 h-[586px] w-full py-3 px-4">
          <p className="px-3 font-bold text-xl text-brand-gray2">
            To use the app you will need to join the Devcon VI group
          </p>
          <p className="mb-3 py-5 px-3 text-[#513E2E] text-sm">
            This is a Semaphore group...
          </p>

          {imageUrl ? (
            <a
              href={imageUrl}
              download="semaphore.jpg"
              className="flex items-center justify-center flex-col"
            >
              <img src={imageUrl} alt="img" className="mb-7 " />
              <p className="text-xl font-bold mb-12"> Click Here to Download</p>
              <Link href="/ask-question-page">
                <button className="p-3 text-2xl font-bold bg-brand-beige2 border-brand-gray2 border-2 rounded-xl">
                  Go to Ask Question Page(Test)
                </button>
              </Link>
            </a>
          ) : (
            <button
              className="mb-9 w-full rounded-lg border-2 border-brand-gray2 bg-brand-beige2 p-2 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
              onClick={handleJoinButton}
            >
              Join
            </button>
          )}
        </div>
      </div>

      <Link href="/ask-question-page">Go to Ask Question Page</Link>
      <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black"></div>
    </div>
  )
}
