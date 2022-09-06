import dynamic from 'next/dynamic'
import React from 'react'
import axios from 'axios'
const ArtBoard = dynamic(() => import('../components/artBoard'), {
  ssr: false,
})

export async function getServerSideProps(context) {
  let tiles, canvasId, selectedTile
  try {
    const result = await axios.get('/api/modifyCanvas')
    console.log('result:')
    console.log(result)

    tiles = result.data.canvas.tiles
    canvasId = result.data.canvas.canvasId

    // select random tile
    const remainingIndices = []

    tiles.map((img, i) => {
      if (img === '') {
        remainingIndices.push(i)
      }
    })

    selectedTile =
      remainingIndices[
        Math.floor(Math.random() * (remainingIndices.length - 1))
      ] || 0
  } catch (err) {
    console.log("Error with axios.get('api/modifyCanvas')", err)
  }
  return {
    props: {
      tiles,
      canvasId,
      selectedTile,
    },
  }
}

export default function ArtBoardPage({ tiles, canvasId, selectedTile }) {
  return (
    <div>
      <ArtBoard tiles={tiles} canvasId={canvasId} selectedTile={selectedTile} />
    </div>
  )
}
