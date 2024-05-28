const notFound = (req, res) => res.status(404).send("Routes dose not exist");

module.exports = notFound;
