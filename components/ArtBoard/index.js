import React, { useState, createRef, useEffect, useRef } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import ArtBoardComponent from './View'

export default function artBoard() {
  const [generateFullProof] = useGenerateProof()
  const [identityKey, setIdentityKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tool, setTool] = useState()
  const [userSelectedTile, setUserSelectedTile] = useState(false)

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
    let identityKeyTemp = ''
    if (identityKeyTemp === '') {
      identityKeyTemp = window.localStorage.getItem('identity')
      setIdentityKey(identityKeyTemp)
      // setIsMember(true)
    }
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
  }, [])

  const handleUndo = () => {
    lines.pop()
    setLines(lines.concat())
  }

  const toggleTool = (e) => {
    if (e.target.alt === 'fill') {
      console.log('settofill')
      setTool('fill')
    } else {
      setTool('pen')
    }
  }

  const startDrawing = (i) => {
    if (tiles[i] == '' && userSelectedTile == false) {
      setIsDrawing(true)
      setSelectedTile(i)
    } else if (i == selectedTile) {
      setIsDrawing(true)
    } else {
      console.log('You Cannot select this Tile')
    }
  }
  const minimize = () => {
    const uri = stageRef.current.toDataURL()
    console.log('uri', uri)
    console.log('selectedTile', selectedTile)
    console.log('tiles', tiles)
    tiles[selectedTile] = uri
    setUserSelectedTile(true)
    setIsDrawing(false)
  }

  const handleColorSelect = (e) => {
    console.log('handleColorSelect: ', e.target)
    if (tool === 'fill') {
      setFillColor(e.target.id)
      setColor(e.target.id)
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
    // borderRef.current.className = 'touch-none bg-white h-[250] w-[250]'

    // const uri = stageRef.current.toDataURL()
    // tilesRef.current[selectedTile] = uri.toString()

    const tilesRemaining = tilesRef.current.filter((x) => x === '')

    let canvasUri
    if (tilesRemaining.length === 0) {
      setSelectedTile(-1)
      canvasUri = await generateCanvasUri()
    }

    setIsLoading(true)
    setLoadingMessage(`1. Generating zero knowledge proof`)
    const signal = 'proposal_1'
    const { fullProofTemp, solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } =
      await generateFullProof(identityKey, signal)
    // axios POSTs
    console.log('POSTING to /api/modifyCanvas:')
    console.log('tilesRef.current: ', tilesRef.current)
    console.log('canvasId.current: ', canvasId.current)
    setLoadingMessage(`2. Submitting message transaction`)

    const response = await axios.post('/api/modifyCanvas', {
      updatedTiles: tilesRef.current,
      tileIndex: selectedTile,
      canvasId: canvasId.current
    })
    console.log('RESPONSE FROM /api/modifyCanvas:')
    console.log(response)

    if (tilesRemaining.length === 0) {
      const body = {
        imageUri: canvasUri,
        canvasId: canvasId.current,
        groupId,
        signal,
        nullifierHash,
        externalNullifier,
        solidityProof,
        merkleTreeRoot
      }
      console.log('POSTING to /api/mintFullCanvas')
      console.log('canvasUri: ', canvasUri)
      console.log('canvasId.current: ', canvasId.current)
      const mintResponse = await axios.post('/api/mintFullCanvas', body)
      console.log('RESPONSE FROM /api/mintFullCanvas:')
      console.log(mintResponse)
    }
    router.push('/artGallery-page')
  }

  const handleResetTile = () => {
    tiles[selectedTile] = ''
    setUserSelectedTile(false)
  }

  // const handleGenerateProof = async () => {
  //   const { fullProofTemp, solidityProof, nullifierHashTemp, externalNullifier, signal, merkleTreeRoot, groupId } =
  //     await generateFullProof(identityKey)
  //   console.log('fullProof', fullProofTemp)
  //   console.log('solidityProof', solidityProof)
  //   console.log('nullifierHashTemp', nullifierHashTemp)
  //   console.log('externalNullifier', externalNullifier)
  //   console.log('merkleTreeRoot', merkleTreeRoot)
  //   console.log('groupId', groupId)
  //   console.log('signal', signal)
  // }

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
      toggleTool={toggleTool}
      handleColorSelect={handleColorSelect}
      tool={tool}
      color={color}
      fillColor={fillColor}
      setColor={setColor}
      setFillColor={setFillColor}
      minimize={minimize}
      handleResetTile={handleResetTile}
    />
  )
}
