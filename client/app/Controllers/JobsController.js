import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function drawJobs() {
  let template = ""
  appState.jobs.forEach(job => template += job.JobTemplate)
  setHTML('listings', template)
}

export class JobsController {
  constructor() {
    // console.log('the jobs controller')
    appState.on("jobs", drawJobs)
  }

  showJobs() {
    this.getJobs()
    setHTML("forms", Job.getJobForm())
  }

  addJob() {
    // @ts-ignore
    appState.activeJob = null
    const template = Job.getJobForm()
    setHTML("forms", template)
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target
      let formData = getFormData(form)

      if (appState.activeJob) {
        await jobsService.editJob(formData)
      } else {
        await jobsService.addJob(formData)
        // @ts-ignore
        form.reset()
      }

    } catch (error) {
      console.error("[addJob]", error)
      Pop.error(error)
    }
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error("[getJobs]", error)
      Pop.error(error)
    }
  }

  beginEdit(jobId) {
    // setText("rightBarLabel", "Edit Job")
    jobsService.setActiveJob(jobId)
    const editable = appState.activeJob
    const template = Job.getJobForm(editable)
    setHTML("forms", template)
  }

  async deleteJob(jobId) {
    try {
      const yes = await Pop.confirm(`Delete the job?`)
      if (!yes) {
        return
      }
      await jobsService.deleteJob(jobId)
    } catch (error) {
      console.error("[deleteJob]", error)
      Pop.error(error)
    }
  }
}