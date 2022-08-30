import AskQuestion from '../components/AskQuestion'
// import { GenerateIdentity } from '../components/GenerateIdentity'
import { useIdentity } from '../components/IdentityProvider'
import Link from 'next/link'
// import { useRouter } from 'next/router'

export default function AskQuestionPage() {
  const identityKey = useIdentity()
  console.log('Identity Found')
  console.log(identityKey)
  // const router = useRouter()
  // const { invitation } = router.query

  return (
    <div>
      {identityKey ? (
        <AskQuestion />
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
