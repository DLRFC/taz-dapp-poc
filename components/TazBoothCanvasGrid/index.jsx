import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TazBoothCanvasGrid = ({ images }) => {
  const [gallaryImages, setGallaryImages] = useState(images)

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
    <div className="container h-fit flex py-6 sm:px-6 lg:px-8">
      <section className="overflow-hidden text-gray-700 w-1/2">
        <div className="container p-2">
          <ul className="flex flex-wrap -m-1 md:-m-2">
            {gallaryImages.map((img) => (
              <li key={img.id} className="flex flex-wrap w-1/4 border border-brand-gray2">
                <picture>
                  <img alt="gallery" className="block object-cover object-center w-full h-auto" src={img.uri} />
                </picture>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default TazBoothCanvasGrid
