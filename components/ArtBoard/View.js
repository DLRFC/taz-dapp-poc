import React, { forwardRef } from 'react'

import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Button from '../Button'
import LoadingModal from '../LoadingModal/Index'
import GenerateTile from './generateTile'

// import { Identity } from '@semaphore-protocol/identity'

const ArtBoardComponent = forwardRef(
    ({
        isLoading,
        loadingMessage,
        submit,
        colors,
        //   setColor,
        handleGenerateProof,
        setSelectedTile,
        selectedTile,
        tiles,
        lines,
        setLines,
        handleUndo,
        stageRef,
        borderRef,
        canvasRef
    }) => {
        const [color, setColor] = React.useState('text-black')

        const tileCounter = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ]

        return (
            <div className="px-6 py-8 font-sans">
                {isLoading ? (
                    <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null} className="z-20">
                        <LoadingModal loadingMessage={loadingMessage} />
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

                <div className="w-72 rounded-md border-2 border-gray-500 bg-white drop-shadow-lg">
                    <div className=" p-3">
                        <p className="text-sm text-black w-full font-bold">Select a tile to start drawing</p>
                    </div>
                    <div className=" px-3 pb-3">
                        <p className="text-xs text-brand-brown text-black">
                            Your drawing will appear alongside other's. Select 1 tile at a time.
                        </p>
                    </div>
                    <div className="flex">
                        <div>
                            <div>
                                <button
                                    id="text-black"
                                    className="w-4 h-4 m-2 bg-black rounded-full"
                                    type="submit"
                                    onClick={(e) => {
                                        console.log(e.target)
                                        setColor(e.target.id)
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    id="text-red-600"
                                    className="w-4 h-4 m-2 bg-red-600 rounded-full"
                                    type="submit"
                                    onClick={(e) => {
                                        console.log(e.target)
                                        setColor(e.target.id)
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    id="text-orange-500"
                                    className="w-4 h-4 m-2 bg-orange-500 rounded-full"
                                    type="submit"
                                    onClick={(e) => {
                                        console.log(e.target)
                                        setColor(e.target.id)
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    id="text-green-600"
                                    className="w-4 h-4 m-2 bg-green-600 rounded-full"
                                    type="submit"
                                    onClick={(e) => {
                                        console.log(e.target)
                                        setColor(e.target.id)
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    id="text-blue-600"
                                    className="w-4 h-4 m-2 bg-blue-600 rounded-full"
                                    type="submit"
                                    onClick={(e) => {
                                        console.log(e.target)
                                        setColor(e.target.id)
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    id="text-purple-600"
                                    className="w-4 h-4 m-2 bg-purple-600 rounded-full"
                                    type="submit"
                                    onClick={(e) => {
                                        console.log(e.target)
                                        setColor(e.target.id)
                                    }}
                                />
                            </div>
                            <div className="m-2" onClick={handleUndo}>
                                <Image
                                    className="cursor-pointer"
                                    src="/undo-transparent.png"
                                    alt="undo"
                                    width="20"
                                    height="20"
                                />
                            </div>
                        </div>

                        <div ref={canvasRef} id="ipfsURI">
                            <table className="">
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

                    <div className="flex p-2">
                        <div>
                            <button
                                className="bg-brand-yellow font-bold text-xs p-2 rounded-full"
                                type="submit"
                                onClick={submit}
                            >
                                Submit tile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)

export default ArtBoardComponent
