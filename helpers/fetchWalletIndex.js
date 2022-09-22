import faunadb from 'faunadb'

export default async function fetchWalletIndex() {
  const secret = process.env.FAUNA_SECRET_KEY
  const client = new faunadb.Client({ secret })
  const { query } = faunadb

  const dbs = await client.query(
    query.Map(
      query.Paginate(query.Match(query.Index('current_index')), {
        size: 10000
      }),
      query.Lambda('walletRef', query.Get(query.Var('walletRef')))
    )
  )

  const currentIndex = dbs.data[0].data.currentIndex

  let nextIndex

  if (currentIndex < 16) {
    nextIndex = currentIndex + 1
  } else {
    nextIndex = 0
  }

  await client.query(
    query.Update(query.Ref(dbs.data[0].ref), {
      data: {
        currentIndex: nextIndex
      }
    })
  )

  return currentIndex
}
