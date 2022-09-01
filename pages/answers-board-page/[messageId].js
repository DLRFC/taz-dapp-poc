import AnswerBoard from '../../components/answersBoard'
import { useRouter } from 'next/router'

export default function AnswersBoardPage() {

  const router = useRouter()
  const { messageId } = router.query

  return (
    <div>
      <AnswerBoard messageId={messageId} />
    </div>
  )
}
