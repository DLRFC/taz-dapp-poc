import dynamic from 'next/dynamic'
import React from 'react'
import Footer from '../components/Footer'

const ArtBoard = dynamic(() => import('../components/ArtBoard/index'), {
  ssr: false
})

export default function ArtBoardPage() {
  return (
    <div className="relative min-h-[920px]">
      <ArtBoard />
      <div className="z-10 absolute bottom-0 w-full flex items-center flex-col bg-black mt-20 py-5">
        <Footer />
      </div>
    </div>
  )
}
