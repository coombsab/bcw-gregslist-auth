import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class JobsService {
  async deleteJob(jobId, userInfo) {
    const job = await this.getJob(jobId)
    if (job.sellerId.toString() !== userInfo.id) {
      throw new Forbidden("That is not your job.  You may not delete it.")
    }
    await job.delete()
  }
  async editJob(jobData, userInfo) {
    const job = await this.getJob(jobData.id)
    if (job.sellerId.toString() !== userInfo.id) {
      throw new Forbidden("That is not your job.  You may not edit it.")
    }

    job.company = jobData.company || job.company
    job.jobTitle = jobData.jobTitle || job.jobTitle
    job.rate = jobData.rate || job.rate
    job.hours = jobData.hours || job.hours
    job.description = jobData.description || job.description

    await job.save()
    return job
  }
  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }
  async getJob(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate("seller", "name")
    if (!job) {
      throw new BadRequest("Invalid Job ID")
    }

    return job
  }
  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

}

export const jobsService = new JobsService()