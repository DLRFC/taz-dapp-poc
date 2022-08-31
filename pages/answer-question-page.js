import AnswerQuestion from '../components/AnswerQuestion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AnswerQuestionPage() {
  const [localIdentity, setLocalIdentity] = useState()

  useEffect(() => {
    // setter
    let identityKey = ''
    console.log(window)
    console.log(window.localStorage)
    if (identityKey === '') {
      identityKey = window.localStorage.getItem('identity')
    }
    setLocalIdentity(identityKey)
    console.log(identityKey)
  })

  return (
    <div>
      {localIdentity ? (
        <AnswerQuestion />
      ) : (
        <>
          <h1 className="flex items-center justify-center p-10 text-2xl">
            First Generate an Identity
          </h1>
          <Link href="/">
            <button className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8 px-10">
              Go to Home
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
