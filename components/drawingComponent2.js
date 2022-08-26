import { FastLayer } from 'konva/lib/FastLayer';
import React, {useRef, useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Line, Text } from 'react-konva';

const Drawing2 = () => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing,setIsDrawing] = useState(false)

  useEffect(() => {
    // const canvas = canvasRef.current;
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // canvas.style.width = `1000px`;
    // canvas.style.height = `1000px`

    // const context = canvas.getContext("2d")
    // context.scale(2,2);
    // context.lineCap = "round"
    // context.strokeStyle="black"
    // context.lineWidth = 5
    // contextRef.current = context;
  },[])

  // const startDrawing = ({nativeEvent}) => {
  //   const {offsetX, offsetY} = nativeEvent;
  //   contextRef.current.beginPath()
  //   contextRef.current.moveTo(offsetX,offsetY)
  //   setIsDrawing(true)

  // }
  // const finishDrawing = () => {
  //   contextRef.current.closePath()
  //   setIsDrawing(false)
  // }
  // const draw = ({nativeEvent}) => {
  //   if(!isDrawing){
  //     return
  //   }
  //   const {offsetX, offsetY} = nativeEvent;
  //   contextRef.current.lineTo(offsetX,offsetY)
  //   contextRef.current.stroke()
  // }


// var src =
// "https://write.geeksforgeeks.org/wp-content/uploads/gfg-39.png";

// if( is_touch_enabled() ) {
//     setTouch(true);
//     setIsDrawing(src)
// }
// else {
//     setTouch(false);
//     var img = "";
// }

const isTouchDevice = () => {  
  return window.matchMedia("(pointer: coarse)").matches  
}  


  return (
    <div>
     {/* <canvas 
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
     /> */}
     <isTouchDevice />
    </div>
  );
};


export default Drawing2