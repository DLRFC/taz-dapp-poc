import React, { forwardRef } from 'react'
import { Stage, Layer, Line, Rect } from 'react-konva'
import { motion } from 'framer-motion'
import Image from 'next/image'

const DrawingHtml = forwardRef(
  ({
    minimize,
    handleColorSelect,
    handleUndo,
    toggleTool,
    tool,
    color,
    stageRef,
    borderRef,
    lines,
    setLines,
    fillColor
  }) => {
    const isDrawing = React.useRef(false)
    const COLORCONVERT = {
      white: 'white',
      black: '#171717',
      'brand-orange': '#BD5141',
      'brand-yellow': '#EFAD5F',
      'brand-yellow2': '#EFD85F',
      'brand-green': '#90B188',
      'brand-blue': '#435C6C',
      'brand-blue2': '#5F99EF',
      'brand-purple': '#8679AB'
    }
    const drawingSize = 300

    const dropIn = {
      hidden: {
        y: '-200vh',
        opacity: 0
      },
      visible: {
        y: '0',
        opacity: 1,
        transition: {
          duration: 0.1,
          type: 'spring',
          damping: 25,
          stiffness: 500
        }
      },
      exit: {
        y: '-200vh',
        opacity: 0
      }
    }

    const handleMouseDown = (e) => {
      isDrawing.current = true
      const pos = e.target.getStage().getPointerPosition()
      setLines([...lines, { tool, points: [pos.x, pos.y] }])
    }
    const handleMouseMove = (e) => {
      // no drawing - skipping
      if (!isDrawing.current) {
        return
      }
      const stage = e.target.getStage()
      const point = stage.getPointerPosition()
      const lastLine = lines[lines.length - 1]

      // set color
      lines[lines.length - 1].color = COLORCONVERT[color]

      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y])

      // replace last
      lines.splice(lines.length - 1, 1, lastLine)
      setLines(lines.concat())
    }

    const handleMouseUp = () => {
      isDrawing.current = false
    }

    return (
      <div className="absolute top-0 left-0 bottom-0 right-0 h-[80%] w-[100%] m-0 bg-[#00000070] flex flex-col items-center justify-center px-5 z-20">
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className=" w-flex h-flex p-2 bg-white border-2 border-black flex flex-col items-center justify-center rounded-[5px]"
        >
          <div className="flex grid grid-rows-1 pb-1 grid-cols-9">
            <div>
              <button
                id="brand-orange"
                aria-label="orange color picker"
                className={
                  color === 'brand-orange'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-brand-orange rounded-full'
                    : 'w-6 h-6 m-[5px] bg-brand-orange rounded-full'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="brand-yellow"
                aria-label="yellow color picker"
                className={
                  color === 'brand-yellow'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-brand-yellow rounded-full'
                    : 'w-6 h-6 m-[5px] bg-brand-yellow rounded-full'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="brand-yellow2"
                aria-label="yellow2 color picker"
                className={
                  color === 'brand-yellow2'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-brand-yellow2 rounded-full'
                    : 'w-6 h-6 m-[5px] bg-brand-yellow2 rounded-full'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="brand-green"
                aria-label="green color picker"
                className={
                  color === 'brand-green'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-brand-green rounded-full'
                    : 'w-6 h-6 m-[5px] bg-brand-green rounded-full'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="brand-blue2"
                aria-label="blue2 color picker"
                className={
                  color === 'brand-blue2'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-brand-blue2 rounded-full'
                    : 'w-6 h-6 m-[5px] bg-brand-blue2 rounded-full'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="brand-blue"
                aria-label="blue color picker"
                className={
                  color === 'brand-blue'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-brand-blue rounded-full'
                    : 'w-6 h-6 m-[5px] bg-brand-blue rounded-full'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="brand-purple"
                aria-label="purple color picker"
                className={
                  color === 'brand-purple'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-brand-purple rounded-full'
                    : 'w-6 h-6 m-[5px] bg-brand-purple rounded-full'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="black"
                aria-label="black color picker"
                className={
                  color === 'black'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-black rounded-full'
                    : 'w-6 h-6 m-[5px] bg-black rounded-full'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="white"
                aria-label="white color picker"
                className={
                  color === 'white'
                    ? 'outline outline-slate-500 outline-4 w-6 h-6 m-[5px] bg-white rounded-full'
                    : 'w-6 h-6 m-[5px] bg-white rounded-full border border-black'
                }
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
          </div>
          <div ref={borderRef} className="border-black border touch-none bg-white h-[250] w-[250]">
            <Stage
              width={drawingSize}
              height={drawingSize}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              onTouchmove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              ref={stageRef}
            >
              <Layer>
                {/* <Text text="Just start drawing" x={5} y={30} /> */}
                <Rect x={0} y={0} width={drawingSize} height={drawingSize} fill={COLORCONVERT[fillColor]} />
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={3}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                  />
                ))}
              </Layer>
            </Stage>
          </div>
          <div className="flex flex-row w-full items-center">
            <div className="justify-left ml-2">
              <button
                className="bg-black text-xs text-white w-32 p-2 pl-4 rounded-full flex flex-row"
                type="submit"
                onClick={minimize}
              >
                <Image src="/minimize.png" alt="minimize" width="16" height="16" />
                <p className="pl-4">minimize</p>
              </button>
            </div>
            <div className="flex flex-row w-full items-center justify-items-center grid grid-cols-3">
              <div
                className={tool === 'pen' ? 'p-1 border border-black justify-items-center' : 'p-1'}
                onClick={toggleTool}
              >
                <Image className="cursor-pointer" src="/pen.png" alt="pen" width="25" height="25" />
              </div>
              <div
                className={tool === 'fill' ? 'p-1 border border-black justify-items-center' : 'p-1'}
                onClick={toggleTool}
              >
                <Image className="cursor-pointer" src="/fill_bucket.png" alt="fill" width="25" height="25" />
              </div>
              <div className="m-2" onClick={handleUndo}>
                <Image className="cursor-pointer" src="/undo.png" alt="undo" width="25" height="25" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
)

export default DrawingHtml
