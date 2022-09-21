import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Subgraphs } from '../../hooks/subgraphs'
import Header from '../../components/Header'
import TazBoothHeaderLogo from '../../components/TazBoothHeaderLogo'
import TazBoothHeaderDate from '../../components/TazBoothHeaderDate'
import TazBoothFooter from '../../components/TazBoothFooter'
import TazBoothCanvasGrid from '../../components/TazBoothCanvasGrid'

const BoothDisplay = ({ images, artBoard }) => (
  <div className="flex flex-col h-full justify-between bg-brand-black">
    <TazBoothHeaderLogo />
    <TazBoothHeaderDate />
    <TazBoothCanvasGrid images={images} />
    <TazBoothFooter />
  </div>
)

export default BoothDisplay

// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
  const subgraphs = new Subgraphs()
  const imagesRequest = subgraphs.getMintedTokens()
  // const artBoardRequest = axios.get('/api/modifyCanvas')

  const [images] = await Promise.all([imagesRequest])

  return {
    props: { images }
  }
}
