const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "repository.json");
const heroes = require("./repository.json");


function deepCopyOf(entity){
  return JSON.parse(JSON.stringify(entity));
}


class Repository{
  #heroes;

  constructor(){
    this.#heroes = heroes;
  }
  readHeroes(){
    return deepCopyOf(this.#heroes);
  }
  createHero(heroToBeCreated){
    this.#heroes.push(heroToBeCreated);
    // heroes.data = this.#heroes;
    fs.writeFileSync(filePath, JSON.stringify(this.#heroes, null, 2), "utf-8");
  }
  deleteHero(nameOfHeroToBeDeleted){
    this.#heroes = this.#heroes.filter(
      (hero) => {return hero.name !== nameOfHeroToBeDeleted}
    );
    fs.writeFileSync(filePath, JSON.stringify(this.#heroes, null, 2), "utf-8");
  }
  updateHero(nameOfHeroToBeUpdated, updatedHero){
    // console.log(this.#heroes.length);
    for(let i = 0; i < this.#heroes.length; i++) {
      if (this.#heroes[i].name === nameOfHeroToBeUpdated) {
        this.#heroes[i] = updatedHero;
        return true;
      }
    }
    return false;

    // for(let hero in this.#heroes) {
    //   if (hero.name === nameOfHeroToBeUpdated) {
    //     hero = updatedHero;
    //   }
    // }
  }

  // wrongHeroLevel(level){
  //   return !Object.values(Repository.levels).includes(level);
  // }
}

module.exports = Repository;
// module.exports = {
//   Repository,
//   // deepCopyOf
// };
// export = Repository;