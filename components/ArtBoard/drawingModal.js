import React, { forwardRef } from 'react'
import { Stage, Layer, Line, Rect } from 'react-konva'
import { motion } from 'framer-motion'
import Image from 'next/image'

const DrawingHtml = forwardRef(
  ({
    minimize,
    handleColorSelect,
    handleUndo,
    handleFill,
    isFilling,
    color,
    stageRef,
    borderRef,
    lines,
    setLines,
    fillColor
  }) => {
    const isDrawing = React.useRef(false)
    const [tool] = React.useState('pen')
    const COLORCONVERT = {
      white: 'white',
      black: '#171717',
      'red-600': '#dc2626',
      'orange-500': '#f97316',
      'yellow-300': '#fde047',
      'green-600': '#16a34a',
      'blue-600': '#2563eb',
      'purple-600': '#9333ea'
    }
    const drawingSize = 200

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
      <div className="absolute top-0 left-0 bottom-0 right-0 h-[100%] w-[100%] m-0 bg-[#00000070] flex flex-col items-center justify-center px-5 z-20">
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className=" w-[100%] h-[60%] sm:w-[70%] sm:h-[50%] bg-brand-beige2 border-[1px] flex flex-col items-center justify-center rounded-[5px]"
        >
          <div className="flex grid grid-rows-1 grid-cols-10">
            <div>
              <button
                id="black"
                aria-label="black color picker"
                className="w-4 h-4 m-1 bg-black rounded-full"
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="red-600"
                aria-label="red color picker"
                className="w-4 h-4 m-1 bg-red-600 rounded-full"
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="orange-500"
                aria-label="orange color picker"
                className="w-4 h-4 m-1 bg-orange-500 rounded-full"
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="yellow-300"
                aria-label="yellow color picker"
                className="w-4 h-4 m-1 bg-yellow-300 rounded-full"
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="green-600"
                aria-label="green color picker"
                className="w-4 h-4 m-1 bg-green-600 rounded-full"
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="blue-600"
                aria-label="blue color picker"
                className="w-4 h-4 m-1 bg-blue-600 rounded-full"
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="purple-600"
                aria-label="purple color picker"
                className="w-4 h-4 m-1 bg-purple-600 rounded-full"
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div>
              <button
                id="white"
                aria-label="white color picker"
                className="w-4 h-4 m-1 bg-white border border-black rounded-full"
                type="submit"
                onClick={(e) => handleColorSelect(e)}
              />
            </div>
            <div className={isFilling ? 'm-1 border border-black flex' : 'm-1 flex'} onClick={handleFill}>
              <Image className="cursor-pointer" src="/paint_bucket.png" alt="fill" width="20" height="20" />
            </div>
            <div className="m-2" onClick={handleUndo}>
              <Image className="cursor-pointer" src="/undo-transparent.png" alt="undo" width="20" height="20" />
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
          <div>
            <button
              className="bg-brand-yellow font-bold text-xs mt-3 p-2 rounded-full"
              type="submit"
              onClick={minimize}
            >
              minimize
            </button>
          </div>
        </motion.div>
      </div>
    )
  }
)

export default DrawingHtml
