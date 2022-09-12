import { useState, useEffect } from 'react'
import axios from 'axios'
import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { Subgraphs } from '../../hooks/subgraphs'
import AskQuestionComponent from './View'

const { generateProof, verifyProof, packToSolidityProof } = require('@semaphore-protocol/proof')
const { API_REQUEST_TIMEOUT, GROUP_ID } = require('../../config/goerli.json')

const AskQuestion = () => {
    const [messageContent, setMessageContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [localIdentity, setLocalIdentity] = useState()
    const [loadingMessage, setLoadingMessage] = useState('')
    const [loadingProof, setLoadingProof] = useState('')

    const router = useRouter()

    useEffect(() => {
        let identityKey = ''

        if (identityKey === '') {
            identityKey = window.localStorage.getItem('identity')
        }
        console.log(identityKey)
        setLocalIdentity(identityKey)
    })

    const handleAskButton = async () => {
        setIsLoading(true)
        setLoadingMessage('1. Generating zero knowledge proof...')
        try {
            const messageId = ethers.utils.id(messageContent)
            const signal = messageId.slice(35)

            // Create identity
            const identity = new Identity(localIdentity)
            const identityCommitment = identity.generateCommitment()
            console.log(identityCommitment)
            console.log('Identity Key:', localIdentity)

            // Generate group
            //    Since the Semaphore Subgraph class returns at max 100 members, use
            //    this app-specific subgraph class
            const group = new Group(16)
            const groupId = GROUP_ID.toString()
            const subgraphs = new Subgraphs()
            const members = await subgraphs.getGroupIdentities(groupId)
            console.log('Members:', members)
            group.addMembers(members)
            console.log('Group Root:', group.root)

            // Generate proof
            const externalNullifier = Math.round(Math.random() * 1000000000)
            const fullProof = await generateProof(identity, group, externalNullifier, signal, {
                zkeyFilePath: 'https://www.trusted-setup-pse.org/semaphore/16/semaphore.zkey',
                wasmFilePath: 'https://www.trusted-setup-pse.org/semaphore/16/semaphore.wasm'
            })
            console.log('Proof:', fullProof)
            const { nullifierHash } = fullProof.publicSignals
            const solidityProof = packToSolidityProof(fullProof.proof)
            console.log('NullifierHash:', nullifierHash)

            // Verify proof off chain
            const verificationKey = await fetch('https://www.trusted-setup-pse.org/semaphore/16/semaphore.json').then(
                (res) => res.json()
            )
            const res = await verifyProof(verificationKey, fullProof)
            console.log('Verification:', res)
            setLoadingMessage('2. A proof has been generated. Your message transaction is now being submitted.')
            setLoadingProof(solidityProof)
            const body = {
                parentMessageId: '',
                messageId,
                messageContent,
                groupId,
                signal,
                nullifierHash,
                externalNullifier,
                solidityProof
            }

            // Post message to back end
            await axios.post('/api/postMessage', body, {
                timeout: API_REQUEST_TIMEOUT
            })

            // Go to the next page
            setLoadingMessage('3. Transaction successfuly submitted!')
            router.push('/questions-page')
        } catch (error) {
            setIsLoading(false)

            // Custom error depending on points of failure
            alert(error)
        }
    }

    const onClose = () => {
        setIsLoading(!isLoading)
    }

    const clearIdentity = () => {
        console.log('clear')
        window.localStorage.removeItem('identity')
        router.push('/')
    }

    return (
        <AskQuestionComponent
            onClose={onClose}
            loadingMessage={loadingMessage}
            loadingProof={loadingProof}
            isLoading={isLoading}
            setMessageContent={setMessageContent}
            handleAskButton={handleAskButton}
            clearIdentity={clearIdentity}
        />
    )
}

export default AskQuestion
