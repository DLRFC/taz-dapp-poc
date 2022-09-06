// import React, { useEffect, useState } from 'react'
import { images } from './data'
import Button from '../Button'
import Modal from './Modal'
import Link from 'next/link'

export default function ArtGalleryComponent({
  open,
  handleClose,
  activeImage,
  setActiveImage,
  handleClick,
}) {
  return (
    <div>
      {open && (
        <Modal
          onClose={handleClose}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
      )}
      <div className="flex flex-col items-center rounded-md px-3">
        <div className="z-10 mt-3 w-full py-3 px-4">
          <p className="px-3 text-xl font-bold">Welcome to the TAZ Gallery!</p>
          <p className="mb-3 py-5 px-3 text-sm text-[#513E2E]">
            Checkout the Arts done by anonymous collaborators!{' '}
            <Link href="/artBoard-page">
              <a className="underline">Click Here to start drawing</a>
            </Link>
          </p>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-center py-10 rounded-xl">
        {images.map((url, idx) => (
          <ImageCard key={idx} url={url} onClick={() => handleClick(url)} />
        ))}
      </div>
      <div className="flex items-center justify-center mb-20">
        <Link href="/artBoard-page">
          <div>
            <Button text={`Start CoDrawing`} />
          </div>
        </Link>
      </div>
    </div>
  )
}

const ImageCard = ({ url, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mr-[10px] mb-[10px] relative border-none hover:bg-red-700 cursor-pointer h-[150px] w-[120px] sm:h-[250px] sm:w-[200px] "
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        borderRadius: '5px',
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 h-[100%] w-[100%] opacity-0 bg-black "></div>
    </button>
  )
}
