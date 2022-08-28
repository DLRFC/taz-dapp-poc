const faunadb = require("faunadb");
require("dotenv").config({path: "../.env.local"});

try {
const secret = process.env.FAUNA_SECRET_KEY;
const query = faunadb.query;
const client = new faunadb.Client({ secret });

const codesList = ["test-code-7", "test-code-8", "test-code-9", "test-code-10", "test-code-11", "test-code-12", "test-code-13", "test-code-14"];

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
