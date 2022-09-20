import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { Pop } from "../Utils/Pop.js"
import { saveState } from "../Utils/Store.js"
import { server } from "./AxiosService.js"

class JobsService {
  async getJobs() {
    const response = await server.get("/api/jobs")
    // console.log("jobs?", response.data)
    appState.jobs = response.data.map(rawData => new Job(rawData))
    // console.log("jobs?", appState.jobs)
  }
  
  setActiveJob(jobId) {
    const activeJob = appState.jobs.find(job => job.id === jobId)
    if (!activeJob) {
      Pop.error("Invalid Job ID")
      throw new Error("Invalid Job ID")
    }
    appState.activeJob = activeJob
    console.log("setActiveJob", appState.activeJob)
  }
  
  async addJob(formData) {
    const response = await server.post("/api/jobs", formData)
    console.log("addJob", response.data)
    let newJob = new Job(response.data)
    console.log("addJob", newJob)
    appState.jobs = [...appState.jobs, newJob]
  }
  async editJob(formData) {
    const activeJob = appState.activeJob
    const response = await server.put(`/api/jobs/${activeJob.id}`, formData)
    console.log("editJob", response.data)

    const updatedJob = new Job(response.data)
    const index = appState.jobs.findIndex(job => job.id === activeJob.id)
    appState.jobs.splice(index, 1, updatedJob)
    appState.emit("jobs")
  }
  async deleteJob(jobId) {
    await server.delete(`/api/jobs/${jobId}`)
    appState.jobs = appState.jobs.filter(job => job.id !== jobId)
  }

}

export const jobsService = new JobsService()