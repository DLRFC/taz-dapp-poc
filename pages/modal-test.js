import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
// import Modal from './Modal/Modal'
import LoadingModal from '../components/loadingModal.js'
import useGetMembers from '../hooks/useGetMembers.js'
// import './style.css'

export default function ModalTest() {
  const [showModal, setShowModal] = useState(false)
  const { data } = useGetMembers()
  console.log('Hook Result')
  console.log(data)

  const handleGetMembersHook = async () => {
    console.log('Members List')
    const { membersList, group } = data
    console.log(membersList)
    console.log(group.root)
  }
  return (
    <div className="container flex items-center justify-center flex-col">
      <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => null}
      >
        {showModal && <LoadingModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
      <button
        className="button my-10 p-3 bg-gray-300"
        onClick={() => setShowModal(true)}
      >
        Show Modal
      </button>
      <button className="p-3 bg-gray-300 mt-5" onClick={handleGetMembersHook}>
        Test GetMembers Hook
      </button>
    </div>
  )
}
