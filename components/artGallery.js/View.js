import Link from 'next/link'
import { RiArrowUpCircleFill } from 'react-icons/ri'

import Modal from './Modal'
import BackTAZ from '../ArrowNavigators/BackTAZ'
import ArtBunny from '../svgElements/ArtBunny'

export default function ArtGalleryComponent({
  open,
  handleClose,
  activeImage,
  setActiveImage,
  handleClick,
  images,
  scrollTop
}) {
  return (
    <div className="relative overflow-hidden">
      {open && (
        <Modal onClose={handleClose} activeImage={activeImage} setActiveImage={setActiveImage} images={images} />
      )}
      <div className="sticky top-[400px] z-30 flex justify-between mx-2">
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
      </div>
      <div className="flex flex-col items-center">
        <div className="z-10 mt-3 w-full py-3">
          <Link href="/experiences-page">
            <div className="flex max-w-[76px] max-h-[32px] bg-black ml-3 mt-1 mb-12 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
              <BackTAZ />
              <h1>TAZ</h1>
            </div>
          </Link>
          <div className="flex flex-col items-center md:w-3/4 lg:w-3/4">
            <p className="px-3 text-xl font-bold">WELCOME TO THE DEVCON XI GALLERY</p>
            <p className="py-5 px-3 mr-16 text-brand-info text-[#1E1E1E] opacity-70 leading-[21px]">
              Every canvas has 9 anonymous contributors. There are 5 active canvases at one time.
              {/* <Link href="/artBoard-page">
              <a className="underline">Click Here to start drawing</a>
            </Link> */}
            </p>
          </div>
          <div className="flex justify-center bg-[#1E1E1E] mb-10">
            <p className="text-brand-beige text-[12px] w-full md:w-3/4 lg:w-3/4 px-10 py-2">
              Vote for your favorite! The winner will be announced at the end of the week.
            </p>
          </div>
        </div>
        <div className="flex md:w-3/4 lg:w-3/4">
          {images.map((image) => (
            <ImageCard key={image.id} url={image.uri} onClick={() => handleClick(image.uri)} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mb-20">
        {/* <Link href="/artBoard-page">
          <div>
            <Button text="Start CoDrawing" />
          </div>
        </Link> */}
      </div>
      <div className="absolute overflow-hidden top-[184px] left-[284px]">
        <ArtBunny />
      </div>
    </div>
  )
}

const ImageCard = ({ url, onClick }) => (
  <picture onClick={onClick} className="w-2/4 md:w-1/4 m-4 border border-brand-gray2 hover:bg-red-700 cursor-pointer">
    <img src={url} alt="" />
  </picture>
)
