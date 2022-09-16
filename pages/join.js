import { useRouter } from 'next/router'
import { GenerateIdentity } from '../components/GenerateIdentity'

export default function JoinPage() {
  const router = useRouter()
  const { code } = router.query

  return (
    <div>
      <GenerateIdentity invitation={code} />
    </div>
  )
}
