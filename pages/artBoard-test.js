import dynamic from 'next/dynamic'
import React from 'react'
import axios from 'axios'
const ArtBoard = dynamic(() => import('../components/ArtBoard-test'), {
  ssr: false,
})

export default function ArtBoardPage() {
  return (
    <div>
      <ArtBoard />
    </div>
  )
}
