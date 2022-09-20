import { setText } from "../Utils/Writer.js"

/**
 * @param {{bedrooms: number, bathrooms: number, levels: number, imgUrl: string, year: number, price: number, description: string, id: string}} data
 * 
 */
export class House {
  constructor(data) {
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.id = data.id
  }
  get HouseTemplate() {
    return /*html*/`
      <div class="col-md-4 col-lg-3 mb-3">
        <div class="card">
        <img src="${this.imgUrl}" alt="some-house" class="img-fluid">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3 controls">
            <i class="mdi mdi-home-edit selectable" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.housesController.beginEdit('${this.id}')"> Edit</i>
            <i class="mdi mdi-delete selectable" onclick="app.housesController.deleteHouse('${this.id}')"></i>
          </div>
          <h5>${this.bedrooms} Bed ${this.bathrooms} Bath ${this.levels} Story House</h5>
          <p>Built in ${this.year}</p>
          <p>$${this.price}</p>
          <p>${this.description}</p>
          </div>
        </div>
      </div>
    `
  }

  /**
   * 
   * @param {House} [editable]
   * @returns 
   */
  static getHouseForm(editable) {
    // setText("add-listing", "Add House")
    // setText("rightBarLabel", "Add House")
    editable = editable || new House({ bedrooms: 0, bathrooms: 0, levels: 0, imgUrl: "", year: 0, price: 0, description: "" })

    return /*html*/`
      <form onsubmit="app.housesController.handleSubmit()">
        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="bedrooms" required min="1" value="${editable.bedrooms}">
          <label for="bedrooms">Number of Bedrooms</label>
        </div>
    
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="bathrooms" required min="1" value="${editable.bathrooms}">
          <label for="bathrooms">Number of Bathrooms</label>
        </div>
    
        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="levels" required min="1" value="${editable.levels}">
          <label for="levels">Number of Floors/Levels</label>
        </div>
    
        <div class="form-floating mb-3">
          <input type="url" class="form-control" name="imgUrl" required value="${editable.imgUrl}">
          <label for="imgUrl">URL for picture of House</label>
        </div>
    
        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="year" required min="1000" value="${editable.year}">
          <label for="year">Year House was Built</label>
        </div>
    
        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="price" required min="0" value="${editable.price}">
          <label for="price">Selling Price</label>
        </div>
        
        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your job" name="description">${editable.description}</textarea>
          <label for="description">Description</label>
        </div>
    
        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">${editable.id ? 'Save Changes' : 'Add House'}</button>
        </div>
      </form>
    `
  }
}