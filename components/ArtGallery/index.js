import React, { useEffect, useState } from 'react'

import ArtGalleryComponent from './View'

export default function ArtGallery(props) {
  const [images, setImages] = useState(props.images)
  const [activeImage, setActiveImage] = useState(null)
  const [open, setOpen] = useState(false)

  const handleClick = (image) => {
    setActiveImage(image)
  }

  const updateFromLocalStorage = () => {
    const savedCanvas = JSON.parse(window.localStorage.getItem('savedCanva'))
    const found = images.some((element) => savedCanvas && element.uri === savedCanvas.uri)
    if (found) {
      window.localStorage.removeItem('savedCanva')
      console.log('image found')
    } else if (savedCanvas) {
      const updatedCanvas = [savedCanvas].concat(images)
      setImages(updatedCanvas)
      console.log('image not found')
    }
  }

  useEffect(() => {
    if (activeImage) {
      // open modal
      setOpen(true)
    }
    updateFromLocalStorage()
  }, [activeImage])

  const handleClose = () => {
    setOpen(false)
    setActiveImage(null)
  }

  return (
    <ArtGalleryComponent
      open={open}
      handleClose={handleClose}
      activeImage={activeImage}
      setActiveImage={setActiveImage}
      handleClick={handleClick}
      images={images}
    />
  )
}
