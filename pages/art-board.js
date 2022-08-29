import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Drawing = dynamic(() => import('../components/drawingComponent'), {
  ssr: false,
})

export default function artBoardPage() {
  const [selectedImage, setSelectedImage] = useState()

  const onImageClick = (e) => {
    console.log('clicked pic' + e.currentTarget.id)
    setSelectedImage(e.currentTarget.id)
    // add outline around selected image
  }

  // returns Drawing component if there is a selected image
  const showDrawing = () => {
    if (selectedImage) return <Drawing selectedImage={selectedImage} />
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div>
          <img
            id="0"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
        <div>
          <img
            id="1"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
        <div>
          <img
            id="2"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
        <div>
          <img
            id="3"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
        <div>
          <img
            id="4"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
        <div>
          <img
            id="5"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
        <div>
          <img
            id="6"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
        <div>
          <img
            id="7"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
        <div>
          <img
            id="8"
            onClick={onImageClick}
            src="https://c8.alamy.com/zooms/9/7fc3594664b3461f9aa7f5bb797c8202/r8ff1x.jpg"
          />
        </div>
      </div>
      <div>{showDrawing()}</div>
    </>
  )
}
