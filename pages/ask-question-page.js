import AskQuestion from '../components/AskQuestion'
// import { GenerateIdentity } from '../components/GenerateIdentity'
import { useIdentity } from '../components/IdentityProvider'
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
        <h1>Plese first Generate an Identity</h1>
      )}
    </div>
  )
}
