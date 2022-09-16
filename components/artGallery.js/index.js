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
    console.log('image', props.images)
  }, [activeImage])

  const handleClose = () => {
    setOpen(false)
    setActiveImage(null)
  }

  // const scrollToTop = () => {
  //   window.scrollTo(0, 0)
  // }

  const scrollTop = () => {
    window.scrollTo(0, 0)
  }
  return (
    <ArtGalleryComponent
      open={open}
      handleClose={handleClose}
      activeImage={activeImage}
      setActiveImage={setActiveImage}
      handleClick={handleClick}
      images={images}
      scrollTop={scrollTop}
    />
  )
}
