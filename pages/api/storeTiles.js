export default async function handler(req, res) {
  let uriStorage = [];

  if (req.method === "GET") {
    // return the current state of the unfinished array
    res.send(200).json({ uriStorage });
  } else if (req.method === "POST") {
    // upddate the unfinished array with latest input
    const { array } = req.body.uriStorage;
    uriStorage = array;
  }
}
