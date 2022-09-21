import { useState } from 'react'
import axios from 'axios'

export default function RemoveTile() {
  const [canvasId, setCanvasId] = useState('')
  const [tileId, setTileId] = useState('')
  const [pwd, setPwd] = useState('')

  const submit = async () => {
    const response = await axios.post('/api/removeTile', {
      canvasId: parseInt(canvasId),
      tileId: parseInt(tileId),
      pwd
    })
    console.log(response)
  }

  return (
    <div className="relative min-h-[920px]">
      <div className="flex flex-col w-[300px] p-5">
        <h1 className='font-bold'>Remove A Tile</h1>
        <div className="mt-8">
          <label>Canvas ID</label>
          <input placeholder="Enter Canvas ID" className="mb-3" value={canvasId} onChange={(e) => setCanvasId(e.target.value)}></input>
          <label>Tile number</label>
          <input placeholder="Enter Tile Number" className="mb-3" value={tileId} onChange={(e) => setTileId(e.target.value)}></input>
          <label>Password</label>
          <input placeholder="Enter Password" className="mb-3" value={pwd} onChange={(e) => setPwd(e.target.value)}></input>
          <button type="button" className="bg-blue-300 text-gray-700 font-bold p-2 mt-3" onClick={submit}>
            Submit{' '}
          </button>
        </div>
      </div>
    </div>
  )
}
