const db = require('../_helpers/db')
const Planet = db.Planet
const fetch = require("node-fetch")

const create = async params => {
  const planetURL = 'http://swapi.dev/api/planets/'

  const initResponse = await fetch(planetURL)
  let planets = await initResponse.json()
  let nextPage = planets.next

  let searchResult
  let currentPage = 1

  while(!searchResult && currentPage <= planets.count / 10) {
    searchResult = planets.results.find(
      planet => planet.name.toLowerCase() === params.name.toLowerCase())

    if(!searchResult) {
      let response = await fetch(nextPage)
      planets = response.json()
      nextPage = planets.next
    }
    
    currentPage = currentPage + 1
  }

  let filmAppearances = 0

  if(searchResult) {
    filmAppearances = searchResult.films.length
  }


  const planet = new Planet({...params, filmAppearances})

  await planet.save()
}

const getPlanets = async () => {
  return await Planet.find();
};

const removePlanet = async (params) => {
  const deletedPlanet = await Planet.findOneAndDelete({name: params.name}) 
  if(!deletedPlanet) throw 'this planet doesn\'t exist'
};

module.exports = {
  create,
  getPlanets,
  removePlanet
}