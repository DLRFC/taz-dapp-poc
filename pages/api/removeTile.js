import faunadb from 'faunadb'

export default async function handler(req, res) {
  // Make connection to the database
  const secret = process.env.FAUNA_SECRET_KEY
  const client = new faunadb.Client({ secret })
  const { query } = faunadb

  if (res.method === 'GET') {
    res.status(405).json('GET not allowed')
  } else if (req.method === 'POST') {
    const { canvasId, tileIndex, pwd } = req.body

    if (!canvasId || !tileIndex || !pwd) {
      const newLocal = 'Please provide canvasId, tileIndex and password'
      res.status(500).json(newLocal)
    }

    if (pwd === process.env.REMOVE_TILE_PWD) {
      const dbs = await client.query(
        query.Map(
          query.Paginate(query.Match(query.Index('all_canvases')), {
            size: 10000
          }),
          query.Lambda('canvasRef', query.Get(query.Var('canvasRef')))
        )
      )

      const match = dbs.data.filter((canvas) => canvas.data.canvasId === canvasId)[0]

      const tiles = match.data.tiles
      tiles[tileIndex] = ''

      const newLocal = 'Tile successfully deleted!'

      await client
        .query(
          query.Update(query.Ref(match.ref), {
            data: {
              tiles: tiles
            }
          })
        )
        .then((ret) => console.log(ret))

      res.status(201).json(newLocal)
    } else {
      const newLocal = 'Access denied: wrong password'
      res.status(500).json(newLocal)
    }
  }
}
