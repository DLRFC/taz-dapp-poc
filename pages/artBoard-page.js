
import dynamic from "next/dynamic";
const ArtBoard = dynamic(() => import('../components/artBoard'), {
  ssr: false,
})

export default function ArtBoardPage() {
  return (
    <div>
      <ArtBoard/>
    </div>
  )
}