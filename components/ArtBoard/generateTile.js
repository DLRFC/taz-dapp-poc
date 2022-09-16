import React, { forwardRef } from 'react'
import DrawingHtml from './drawingHtml'

const GenerateTile = forwardRef(
  ({
    setSelectedTile,
    selectedTile,
    i,
    onImageClick,
    tiles,
    color,
    lines,
    setLines,
    stageRef,
    borderRef,
    fillColor,
    startDrawing
  }) => (
    <td className="bg-white p-0">
      {selectedTile === i ? (
        <div onClick={startDrawing} className="cursor-pointer w-[112px] h-[112px]">
          {tiles[i] ? (
            <img
              className="w-[112px] h-[112px]"
              id={`${i}`}
              src={
                tiles[i] ? tiles[i] : '' // "https://media.istockphoto.com/vectors/cartoon-raven-isolated-on-white-background-vector-id597250060?k=20&m=597250060&s=612x612&w=0&h=yl0rXftvQNqXTKQyRjqumexaKiyW6Bq0OFl1Ko4zaAs="
              }
            />
          ) : (
            <p className="flex items-center justify-center text-center">Click here to start Drawing on this Tile</p>
          )}
        </div> /* <DrawingHtml
          stageRef={stageRef}
          borderRef={borderRef}
          color={color}
          lines={lines}
          setLines={setLines}
          fillColor={fillColor}
        /> */
      ) : (
        <img
          className="w-[112px] h-[112px]"
          id={`${i}`}
          src={
            tiles[i] ? tiles[i] : ''
            // "https://media.istockphoto.com/vectors/cartoon-raven-isolated-on-white-background-vector-id597250060?k=20&m=597250060&s=612x612&w=0&h=yl0rXftvQNqXTKQyRjqumexaKiyW6Bq0OFl1Ko4zaAs="
          }
        />
      )}
    </td>
  )
)

export default GenerateTile
