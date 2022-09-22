// import dynamic from 'next/dynamic'
// import { useState, useEffect } from 'react'
import ExperiencesList from '../components/ExperiencesList'
import Footer from '../components/Footer'
import Link from 'next/link'
// const InvitationCheck = dynamic(() => import('../components/InvitationCheck'), {
//   ssr: false,
// })

export default function ExperiencesListPage({ clearIdentity }) {
  return (
    <div>
      {' '}
      <ExperiencesList />{' '}
      <div className="z-20 relative flex items-left flex-col p-12 pb-5 bg-black text-brand-yellow mt-12">
        <div className="py-10 px-5 flex items-end justify-between bg-black">
          <div className="transform -ml-6 text-xl tracking-widest text-brand-beige">
            <h1>TEMP_RARY</h1>
            <h1 className="bg-brand-beige px-1 text-brand-black">AN_NYMOUS</h1>
            <h1>Z_NE</h1>
          </div>
        </div>

        <a
          href="https://pse-team.notion.site/About-the-TAZ-app-1ae2793046414468b56472f43725961e"
          target="_blank"
          className="pb-10 underline"
          rel="noreferrer"
        >
          About this app
        </a>
        <a href="http://semaphore.appliedzkp.org/" target="_blank" className="pb-10 underline" rel="noreferrer">
          About Semaphore
        </a>
        <a
          href="http://esp.ethereum.foundation/semaphore-grants"
          target="_blank"
          className="pb-10 underline"
          rel="noreferrer"
        >
          Semaphore Grants Round
        </a>
        <a href="https://appliedzkp.org/" target="_blank" className="pb-14 underline" rel="noreferrer">
          Privacy & Scaling Explorations
        </a>
        <div className="flex item-center justify-between">
          <Link href="/identity">
            <button className="bg-brand-yellow text-[14px] text-black py-1 px-3 rounded-full mb-20">
              View Semaphore ID
            </button>
          </Link>
          <button
            className="bg-brand-gray2 border-brand-yellow border-[1px] text-[14px] text-brand-yellow py-1 px-3 rounded-full mb-20"
            onClick={clearIdentity}
          >
            Disconnect ID
          </button>
        </div>

        <Footer />
      </div>
    </div>
  )
}
