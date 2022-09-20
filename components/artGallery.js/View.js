import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { RiArrowUpCircleFill } from 'react-icons/ri'

import Modal from './Modal'
import BackTAZ from '../ArrowNavigators/BackTAZ'
import ArtBunny from '../svgElements/ArtBunny'
import Footer from '../Footer'

export default function ArtGalleryComponent({
  open,
  handleClose,
  activeImage,
  setActiveImage,
  handleClick,
  images,
  scrollTop
}) {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative overflow-hidden">
      {open && (
        <Modal onClose={handleClose} activeImage={activeImage} setActiveImage={setActiveImage} images={images} />
      )}
      <div className="flex flex-col items-center">
        <div className="z-10 mt-3 w-full py-3">
          <Link href="/experiences-page">
            <div className="flex max-w-[76px] max-h-[32px] bg-black ml-3 mt-1 mb-12 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
              <BackTAZ />
              <h1>TAZ</h1>
            </div>
          </Link>
          <div className="flex flex-col">
            <p className="px-3 text-xl font-bold">WELCOME TO THE DEVCON XI GALLERY</p>
            <p className="w-3/4 py-5 px-3 min-h-[100px] md:min-h-fit text-brand-info text-[#1E1E1E] opacity-70">
              Every canvas has 9 anonymous contributors. There are 5 active canvases at one time.
              {/* <Link href="/artBoard-page">
              <a className="underline">Click Here to start drawing</a>
            </Link> */}
            </p>
            <div className="flex justify-center bg-[#1E1E1E]">
              <p className="text-brand-beige text-[12px] w-full md:w-3/4 lg:w-3/4 px-10 py-2">
                Vote for your favorite! The winner will be announced at the end of the week.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap md:w-3/4 lg:w-3/4 mx-auto bg-white border border-brand-gray2">
            {images.map((image) => (
              <ImageCard key={image.id} url={image.uri} onClick={() => handleClick(image.uri)} />
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center bg-black mt-20 py-5 px-10">
          <Footer />
        </div>
      </div>
      {/* Put Fixed and Absolute Positioned items at the bottom */}
      <div className="fixed bottom-10 right-3 z-30 flex justify-end mr-4">
        <Link href="/artBoard-page">
          <button
            type="button"
            className="rounded-full bg-brand-yellow px-4 py-2 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          >
            Draw with others
          </button>
        </Link>
      </div>
      {showTopBtn && (
        <div className="fixed bottom-10 left-3 z-30 flex justify-end ml-4">
          <button onClick={goToTop}>
            <RiArrowUpCircleFill size={40} fill="#1E1E1E" />
          </button>
        </div>
      )}
      <div className="absolute overflow-hidden top-36 md:top-20 -right-6">
        <ArtBunny />
      </div>
    </div>
  )
}

const ImageCard = ({ url, onClick }) => (
  <picture
    onClick={onClick}
    className="w-1/2 md:w-1/4 border border-brand-gray2 bg-white hover:bg-red-700 cursor-pointer"
  >
    <img src={url} alt="" />
  </picture>
)

// For fixed sticky buttons

/* <div className="sticky top-[400px] z-30 flex justify-between mx-2">
        <button onClick={scrollTop}>
          <RiArrowUpCircleFill size={40} fill="#1E1E1E" />
        </button>
        <Link href="/artBoard-page">
          <button
            type="button"
            className="rounded-full bg-brand-yellow px-4 py-2 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          >
            Draw with others
          </button>
        </Link>
      </div> */
