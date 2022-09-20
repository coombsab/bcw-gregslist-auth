import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super("api/houses")
    this.router
      .get("", this.getHouses)
      .get("/:houseId", this.getHouse)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createHouse)
      .put("/:houseId", this.editHouse)
      .delete("/:houseId", this.deleteHouse)
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses()
      res.send(houses)
    }
    catch(error) {
      next(error)
    }
  }

  async getHouse(req, res, next) {
    try {
      const house = await housesService.getHouse(req.params.houseId)
      res.send(house)
    }
    catch(error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      const formData = req.body
      formData.sellerId = req.userInfo.id
      const house = await housesService.createHouse(formData)
      res.send(house)
    }
    catch(error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const houseData = req.body
      houseData.id = req.params.houseId
      const house = await housesService.editHouse(houseData, req.userInfo)
      res.send(house)
    }
    catch(error) {
      next(error)
    }
  }

  async deleteHouse(req, res, next) {
    await housesService.deleteHouse(req.params.houseId, req.userInfo)
    res.send("Deleted house")
  }
}