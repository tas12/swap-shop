const Hapi = require('hapi')
const fs = require('fs')
const path = require('path')

const response = require('./response.js')

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
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default',
    partialsPath: 'views/partials'
  })

  server.route([{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index')
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
      const base64Data = JSON.parse(request.payload).dataURL.replace(/^data:image\/png;base64,/, '')
      fs.writeFile(path.join(__dirname, 'img', 'out.png'), base64Data, 'base64', (error) => {
        if (!error) {
          reply(response.success())
        } else {
          reply(response.failure(error))
        }
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
