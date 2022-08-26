import { FC } from 'react'
import dynamic from 'next/dynamic'

const Drawing = dynamic(() => import('../components/drawingComponent'), { ssr: false })
const Drawing2 = dynamic(() => import('../components/drawingComponent2'), { ssr: false })


const CanvasPage: FC = () => {
  return (
    <>
        <Drawing2 />
    </>
    

  )
}

export default CanvasPage