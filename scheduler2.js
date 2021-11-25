const QueueService = require('./QueueService');
const QUEUES = require('./queues');

console.log('Hello - starting scheduler 2');

const queueService = new QueueService(QUEUES.FIRST_QUEUE);
queueService.start('*/10 * * * * *', 'second-job', {second: true});