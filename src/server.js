import express from 'express'
const app = express()
let movies = require('./data/list.json')
let list = null

app.use(
  (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  next()
  },
  (req, res, next) => {
    setTimeout(next, 1000);
  }
)

app.get('/movies', 
(req, res, next) => {
  list = movies.map(element => {return {id: element.id, title: element.title, poster: element.poster}})
  next()
},
(req, res) => {
    res.send(list)
  }
)
app.get('/moviesDetails', 
(req, res) => {
    res.send(movies)
  }
)

app.get("/movies:id", 
(req, res) => {
    const selectedMovie = movies.find(element => element.id == req.params.id )
    res.send(selectedMovie)
  }
)

app.post('/clicked', (req, res) => {
  const click = {clickTime: new Date()};
  console.log(click);
});

app.listen(5000, () => {
  console.log('hello');
})
