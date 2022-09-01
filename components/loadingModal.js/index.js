import React, { useState } from 'react'

// import styles from './Modal.module.css'
import { motion } from 'framer-motion'

export default function LoadingModal({
  onClose,
  loadingMessage,
  loadingProof,
}) {
  const handleClick = () => {
    onClose && onClose()
  }
  // Special thanks to fireship.io for this beautiful code snippet to animate modal drop in.
  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '-100vh',
      opacity: 0,
    },
  }

  return (
    <div
      onClick={handleClick}
      className="absolute h-[100vh] w-[100vw] bg-[#00000070] flex flex-col items-center justify-center"
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="w-[70%] h-[50%] bg-brand-beige2 border-[1px] flex flex-col items-center justify-center rounded-[5px]"
      >
        <h1 className="font-xl text-center text-brand-gray">
          {loadingMessage}
        </h1>
        <h1 className="font-xl text-center w-[80%] p-3 text-brand-gray text-clip overflow-clip">
          {loadingProof}
        </h1>
        {/* <button className="border-2 border-brand-gray" onClick={onClose}>
          Close
        </button> */}
      </motion.div>
    </div>
  )
}
