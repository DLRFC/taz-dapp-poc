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
  }) => {
    return (
      <td className="bg-white w-20 border border-slate-200">
        {selectedTile === i ? (
          <div onClick={startDrawing} className="cursor-pointer">
            <img
              id={`${i}`}
              src={
                tiles[i] ? tiles[i] : '' // "https://media.istockphoto.com/vectors/cartoon-raven-isolated-on-white-background-vector-id597250060?k=20&m=597250060&s=612x612&w=0&h=yl0rXftvQNqXTKQyRjqumexaKiyW6Bq0OFl1Ko4zaAs="
              }
            />
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
            id={`${i}`}
            src={
              tiles[i] ? tiles[i] : '' // "https://media.istockphoto.com/vectors/cartoon-raven-isolated-on-white-background-vector-id597250060?k=20&m=597250060&s=612x612&w=0&h=yl0rXftvQNqXTKQyRjqumexaKiyW6Bq0OFl1Ko4zaAs="
            }
          />
        )}
      </td>
    )
  }
)

export default GenerateTile
