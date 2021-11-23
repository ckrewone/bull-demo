const QueueService = require('./QueueService');
const QUEUES = require('./queues');

console.log('Hello - starting scheduler 1');

const queueService = new QueueService(QUEUES.FIRST_QUEUE);
queueService.start('*/10 * * * * *', 'first-job', {first: true});