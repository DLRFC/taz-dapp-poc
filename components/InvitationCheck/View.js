import QrReader from 'react-qr-reader'
import { AnimatePresence } from 'framer-motion'
import { RiArrowRightLine, RiUploadLine } from 'react-icons/ri'

import LoadingModal from '../LoadingModal/Index'
import Header from '../Header'

// Page 1 it will check Invitation
const InvitationCheckComponent = ({
  isSignUp,
  handleSignUpButton,
  handleUploadQrCode,
  checkingIdentity,
  qrRef,
  handleError,
  handleScanQrCode,
  isLoading,
  handleStartScan,
  startScan,
  setSelected,
  selected,
  handleScan,
  inviteCodeChangeHandler,
  setInvitation,
  data,
  validate,
  onClose,
  loadingMessage,
  invitation
}) => {
  console.log('change')
  return (
    <div className="p-4 font-sans bg-brand-blue">
      {isLoading && (
        <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null} className="z-20">
          <LoadingModal onClose={onClose} loadingMessage={loadingMessage} />
        </AnimatePresence>
      )}
      <Header />
      {!isSignUp ? (
        <div className="flex flex-col items-center overflow-hidden rounded-md px-3 text-brand-gray2">
          <div className="h-[1586px] py-3 w-full px-4 z-10">
            <div className="divide-y">
              <div>
                <p className="py-5 font-bold mb-1 px-3 text-brand-h2 text-brand-beige">
                  Where you invited to join a group?
                </p>
                <p className="py-2 mb-3 px-3 text-brand-h3 text-brand-beige opacity-70">
                  This is an anonymous, members-only experience
                </p>
                <button
                  className="text-brand-button bg-brand-yellow flex items-center justify-center w-full py-4 border-2 border-brand-gray2 shadow-[-5px_5px_0px_0px_rgba(30,30,30)]"
                  onClick={handleSignUpButton}
                >
                  <span className="mr-4">Yes, I was invited</span>
                  <RiArrowRightLine size={24} fill="#BD5141" />
                </button>
                <p className="py-5 px-3 text-brand-info text-brand-beige opacity-70">
                  If not, visit a TAZ location to grab an invitation card.
                </p>
              </div>
              <div>
                <p className="py-5 font-bold mb-3 px-3 text-brand-info text-brand-beige outline-2 border-brand-black">
                  Already a member?
                </p>
                <button
                  className="text-brand-button bg-brand-beige bg-opacity-10 w-full py-4 border-2 border-brand-beige text-brand-beige mb-8"
                  onClick={handleUploadQrCode}
                >
                  {checkingIdentity ? (
                    'Checking Identity please wait'
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-4">Upload Sempahore ID</span>
                      <RiUploadLine size={24} fill="#EAE1DA" />
                    </div>
                  )}
                </button>
                <QrReader
                  className="border-0"
                  ref={qrRef}
                  delay={300}
                  onError={handleError}
                  onScan={handleScanQrCode}
                  legacyMode
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center overflow-hidden rounded-md px-3 text-brand-gray2">
          <div className="h-[1600px] py-3 w-full px-4 z-10">
            <p className="py-5 font-bold mb-3 px-3 text-brand-button text-brand-beige">
              Scan the QR code on the invitation card
            </p>

            <div>
              {/* <button
                                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8"
                                onClick={handleStartScan}
                            >
                                {startScan ? 'Stop Scan' : 'Scan Invitation QR Code'}
                            </button> */}

              <div className="flex items-center justify-center flex-col mb-5">
                {/* <select className="mb-3" onChange={(e) => setSelected(e.target.value)}>
                  <option value="environment">Back Camera</option>
                  <option value="user">Front Camera</option>
                </select> */}
                <QrReader
                  facingMode={selected}
                  delay={1000}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '300px' }}
                />
              </div>

              <div className="flex items-center justify-center flex-col">
                <button className="bg-brand-yellow px-3 py-1 rounded-full mb-5 text-xs" onClick={handleSignUpButton}>
                  Stop Scan
                </button>

                <input
                  className="border-solid border-2 border-brand-beige w-full mb-3 py-2 rounded-sm bg-[#F0EBE8] bg-opacity-10 max-w-[80%] text-brand-beige text-xl text-center"
                  type="text"
                  placeholder="invitation-code"
                  maxLength="6"
                  value={invitation}
                  onChange={inviteCodeChangeHandler}
                />
                <p className="text-brand-beige mb-3 px-1 text-sm opacity-70">or type the 6 digits code here</p>
              </div>

              {invitation && invitation.length > 5 && (
                <button
                  className="w-full border-2 border-brand-gray2 bg-brand-yellow p-2 py-4 shadow-[-3px_3px_0px_0px_rgba(30,30,30)] text-sm flex items-center justify-center"
                  onClick={validate}
                >
                  <span className="mr-4">Next</span>
                  <RiArrowRightLine size={24} fill="#BD5141" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black" />
    </div>
  )
}

export default InvitationCheckComponent
