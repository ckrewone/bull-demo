const express = require('express')
const Queue = require('bull')
const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { ExpressAdapter } = require('@bull-board/express')

const firstQueue = new Queue('first')

const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullAdapter(firstQueue),
  ],
  serverAdapter:serverAdapter
})

const app = express()

serverAdapter.setBasePath('/admin/queues')
app.use('/admin/queues', serverAdapter.getRouter());

app.listen(3000, (err) => {
    console.log(err ? err : 'Listening....')
})