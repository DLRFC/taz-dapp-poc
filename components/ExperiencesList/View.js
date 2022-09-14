import Link from 'next/link'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import DropDownArrow from '../ArrowNavigators/DropDownArrow'

const ExperiencesListComponent = ({ clearIdentity }) => {
  return (
    <div>
      <div className="px-6 py-8 font-sans text-brand-brown">
        <svg
          className="absolute -left-2 top-[330px] -z-1"
          width="69"
          height="100"
          viewBox="0 0 69 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
        </svg>
        <svg
          className="absolute right-[0px] top-[520px]"
          width="121"
          height="160"
          viewBox="0 0 121 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
          <path
            transform="translate(-9, 0)"
            d="M5.86415 0.843262L7.73372 2.72888L3.99457 6.50008L7.73372 10.2714L5.86415 12.157L0.255371 6.50008L5.86415 0.843262Z"
            fill="#475F6F"
          />
        </svg>

        <div>
          <h1 className="inline-block bg-black ml-1 mt-1 mb-12 px-1 text-xl text-brand-beige2">TAZ</h1>
        </div>
        <div>
          <h2 className="inline-block bg-black ml-1 mb-2 px-1 text-4xl text-brand-beige2">BEING ANONYMOUS</h2>
        </div>
        <div>
          <h2 className="inline-block bg-black ml-1 mb-2 px-1 text-4xl text-brand-beige2">LETS US BE</h2>
        </div>
        <div>
          <h2 className="inline-block bg-black ml-1 mb-16 px-1 text-4xl text-brand-beige2">OURSELVES</h2>
        </div>

        <div className="relative flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-blue shadow-xl bg-white mb-8">
          <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-beige2 p-3">
            <div>📂</div>
            <div className="text-brand-blue">Use your Semaphore ID here </div>
            <div></div>
          </div>
          <Link href="questions">
            <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
              <div className="w-[90%]">
                <p className="py-2 font-bold">Q&A</p>
                <p className="opacity-[70%]">Anonymously ask & answer questions</p>
              </div>
              <SelectorArrow />
            </div>
          </Link>
          <Link href="artGallery-page">
            <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
              <div className="w-[90%]">
                <p className="py-2 font-bold">Gallery</p>
                <p className="opacity-[70%]">Create on collaborative canvases</p>
              </div>
              <SelectorArrow />
            </div>
          </Link>
        </div>

        <div className=" relative flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-blue shadow-xl bg-white mb-16">
          <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-beige2 p-3">
            <div>🌍</div>
            <div className="text-brand-blue">Take your ID with you </div>
            <div></div>
          </div>
          <Link href="">
            <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
              <div className="w-[90%]">
                <p className="py-2 font-bold">Zkitter</p>
                <p className="opacity-[70%]">Social media but make it anon</p>
              </div>
              <SelectorArrow />
            </div>
          </Link>
        </div>

        <div className=" relative flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-blue shadow-xl bg-white mb-16">
          <div className="flex w-full justify-between border-b-2 border-brand-blue bg-black text-brand-beige p-3">
            <div>🧑‍🏫</div>
            <div>FAQ</div>
            <div></div>
          </div>

          <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
            <div className="w-[90%]">
              <p className="py-2 font-brand-sm">What is a Semaphore ID?</p>
            </div>
            <DropDownArrow />
          </div>
          <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
            <div className="w-[90%]">
              <p className="py-2 font-brand-sm">What is a Semaphore ID?</p>
            </div>
            <DropDownArrow />
          </div>
          <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
            <div className="w-[90%]">
              <p className="py-2 font-brand-sm">What is a Semaphore ID?</p>
            </div>
            <DropDownArrow />
          </div>
          <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-2 cursor-pointer">
            <div className="w-[90%]">
              <p className="py-2 font-brand-sm">What is a Semaphore ID?</p>
            </div>
            <DropDownArrow />
          </div>
        </div>
      </div>

      <div className="flex items-left flex-col p-12 bg-black text-brand-yellow">
        <div className="py-10 px-5 flex items-end justify-between bg-black">
          <div className="transform -ml-6 text-xl tracking-wide text-brand-beige">
            <h1>TEMP_RARY</h1>
            <h1 className="bg-brand-beige px-1 text-brand-black">AN_NYMOUS</h1>
            <h1>Z_NE</h1>
          </div>
        </div>

        <a href="" className="pb-10 underline">
          About this app
        </a>
        <a href="" className="pb-10 underline">
          Build with Semaphore
        </a>
        <a href="" className="pb-10 underline">
          Privacy & Scaling Explorations
        </a>
        <div>
          <button className="bg-brand-yellow text-black py-2 px-4 rounded-full " onClick={clearIdentity}>
            Disconnect ID
          </button>
        </div>
        <p className="text-center text-brand-beige text-brand-2xs mt-12">
          &#8220;The password is 🤝🏽🔭🧑🏽‍🚀✨🤌🏽&#8221;&nbsp;&ndash;&nbsp;
          <Link href="">
            <a className="underline mt-3">@PrivacyScaling</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ExperiencesListComponent
