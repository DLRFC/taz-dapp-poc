import React, { useState, createRef, useEffect, useRef } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import Button from '../Button'
import ArtBoardComponent from './View'

export default function artBoard() {
  const [generateFullProof] = useGenerateProof()
  const [identityKey, setIdentityKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFilling, setIsFilling] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading Message')
  const [lines, setLines] = useState([])
  const [color, setColor] = React.useState('black')
  const [fillColor, setFillColor] = React.useState()

  const router = useRouter()

  const [selectedTile, setSelectedTile] = useState()
  const [tiles, setTiles] = useState([''])

  const stageRef = useRef(null)
  const tilesRef = useRef()
  const canvasId = useRef(null)
  const runFetch = useRef(false)

  const canvasRef = useRef(null)
  const borderRef = useRef(null)
  const [image, takeScreenShot] = useScreenshot({})

  useEffect(() => {
    let tilesTemp
    let selectedTileTemp
    const fetchData = async () => {
      if (runFetch.current === false) {
        try {
          const result = await axios.get('/api/modifyCanvas')
          console.log('result:')
          console.log(result)

          tilesTemp = result.data.canvas.tiles
          canvasId.current = result.data.canvas.canvasId
          console.log('tilesTemp: ', tilesTemp)
          console.log('canvasId.current: ', canvasId.current)

          const remainingIndices = []

          for (let i = 0; i < tilesTemp.length; i++) {
            if (tilesTemp[i] === '') {
              remainingIndices.push(i)
            }
          }

          selectedTileTemp = remainingIndices[Math.floor(Math.random() * (remainingIndices.length - 1))] || 0

          console.log('selectedTileTemp: ', selectedTileTemp)
          setTiles(tilesTemp)
          tilesRef.current = tilesTemp
          setSelectedTile(selectedTileTemp)
        } catch (err) {
          console.log("Error with axios.get('/api/modifyCanvas')", err)
        }
      }
    }
    fetchData()
    return () => {
      console.log('Use Effect Finished')
      runFetch.current = true
    }
  }, [identityKey])

  const handleUndo = () => {
    lines.pop()
    setLines(lines.concat())
  }
  const handleFill = () => {
    setIsFilling(!isFilling)
  }

  const startDrawing = () => {
    setIsDrawing(true)
  }
  const minimize = () => {
    setIsDrawing(false)
  }

  const handleColorSelect = (e) => {
    console.log('handleColorSelect: ', e.target)
    if (isFilling) {
      setFillColor(e.target.id)
      setIsFilling(!isFilling)
    } else {
      setColor(e.target.id)
    }
  }

  const generateCanvasUri = async () => {
    console.log('canvasRef.current: ', canvasRef.current)
    return await takeScreenShot(canvasRef.current)
  }

  const submit = async () => {
    // removeBorder
    borderRef.current.className = 'touch-none bg-white h-[250] w-[250]'

    handleGenerateProof()

    const uri = stageRef.current.toDataURL()
    tilesRef.current[selectedTile] = uri.toString()

    const tilesRemaining = tilesRef.current.filter((x) => x === '')

    let canvasUri
    if (tilesRemaining.length === 0) {
      setSelectedTile(-1)
      canvasUri = await generateCanvasUri()
    }

    setIsLoading(true)
    setLoadingMessage(`1. Generating zero knowledge proof \n 
        2. Submitting message transaction`)

    // axios POSTs
    console.log('POSTING to /api/modifyCanvas:')
    console.log('tilesRef.current: ', tilesRef.current)
    console.log('canvasId.current: ', canvasId.current)
    const response = await axios.post('/api/modifyCanvas', {
      updatedTiles: tilesRef.current,
      canvasId: canvasId.current
    })
    console.log('RESPONSE FROM /api/modifyCanvas:')
    console.log(response)

    if (tilesRemaining.length === 0) {
      console.log('POSTING to /api/mintFullCanvas')
      console.log('canvasUri: ', canvasUri)
      console.log('canvasId.current: ', canvasId.current)
      const response = await axios.post('/api/mintFullCanvas', {
        imageUri: canvasUri,
        canvasId: canvasId.current
      })
      console.log('RESPONSE FROM /api/mintFullCanvas:')
      console.log(response)
    }
    router.push('/artGallery-page')
  }

  const handleGenerateProof = async () => {
    const { fullProofTemp, solidityProof, nullifierHashTemp, externalNullifier, signal } = await generateFullProof(
      identityKey
    )
    console.log('fullProof', fullProofTemp)
    console.log('solidityProof', solidityProof)
    console.log('nullifierHashTemp', nullifierHashTemp)
    console.log('externalNullifier', externalNullifier)
    console.log('signal', signal)
  }

  return (
    <ArtBoardComponent
      isLoading={isLoading}
      startDrawing={startDrawing}
      isDrawing={isDrawing}
      loadingMessage={loadingMessage}
      submit={submit}
      canvasRef={canvasRef}
      borderRef={borderRef}
      selectedTile={selectedTile}
      setSelectedTile={setSelectedTile}
      tiles={tiles}
      lines={lines}
      setLines={setLines}
      stageRef={stageRef}
      handleUndo={handleUndo}
      handleFill={handleFill}
      handleColorSelect={handleColorSelect}
      isFilling={isFilling}
      color={color}
      fillColor={fillColor}
      setColor={setColor}
      setFillColor={setFillColor}
      minimize={minimize}
    />
  )
}
