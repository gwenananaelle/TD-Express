import express from 'express'
const app = express()

app.get('/ping', (req, res) => {
//   res.send('pong')
    res 
        .status(200)
        .setHeader('content-type', 'text/html')
    res.send('pong')
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})