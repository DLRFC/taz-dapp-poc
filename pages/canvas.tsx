import { FC } from 'react'
import dynamic from 'next/dynamic'

const Drawing = dynamic(() => import('../components/drawingComponent'), { ssr: false })

const CanvasPage: FC = () => {
  return (
    <>
        <Drawing />
    </>
    

  )
}

export default CanvasPage