import React, { useEffect, useState } from 'react'

import ArtGalleryComponent from './View'

export default function ArtGallery(props) {
  const [images, setImages] = useState(props.images)
  const [activeImage, setActiveImage] = useState(null)
  const [open, setOpen] = useState(false)
  const handleClick = (url) => {
    setActiveImage(url)
  }

  useEffect(() => {
    if (activeImage) {
      // open modal
      setOpen(true)
    }
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
