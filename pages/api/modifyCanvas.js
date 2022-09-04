import faunadb from "faunadb";

export default async function handler(req, res) {

  // Make connection to the database
  const secret = process.env.FAUNA_SECRET_KEY;
  const client = new faunadb.Client({ secret });
  const query = faunadb.query;

  if (req.method === "GET") {
    console.log("triggered GET");

    // Query all 5 canvases from the database
    const dbs = await client.query(
      query.Map(
        query.Paginate(query.Match(query.Index("all_canvases")), {
          size: 10000,
        }),
        query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
      )
    );

    const canvases = dbs.data;

    // Randomly select 1 out of the 5 canvases
    const randomIndex = Math.round(Math.random() * 4);
    const canvas = canvases[randomIndex].data;

    // Return the randomly selected canvas to the frontend.
    // The canvas that is returned to the frontend is an object with an array of strings (tiles) and a canvasId: {tiles: ["","","","","","","","",""], canvasId: 1}

    res.status(200).json({ canvas });
  } else if (req.method === "POST") {

    console.log("triggered post");
    // To update the database the backend needs the canvasId and the updated tiles from the request body
    // For example: updatedTiles: ["newDrawingString","","","","","","","",""] canvasId: 1

    const canvasId = req.body.canvasId;
    const updatedTiles = req.body.updatedTiles;

    // Query all 5 canvases from the database
    const dbs = await client.query(
      query.Map(
        query.Paginate(query.Match(query.Index("all_canvases")), {
          size: 10000,
        }),
        query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
      )
    );
    
    // Find the matching canvas based on the canvasId
    const match = dbs.data.filter(
      (canvas) => canvas.data.canvasId === canvasId
    )[0];

    // Update the canvas in the database  
    client.query(
      query.Update(query.Ref(match.ref), {
        data: {
          tiles: updatedTiles,
        },
      })
    ),
    
    // Send response back to frontend
    res.status(201).json("Canvas successfully updated!");
  }
}
