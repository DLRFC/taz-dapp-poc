import React, { useState, createRef, useEffect, useRef } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import axios from 'axios'
import { useGenerateProof } from '../../hooks/useGenerateProof'

import { useRouter } from 'next/router'
import ArtBoardComponent from './View'

export default function artBoard() {
  const [generateFullProof] = useGenerateProof()
  const [identityKey, setIdentityKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading Message')

  const router = useRouter()

  const colors = [
    'black',
    'red-600',
    'orange-500',
    'yellow-300',
    'green-600',
    'blue-600',
    'purple-600',
  ]

  const [selectedTile, setSelectedTile] = useState()
  const [tiles, setTiles] = useState([''])

  const stageRef = React.useRef(null)
  const tilesRef = React.useRef()
  const canvasId = React.useRef(null)
  const runFetch = useRef(false)

  const ref = createRef(null)
  const [image, takeScreenShot] = useScreenshot({})

  useEffect(() => {
    let tilesTemp, canvasIdTemp, selectedTileTemp
    const fetchData = async () => {
      if (runFetch.current === false) {
        try {
          const result = await axios.get('/api/modifyCanvas')
          console.log('result:')
          console.log(result)

          tilesTemp = result.data.canvas.tiles
          canvasIdTemp = result.data.canvas.canvasId

          // select random tile
          const remainingIndices = []

          // Why not change to a for loop?
          // tiles.map((img, i) => {
          //   if (img === '') {
          //     remainingIndices.push(i)
          //   }
          // })
          for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].img === '') {
              remainingIndices.push(i)
            }
          }

          selectedTileTemp =
            remainingIndices[
              Math.floor(Math.random() * (remainingIndices.length - 1))
            ] || 0

          setTiles(tilesTemp)
          tilesRef.current = tilesTemp
          canvasId.current = canvasIdTemp
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

  const generateCanvasUri = async () => {
    setSelectedTile(-1)
    return await takeScreenShot(ref.current)
  }

  const submit = async () => {
    const uri = stageRef.current.toDataURL()
    tilesRef.current[selectedTile] = uri.toString()

    const tilesRemaining = tilesRef.current.filter((v) => v === '')

    let canvasUri
    if (tilesRemaining.length === 0) {
      canvasUri = await generateCanvasUri()
    }

    setIsLoading(true)
    setLoadingMessage('Art being Submitted, please wait')

    // axios POSTs
    console.log('POSTING to /api/modifyCanvas:')
    console.log('tilesRef.current: ', tilesRef.current)
    console.log('canvasId.current: ', canvasId.current)
    const response = await axios.post('/api/modifyCanvas', {
      updatedTiles: tilesRef.current,
      canvasId: canvasId.current,
    })
    console.log('RESPONSE FROM /api/mintFullCanvas:')
    console.log(response)

    if (tilesRemaining.length === 0) {
      console.log('POSTING to /api/mintFullCanvas')
      console.log('canvasUri: ', canvasUri)
      console.log('canvasId.current: ', canvasId.current)
      const response = await axios.post('/api/mintFullCanvas', {
        imageUri: canvasUri,
        canvasId: canvasId.current,
      })
      console.log('RESPONSE FROM /api/mintFullCanvas:')
      console.log(response)
    }

    setIsLoading(false)
    router.push('/artGallery-page')
  }

  const handleGenerateProof = async () => {
    const {
      fullProofTemp,
      solidityProof,
      nullifierHashTemp,
      externalNullifier,
      signal,
    } = await generateFullProof(identityKey)
    console.log('fullProof', fullProofTemp)
    console.log('solidityProof', solidityProof)
    console.log('nullifierHashTemp', nullifierHashTemp)
    console.log('externalNullifier', externalNullifier)
    console.log('signal', signal)
  }

  const onClose = () => {
    setIsLoading(!isLoading)
  }
  return (
    <ArtBoardComponent
      isLoading={isLoading}
      onClose={onClose}
      loadingMessage={loadingMessage}
      submit={submit}
      colors={colors}
      ref={ref}
      handleGenerateProof={handleGenerateProof}
      setSelectedTile={setSelectedTile}
      selectedTile={selectedTile}
      tiles={tiles}
      stageRef={stageRef}
    />
  )
}
