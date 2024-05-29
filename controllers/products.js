const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "product tesging route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Porducts route" });
};

module.exports = { getAllProducts, getAllProductsStatic };
