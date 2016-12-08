const Hapi = require('hapi')
const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const riot = require('riot')

const response = require('./response.js')
const knex = require('./db/schema.js')
const { getPhotos } = require('./db/helpers.js')

const header = require('./tags/header/header.tag')
const toast = require('./tags/toast/toast.tag')
const headerOutput = riot.render(header)
const toastOutput = riot.render(toast)

const plugins = ['inert', 'vision'].map((plugin) => {
  return require(plugin)
})

// const tls = {
//   key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
// }

const server = new Hapi.Server()
server.connection({ port: 5000 /*tls */})

server.register(plugins, (err) => {
  if (err) throw err

  server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: path.join(__dirname, '..'),
    path: 'views'
  })

  server.route([{
    method: 'GET',
    path: '/shell',
    handler: (request, reply) => {
      reply.view('index', { header: headerOutput, toast: toastOutput })
    }
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: (request, reply) => {
      getPhotos
        .then(() => reply.view('index', { header: headerOutput, toast: toastOutput }))
        .catch((error) => {
          if (error) throw error
        })
    }
  },
  {
    method: 'GET',
    path: '/data',
    handler: (request, reply) => {
      getPhotos
        .then((result) => reply({ result }))
        .catch((error) => {
          if (error) throw error
        })
    }
  },
  {
    method: 'GET',
    path: '/images/{filename}.png',
    handler: (request, reply) => {
      reply.file(path.join(__dirname, 'img', request.params.filename + '.png'))
    }
  },
  {
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  },
  {
    method: 'GET',
    path: '/{filename}.js',
    handler: (request, reply) => {
      reply.file(path.join(__dirname, '..', request.params.filename + '.js'))
    }
  },
  {
    method: 'POST',
    path: '/save',
    handler: (request, reply) => {
      const created_at = new Date(Date.now()).toISOString()
      const filename = `out_${shortid.generate()}.png`
      const base64Data = JSON.parse(request.payload).dataURL.replace(/^data:image\/png;base64,/, '')
      fs.writeFile(path.join(__dirname, 'img', filename), base64Data, 'base64', (error) => {
        if (error)
          reply(response.failure(error))

        knex('photos').insert({ filename, created_at }).then((res) => {
          reply(response.success())
        })
      })
    }
  },
  {
    method: 'GET',
    path: '/shop/{image}.png',
    handler: (request, reply) => {
      reply.file(path.join(__dirname, 'img', request.params.image + '.png'))
    }
  }
  ])
})

server.start((err) => {
  if (err) throw err
  console.log(`Server running at: ${server.info.uri}`)
})
