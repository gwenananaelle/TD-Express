import express from 'express'
// import fs from 'fs'
const app = express()
const list = require('./data/list.json')
// const list = fs.readFileSync('src/data/list.json','utf8')

app.get('/ping', (req, res) => {
//   res.send('pong')
    // res 
    //     .status(200)
    //     .setHeader('content-type', 'text/html')
    // res.send(JSON.parse(list))
    res.send(list)
})

app.listen(5000, function () {
  console.log('done')
})