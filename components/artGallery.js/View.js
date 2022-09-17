import Link from 'next/link'

import Modal from './Modal'
import BackTAZ from '../ArrowNavigators/BackTAZ'

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
    <div>
      {open && (
        <Modal onClose={handleClose} activeImage={activeImage} setActiveImage={setActiveImage} images={images} />
      )}
      <div className="sticky top-[400px] z-30 flex justify-between mx-2 min-w-[200px]">
        <button onClick={scrollTop}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#1E1E1E" />
            <path
              d="M16.6607 13.219V21.3337H15.3387V13.219L11.7931 16.795L10.8584 15.8523L15.9997 10.667L21.1409 15.8523L20.2063 16.795L16.6607 13.219Z"
              fill="#EFAD5F"
            />
          </svg>
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
      <div className="flex flex-col items-center rounded-md px-3 mb-[0px]">
        <div className="z-10 mt-3 w-full py-3 px-4">
          <Link href="/experiences-page">
            <div className="flex max-w-[76px] max-h-[32px] bg-black ml-3 mt-1 mb-12 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
              <BackTAZ />
              <h1>TAZ</h1>
            </div>
          </Link>
          <p className="px-3 text-xl font-bold">WELCOME TO THE DEVCON XI GALLERY</p>
          <p className="mb-3 py-5 px-3 text-brand-info text-[#1E1E1E] opacity-70 leading-[21px]">
            Every canvas has 9 anonymous contributors. There are 5 active canvases at one time.
            {/* <Link href="/artBoard-page">
              <a className="underline">Click Here to start drawing</a>
            </Link> */}
          </p>
          <div className="absolute left-0 bg-[#1E1E1E] mb-10">
            <p className="text-brand-beige text-[12px] w-full px-10 py-2">
              Vote for your favorite! The winner will be announced at the end of the week.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 justify-center py-10 rounded-xl">
        {images.map((image) => (
          <ImageCard key={image.id} url={image.uri} onClick={() => handleClick(image.uri)} />
        ))}
      </div>
      <div className="flex items-center justify-center mb-20">
        {/* <Link href="/artBoard-page">
          <div>
            <Button text="Start CoDrawing" />
          </div>
        </Link> */}
      </div>
    </div>
  )
}

const ImageCard = ({ url, onClick }) => (
  <div className="h-[200px] w-full border-brand-gray2 border-[1px]">
    <button
      onClick={onClick}
      className="relative border-none hover:bg-red-700 cursor-pointer h-full w-full sm:h-[250px] sm:w-[250px] border-black border-2"
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        borderRadius: '5px'
      }}
    >
      {/* <div className="absolute top-2 left-0 right-0 bottom-0 h-[100%] w-[100%] opacity-0 bg-black " /> */}
    </button>
  </div>
)
