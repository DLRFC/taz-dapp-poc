import faunadb from 'faunadb'

export default async function handler(req, res) {
  const { invitation } = req.body

  if (req.method === 'GET') {
    res.status(400).json({
      error: 'Ensure that you are sending a POST request to this endpoint'
    })
  } else if (!invitation) {
    res.status(400).json({ error: 'Request needs to have an invitation string' })
  } else if (req.method === 'POST') {
    try {
      const secret = process.env.FAUNA_SECRET_KEY
      const { query } = faunadb
      const client = new faunadb.Client({ secret })

      const dbs = await client.query(
        query.Map(
          query.Paginate(query.Match(query.Index('all_codes')), {
            size: 10000
          }),
          query.Lambda('codeRef', query.Get(query.Var('codeRef')))
        )
      )

      console.log('DB length', dbs.data.length)

      const match = dbs.data.filter((code) => code.data.code === invitation)

      let isValid

      if (match[0] && !match[0].data.isUsed) {
        isValid = true
      } else {
        isValid = false
      }

      res.status(200).json({ isValid })
    } catch (error) {
      res.status(500).json({ Error: error.message })
    }
  }
}
