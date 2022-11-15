const jwt = require("jsonwebtoken");
const fileSchema = require("../models/file");

const CreateFile = async (req, res) => {
  if (req.body) {
    const message = new fileSchema(req.body);
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
    CreateFile,
};
