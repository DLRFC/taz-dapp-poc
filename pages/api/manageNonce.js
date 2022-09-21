import faunadb from 'faunadb'

export default async function handler(req, res) {
  const secret = process.env.FAUNA_SECRET_KEY
  const client = new faunadb.Client({ secret })
  const { query } = faunadb
  const { walletId } = req.body

  if (!walletId) {
    const newLocal = 'Please include walletId in the request'
    res.status(500).json(newLocal)
  }

  if (req.method === 'GET') {
    const dbs = await client.query(
      query.Map(
        query.Paginate(query.Match(query.Index('all_wallets')), {
          size: 10000
        }),
        query.Lambda('walletRef', query.Get(query.Var('walletRef')))
      )
    )

    const match = dbs.data.filter((wallet) => wallet.data.walletId === walletId)[0]
    const nonce = match.data.nonce

    res.status(200).json(nonce)
  }

  if (req.method === 'POST') {
    const dbs = await client.query(
      query.Map(
        query.Paginate(query.Match(query.Index('all_wallets')), {
          size: 10000
        }),
        query.Lambda('walletRef', query.Get(query.Var('walletRef')))
      )
    )

    const match = dbs.data.filter((wallet) => wallet.data.walletId === walletId)[0]
    const updatedNonce = match.data.nonce + 1

    await client
      .query(
        query.Update(query.Ref(match.ref), {
          data: {
            nonce: updatedNonce
          }
        })
      )
      .then((ret) => console.log(ret))

    const newLocal = `Nonce successfully updated! New nonce: ${updatedNonce}`
    res.status(201).json(newLocal)
  }
}
