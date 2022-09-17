import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Subgraphs } from '../../hooks/subgraphs'
import Header from '../../components/Header'

const BoothDisplay = ({ images, artBoard }) => {
  const [gallaryImages, setGallaryImages] = useState(images)
  const [liveCanvas, setLiveCanvis] = useState()

  console.log('Artboard from Server', artBoard)

  useEffect(() => {
    axios
      .get('/api/modifyCanvas')
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error))
    // handle updaing data
  }, [gallaryImages])

  return (
    <div className="h-screen bg-brand-blue">
      <Header />
      <div className="container flex mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <section className="w-1/2">
          <p>Active Artboard goes here</p>
        </section>
        <section className="overflow-hidden text-gray-700 w-1/2">
          <div className="container p-2 lg:pt-12 lg:px-32">
            <ul className="flex flex-wrap -m-1 md:-m-2">
              {gallaryImages.map((img) => (
                <li key={img.id} className="flex flex-wrap w-1/4">
                  <picture>
                    <img alt="gallery" className="block object-cover object-center w-full h-auto" src={img.uri} />
                  </picture>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

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
