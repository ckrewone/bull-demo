const Queue = require('bull');

class QueueService {
    constructor(queueName = 'default') {
        this.queue = new Queue(queueName, {
        })

        process.on('SIGTERM', async() => {
            await this.queue.close();
            process.kill(0);
          });

        process.on('SIGINT', async() => {
            await this.queue.close();
            console.info('\nGoodbye 👋');
            process.kill(0);
          });
    }

    async start(cron, jobName = 'default', data = {}) {
        await this.deleteOldJob(jobName);
        this.queue.process(jobName, async (job, done) => {
            try {
            await this.queue.pause(false, true);
            const jobs = await this.queue.getActive();
            // if(jobs.length > 1) {
                // const t = await job.retry();
                // console.log(t);
            // }

            job.progress(10);
            console.log('Starting job: ' + job.id);
            console.log(jobs.length);
            setTimeout(() => {
                job.progress(100);
                console.log('Finising job: ' + job.id);
                done();
                this.queue.resume(false);
            }, 3000)
        } catch(e) {
            console.log('Error: ' + e);
            done(e);
        }
        });

        setInterval(() => {
            this.addCronJob(cron, jobName, data);
        },10000)

        console.log('listening...')
    }

    async deleteOldJob(name) {
        const jobs = await this.queue.getRepeatableJobs();
        // jobs.forEach(job => this.queue.removeRepeatableByKey(job.key)) // delete all jobs

        const job = jobs.find(job => job.name === name);
        console.log(job);
        if(job) {
            console.log('Deleting old jobs...');
            await this.queue.removeRepeatableByKey(job.key);
        }
    }

    addCronJob(cron= "* * * * *", name, data) {
        this.queue.add(name, data, {
            // repeat: {
                // cron,
            // },
        })
    }

}

module.exports = QueueService;
