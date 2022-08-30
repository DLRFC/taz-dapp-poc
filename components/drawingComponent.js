import React from 'react'
// import { createRoot } from 'react-dom/client'
import { Stage, Layer, Line } from 'react-konva'
// import { Random } from 'roughjs/bin/math'

const Drawing = (props) => {
  const [tool, setTool] = React.useState('pen')
  const [lines, setLines] = React.useState([])
  const [color, setColor] = React.useState([])
  const isDrawing = React.useRef(false)
  const stageRef = React.useRef(null)
  const [uriStorage, setUriStorage] = React.useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ])

  // useEffect(() => {
  //   setUriStorage(uriStorage);
  // },[uriStorage])

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
    lines[lines.length - 1].color = color

    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  const newColor = () => {
    const newColor =
      'rgb(' +
      Math.random() * 255 +
      ',' +
      Math.random() * 255 +
      ',' +
      Math.random() * 255 +
      ')'
    setColor(newColor)
  }

  const handleUndo = () => {
    lines.pop()
    setLines(lines.concat())
  }

  const exportUri = () => {
    const uri = stageRef.current.toDataURL()

    setUriStorage((uriStorage) => {
      uriStorage[props.selectedImage] = [
        ...uriStorage[props.selectedImage],
        uri.toString(),
      ]
      props.uriStorageCallback(uriStorage)
      console.log(uriStorage)
      return uriStorage
    })
  }

  const uriStorageRender = () => {
    if (uriStorage[props.selectedImage]) {
      const uriStorageRender = uriStorage[props.selectedImage].map(
        (item, index) => (
          <div className="container" key={index}>
            <img src={item} alt="" className="image"></img>
          </div>
        ),
      )
      return uriStorageRender
    }
  }

  return (
    <div className="border-black bg-transparent touch-none">
      <h1>SKETCHING AREA</h1>
      <div className="border-black max-w-[250px] border-2 touch-none">
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
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value)
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <button onClick={newColor}>New Color </button>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={exportUri}>Export Uri</button>

      <div className="uriStorageRendering">{/* uriStorageRender() */}</div>
      {/* <img src={uriStorage[1]} alt=''></img> */}
    </div>
  )
}

export default Drawing
