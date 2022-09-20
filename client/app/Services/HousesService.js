import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { Pop } from "../Utils/Pop.js"
import { server } from "./AxiosService.js"

class HousesService {
  async getHouses() {
    const response = await server.get("/api/houses")
    appState.houses = response.data.map(rawData => new House(rawData))
  }

  setActiveHouse(houseId) {
    const house = appState.houses.find(house => house.id === houseId)
    if (!house) {
      Pop.error("Invalid House ID")
      throw new Error ("Invalid House ID")
    }
    appState.activeHouse = house
    console.log("setActiveHouse", appState.activeHouse)
  }
  async addHouse(formData) {
    const response = await server.post("/api/houses", formData)
    console.log("addHouse", response.data)
    let newHouse = new House(response.data)
    console.log("addHouse", newHouse)
    appState.houses = [...appState.houses, newHouse]
  }

  async editHouse(formData) {
    const activeHouse = appState.activeHouse
    const response = await server.put(`/api/houses/${activeHouse.id}`, formData)
    console.log("editHouse", response.data)

    const updatedHouse = new House(response.data)
    const index = appState.houses.findIndex(house => house.id === activeHouse.id)
    appState.houses.splice(index, 1, updatedHouse)
    appState.emit("houses")
  }

  async deleteHouse(houseId) {
    await server.delete(`/api/houses/${houseId}`)
    appState.houses = appState.houses.filter(house => house.id !== houseId)
  }
}

export const housesService = new HousesService()