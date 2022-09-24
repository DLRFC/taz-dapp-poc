import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import { RiArrowUpCircleFill } from 'react-icons/ri'

import Modal from './Modal'
import BackToTopArrow from '../svgElements/BackToTopArrow'
import ArtBunny from '../svgElements/ArtBunny'
import Footer from '../Footer'
import Loading from '../Loading'
import BackLink from '../Buttons/BackLink'

export default function ArtGalleryComponent({ open, handleClose, activeImage, setActiveImage, handleClick, images }) {
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
    <div className="h-screen overflow-hidden">
      {open && (
        <Modal onClose={handleClose} activeImage={activeImage} setActiveImage={setActiveImage} images={images} />
      )}
      <div className="flex flex-col w-full px-8 mb-6">
        <div className="mt-16 mb-10">
          <BackLink hre="/experiences-page" />
        </div>
        <p className="mb-3 text-2xl font-extrabold">
          WELCOME TO THE DEVCON <span className="font-extrabold">XI GALLERY</span>
        </p>
        <p className="w-3/4 py-2min-h-[80px] md:min-h-fit text-brand-info text-[#1E1E1E]">
          Every canvas has 9 anonymous contributors. There are 5 active canvases at one time.
        </p>
      </div>
      <div className="relative bg-black">
        <div className="absolute bottom-8 -right-6">
          <ArtBunny />
        </div>
        <p className="relative overflow-hidden text-brand-beige text-opacity-100 text-xs w-full px-8 py-2 leading-relaxed">
          Vote for your favorite! The winner will be announced at the end of the week.
        </p>
      </div>

      {/* Image Galary */}
      <div className="flex-row-reverse flex-wrap h-full mx-auto bg-white border-collapse">
        {!images ? (
          <Loading size="xl" />
        ) : (
          images.map((image) => (
            <ImageCard
              key={image.id}
              url={image.canvaUri ? image.canvaUri : image.uri}
              onClick={() => handleClick(image.uri)}
            />
          ))
        )}

        {/* Put Fixed and Absolute Positioned items at the bottom */}
        <div className="fixed bottom-[180px] right-2 z-30 flex justify-end">
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
          <div className="fixed bottom-[180px] left-2 z-30 flex justify-end">
            <button onClick={goToTop}>
              <BackToTopArrow size={40} fill="#1E1E1E" />
            </button>
          </div>
        )}
      </div>

      <div className="flex w-full z-20 sticky bottom-0 justify-center bg-black py-5">
        <Footer />
      </div>
    </div>
  )
}

const ImageCard = ({ url, onClick }) => (
  <picture
    onClick={onClick}
    className="w-1/2 md:w-1/4 h-auto border border-brand-gray2 bg-white hover:bg-red-700 cursor-pointer"
  >
    <img src={url} alt="" />
  </picture>
)
