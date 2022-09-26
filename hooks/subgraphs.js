const axios = require('axios')

const { SEMAPHORE_SUBGRAPH, TAZMESSAGE_SUBGRAPH, TAZTOKEN_SUBGRAPH } = require('../config/goerli.json')

class Subgraphs {
  constructor() {
    this.tazMessageSubgraphApi = TAZMESSAGE_SUBGRAPH
    this.tazTokenSubgraphApi = TAZTOKEN_SUBGRAPH
    this.semaphoreSubgraphApi = SEMAPHORE_SUBGRAPH
  }

  static async request(url, config) {
    const { data } = await axios(url, config)

    return data?.data
  }

  async getGroupIdentities(groupId) {
    const config = {
      method: 'post',
      data: JSON.stringify({
        query: `
          {
            members(where: {group_: {id: "${groupId}"}}, orderBy: index, first: 1000) {
              identityCommitment
              timestamp
            }
          }`
      })
    }

    let members = []
    let identityCommitments = []
    try {
      ;({ members } = await Subgraphs.request(this.semaphoreSubgraphApi, config))
      identityCommitments = members.map((x) => x.identityCommitment)
    } catch (err) {
      console.warn('Error fetching data from subgraph', err)
    }

    return identityCommitments
  }

  async isVerifiedGroupIdentity(groupId, identityCommitment) {
    const config = {
      method: 'post',
      data: JSON.stringify({
        query: `
          {
            members(where: {group_: {id: "${groupId}"}, identityCommitment: "${identityCommitment}"}) {
              identityCommitment
              timestamp
            }
          }`
      })
    }

    let members = []
    try {
      ;({ members } = await Subgraphs.request(this.semaphoreSubgraphApi, config))
    } catch (err) {
      console.warn('Error fetching data from subgraph', err)
    }

    return members.length > 0
  }

  async getMintedTokens() {
    const config = {
      method: 'post',
      data: JSON.stringify({
        query: `
        {
          tokens(
            first: 1000
            where: {hasViolation: false}
            orderBy: timestamp
            orderDirection: desc
          ) {
            timestamp
            tokenId
            uri
            totalVotes
            hasViolation
          }
        }`
      })
    }

    let tokens = []
    try {
      ;({ tokens } = await Subgraphs.request(this.tazTokenSubgraphApi, config))
    } catch (err) {
      console.warn('Error fetching data from subgraph', err)
    }

    return tokens
  }

  async getQuestions() {
    const config = {
      method: 'post',
      data: JSON.stringify({
        query: `
          {
            messages(
              orderBy: timestamp
              where: {parentMessageId: 0, hasViolation: false}
              orderDirection: desc
              first: 1000
            ) {
              messageContent
              messageId
              parentMessageId
            }
          }`
      })
    }

    let messages = []
    try {
      ;({ messages } = await Subgraphs.request(this.tazMessageSubgraphApi, config))
    } catch (err) {
      console.log('Error fetching subgraph data: ', err)
    }

    return messages
  }

  async getAnswers(messageId) {
    const config = {
      method: 'post',
      data: JSON.stringify({
        query: `
        {
          parentMessages: messages(
            orderBy: messageId
            first: 1
            where: {messageId: ${messageId}}
            orderDirection: desc
          ) {
            messageContent
            messageId
          }
          messages(
            orderBy: timestamp
            where: {parentMessageId: ${messageId}, parentMessageId_not: 0, hasViolation: false}
            orderDirection: desc
            first: 1000
          ) {
            messageContent
            messageId
            parentMessageId
          }
        }`
      })
    }

    let parentMessages = []
    let messages = []
    try {
      ;({ parentMessages, messages } = await Subgraphs.request(this.tazMessageSubgraphApi, config))
    } catch (err) {
      console.log('Error fetching subgraph data: ', err)
    }

    const data = { question: parentMessages.length ? parentMessages[0] : {}, answers: messages }

    return data
  }
}

module.exports = {
  Subgraphs
}
