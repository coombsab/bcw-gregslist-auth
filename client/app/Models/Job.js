/**
 * @param {{company: string, jobTitle: string, hours: number, rate: number, description: string, id: string}} data
 * 
 */

import { setText } from "../Utils/Writer.js"

export class Job {
  constructor(data) {
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
    this.id = data.id
  }
  get JobTemplate() {
    return /*html*/`
      <div class="col-md-4 col-lg-3 mb-3">
        <div class="card">
        <div class="card-header">
          <h5 class="text-uppercase">
            ${this.jobTitle} with ${this.company}
          </h5>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3 controls">
            <i class="mdi mdi-human-edit selectable" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginEdit('${this.id}')"> Edit</i>
            <i class="mdi mdi-delete selectable" onclick="app.jobsController.deleteJob('${this.id}')"></i>
          </div>
            <p>
              <strong>$${this.rate} per hr</strong>
            </p>
            <p>${this.hours} hrs per week</p>
            <p>${this.description}</p>
          </div>
        </div>
      </div>
    `
  }

  /**
   * 
   * @param {Job} [editable]
   * @returns 
   */
  static getJobForm(editable) {
    // setText("add-listing", "Add Job")
    // setText("rightBarLabel", "Add Job")
    editable = editable || new Job({ company: "", jobTitle: "", hours: 0, rate: 0, description: "" })

    return /*html*/ `
    <form onsubmit="app.jobsController.handleSubmit()">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="company" required minlength="2" maxlength="20" value="${editable.company}">
        <label for="company">Company</label>
      </div>
    
      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="jobTitle" required value="${editable.jobTitle}">
        <label for="jobTitle">Job Title</label>
      </div>
    
      <div class="form-floating mb-3">
        <input type="number" class="form-control" name="hours" required min="1" max="200" value="${editable.hours}">
        <label for="hours">Hours per week</label>
      </div>
    
      <div class="form-floating mb-3">
        <input type="number" class="form-control" name="rate" required min="0" value="${editable.rate}">
        <label for="rate">Rate in $ per hour</label>
      </div>
      
      <div class="form-floating">
        <textarea class="form-control" placeholder="Describe your job" name="description">${editable.description}</textarea>
        <label for="description">Description</label>
      </div>
    
      <div class="d-flex my-4 gap-5 align-items-center">
        <button class="btn" type="reset">Cancel</button>
        <button class="btn btn-primary" type="submit">${editable.id ? "Save Changes" : "Add Job"}</button>
      </div>
    `
  }
}