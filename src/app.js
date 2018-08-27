import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
const app = express()
const fs = require('fs')
let movies = fs.readFile(config.get('json'), (err, data) => {
  if (err) throw err;
  movies = JSON.parse(data)
})

app.use(bodyParser.json())

app.use(
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
  },
  (req, res, next) => setTimeout(next, config.get('timeout')))

app.use(express.static('public'))

app.get('/movies',
  (req, res) => {
    const list = movies.map(element => { return { id: element.id, title: element.title, poster: element.poster } })
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
    const selectedMovie = movies.find(element => element.id == req.params.id)
    if (!selectedMovie) {
        return res.status(404).send('film introuvable')
      }
    res.send(selectedMovie)
  }
)

app.post('/Admin',
  (req, res) => {
    let newMovie = req.body
    const errors = []
    const validateField = (field, msg) => (!field || field.trim().length === 0) && errors.push(msg)
    validateField(newMovie.title, 'titre obligatoire')
    validateField(newMovie.poster, 'image obligatoire')
    validateField(newMovie.summary, 'summary obligatoire')
    if (errors.length > 0) return res.status(400).send(errors)
    newMovie = { "id": movies.length, "title": newMovie.title, "poster": newMovie.poster, "summary": newMovie.summary }
    movies.push(newMovie)
    let data = JSON.stringify(movies, null, 2);
    fs.writeFile(config.get('json'), data, (err) => {
      if (err) throw err
      console.log('The file was updated!')
    })
    res.send(newMovie)
  }
)
export default app