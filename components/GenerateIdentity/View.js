import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import LoadingModal from '../LoadingModal/Index.js'
import Header from '../Header/index.js'

// Page 3 will Generate Identity and Join Group
export const GenerateIdentityComponent = ({ isLoading, onClose, loadingMessage, imageUrl, handleJoinButton }) => (
    <div className="p-4 font-sans bg-brand-blue">
        {/* {isLoading ? (
        <div className="absolute top-[0px] left-[0px] z-20">
          <LoadingModal onClose={onClose} loadingMessage={loadingMessage} />
        </div>
      ) : null} */}
        {isLoading ? (
            <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null} className="z-20">
                <LoadingModal onClose={onClose} loadingMessage={loadingMessage} />
            </AnimatePresence>
        ) : null}
        <Header />

        <svg
            className="absolute -left-2 top-[370px]"
            width="69"
            height="100"
            viewBox="0 0 69 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
        </svg>
        <svg
            className="absolute right-[0px] top-[642px]"
            width="121"
            height="160"
            viewBox="0 0 121 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
        </svg>
        <div className="flex flex-col items-center rounded-md px-3 z-10">
            <div className="z-10 mt-3 h-[586px] w-full py-3 px-4">
                {!imageUrl ? (
                    <div>
                        <p className="px-3 font-bold text-xl text-brand-beige">
                            You’ve been invited to an anonymous experience
                        </p>
                        <p className="mb-3 py-5 px-3 text-brand-beige opacity-70 text-sm">
                            Joining the Devcon VI semaphore group gives you access to an anonymous identity you can use
                            in different apps.
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className="px-3 font-bold text-xl text-brand-beige">You're in Anon!</p>
                        <p className="mb-3 py-5 px-3 text-brand-beige opacity-70 text-[16px]">
                            This ID can be used with TAZ and other Semaphore supported dApps
                        </p>
                    </div>
                )}

                {imageUrl ? (
                    <div className="flex items-center justify-center flex-col">
                        <a
                            href={imageUrl}
                            download="semaphore.jpg"
                            className="flex items-center justify-center flex-col mb-5"
                        >
                            <img src={imageUrl} alt="img" className="mb-7 " />
                            <button className="px-3 text-[16px] text-brand-beige bg-brand-black border-brand-gray2 border-2  shadow-[-3px_3px_0px_0px_rgba(71,95,111)] rounded-full">
                                Take a screen shot
                            </button>
                        </a>
                        <Link href="/experiences-page">
                            <button className="w-[100%] p-3 text-brand-button bg-brand-yellow border-brand-gray2 border-2  shadow-[-3px_3px_0px_0px_rgba(30,30,30)]">
                                Enter the TAZ
                            </button>
                        </Link>
                        <p className="mb-3 py-5 px-3 text-brand-beige text-[12px]">
                            Your browser will remember your ID unless you remove it or use a private browser. Save the
                            QR image in case your browser forgets :)
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <button
                            className="w-full border-2 border-brand-gray2 bg-brand-yellow p-2 py-4 shadow-[-3px_3px_0px_0px_rgba(30,30,30)] text-brand-button"
                            onClick={handleJoinButton}
                        >
                            {isLoading ? 'Generating Identity' : 'Join the Group'}
                        </button>
                        <p className="mb-3 py-5 px-3 text-brand-beige opacity-70 text-xs">
                            Learn more about <a className="underline">Semaphore</a>
                        </p>
                    </div>
                )}
            </div>
        </div>

        <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black" />
    </div>
)
