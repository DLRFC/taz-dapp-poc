import React, { useState, useRef} from "react";
import { Stage, Layer, Line } from "react-konva";

export default function artBoard() {
  const [selectedTile, setSelectedTile] = useState(0);
  const [uriStorage, setUriStorage] = useState([]);
  const remainingTiles = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  // DECLARATIONS FROM OLD DRAWING COMPONENT FILE
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [color, setColor] = React.useState([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);

  //NO LONGER NEEDED - USER GETS RANDOM SELECTED TILE
  const onImageClick = (e) => {
    setSelectedTile(parseInt(e.target.id));
  };

  //GENERATE ART BOARD HTML
  let innerHTML = [];
  for (let i = 0; i < 9; i++) {
    innerHTML.push(
      <div
        class={`bg-white h-flex ${
          selectedTile === i
            ? "border-2 border-black"
            : "border border-slate-100"
        }`}
      >
        <img
          id={`${i}`}
          onClick={onImageClick}
          src={
            uriStorage[i]
              ? uriStorage[i]
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAAXNSR0IArs4c6QAABgRJREFUeF7t0wEBAAAIwjDtX9oefjZgyI4jQOC9wL5PKCABAmPonoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAIHJv4A+w8ehlQAAAAASUVORK5CYII="
          }
        />
      </div>
    );
  }

  //RANDOM TILE SELECTOR - NOT WORKING
  const selectRandomTile = () => {
    console.log("remainingTiles3: " + remainingTiles.current);
    const index = Math.floor(Math.random() * (remainingTiles.current.length - 1));
    console.log("index =" + index);
    setSelectedTile(remainingTiles.current[index]);
    console.log("selectedTile:" + selectedTile);
  };
  //COMPONENT DID MOUNT RUNS ONCE OBJECT IS LOADED TO DOM
  /*   componentDidMount() {
    console.log("componentDidMount");
    selectTile();
  } */

  // LOGIC FROM OLD DRAWING COMPONENT
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];

    // set color
    lines[lines.length - 1].color = color;

    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const newColor = () => {
    const newColor =
      "rgb(" +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      ")";
    setColor(newColor);
  };

  const handleUndo = () => {
    lines.pop();
    setLines(lines.concat());
  };

  const exportUri = () => {
    const uri = stageRef.current.toDataURL();
    setUriStorage((uriStorage) => {
      let uriStorageTemp = uriStorage;
      uriStorageTemp[selectedTile] = uri.toString();
      console.log("uriStorageTemp:");
      console.log(uriStorageTemp);
      return uriStorageTemp;
    });

    //remove selected tile from remainingTiles
    console.log("remainingTiles pre:" + remainingTiles.current);
    remainingTiles.current.splice(remainingTiles.current.indexOf(selectedTile), 1);
    console.log("remainingTiles post:" + remainingTiles.current);

    //if all tiles are full
    if(remainingTiles.length === 0) {
      //export full artboard 
      //- do we need to combine all images to one?
      //- where to export to?
    }

    //reset sketching area to empty
    setLines([]);
    selectRandomTile();
  };

  return (
    <>
      <h1 class="text-4xl">ART BOARD</h1>
      <div class="grid grid-cols-3 p-4 bg-red-500 max-w-3xl">{innerHTML}</div>

      <div className="border-black bg-transparent touch-none">
        <h1 class="text-4xl">SKETCHING AREA</h1>
        <div className="border-black max-w-[250px] border-2 touch-none bg-white">
          <Stage
            width={250}
            height={250}
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
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))}
            </Layer>
          </Stage>
        </div>
        {/* <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value)
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select> */}
        <button class="m-2 p-2 rounded-md bg-slate-500" onClick={newColor}>
          New Color{" "}
        </button>
        <button class="m-2 p-2 rounded-md bg-slate-500" onClick={handleUndo}>
          Undo
        </button>
        <button class="m-2 p-2 rounded-md bg-slate-500" onClick={exportUri}>
          Submit
        </button>

        <div className="uriStorageRendering">{/* uriStorageRender() */}</div>
        {/* <img src={uriStorage[1]} alt=''></img> */}
      </div>
    </>
  );
}
