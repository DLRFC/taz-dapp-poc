import AskQuestion from '../components/AskQuestion'
import { GenerateIdentity } from '../components/GenerateIdentity'
import { useIdentity } from '../components/IdentityProvider'

export default function AskQuestionPage() {
  const identityKey = useIdentity()
  console.log(identityKey)
  return <div>{identityKey ? <AskQuestion /> : <GenerateIdentity />}</div>
}
