const knex = require('./schema.js')

const getPhotos = new Promise((resolve, reject) => {
  knex('photos').select('filename').then((res) => {
    return res.map((obj) => {
      return 'images/' + obj.filename
    })
  })
  .then((result) => {
    resolve(result)
  })
})

module.exports = {
  getPhotos
}
