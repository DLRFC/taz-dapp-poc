import { invitationCodes } from "../../data/invitationCodes";

export default function handler(req, res) {
  const { invitation } = req.body;

  console.log(invitation);

  if (req.method === "GET") {
    res.status(400).json({
      error: "Ensure that you are sending a POST request to this endpoint",
    });
  } else if (!invitation) {
    res
      .status(400)
      .json({ error: "Request needs to have an invitation string" });
  } else if (req.method === "POST") {
    const isValidInvitation = invitationCodes.includes(invitation);
    res.status(200).send(isValidInvitation);
  }
}
