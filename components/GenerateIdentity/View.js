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
            <p className="px-3 font-bold text-xl text-brand-beige">You’ve been invited to an anonymous experience</p>
            <p className="mb-3 py-5 px-3 text-brand-beige opacity-70 text-sm">
              Joining the Devcon VI semaphore group gives you access to an anonymous identity you can use in different
              apps.
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
            <a href={imageUrl} download="semaphore.jpg" className="flex items-center justify-center flex-col mb-5">
              <img src={imageUrl} alt="img" className="mb-7 " />
              <button className="px-3 text-[16px] text-brand-beige bg-brand-black border-brand-gray2 border-2  shadow-[-3px_3px_0px_0px_rgba(71,95,111)] rounded-full flex items-center justify-center">
                <span className="mr-4">Take a screen shot</span>
                <svg width="15px" height="12px" viewBox="0 0 15 12" xmlns="http://www.w3.org/2000/svg" fill="#EAE1DA">
                  <path d="M0.889648 0.662C0.890858 0.486919 0.96031 0.319345 1.083 0.195478C1.20569 0.071612 1.37177 0.00139643 1.54536 0H13.454C13.8162 0 14.1097 0.296667 14.1097 0.662V11.338C14.1085 11.5131 14.039 11.6807 13.9163 11.8045C13.7936 11.9284 13.6275 11.9986 13.454 12H1.54536C1.37139 11.9998 1.20461 11.93 1.08166 11.8059C0.958711 11.6817 0.889648 11.5135 0.889648 11.338V0.662ZM2.21165 1.33333V10.6667H12.7877V1.33333H2.21165ZM7.49966 8C8.02558 8 8.52997 7.78929 8.90185 7.41421C9.27374 7.03914 9.48266 6.53043 9.48266 6C9.48266 5.46957 9.27374 4.96086 8.90185 4.58579C8.52997 4.21071 8.02558 4 7.49966 4C6.97373 4 6.46935 4.21071 6.09746 4.58579C5.72558 4.96086 5.51665 5.46957 5.51665 6C5.51665 6.53043 5.72558 7.03914 6.09746 7.41421C6.46935 7.78929 6.97373 8 7.49966 8ZM7.49966 9.33333C6.62312 9.33333 5.78247 8.98214 5.16267 8.35702C4.54286 7.7319 4.19465 6.88406 4.19465 6C4.19465 5.11595 4.54286 4.2681 5.16267 3.64298C5.78247 3.01786 6.62312 2.66667 7.49966 2.66667C8.3762 2.66667 9.21684 3.01786 9.83665 3.64298C10.4565 4.2681 10.8047 5.11595 10.8047 6C10.8047 6.88406 10.4565 7.7319 9.83665 8.35702C9.21684 8.98214 8.3762 9.33333 7.49966 9.33333ZM10.8047 2H12.1267V3.33333H10.8047V2Z" />
                </svg>
              </button>
            </a>
            <Link href="/experiences-page">
              <button className="w-[100%] p-3 text-brand-button bg-brand-yellow border-brand-gray2 border-2  shadow-[-3px_3px_0px_0px_rgba(30,30,30)] flex items-center justify-center">
                <span className="mr-4">Enter the TAZ</span>
                <svg
                  className="left-[16.67%] right-[16.67%] top-[17.59%] bottom-[17.59%]"
                  width="16px"
                  height="16px"
                  viewBox="0 0 16 16"
                  fill="#BD5141"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.172 6.99968L6.808 1.63568L8.222 0.22168L16 7.99968L8.222 15.7777L6.808 14.3637L12.172 8.99968H0V6.99968H12.172Z" />
                </svg>
              </button>
            </Link>
            <p className="mb-3 py-5 px-3 text-brand-beige text-[12px]">
              Your browser will remember your ID unless you remove it or use a private browser. Save the QR image in
              case your browser forgets :)
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <button
              className="w-full border-2 border-brand-gray2 bg-brand-yellow p-2 py-4 shadow-[-3px_3px_0px_0px_rgba(30,30,30)] text-brand-button"
              onClick={handleJoinButton}
            >
              {isLoading ? (
                'Generating Identity'
              ) : (
                <div className="flex items-center justify-center">
                  <span className="mr-4">Join the Group</span>
                  <svg
                    className="left-[16.67%] right-[16.67%] top-[17.59%] bottom-[17.59%]"
                    width="16px"
                    height="16px"
                    viewBox="0 0 16 16"
                    fill="#BD5141"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.172 6.99968L6.808 1.63568L8.222 0.22168L16 7.99968L8.222 15.7777L6.808 14.3637L12.172 8.99968H0V6.99968H12.172Z" />
                  </svg>
                </div>
              )}
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
