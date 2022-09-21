import React from 'react'
import ArtBunnyBooth from '../svgElements/ArtBunnyBooth'

const TazBoothFooter = () => (
  <div className="flex w-2/4 items-center bg-brand-black text-brand-beige">
    <div className="pr-12 scale-x-flip">
      <ArtBunnyBooth className="h-40 w-40 fill-current stroke-current text-brand-beige animate-bounce" />
    </div>
    <div className="text-brand-beige px-20">
      <h1>To participate, grab an invite!</h1>
      <p>Generate a Semaphore identity to anonymously draw and vote for your favorite canvas</p>
    </div>
  </div>
)

export default TazBoothFooter
