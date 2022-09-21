import { useState, useEffect } from 'react'

import QRCode from 'qrcode'
import Link from 'next/link'
import UserIdentity from '../components/GenerateIdentity'
import BackTAZ from '../components/ArrowNavigators/BackTAZ'

export default function GenerateIdentityPage() {
  const [identity, setIdentity] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    const identityKey = window.localStorage.getItem('identity')
    setIdentity(identityKey)
    const opts = {
      type: 'image/jpeg',
      color: {
        dark: '#1E1E1E',
        light: '#EAE1DA'
      }
    }
    QRCode.toDataURL(identityKey, opts).then((response) => {
      setImageUrl(response)
    })
  })

  return (
    <div className="h-[920px] flex flex-col  justify-center bg-brand-blue">
      <div className="flex flex-col items-center justify-center h-[700px]">
        <img src={imageUrl} alt="img" className="mb-7 rounded-xl" />
        <button className="border-2 border-brand-gray2 bg-brand-gray2 text-brand-beige p-2 text-brand-button rounded-2xl">
          <div className="flex items-center">
            <span>Screenshot!</span>
            <div className="px-2">
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2100_9458)">
                  <path
                    d="M1.89001 2.662C1.89122 2.48692 1.96068 2.31934 2.08337 2.19548C2.20606 2.07161 2.37214 2.0014 2.54573 2H14.4543C14.8165 2 15.11 2.29667 15.11 2.662V13.338C15.1088 13.5131 15.0394 13.6807 14.9167 13.8045C14.794 13.9284 14.6279 13.9986 14.4543 14H2.54573C2.37176 13.9998 2.20498 13.93 2.08203 13.8059C1.95908 13.6817 1.89001 13.5135 1.89001 13.338V2.662ZM3.21202 3.33333V12.6667H13.788V3.33333H3.21202ZM8.50002 10C9.02595 10 9.53033 9.78929 9.90222 9.41421C10.2741 9.03914 10.483 8.53043 10.483 8C10.483 7.46957 10.2741 6.96086 9.90222 6.58579C9.53033 6.21071 9.02595 6 8.50002 6C7.9741 6 7.46971 6.21071 7.09783 6.58579C6.72594 6.96086 6.51702 7.46957 6.51702 8C6.51702 8.53043 6.72594 9.03914 7.09783 9.41421C7.46971 9.78929 7.9741 10 8.50002 10ZM8.50002 11.3333C7.62348 11.3333 6.78284 10.9821 6.16303 10.357C5.54322 9.7319 5.19502 8.88406 5.19502 8C5.19502 7.11595 5.54322 6.2681 6.16303 5.64298C6.78284 5.01786 7.62348 4.66667 8.50002 4.66667C9.37657 4.66667 10.2172 5.01786 10.837 5.64298C11.4568 6.2681 11.805 7.11595 11.805 8C11.805 8.88406 11.4568 9.7319 10.837 10.357C10.2172 10.9821 9.37657 11.3333 8.50002 11.3333ZM11.805 4H13.127V5.33333H11.805V4Z"
                    fill="#EAE1DA"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2100_9458">
                    <rect width="15.864" height="16" fill="white" transform="translate(0.567993)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </button>
        <Link href="/">
          <button className="border-2 border-brand-yellow bg-brand-yellow text-brand-gray2 p-2 text-[20px] rounded-2xl mt-20">
            <div className="flex items-center">
              <span>Go back Menu</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  )
}
