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
describe('DELETE /movies:id', () => {
    it('should delete the movie', done => {
        supertest(app)
        .delete('/movies1')
        .expect(204)
        .end(() => {
            supertest(app)
            .get('/movies1')
            .expect(404)
            .end(done)
        })
    })
    it('should delete the movie, even if it doesn\'t exist', done => {
        supertest(app)
        .delete('/movies72')
        .expect(204)
        .end(() => {
            supertest(app)
            .get('/movies72')
            .expect(404)
            .end(done)
        })
    })
})
describe('post /admin', () => {
    it('should add a movie', done => {
        supertest(app)
        .post('/admin')
        .send({title: 'movie added', poster: 'image1', summary:'bla bla bla'})
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
describe('post /admin', () => {
    it('should update a movie', done => {
        supertest(app)
        .post('/admin')
        .send({id:3, title: 'movie updated', poster: 'image1', summary:'bla bla bla'})
        .expect(200)
        .expect(({body}) => {
            should.exist(body)
            body.should.be.a.Object
            body.should.have.only.keys('id', 'title', 'poster', 'summary')
            should.equal(body.id, 3)
            should.equal(body.title, 'movie updated')
            should.equal(body.poster, 'image1')
            should.equal(body.summary, 'bla bla bla')
        })
        .end(() => {
            supertest(app)
            .get('/movies3')
            .expect(200)
            .expect(({body}) => {
                should.exist(body)
                body.should.be.a.Object
                body.should.have.only.keys('id', 'title', 'poster', 'summary')
                should.equal(body.id, 3)
                should.equal(body.title, 'movie updated')
                should.equal(body.poster, 'image1')
                should.equal(body.summary, 'bla bla bla')
            })
            .end(done)
        })
    })
    it('should send a 404 error, movie updated doesn\'t exist', done => {
        supertest(app)
        .post('/admin')
        .send({id:27, title: 'film inexistant', poster: 'image1', summary:'bla bla bla'})
        .expect(404)
        .end(done)
    })
})
beforeEach(function() {
    // fs.copyFile( movieList, config.get('json'), 'src/data/list.json')
    fs.writeFile(config.get('json'), JSON.stringify(movieList, null, 2), (err) => {
        if (err) throw err
        console.log('reset the file')
      })
  })