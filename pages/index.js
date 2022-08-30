import dynamic from 'next/dynamic'

const InvitationCheck = dynamic(() => import('../components/InvitationCheck'), {
  ssr: false,
})

export default function Home() {
  return (
    <div>
      <InvitationCheck />
    </div>
  )
}
