const express = require("express");
const server = express();
const PORT = 8080;

const Repository = require("./js/repository");
const Model = require("./js/model");


let repository = new Repository();

// create the model
let model = new Model(repository);

// let heroes = [
//   { name: "Dave", level: 5 },
//   { name: "Kevin", level: 3 },
//   { name: "Bob", level: 4 },
//   { name: "Stuart", level: 2 }
// ];
server.use(express.static("public"));
server.use(express.json());

// GET /api/heroes?text-to-search=term
server.get("/api/heroes", (req, res) => {
  const search = req.query["text-to-search"]?.toLowerCase() || "";
  // try{
  // model.readHeroes(search);
  res.status(200).json(model.readHeroes(search));

  // } catch(e) {
  //
  // }
  // const filtered = heroes.filter(hero => hero.name.toLowerCase().includes(search));
  // res.status(200).json(filtered);
});

function inlcudeHero(hero) {
  return heroes.filter(h => h.name.toLowerCase() === hero.name.toLowerCase()).length > 0;
}

// POST /api/heroes
server.post("/api/heroes", (req, res) => {
  const newHero = req.body.hero;

  try {
    model.createHero(newHero);
    res.status(200).json({});
  } catch(e) {
    return res.status(400).json({error: e.message});
  }

  // console.log(newHero);
  // if (!newHero) {
  //   return res.status(400).json({error: "invalid-hero"});
  // }
  //
  // if (isNaN(newHero.level)) {
  //   return res.status(400).json({error: "invalid-level"});
  // }
  //
  //
  // if (inlcudeHero(newHero)) {
  //   return res.status(400).json({error: "duplicate-hero"});
  // }
  //
  // heroes.push(newHero);
  // res.status(200).json({});
});

// DELETE /api/heroes
server.delete("/api/heroes", (req, res) => {
  const hero = req.body.hero;
  // console.log(hero);
  try {
    model.deleteHero(hero.name);
    res.status(200).json({});
  } catch(e) {
    return res.status(400).json({error: e.message});
  }
  // model.deleteHero(hero.name);
  // if (!hero || !inlcudeHero(hero)) {
  //   return res.status(400).json({error: "hero-not-found"});
  // }

  // heroes = heroes.filter(h => h.name !== hero.name);
});

server.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
