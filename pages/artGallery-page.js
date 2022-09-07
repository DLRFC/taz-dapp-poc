// import dynamic from 'next/dynamic'
import ArtGallery from '../components/artGallery.js/index.js'
import { Subgraphs } from '../hooks/subgraphs.ts'
// const ArtBoard = dynamic(() => import('../components/artBoard'), {
//   ssr: false,
// })

export default function ArtGalleryPage(props) {
  return (
    <div>
      <ArtGallery images={props.images} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const subgraphs = new Subgraphs()
  const images = await subgraphs.getMintedTokens()

  return {
    props: { images },
  }
}
