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
const getMessage = async (req, res) => {
  try {
    if (req.params && req.params.id) {
      await MessageSchema.findById(req.params.id)
        .then((response) => {
          res.status(200).send({ data: response });
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ msg: "server Error..." });
  }
};

module.exports = {
  CreateMessage,
  getMessage,
};
