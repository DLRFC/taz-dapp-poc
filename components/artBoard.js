import React, { useState, useRef, createRef, useEffect } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { Stage, Layer, Line } from "react-konva";
import axios from "axios";
import Header from "./Header";
import Button from "./Button";

export default function artBoard() {
  const COLORCONVERT = {
    "text-black": "#171717",
    "text-red-600": "#dc2626",
    "text-orange-500": "#f97316",
    "text-yellow-300": "#fde047",
    "text-green-600": "#16a34a",
    "text-blue-600": "#2563eb",
    "text-purple-600": "#9333ea",
  };

  const [selectedTile, setSelectedTile] = useState(1);
  const [uriStorage, setUriStorage] = useState([]);

  // DECLARATIONS FROM OLD DRAWING COMPONENT FILE
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [color, setColor] = React.useState("text-black");
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);
  const uriStorageRef = React.useRef(null);
  const canvasId = React.useRef(null);

  // SAVE TILES AS ONE IMAGE - @WRITERSBLOCKCHAIN
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });

  const fetchUriStorage = async () => {
    console.log("fetchUriStorage");
    try {
      //404 ERROR ON BELOW CALL - WAIT FOR HELP FROM FALCO
      /*       const result = await axios.get('/api/modifyCanvas')
      console.log("result:" );
      console.log(result); */

      //fake data returned from backend to be replaced by backend call above
      const canvas = {
        tiles: [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAshJREFUeF7t2j2vDVEYxfH/LZQaoRDxBSiIqxASodIoKIgCjZdOolcg8QWIhtBIREJBo0HiRqKUW9FqRCEh8Q3kSWaSMZm5JzNrzz2z913TnrMmeX5Z+8zsmbOCD0lgRUo7jAHFEhjQgKKAGHcDDSgKiHE30ICigBh3Aw0oCohxN9CAooAYdwMNKAqIcTfQgKKAGHcDDSgKiHE30ICigBh3Aw0oCohxN9CAooAYdwMNKAqIcTewcMAT1Xxr4pyTxefcwJfAuWryV8D5yRSEE88V8AbwoDXXSWB2TZwr4GvgTAvwa9XCb0JhkkfnCngNeNwxbSAeA/4mlxh5wrkC7qyW6/6OuU4Db0fOmzw2V8AYdB8QF5I24k9gT3KJkSecM2CMdAV40jHbbC4ocwcMu8/A0Q7Eu8CdkcVJFssBMJBu90y8DhxKpjHiRDkAXgBebDBbXLG7lvkIjuGRHABjquaupD3lUpdyLoCBVv/etZfzUm+wcwKsm/cb2NGq4Tvg1PAFqCdyBIw9cuyV28dN4L5OMuwMOQIeAD4AsVtpHt+BI8CvYQTat3MEjIn79spXgacaybB0roAx5SPgese4e4EfwxjGfztnwEvAs57RY/+8KY+9cgbcDnwCDi4TMWfAcIt3Jg87ntjEZ3F/eBz4M36BLk7mDhgT7gbe9yBeBJ4vZhj/jRIA6+k/Vo1saky+zSsJMJZzIDaPyR++lgQYcHETvauF+AW4PNVVuTTAe8Ctjl+0yR44lAbY9x6lvirHy/mk94elAQbUpiKWCLgIMX4TD4+/cfk/WSrgIsSzwJsUiCUDboSY7LVo6YA1Yjx0WK0aF39QCsAkx1YArKHiz0rbgPirXLJjKwEmQ2ueyIAiqwENKAqIcTfQgKKAGHcDDSgKiHE30ICigBh3Aw0oCohxN9CAooAYdwMNKAqIcTfQgKKAGHcDRcB/vtFJUXCOPzsAAAAASUVORK5CYII=",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAABB9JREFUeF7tmv2xTjEQh/dWgApQASpABXSAClABKkAF6IAKUAEqQAd0YB7OzmQySU7y7smHe/fMvP/cmz1Jnvx2s9mcM/HHRODMZO3G4gCNInCADtBIwGjuCnSARgJGc1egAzQSMJq7Ah2gkYDR3BXoAI0EjOauQAdoJGA0dwU6QCMBo7kr0AEaCRjNXYEO0EjAaO4KdIBGAkZzV6ADNBIwmrsCFwV4WUQebGP7ICI/jONc1ryHAm+KyEcRASIP8G6JyK8OFK6JyD0RoU/6eTd6sXoAfC4izyJYL0SEvx/5AO979MKvInK302Ilx94D4BMReRn1hvquHzyxVD90+1REXh25UqV39QCYUoaO4e02wSPcOaV0+umh9izDHgDpDFC6icSdH6VG4t6XxMzOBUA2EIL6pczSEewfGt2MjerOeQXIvFDIpwLEKyfGRBaHTYoYmHr++xgYTorJMlF+KTW2xkTeh/JYnNTzbVPlETG2ykF6xcC481zAp11LTMztvLzn9ZYqDYNHp6MA7sVETiv3K5b8/ZY4x00/Z+JhxSttTUYBrImJ5ImlI19OfT83lx6qPMU+EiB9lmJiKfhjx6lDj4c6/t8iQt45Bd5IF66JiaVYmFPfoy3ntPmhwXq0AnWorcew1CZ0RC5pQPfPdBZAXJGD/9VoBmwSqEpdknacq1NJ99ATR470LICMhwP/48TAgEdFhQ0lFffUZGjCvCJAVPUmMzAgcorJpTbTN49Zu3DIC/cE0o3GQAQ8zsCEgOnPTBfWtAZXzlVuQkCAoy2/aWlLvGIrAAQeZ9u96swSm8ZKAEmAqefFyXHKLZeJebMB6m0dimODqIW3TMybCXCvFJXbEIZfFLXsTCNjYKnMvzfmJXK+1CBHAczdX4RjohjKk0prqPXlKtB78Lv+fwTAXCVFJxamJ/wNpXJZHj6kLZq+cAa+UGlM7sRBEZVEGmAhkNK1KFD1qHchEun4M49QdaU63l68XAZiTxcuue5eHW/vCmAZJfYEmKv51SbFe9eiS0DsCTBVBG0tBKBEYqheBaSuRqe682iAlvNsSZHTII4GGFecW3O05SCOBggwKs3ssrglyiFJbsnrloLYE2DpK4JQeaecdZeB2BNgTSqiIE+5YVsCYk+AwKlJRTQd0a9KW1x6OsTeAIGjqQhpTe57QYtLT4U4AqDCCXM6CqS3C1twa1oyDeJIgCGv3MV6qgJTm+polTvVvnVBavuc9mWCunaqdFU9+MaGLd8hVr96lgLDAVKVIcFuvR+unmTQ0HISSva3AkBVY+lT4FNgpWz2qkDN/awCUAdem/Y0T1REuDLIfVt9yvv+2qwGMEx7aq48aydO/Isr37W2xXYrAjxkYqNe4gCNpB2gAzQSMJq7Ah2gkYDR3BXoAI0EjOZ/AK421VHjR1EzAAAAAElFTkSuQmCC",
          "",
          "",
          "data:image/png;base64,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",
          "",
          "",
          "",
          "",
        ],
        canvasId: 1,
      };

      uriStorageRef.current = canvas.tiles;
      canvasId.current = canvas.canvasId;
      return uriStorageRef.current;
    } catch (err) {
      console.log("Error with axios.get('/api/modifyCanvas')", err);
    }
  };

  useEffect(() => {
    const doAsync = async () => {
      setUriStorage(await fetchUriStorage());
      //select random tile
      let remainingIndices = [];
      uriStorageRef.current.map((img, i) => {
        if (img === "") {
          remainingIndices.push(i);
        }
      });

      setSelectedTile(
        remainingIndices[
          Math.floor(Math.random() * (remainingIndices.length - 1))
        ]
      );
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
    lines[lines.length - 1].color = COLORCONVERT[color];

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
    uriStorageRef.current[selectedTile] = uri.toString();

    //POST NEW DATA TO BACKEND
    console.log("PASS BELOW DATA TO BACKEND");
    console.log({
      updatedTiles: uriStorageRef.current,
      canvasId: canvasId.current,
    });

    setSelectedTile(-1);
    setLines([]);

    // INSERT PROOF GENERATION, MODAL AND PAGE REDIRECT HERE
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
          <div>
            <div className="w-4 h-4 bg-black rounded-full mr-5 mb-5 mr-2 cursor-pointer"></div>
            <div className="w-4 h-4 bg-red-600 rounded-full mr-5 mb-5 cursor-pointer"></div>
            <div className="w-4 h-4 bg-orange-500 rounded-full mr-5 mb-5 cursor-pointer"></div>
            <div className="w-4 h-4 bg-yellow-300 rounded-full mr-5 mb-5 cursor-pointer"></div>
            <div className="w-4 h-4 bg-green-600 rounded-full mr-5 mb-5 cursor-pointer"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full mr-5 mb-5 cursor-pointer"></div>
            <div className="w-4 h-4 bg-purple-600 rounded-full mr-5 cursor-pointer"></div>
          </div>
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
          {/* <div className={`w-8 h-8 bg-red-500 rounded-full mr-2`}></div> */}

          {/* NEW COLOR DROP DOWN ITEM*/}
          {/* <div className="mr-1">
            <Button text="Color" />
          </div>
          <div>
            <select
              className={`${color}`}
              onChange={(e) => {
                console.log(e.target.value);
                setColor(e.target.value);
              }}
            >
              <option className="text-black" value="text-black">
                ▇
              </option>
              <option className="text-red-600" value="text-red-600">
                ▇
              </option>
              <option className="text-orange-500" value="text-orange-500">
                ▇
              </option>
              <option className="text-yellow-300" value="text-yellow-300">
                ▇
              </option>
              <option className="text-green-600" value="text-green-600">
                ▇
              </option>
              <option className="text-blue-600" value="text-blue-600">
                ▇
              </option>
              <option className="text-purple-600" value="text-purple-600">
                ▇
              </option>
            </select>
          </div> */}
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
