import React, { forwardRef } from 'react'
import Link from 'next/link'

import { AnimatePresence } from 'framer-motion'

import LoadingModal from '../LoadingModal/Index'
import DrawingModal from './drawingModal'
import GenerateTile from './generateTile'
import BackArrow from '../svgElements/BackArrow'
import ProcessingModal from '../ProcessingModal'

// import { Identity } from '@semaphore-protocol/identity'

const ArtBoardComponent = forwardRef(
  ({
    isLoading,
    loadingMessage,
    submit,
    setSelectedTile,
    selectedTile,
    tiles,
    lines,
    setLines,
    handleUndo,
    toggleTool,
    handleColorSelect,
    tool,
    stageRef,
    borderRef,
    canvasRef,
    color,
    fillColor,
    startDrawing,
    isDrawing,
    minimize,
    handleResetTile,
    userSelectedTile,
    closeProcessingModal,
    steps,
    fact
  }) => {
    const tileCounter = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ]

    return (
      <div className="px-6 py-8 font-sans">
        {isLoading ? (
          <ProcessingModal isOpen={isLoading} closeModal={closeProcessingModal} steps={steps} fact={fact} />
        ) : null}
        {isDrawing ? (
          <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null} className="z-20">
            <DrawingModal
              stageRef={stageRef}
              borderRef={borderRef}
              color={color}
              lines={lines}
              setLines={setLines}
              fillColor={fillColor}
              tool={tool}
              toggleTool={toggleTool}
              handleUndo={handleUndo}
              handleColorSelect={handleColorSelect}
              minimize={minimize}
              tiles={tiles}
            />
          </AnimatePresence>
        ) : null}

        <div className="z-0 p-4 min-w-[200px] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
          <div className="mb-4 border-0">
            <Link href="/artGallery-page">
              <div>
                <BackArrow />
              </div>
            </Link>
          </div>
          <div className="border-0 text-brand-brown" style={{ borderTopWidth: '0px' }}>
            <p className="text-sm w-full font-bold mb-4">Select a tile to start drawing</p>
            <p className="text-xs opacity-[70%] mb-4">
              Your drawing will appear alongside other's. Select 1 tile at a time.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div ref={canvasRef} id="ipfsURI">
              <table>
                <tbody>
                  {tileCounter.map((counter) => (
                    <tr className="w-full h-full" key={counter}>
                      {counter.map((id) => (
                        <GenerateTile
                          startDrawing={startDrawing}
                          key={id}
                          selectedTile={selectedTile}
                          setSelectedTile={setSelectedTile}
                          i={id}
                          tiles={tiles}
                          color={color}
                          fillColor={fillColor}
                          stageRef={stageRef}
                          borderRef={borderRef}
                          lines={lines}
                          setLines={setLines}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex">
            {userSelectedTile ? (
              <div className="flex items-center justify-between w-full pt-4">
                <button
                  className=" font-bold text-[14px] px-4 py-2 rounded-full"
                  type="submit"
                  onClick={handleResetTile}
                >
                  Start Over
                </button>

                <button
                  className="bg-brand-yellow font-bold text-[14px] px-4 py-2 rounded-full"
                  type="submit"
                  onClick={submit}
                >
                  Submit tile
                </button>
              </div>
            ) : (
              <p className="text-center w-full">Select a Tile</p>
            )}
          </div>
        </div>
      </div>
    )
  }
)

export default ArtBoardComponent
