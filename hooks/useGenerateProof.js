import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { useEffect, useState } from 'react'
// import { Subgraph } from '@semaphore-protocol/subgraph'
import { ethers } from 'ethers'
import { Subgraphs } from './subgraphs'

const { generateProof, verifyProof, packToSolidityProof } = require('@semaphore-protocol/proof')
const { GROUP_ID } = require('../config/goerli.json')

// eslint-disable-next-line import/prefer-default-export
export const useGenerateProof = () => {
  const [externalNullifier] = useState(Math.round(Math.random() * 1000000000))

  const generateFullProof = async (identityKey, signal) => {
    const identity = new Identity(identityKey)
    const group = new Group(16)
    const groupId = GROUP_ID.toString()

    // const subgraph = new Subgraph('goerli')
    // const { members } = await subgraph.getGroup(groupId, { members: true })
    const subgraphs = new Subgraphs()
    const members = await subgraphs.getGroupIdentities(groupId)
    console.log('IdentityCommitment', identity.generateCommitment().toString())
    console.log(members)
    // -----Changed for testing
    group.addMembers(members)
    console.log('members', members)
    // group.addMember(identity.generateCommitment().toString())

    const merkleTreeRoot = group.root.toString()
    console.log('group root', merkleTreeRoot)

    // Adapt Signal
    // const signal = 'proposal_1'

    const fullProofTemp = await generateProof(identity, group, externalNullifier, signal, {
      zkeyFilePath: 'https://www.trusted-setup-pse.org/semaphore/16/semaphore.zkey',
      wasmFilePath: 'https://www.trusted-setup-pse.org/semaphore/16/semaphore.wasm'
    })
    // console.log('fullProofTemp...', fullProofTemp)
    const { nullifierHash } = fullProofTemp.publicSignals
    const solidityProof = packToSolidityProof(fullProofTemp.proof)
    console.log('fullProof on useHook', fullProofTemp)
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
