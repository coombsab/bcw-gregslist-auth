import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function drawHouses() {
  let template = ""
  appState.houses.forEach(house => template += house.HouseTemplate)
  setHTML("listings", template)
}

export class HousesController {
  constructor() {
    appState.on("houses", drawHouses)
  }

  showHouses() {
    this.getHouses()
    // debugger
    setHTML("forms", House.getHouseForm())
  }

  addHouse() {
    // @ts-ignore
    appState.activeHouse = null
    const template = House.getHouseForm()
    setHTML("forms", template)
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target
      let formData = getFormData(form)

      if (appState.activeHouse) {
        await housesService.editHouse(formData)
      } else {
        await housesService.addHouse(formData)
        // @ts-ignore
        form.reset()
      }

    } catch (error) {
      console.error("[addHouse]", error)
      Pop.error(error)
    }
  }

  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error("[getHouses]", error)
      Pop.error(error)
    }
  }

  beginEdit(houseId) {
    // setText("rightBarLabel", "Edit House")
    housesService.setActiveHouse(houseId)
    const editable = appState.activeHouse
    const template = House.getHouseForm(editable)
    setHTML("forms", template)
  }

  async deleteHouse(houseId) {
    try {
      const yes = await Pop.confirm(`Delete the house?`)
      if (!yes) {
        return
      }
      await housesService.deleteHouse(houseId)
    } catch (error) {
      console.error("[deleteHouse]", error)
      Pop.error(error)
    }
  }
}
