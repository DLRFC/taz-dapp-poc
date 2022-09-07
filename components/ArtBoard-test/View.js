import React from 'react'

import Button from '../Button'
import LoadingModal from '../LoadingModal/Index'
import { AnimatePresence } from 'framer-motion'
import GenerateTile from './generateTile'
import { forwardRef } from 'react'

// import { Identity } from '@semaphore-protocol/identity'

const ArtBoardComponent = forwardRef(({
  isLoading,
  onClose,
  loadingMessage,
  submit,
  colors,
  //   setColor,
  handleGenerateProof,
  setSelectedTile,
  selectedTile,
  tiles,
  stageRef,
}, ref) => {
  const [color, setColor] = React.useState('text-black')

  const tileCounter = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]


  return (
    <div className="px-6 py-8 font-sans">
      <h1>Hello World2</h1>
      {isLoading ? (
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={() => null}
          className="z-20"
        >
          <LoadingModal
            onClose={onClose}
            loadingMessage={loadingMessage}
          ></LoadingModal>
        </AnimatePresence>
      ) : null}
      <svg
        className="absolute -left-2 top-[230px]"
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

      <div className="mb-[34px] flex ml-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_114_381)">
            <path
              d="M7.828 10.9999H20V12.9999H7.828L13.192 18.3639L11.778 19.7779L4 11.9999L11.778 4.22192L13.192 5.63592L7.828 10.9999Z"
              fill="#BD5141"
            />
          </g>
          <defs>
            <clipPath id="clip0_114_381">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="ml-2 text-brand-orange text-sm font-bold">
          Back to apps
        </span>
      </div>

      <div className="index-[10] relative divide-y overflow-y-auto rounded-md border-2 border-gray-500 bg-brand-beige drop-shadow-lg">
        <div className="flex items-center justify-between py-4 px-8 bg-brand-beige">
          <p className="text-2xl text-brand-gray">ART BOARD</p>
          <div onClick={submit}>
            <Button text="Submit Tile" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            {colors.map((color) => (
              <button
                key={color}
                className="flex"
                onClick={(e) => {
                  setColor(e.target.id)
                }}
              >
                <div
                  className={`w-4 h-4 bg-${color} rounded-full mr-5 mb-5 mr-2 cursor-pointer`}
                  id={`text-${color}`}
                ></div>
              </button>
            ))}
          </div>

          <div ref={ref} id="ipfsURI">
            <table className="p-3 justify-center rounded-md bg-gray-500 max-w-3xl">
              <tbody>
                {tileCounter.map((counter) => (
                  <tr className="h-20" key={counter}>
                    {counter.map((id) => (
                      <GenerateTile
                        key={id}
                        selectedTile={selectedTile}
                        i={id}
                        tiles={tiles}
                        color={color}
                        stageRef={stageRef}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-center pt-5 pb-10">
          <div className="ml-2">
            <Button text="Undo" />
          </div>
          <div className="ml-2" onClick={handleGenerateProof}>
            <Button text="Generate Proof" />
          </div>
        </div>
      </div>
    </div>
  )
});

export default ArtBoardComponent;