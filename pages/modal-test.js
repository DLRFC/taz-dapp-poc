import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
// import Modal from './Modal/Modal'
import LoadingModal from '../components/loadingModal.js'
// import './style.css'

export default function ModalTest() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="container">
      <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => null}
      >
        {showModal && <LoadingModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
      <button className="button" onClick={() => setShowModal(true)}>
        Show Modal
      </button>
    </div>
  )
}
