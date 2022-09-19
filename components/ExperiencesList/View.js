import { useState } from 'react'
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'

import Link from 'next/link'

// import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import DropDownArrow from '../ArrowNavigators/DropDownArrow'
import RedCircle from '../svgElements/RedCircle'
import YellowCircle from '../svgElements/YellowCircle'
import ShadowBunny from '../svgElements/ShadowBunny'
import BlueEllipse from '../svgElements/BlueEllipse'

function Icon({ id, open }) {
  return (
    <DropDownArrow className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}></DropDownArrow>
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   stroke="currentColor"
    //   strokeWidth={2}
    // >
    //   <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    // </svg>
  )
}

const ExperiencesListComponent = ({ clearIdentity }) => {
  const [open, setOpen] = useState(0)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <div>
      <div className="grid">
        <div className="col-start-1 row-start-1 fixed">
          <div className="absolute top-[130px] -left-[51px]">
            <RedCircle />
          </div>
          <div className="absolute top-[305px] left-[279px]">
            <YellowCircle />
          </div>
          <div className="absolute top-[590px] -left-[10px]">
            <BlueEllipse />
          </div>
          <div className="absolute top-[330px] left-[175px]">
            <ShadowBunny />
          </div>
        </div>

        <div className="col-start-1 row-start-1 px-6 py-8 font-sans text-brand-brown">
          <div>
            <h1 className="relative inline-block bg-black ml-3 mb-12 px-1 text-xl text-brand-beige2">TAZ</h1>
          </div>
          <div>
            <h2 className="relative inline-block bg-black ml-3 mb-2 px-1 text-4xl text-brand-beige2">BE ANONYMOUS</h2>
          </div>
          <div>
            <h2 className="relative inline-block bg-black ml-3 mb-12 px-1 text-4xl text-brand-beige2"> BE YOURSELF</h2>
          </div>

          <div className="relative flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-blue shadow-xl bg-white mb-8">
            <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-beige2 p-3">
              <div>📂</div>
              <div className="text-brand-blue text-15px">Use your Semaphore ID here </div>
              <div></div>
            </div>
            <Link href="questions">
              <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
                <div className="w-[90%]">
                  <p className="py-2 text-brand-h3 font-bold">Q&A</p>
                  <p className="text-brand-info opacity-[70%]">Anonymously ask & answer questions</p>
                </div>
                <SelectorArrow />
              </div>
            </Link>
            <Link href="artGallery-page">
              <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
                <div className="w-[90%]">
                  <p className="py-2 text-brand-h3 font-bold">Devcon VI Gallery</p>
                  <p className="text-brand-info opacity-[70%]">Create on collaborative canvases</p>
                </div>
                <SelectorArrow />
              </div>
            </Link>
          </div>

          <div className=" relative flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-blue shadow-xl bg-white mb-16">
            <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-beige2 p-3">
              <div>🌍</div>
              <div className="text-15px text-brand-blue">Take your ID with you </div>
              <div></div>
            </div>
            <Link href="">
              <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
                <div className="w-[90%]">
                  <p className="py-2 text-brand-h3 font-bold">Zkitter</p>
                  <p className="text-brand-info opacity-[70%]">Social media but make it anon</p>
                </div>
                <SelectorArrow />
              </div>
            </Link>
          </div>

          <div className=" relative flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-blue shadow-xl bg-white mt-20 mb-20">
            <div className="flex w-full justify-between border-b-2 border-brand-blue bg-black text-15px text-brand-beige p-3">
              <div>🧑‍🏫</div>
              <div>FAQ</div>
              <div></div>
            </div>

            <div className="flex w-full border-b-2 border-brand-blue py-3 pl-2 pr-4 cursor-pointer">
              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader
                  class="flex justify-between items-center w-full py-3 text-brand-brown font-sans text-brand-h3 leading-snug"
                  onClick={() => handleOpen(1)}
                >
                  What is a Semaphore ID?
                </AccordionHeader>
                <AccordionBody class="block w-full py-3 text-brand-brown font-sans text-brand-info opacity-[70%] leading-normal">
                  Semaphore IDs contain 3 parts: Trapdoor and Nullifier to avoid fraud and Commitment to interact
                  publicly.
                </AccordionBody>
              </Accordion>
            </div>
            <div className="flex w-full border-b-2 border-brand-blue py-3 pl-2 pr-4 cursor-pointer">
              <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader
                  class="flex justify-between items-center w-full py-3 text-brand-brown font-sans text-brand-h3 leading-snug select-none transition-none"
                  onClick={() => handleOpen(2)}
                >
                  How am I anonymous?
                </AccordionHeader>
                <AccordionBody class="block w-full py-3 text-brand-brown font-sans text-brand-info opacity-[70%] leading-normal">
                  Semaphore IDs contain 3 parts: Trapdoor and Nullifier to avoid fraud and Commitment to interact
                  publicly.
                </AccordionBody>
              </Accordion>
            </div>
            <div className="flex w-full border-b-2 border-brand-blue py-3 pl-2 pr-4 cursor-pointer">
              <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader
                  class="flex justify-between items-center w-full py-3 text-brand-brown font-sans text-brand-h3 leading-snug select-none transition-none"
                  onClick={() => handleOpen(3)}
                >
                  Why does it take a long time to post?
                </AccordionHeader>
                <AccordionBody class="block w-full py-3 text-brand-brown font-sans text-brand-info opacity-[70%] leading-normal">
                  Semaphore IDs contain 3 parts: Trapdoor and Nullifier to avoid fraud and Commitment to interact
                  publicly.
                </AccordionBody>
              </Accordion>
            </div>
            <div className="flex w-full border-b-2 border-brand-blue py-3 pl-2 pr-4 cursor-pointer">
              <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                <AccordionHeader
                  class="flex justify-between items-center w-full py-3 text-brand-brown font-sans text-brand-h3 leading-snug select-none transition-none"
                  onClick={() => handleOpen(4)}
                >
                  Why are you using a centralized backend?
                </AccordionHeader>
                <AccordionBody class="block w-full py-3 text-brand-brown font-sans text-brand-info opacity-[70%] leading-normal">
                  Semaphore IDs contain 3 parts: Trapdoor and Nullifier to avoid fraud and Commitment to interact
                  publicly.
                </AccordionBody>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-left flex-col p-12 bg-black text-brand-yellow mt-12">
        <div className="py-10 px-5 flex items-end justify-between bg-black">
          <div className="transform -ml-6 text-xl tracking-widest text-brand-beige">
            <h1>TEMP_RARY</h1>
            <h1 className="bg-brand-beige px-1 text-brand-black">AN_NYMOUS</h1>
            <h1>Z_NE</h1>
          </div>
        </div>

        <a
          href="https://pse-team.notion.site/About-the-TAZ-app-1ae2793046414468b56472f43725961e"
          target="_blank"
          className="pb-10 underline"
          rel="noreferrer"
        >
          About this app
        </a>
        <a href="http://semaphore.appliedzkp.org/" target="_blank" className="pb-10 underline" rel="noreferrer">
          About Semaphore
        </a>
        <a href="esp.ethereum.foundation/semaphore-grants" target="_blank" className="pb-10 underline">
          Semaphore Grants Round
        </a>
        <a href="https://appliedzkp.org/" target="_blank" className="pb-14 underline" rel="noreferrer">
          Privacy & Scaling Explorations
        </a>
        <div>
          <button className="bg-brand-yellow text-black py-2 px-4 rounded-full " onClick={clearIdentity}>
            Disconnect ID
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExperiencesListComponent
