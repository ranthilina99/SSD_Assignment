const jwt = require("jsonwebtoken");
const MessageSchema = require("../models/message");

const CreateMessage = async (req, res) => {
  if (req.body) {
    const message = new MessageSchema(req.body);
    await message
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};
module.exports = {
  CreateMessage,
};
