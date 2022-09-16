import React, { useEffect, useState } from 'react'

import { Subgraphs } from '../../hooks/subgraphs'
import Header from '../../components/Header'

const BoothDisplay = ({ images }) => {
  const [gallaryImages, setGallaryImages] = useState(images)

  useEffect(() => {}, [gallaryImages])

  return (
    <div className="h-screen bg-brand-blue">
      <Header />
      <div className="flex w-1/2">
        <section></section>
        <section className="overflow-hidden text-gray-700 ">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">
              {gallaryImages.map((img) => (
                <div key={img.id} className="flex flex-wrap w-1/4">
                  <div className="w-full p-1 md:p-2">
                    <picture>
                      <img
                        alt="gallery"
                        className="block object-cover object-center w-full h-auto rounded-lg"
                        src={img.uri}
                      />
                    </picture>
                  </div>
                </div>
              ))}
            </div>
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
  const images = await subgraphs.getMintedTokens()

  return {
    props: { images }
  }
}
