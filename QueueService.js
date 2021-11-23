const Queue = require('bull');

class QueueService {
    constructor(queueName = 'default') {
        this.queue = new Queue(queueName)
    }

    async start(cron, jobName = 'default', data = {}) {
        await this.deleteOldJob(jobName);
        this.queue.process(jobName, async (job, done) => {
            job.progress(10);
            console.log('Starting job: ' + job.id);
            console.log(job.data);
            setTimeout(() => {
                job.progress(100);
                console.log('Finising job: ' + job.id);
                done();
            }, 3000)
        });

        this.addCronJob(cron, jobName, data);

        console.log('listening...')
    }

    async deleteOldJob(name) {
        const jobs = await this.queue.getRepeatableJobs();
        console.log(jobs);

        // jobs.forEach(job => this.queue.removeRepeatableByKey(job.key)) // delete all jobs

        const job = jobs.find(job => job.name === name);
        if(job) {
            console.log('Deleting old jobs...');
            await this.queue.removeRepeatableByKey(job.key);
        }
    }

    addCronJob(cron= "* * * * *", name, data) {
        this.queue.add(name, data, {
            repeat: {
                cron,
            }
        })
    }

}

module.exports = QueueService;
