// import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ExperiencesListComponent from './View'

const ExperiencesList = () => {
  const identity = window.localStorage.getItem('identity')
  const urlIdentity = identity.replace('["', '').replace('"]', '').replace('","', '_')
  console.log('identity', identity)
  console.log('urlIdentity', urlIdentity)

  const router = useRouter()
  const clearIdentity = () => {
    console.log('clear')
    window.localStorage.removeItem('identity')
    router.push('/')
  }
  return <ExperiencesListComponent clearIdentity={clearIdentity} urlIdentity={urlIdentity} />
}

export default ExperiencesList
