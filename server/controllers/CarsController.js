import { Auth0Provider } from "@bcwdev/auth0provider"
import { carsService } from "../services/CarsService.js"
import BaseController from "../utils/BaseController.js"

export class CarsController extends BaseController {

  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      .get('/:carId', this.getCar)
      // NO KNIGHT GETS BELOW THIS LINE WITHOUT GOING THROUGH THIS CHECKPOINT
      .use(Auth0Provider.getAuthorizedUserInfo) // MIDDLEWARE are you logged in
      .post('', this.manufactureCar)
      .put('/:id', this.editCar)
      .delete("/:carId", this.deleteCar)

  }


  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars()
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getCar(req, res, next) {
    try {
      const car = await carsService.getCar(req.params.carId)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async manufactureCar(knightInShiningArmor, res, next) {
    try {
      const formData = knightInShiningArmor.body

      // REVIEW SUPER IMPORTANT
      // NEVER TRUST THE USER KNIGHT FORMDATA FOR THE OWNER/CREATOR/SELLER/WHATEVER ID
      // GET IT FROM AUTH0 INSTEAD

      formData.sellerId = knightInShiningArmor.userInfo.id

      const car = await carsService.manufactureCar(formData)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async editCar(req, res, next) {
    try {
      const carData = req.body
      carData.id = req.params.id
      const car = await carsService.editCar(carData, req.userInfo)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async deleteCar(req, res, next) {
    try {
      await carsService.deleteCar(req.params.carId, req.userInfo)
      res.send("Deleted car")
    }
    catch(error) {
      next(error)
    }
  }

}
