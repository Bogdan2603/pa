class Model{
  #repository;
  // static levels = [
  //   "junior",
  //   "middle",
  //   "senior"
  // ];

  constructor(repository){
    this.#repository = repository;
  }

  readHeroes(search){
    const heroes = this.#repository.readHeroes();
    return heroes.filter(hero => hero.name.toLowerCase().includes(search));
    // return filtered;
  }

  createHero(heroToBeCreated){

    this.#verifyHero(heroToBeCreated)
    this.#repository.createHero(heroToBeCreated);
  }



  deleteHero(nameOfHeroToBeDeleted){
    console.log(nameOfHeroToBeDeleted);
    if(this.#getHeroByName(nameOfHeroToBeDeleted) ){
      this.#repository.deleteHero(nameOfHeroToBeDeleted);
    } else {
      throw new Error("Hero doesn't exist");
    }
  }
  updateHero(nameOfHeroToBeUpdated, updatedHero){
    try {
      this.#verifyUpdatedHero(nameOfHeroToBeUpdated, updatedHero)

      this.#repository.updateHero(nameOfHeroToBeUpdated, updatedHero)
    } catch(err){
      console.log(err.message);
    }

  }
  #wrongHeroName(name){
    return name.length < 3 || name.length > 100;
  }
  #wrongHeroLevel(level){
    return isNaN(level);
  }
  #alreadyExistsHeroName(name){
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      if(hero.name === name){
        return name;
      }
    }
    return false;
  }
  #getHeroByName(name){
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      if(hero.name === name){
        return hero;
      }
    }
    return null;
  }
  #countHeroName(name){
    let counter = 0;
    const heroes = this.#repository.readHeroes();
    for (const hero of heroes) {
      if(hero.name === name){
        counter++;
      }
    }
    // console.log(counter);
    return counter;
  }
  #verifyHero(hero){
    const name = hero.name;
    const level = hero.level;
    let errorMessages = ``;
    if(this.#wrongHeroName(name)){
      errorMessages += "The hero name is wrong. It must have a length between 3 and 100.";
    }
    if(this.#wrongHeroLevel(level)){
      errorMessages += "The hero level is required.";
    }
    if(this.#alreadyExistsHeroName(name)){ //
      errorMessages += "The hero name already exists.";
    }
    if(errorMessages!==``){
      throw new Error(errorMessages);
    }
  }
  #verifyUpdatedHero(nameOfHeroToBeUpdated, hero){
    // const name = hero.name;
    // const level = hero.level;
    // let errorMessages = ``;
    // if(this.#wrongHeroName(name)){
    //   errorMessages += "The new hero name is wrong. It must have a length between 3 and 100.";
    // }
    // if(this.#wrongHeroLevel(level)){
    //   errorMessages += "The hero level is required.";
    // }
    // if(nameOfHeroToBeUpdated !== name && this.#alreadyExistsHeroName(name)){
    //   errorMessages += "The hero name already exists.";
    // }
    //
    // const oldHero = this.#getHeroByName(name);
    // const levels = Model.levels;
    // if(!oldHero){
    //   errorMessages += "Hero does not exist.";
    // }
    // if(levels.indexOf(oldHero.level) + 1 !== levels.indexOf(level)) {
    //   errorMessages += "You can only update the hero level from `junior` to `middle` or `middle` to `senior`\n";
    // }
    //
    // if(errorMessages!==``){
    //   throw new Error(errorMessages);
    // }
  }
}

module.exports = Model;

