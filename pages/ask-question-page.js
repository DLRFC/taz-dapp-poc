import AskQuestion from '../components/AskQuestion'
// import { GenerateIdentity } from '../components/GenerateIdentity'
// import { useIdentity } from '../components/IdentityProvider'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { Identity } from '@semaphore-protocol/identity'
// import { Group } from '@semaphore-protocol/group'
// const { Subgraph } = require('@semaphore-protocol/subgraph')

export default function AskQuestionPage() {
  // const [localIdentity, setLocalIdentity] = useState()
  const [isMember, setIsMember] = useState(false)
  let identityKey = ''
  // console.log('Identity Found')
  // console.log(identityKey)
  // console.log(window.localStorage)
  // const router = useRouter()
  // const { invitation } = router.query

  useEffect(() => {
    // // setter
    // console.log(window)
    // console.log(window.localStorage)
    if (identityKey === '') {
      identityKey = window.localStorage.getItem('identity')
      setIsMember(true)
    }
    // checkIdentity(identityKey).then((res) => {
    //   if (res) {
    //     setLocalIdentity(identityKey)
    //   }
    //   console.log(`Is Identity part of the Group? ${res}`)
    //   console.log(identityKey)
    // })
  })

  // const checkIdentity = async (identityKey) => {
  //   const subgraph = new Subgraph('goerli')

  //   const { members } = await subgraph.getGroup('1080', { members: true })
  //   console.log('Members')
  //   // console.log(members)
  //   // check it identity is part of members array
  //   const checkIdentity = new Identity(identityKey)
  //   const checkIdentityCommitment = checkIdentity
  //     .generateCommitment()
  //     .toString()
  //   const result = members.includes(checkIdentityCommitment)
  //   return result
  // }

  return (
    <div>
      {isMember ? (
        <AskQuestion />
      ) : (
        <>
          <h1 className="flex items-center justify-center p-10 text-2xl">
            First Generate an Identity
          </h1>
          <Link href="/">
            <button className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8 px-10">
              Go to Home
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
