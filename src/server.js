import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const router = express.Router();
const fs = require('fs');
let movies = fs.readFile('src/data/list.json', (err, data) => {  
  if (err) throw err;
  movies = JSON.parse(data);
})
let list = null

app.use(bodyParser.json())

app.use(
  (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
  },
  (req, res, next) => {
    setTimeout(next, 1000);
  }
)

app.use(express.static('public'))

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

/**
 * test get data from form
 */
app.post('/form', 
  (req, res) => {
    let newMovie = req.body
    newMovie = {"id":movies.length, "title":newMovie.title, "poster":newMovie.poster, "summary":newMovie.summary}
    movies = fs.readFile('src/data/list.json', (err, data) => {  
      if (err) throw err;
      movies = JSON.parse(data);
    })
    movies.push(newMovie)
    let data = JSON.stringify(movies, null, 2);  
    fs.writeFile('src/data/list.json', data, (err) => {  
      if (err) throw err;
      console.log('The file was updated!')
  })
  }
)

app.listen(5000, () => {
  console.log('hello');
})
