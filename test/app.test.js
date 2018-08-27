import supertest from 'supertest'
import app from '../src/app'
import should from 'should'
import config from 'config'
import fs from 'fs'
import { movieList } from './movieList'

describe('get /movies', () => {
    it('should send a list of movies', done => {
        supertest(app)
        .get('/movies')
        .expect(200)
        .expect(res => {
            should.exist(res.body)
            res.body.should.be.a.array
            res.body.should.have.length > 0
            res.body[0].should.have.only.keys('id', 'title', 'poster')
        })
        .end(done)
    })
})
describe('get /movies:id', () => {
    it('should be the corresponding movie', done => {
        supertest(app)
        .get('/movies1')
        .expect(200)
        .expect(({body}) => {
            should.exist(body)
            body.should.be.a.Object
            body.should.have.only.keys('id', 'title', 'poster', 'summary')
        })
        .end(done)
    })
    it('should send a 404 error', done => {
        supertest(app)
        .get('/movies72')
        .expect(404)
        .expect(({text}) => {
            should.exist(text)
            text.should.not.be.empty
        })
        .end(done)
    })
})
describe('post /admin', () => {
    it('should be awesome', done => {
        supertest(app)
        .post('/admin')
        .send({title: 'monFilm', poster: 'image1', summary:'bla bla bla'})
        .expect(200)
        .end(done)
    })
    it('should send a 400 error', done => {
        supertest(app)
        .post('/admin')
        .expect(400)
        .end(done)
    })
})
beforeEach(function() {
    // fs.copyFile( movieList, config.get('json'), 'src/data/list.json')
    fs.writeFile(config.get('json'), JSON.stringify(movieList), (err) => {
        if (err) throw err
        console.log('The file was updated!')
      })
  })