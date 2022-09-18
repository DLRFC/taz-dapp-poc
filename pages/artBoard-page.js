import dynamic from 'next/dynamic'
import React from 'react'

const ArtBoard = dynamic(() => import('../components/ArtBoard/index'), {
  ssr: false
})

export default function ArtBoardPage() {
  return (
    <div>
      <ArtBoard />
    </div>
  )
}
