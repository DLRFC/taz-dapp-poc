import QrReader from 'react-qr-reader'
import { AnimatePresence } from 'framer-motion'
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
                                    className="text-brand-button bg-brand-yellow w-full py-4 border-2 border-brand-gray2 shadow-[-5px_5px_0px_0px_rgba(30,30,30)] text-brand-button flex items-center justify-center"
                                    onClick={handleSignUpButton}
                                >
                                    <span className="mr-4">Yes, I was invited</span>
                                    <svg
                                        className="left-[16.67%] right-[16.67%] top-[17.59%] bottom-[17.59%]"
                                        width="16px"
                                        height="16px"
                                        viewBox="0 0 16 16"
                                        fill="#BD5141"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12.172 6.99968L6.808 1.63568L8.222 0.22168L16 7.99968L8.222 15.7777L6.808 14.3637L12.172 8.99968H0V6.99968H12.172Z"></path>
                                    </svg>
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
                                            <svg
                                                className="left-[16.67%] right-[16.67%] top-[17.59%] bottom-[17.59%]"
                                                width="18px"
                                                height="19px"
                                                viewBox="0 0 18 19"
                                                fill="#EAE1DA"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M0 17H18V19H0V17ZM10 3.828V15H8V3.828L1.929 9.9L0.515 8.486L9 0L17.485 8.485L16.071 9.899L10 3.83V3.828Z"></path>
                                            </svg>
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
                                <select className="mb-3" onChange={(e) => setSelected(e.target.value)}>
                                    <option value="environment">Back Camera</option>
                                    <option value="user">Front Camera</option>
                                </select>
                                <QrReader
                                    facingMode={selected}
                                    delay={1000}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: '300px' }}
                                />
                            </div>

                            <div className="flex items-center justify-center flex-col">
                                <button
                                    className="bg-brand-yellow px-3 py-1 rounded-full mb-5 text-xs"
                                    onClick={handleSignUpButton}
                                >
                                    Stop Scan
                                </button>

                                <input
                                    className="border-solid border-2 border-brand-beige w-full mb-3 py-2 rounded-sm bg-[#F0EBE8] bg-opacity-10 max-w-[80%] text-brand-beige text-xl text-center"
                                    value={invitation}
                                    onChange={(e) => setInvitation(e.target.value)}
                                />
                                <p className="text-brand-beige mb-3 px-1 text-sm opacity-70">
                                    or type the 6 digits code here
                                </p>
                            </div>

                            {invitation ? (
                                <button
                                    className="w-full border-2 border-brand-gray2 bg-brand-yellow p-2 py-4 shadow-[-3px_3px_0px_0px_rgba(30,30,30)] text-sm flex items-center justify-center"
                                    onClick={validate}
                                >
                                    <span className="mr-4">Next</span>
                                    <svg
                                        className="left-[16.67%] right-[16.67%] top-[17.59%] bottom-[17.59%]"
                                        width="16px"
                                        height="16px"
                                        viewBox="0 0 16 16"
                                        fill="#BD5141"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12.172 6.99968L6.808 1.63568L8.222 0.22168L16 7.99968L8.222 15.7777L6.808 14.3637L12.172 8.99968H0V6.99968H12.172Z"></path>
                                    </svg>
                                </button>
                            ) : null}
                            {/* <button
                                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-[180px]"
                                onClick={validate}
                            >
                                Submit
                            </button>

                            <button
                                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-20"
                                onClick={handleSignUpButton}
                            >
                                Back
                            </button> */}
                        </div>
                    </div>
                </div>
            )}

            <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black" />
        </div>
    )
}

export default InvitationCheckComponent
