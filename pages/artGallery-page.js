// import dynamic from 'next/dynamic'
import ArtGallery from '../components/artGallery.js/index.js'
import { Subgraphs } from '../hooks/subgraphs'
// const ArtBoard = dynamic(() => import('../components/artBoard'), {
//   ssr: false,
// })

export default function ArtGalleryPage({ images }) {
  return (
    <div>
      <ArtGallery images={images} />
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
  const subgraphs = new Subgraphs()
  const images = await subgraphs.getMintedTokens()

  return {
    props: { images }
  }
}
