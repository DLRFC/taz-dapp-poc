import { useRouter } from 'next/router'

import AnswerBoard from '../../components/AnswersBoard'

export default function AnswersBoardPage() {
  const router = useRouter()
  const { messageId } = router.query

  return (
    <div>
      <AnswerBoard messageId={messageId} />
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
  return {
    props: {}
  }
}
