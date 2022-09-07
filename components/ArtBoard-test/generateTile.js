import React from 'react'
import DrawingHtml from './drawingHtml'

export default function GenerateTile({
  selectedTile,
  i,
  onImageClick,
  tiles,
  color,
  stageRef,
}) {
  return (
    <td className="bg-white w-20 border border-slate-200">
      {selectedTile === i ? (
        <DrawingHtml stageRef={stageRef} color={color} />
      ) : (
        <img
          id={`${i}`}
          onClick={onImageClick}
          src={
            tiles[i] ? tiles[i] : '' // "https://media.istockphoto.com/vectors/cartoon-raven-isolated-on-white-background-vector-id597250060?k=20&m=597250060&s=612x612&w=0&h=yl0rXftvQNqXTKQyRjqumexaKiyW6Bq0OFl1Ko4zaAs="
          }
        />
      )}
    </td>
  )
}
