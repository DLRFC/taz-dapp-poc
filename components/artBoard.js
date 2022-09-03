import React, { useState, useRef, createRef, useEffect } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { Stage, Layer, Line } from "react-konva";
import axios from "axios";
import Header from "./Header";
import Button from "./Button";

export default function artBoard() {
  const [selectedTile, setSelectedTile] = useState(1);
  const [uriStorage, setUriStorage] = useState([]);

  // DECLARATIONS FROM OLD DRAWING COMPONENT FILE
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [color, setColor] = React.useState([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);
  let uriStorageTemp1;

  // SAVE TILES AS ONE IMAGE - @WRITERSBLOCKCHAIN
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });

  const fetchUriStorage = async () => {
    console.log("fetchUriStorage");
    try {
      const result = await axios.get("/api/storeTiles");
      console.log(result);
      uriStorageTemp1 = result.data.uriStorage;
      return uriStorageTemp1;
    } catch (err) {
      console.log("Error fetching subgraph data: ", err);
    }
  };

  useEffect(() => {
    const doAsync = async () => {
      setUriStorage(await fetchUriStorage());
      setSelectedTile(uriStorageTemp1.findIndex((e) => e === null));
    };
    doAsync();
  }, []);

  // COMING BACK TO THIS ON AUG 30, URI NOT WORKING YET - @WRITERSBLOCKCHAIN
  // const ipfsURI = (image, { name = "img", extension = "png" } = {}) => {
  // let image =  createFileName(extension, name)
  // let canvas = document.createElement("canvas");
  // canvas.width = image.width;
  // canvas.height = image.height;
  // canvas.getContext("2d").drawImage(image, 0, 0);
  // const dataURL = canvas.toDataURL();
  // console.log("CANVAS 9 TILES URI:", dataURL);
  // };

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
  // const sendURI = () => takeScreenShot(ref.current).then(ipfsURI);

  // NO LONGER NEEDED - USER GETS RANDOM SELECTED TILE
  const onImageClick = (e) => {
    setSelectedTile(parseInt(e.target.id));
  };

  // LOGIC FUNCTIONS FOR SKETCHING BELOW
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
    const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    /*  "rgb(" +
      Math.round(Math.random() * 255) +
      " " +
      Math.round(Math.random() * 255) +
      " " +
      Math.round(Math.random() * 255) +
      ")"; */
    setColor(newColor);
    console.log(newColor);
  };

  const handleUndo = () => {
    lines.pop();
    setLines(lines.concat());
  };

  const submit = async () => {
    const uri = stageRef.current.toDataURL();
    const uriStorageTemp2 = uriStorage;
    uriStorageTemp2[selectedTile] = uri.toString();
    console.log("new uriStorage:");
    console.log(uriStorageTemp2);

    // if all tiles are full
    if (uriStorageTemp2.findIndex((e) => e === null) === -1) {
      // send full canvas image to backend
      console.log("canvas full, push tx");
    } else {
      console.log("post tile to backend");
      await axios.post("/api/storeTiles", { array: uriStorageTemp2 });
    }

    setSelectedTile(-1);
    setLines([]);

    // redirect user to another page
  };

  // DRAWING AREA HTML
  const drawingHTML = [
    <div className="border-black border touch-none bg-white h-[250] w-[250]">
      <Stage
        width={80}
        height={80}
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
    </div>,
  ];

  const generateTileHTML = (i) => {
    const html = (
      <td className="bg-white w-20 border border-slate-200">
        {selectedTile === i ? (
          drawingHTML
        ) : (
          <img
            id={`${i}`}
            onClick={onImageClick}
            src={
              uriStorage[i] ? uriStorage[i] : "" // "https://media.istockphoto.com/vectors/cartoon-raven-isolated-on-white-background-vector-id597250060?k=20&m=597250060&s=612x612&w=0&h=yl0rXftvQNqXTKQyRjqumexaKiyW6Bq0OFl1Ko4zaAs="
            }
          />
        )}
      </td>
    );
    return html;
  };

  return (
    <div className="px-6 py-8 font-sans">
      <Header />

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
          <table
            ref={ref}
            id="ipfsURI"
            className="p-3 justify-center rounded-md bg-gray-500 max-w-3xl"
          >
            <tr className="h-20">
              {generateTileHTML(0)}
              {generateTileHTML(1)}
              {generateTileHTML(2)}
            </tr>
            <tr className="h-20">
              {generateTileHTML(3)}
              {generateTileHTML(4)}
              {generateTileHTML(5)}
            </tr>
            <tr className="h-20">
              {generateTileHTML(6)}
              {generateTileHTML(7)}
              {generateTileHTML(8)}
            </tr>
          </table>

          {/* <div
            ref={ref}
            id="ipfsURI"
            class="grid grid-cols-3 p-3 justify-center rounded-md bg-gray-500 max-w-3xl"
          >
            {tilesHTML}
          </div> */}
        </div>

        <div className="flex items-center justify-center pt-5 pb-10">
          <div className={`w-8 h-8 bg-red-500 rounded-full mr-2`}></div>
          <div className="mr-1" onClick={newColor}>
            <Button text="New Color" />
          </div>
          <div className="ml-2" onClick={handleUndo}>
            <Button text="Undo" />
          </div>
        </div>
      </div>

      {/* <button
        class="m-1 p-1 bg-slate-400 rounded-md"
        onClick={downloadScreenshot}
      >
        Download screenshot
      </button> */}
      {/* <button onClick={sendURI}>Export Image URI</button> */}

      {/* <select
     value={tool}
     onChange={(e) => {
       setTool(e.target.value)
     }}
   >
     <option value="pen">Pen</option>
     <option value="eraser">Eraser</option>
   </select> */}
    </div>
  );
}
