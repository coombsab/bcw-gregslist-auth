import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class HousesService {
  async deleteHouse(houseId, userInfo) {
    const house = await this.getHouse(houseId)
    if (userInfo.id !== house.sellerId.toString()) {
      throw new Forbidden("That is not your house.  You may not delete it.")
    }

    await house.delete()
  }
  async editHouse(houseData, userInfo) {
    const house = await this.getHouse(houseData.id)
    if (userInfo.id != house.sellerId.toString()) {
      throw new Forbidden("This house does not belong to you.  No editing allowed.")
    }

    house.bedrooms = houseData.bedrooms || house.bedrooms
    house.bathrooms = houseData.bathrooms || house.bathrooms
    house.levels = houseData.levels || house.levels
    house.year = houseData.year || house.year
    house.price = houseData.price || house.price
    house.description = houseData.description || house.description
    house.imgUrl = houseData.imgUrl || house.imgUrl

    await house.save()
    return house
  }
  async getHouse(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('seller', 'name')
    if (!house) {
      throw new BadRequest("Invalid House ID")
    }
    return house
  }

  async createHouse(formData) {
    const house = dbContext.Houses.create(formData)
    return house
  }
  async getHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }

}

export const housesService = new HousesService()