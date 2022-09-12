const axios = require('axios')

const { SEMAPHORE_SUBGRAPH, TAZMESSAGE_SUBGRAPH, TAZTOKEN_SUBGRAPH } = require("../config/goerli.json")

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
            method: "post",
            data: JSON.stringify({
                query: ` {
                    members(where: {group_: {id: "${groupId}"}}, orderBy: timestamp,) {
                      id
                      identityCommitment
                      timestamp
                    }
                  }`
            })
        }

        let members = []
        let identityCommitments = []
        try {
            ({ members } = await Subgraphs.request(this.semaphoreSubgraphApi, config))
            identityCommitments = members.map((x) => (x.identityCommitment))
        } catch(err) {
            console.warn("Error fetching data from subgraph", err)
        }

        return identityCommitments
    }

    async isVerifiedGroupIdentity(groupId, identityCommitment) {
        const config = {
            method: "post",
            data: JSON.stringify({
                query: `{
                    members(where: {group_: {id: "${groupId}"}, identityCommitment: "${identityCommitment}"}) {
                      id
                      identityCommitment
                      timestamp
                    }
                  }`
            })
        }

        let members = []
        try {
            ({ members } = await Subgraphs.request(this.semaphoreSubgraphApi, config))
        } catch(err) {
            console.warn("Error fetching data from subgraph", err)
        }

        return members.length > 0
    }

    async getMintedTokens() {
        const config = {
            method: "post",
            data: JSON.stringify({
                query: `{
                    newTokens(orderBy: timestamp, orderDirection: desc) {
                      id
                      timestamp
                      tokenId
                      uri
                    }
                  }`
            })
        }

        let newTokens = []
        try {
            ({ newTokens } = await Subgraphs.request(this.tazTokenSubgraphApi, config))
        } catch(err) {
            console.warn("Error fetching data from subgraph", err)
        }

        return newTokens
    }
}

module.exports = {
    Subgraphs
}

