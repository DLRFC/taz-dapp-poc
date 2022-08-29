const faunadb = require("faunadb");
require("dotenv").config({path: "../.env.local"});

try {
const secret = process.env.FAUNA_SECRET_KEY;
const query = faunadb.query;
const client = new faunadb.Client({ secret });

const codesList = [];

const promises = codesList.map((code) =>

  client.query(
    query.Create(query.Collection("InvitationCodes"), {
      data: {
        code: code,
        isUsed: false,
      },
    })
  )
);

Promise.all(promises);

} catch (error) {
    console.log(error.message);
}
