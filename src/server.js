import express from 'express'
const app = express()
const list = require('./data/list.json')

app.use(
  (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  next()
  },
  (req, res, next) => {
    setTimeout(next, 1000);
})

app.get('/movies', 
(req, res) => {
    res.send(list)
  }
)

app.listen(5000, () => {
  console.log('hello');
})