import Link from 'next/link'
import SelectorArrow from '../ArrowNavigators/SelectorArrow'
import DropDownArrow from '../ArrowNavigators/DropDownArrow'
import RedCircle from '../svgElements/RedCircle'
import YellowCircle from '../svgElements/YellowCircle'
import ShadowBunny from '../svgElements/ShadowBunny'
import BlueEllipse from '../svgElements/BlueEllipse'

const ExperiencesListComponent = ({ clearIdentity }) => {
  return (
    <div>
      <div className="grid">
        <div className="col-start-1 row-start-1 fixed">
          <div className="absolute top-[130px] -left-[51px]">
            <RedCircle />
          </div>
          <div className="absolute top-[295px] left-[279px]">
            <YellowCircle />
          </div>
          <div className="absolute top-[590px] -left-[10px]">
            <BlueEllipse />
          </div>
          <div className="absolute top-[320px] left-[175px]">
            <ShadowBunny />
          </div>
        </div>

        <div className="col-start-1 row-start-1 px-6 py-8 font-sans text-brand-brown">
          <div>
            <h1 className="relative inline-block bg-black ml-1 mb-12 px-1 text-brand-h2 text-brand-beige2">TAZ</h1>
          </div>
          <div>
            <h2 className="relative inline-block bg-black ml-1 mb-2 px-1 text-4xl text-brand-beige2">
              BEING ANONYMOUS
            </h2>
          </div>
          <div>
            <h2 className="relative inline-block bg-black ml-1 mb-2 px-1 text-4xl text-brand-beige2">LETS US BE</h2>
          </div>
          <div>
            <h2 className="relative inline-block bg-black ml-1 mb-16 px-1 text-4xl text-brand-beige2">OURSELVES</h2>
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

          <div className=" relative flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-blue shadow-xl bg-white mt-20 mb-20">
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
          className="pb-10 underline"
        >
          About this app
        </a>
        <a href="http://semaphore.appliedzkp.org/" className="pb-10 underline">
          About Semaphore
        </a>
        <a href="esp.ethereum.foundation/semaphore-grants" className="pb-10 underline">
          Semaphore Grants Round
        </a>
        <a href="https://appliedzkp.org/" className="pb-14 underline">
          Privacy & Scaling Explorations
        </a>
        <div>
          <button className="bg-brand-yellow text-black py-2 px-4 rounded-full " onClick={clearIdentity}>
            Disconnect ID
          </button>
        </div>
        <p className="text-center text-brand-beige text-brand-2xs mt-20">
          &#8220;The password is 🤝🏽🔭🧑🏽‍🚀✨🤌🏽&#8221;&nbsp;&ndash;&nbsp;
          <a href="https://twitter.com/PrivacyScaling" className="underline mt-3">
            @PrivacyScaling
          </a>
        </p>
      </div>
    </div>
  )
}

export default ExperiencesListComponent
