const express = require("express");
const server = express();
const PORT = 3000;
// const products = require("./products");
const products = require("./data/products");

server.use(express.static("public"));
server.use(express.json());
server.set('view engine', 'ejs');
server.set('views', './views'); // Folderul unde vei pune fișierele .ejs


const filtrare = (product, query) => {
  if(query.textToSearch && !(product.name.toUpperCase().indexOf(query.textToSearch.toUpperCase()) > -1))
    return false;
  if(query.minimumPrice && product.price < query.minimumPrice)
    return false;
  if(query.maximumPrice && product.price > query.maximumPrice)
    return false;
  if(query.minimumQuantity && product.quantity < query.minimumQuantity)
    return false;
  if(query.maximumQuantity && product.quantity > query.maximumQuantity)
    return false;

  return true;
}

server.get("/search", (req, res) => {
  // let query = req.query;
  const text = req.query.textToSearch;
  console.log( req.query);

  const filtredProducts = products.filter(product => {
    return filtrare(product, req.query);
  });

  res.render('products', { products: filtredProducts });
  res.status(200);
})
server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
