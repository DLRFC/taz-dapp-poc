import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { SEMAPHORE_SUBGRAPH, TAZMESSAGE_SUBGRAPH, TAZTOKEN_SUBGRAPH } from "../config/goerli.json"

export class Subgraphs {
    private _tazMessageSubgraphApi: string
    private _tazTokenSubgraphApi: string
    private _semaphoreSubgraphApi: string    

    constructor() {
        this._tazMessageSubgraphApi = TAZMESSAGE_SUBGRAPH
        this._tazTokenSubgraphApi = TAZTOKEN_SUBGRAPH
        this._semaphoreSubgraphApi = SEMAPHORE_SUBGRAPH
    }

    private async request(url: string, config?: AxiosRequestConfig): Promise<any> {
        const { data }: AxiosResponse<any> = await axios(url, config)
    
        return data?.data
    }

    async getGroupIdentities(groupId: string): Promise<any[]> {
        const config: AxiosRequestConfig = {
            method: "post",
            data: JSON.stringify({
                query: ` {
                    members(where: {group_: {id: "${groupId}"}},) {
                      id
                      identityCommitment
                      timestamp
                    }
                  }`
            })
        } 

        let members: { data: any[] }[] = []
        let identityCommitments: string[] = []
        try {
            ({ members } = await this.request(this._semaphoreSubgraphApi, config))
            identityCommitments = members.map((x: any) => (x.identityCommitment))
        } catch(err: any) {
            console.log("Error fetching data from subgraph", err)
        }

        return identityCommitments
    }

    async isVerifiedGroupIdentity(groupId: string, identityCommitment: string): Promise<boolean> {
        const config: AxiosRequestConfig = {
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

        let members: { data: any[] }[] = []
        try {
            ({ members } = await this.request(this._semaphoreSubgraphApi, config))
        } catch(err: any) {
            console.log("Error fetching data from subgraph", err)
        }

        return members.length > 0
    }
}

