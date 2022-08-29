import dynamic from 'next/dynamic'

const InvitationCheck = dynamic(() => import('../components/InvitationCheck'), {
  ssr: false,
})

export default function InvitationCheckPage() {
  return (
    <div>
      <InvitationCheck />
    </div>
  )
}
