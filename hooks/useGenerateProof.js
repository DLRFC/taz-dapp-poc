import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { useEffect, useState } from 'react'
// import { Subgraph } from '@semaphore-protocol/subgraph'
import { Subgraphs } from './subgraphs'

const { generateProof, packToSolidityProof } = require('@semaphore-protocol/proof')
const { GROUP_ID } = require('../config/goerli.json')

// eslint-disable-next-line import/prefer-default-export
export const useGenerateProof = () => {
  const generateFullProof = async (identityKey, signal) => {
    const identity = new Identity(identityKey)
    const group = new Group(16)
    const groupId = GROUP_ID.toString()

    const subgraphs = new Subgraphs()
    const members = await subgraphs.getGroupIdentities(groupId)
    group.addMembers(members)
    console.log('members', members)

    const merkleTreeRoot = "15222118822168137685135834470351868912102265176789015941300788598590474344837n
    const externalNullifier = Math.round(Math.random() * 1000000000)

    // Adapt Signal
    // const signal = 'proposal_1'
    let fullProofTemp
    fullProofTemp = await generateProof(identity, group, externalNullifier, signal, {
      zkeyFilePath: '/semaphore.zkey',
      wasmFilePath: '/semaphoreWasm.wasm'
    })

    const { nullifierHash } = fullProofTemp.publicSignals
    const solidityProof = packToSolidityProof(fullProofTemp.proof)

    console.log('nullifierHash', nullifierHash)

    return {
      fullProofTemp,
      solidityProof,
      nullifierHash,
      externalNullifier,
      merkleTreeRoot,
      groupId
    }
  }

  useEffect(() => {
    console.log('State Initiated')
  }, [])

  return [generateFullProof]
}
