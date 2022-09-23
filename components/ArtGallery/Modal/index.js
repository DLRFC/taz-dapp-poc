import React from 'react'
// import { images } from '../data'

export default function Modal({ images, onClose, activeImage, setActiveImage }) {
  // const handleClick = () => {
  //   onClose && onClose()
  // }
  // const handleControlTabClick = (e, url, id) => {
  //   e.stopPropagation()
  //   setActiveImage({url, id})
  // }
  // Special thanks to fireship.io for this beautiful code snippet to animate modal drop in.

  return (
    // <div onClick={handleClick} className={styles.backdrop}>
    <div
      onClick={onClose}
      className="absolute left-0 top-0 bottom-0 right-0 minh-[100vh] w-[100%] overflow-scroll bg-[#00000070] flex flex-col items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pt-20 w-[50%] min-h-[30%] flex flex-col justify-center items-center"
      >
        <div className="flex flex-col items-start p-0 gap-[2px] h-[489px] w-[338px] bg-[#EAE1DA] border-2 border-solid border-[#435C6C] rounded-md shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-[100]">
          <div className="h-[53px] w-[334px] bg-white rounded-t-md flex flex-col p-8 items-center">
            <p className="text-[14px] leading-[150%] font-bold text-black w-[163px] h-[21px] text-center">
              Canvas ID {activeImage.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="border-none h-[334px] w-[334px]"
            style={{
              backgroundImage: `url(${activeImage.url})`,
              backgroundSize: 'cover'
            }}
          ></button>
          <div className="h-[96px] w-[334px] bg-white rounded-b-md flex flex-col items-center pt-[8px] pl-[16px] pb-[16px] gap-[8px]">
            <button className="bg-[#1E1E1E] rounded-[32px] text-[#EAE1DA] text-[14px] leading-[150%] py-[6px] px-[16px] flex flex-row justify-center items-center gap-[16px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="#EAE1DA">
                <path d="M12.4483 1.17132C13.9435 2.68332 13.995 5.09132 12.6043 6.66199L6.999 12.3233L1.39503 6.66199C0.00428891 5.09132 0.0565082 2.67932 1.55103 1.17132C3.0482 -0.338013 5.443 -0.38868 7.00032 1.01932C8.55301 -0.38668 10.9524 -0.340013 12.4483 1.17132ZM2.48635 2.11465C1.50146 3.10799 1.45188 4.69799 2.35944 5.74865L6.99966 10.436L11.6399 5.74932C12.5481 4.69799 12.4985 3.10999 11.5123 2.11332C10.5294 1.11999 8.94697 1.07199 7.90788 1.98932L5.13035 4.79132L4.19503 3.84865L6.06236 1.96399L6.00816 1.91799C4.96708 1.07465 3.44546 1.14665 2.48635 2.11465Z"></path>
              </svg>
              Vote Favorite!
            </button>
            <a onClick={onClose} className='text-["1E1E1E] underline font-[14px] leading-[21px] w-[51px] h-[21px] font-bold'>cancel</a>
          </div>
        </div>
      </div>
      {/* <div className="mt-20 z-20  w-[100%] h-[70px] overflow-x-auto flex justify-center">
        {images.map((image) => (
          <button
            style={{
              backgroundImage: `url(${image.uri})`,
              backgroundSize: 'cover',
              border: `1px solid ${activeImage.url === image.uri ? '#06b6d4' : 'transparent'}`
            }}
            className="h-[50px] w-[50px] cursor-pointer mx-1"
            key={image.id}
            onClick={(e) => handleControlTabClick(e, image.uri, image.id)}
          ></button>
        ))}
      </div> */}
    </div>
  )
}
