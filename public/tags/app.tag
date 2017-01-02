require('./views/shop.tag')
require('./views/add/capture.tag')
require('./views/add/details.tag')
require('./views/add/communities.tag')
require('./views/add/complete.tag')
require('./views/account.tag')
require('./views/messages.tag')
require('./views/about.tag')
require('./app-header/app-header.tag')

<app class="app">
  <app-header state={state.appBar} action={action}/>
  <div id="content"></div>

  <script>
    const tag = this
    tag.store = tag.opts.store
    const store = tag.opts.store
    tag.state = store.getState()

    store.subscribe(() => {
      tag.state = store.getState()
      tag.update()
    })

    tag.action = (onclick) => {
      if (onclick) {
        riot.mount(tag.content, onclick, { store })
      } else {
        const view = location.href.split('/')[3] || 'shop'
        riot.mount(tag.content, view, { store })
      }
    }

  </script>

</app>
