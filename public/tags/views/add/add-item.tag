require('../add/capture.tag')
require('../add/details.tag')

<add-item>
  <div class="nav">
    <i
      class="material-icons"
      id="done"
      onclick={() => currentPage(nextPage)}
      style={nextPage ? 'display: inline-block;' : 'display: none;'}
    >done</i>
    <i
      class="material-icons"
      id="back"
      onclick={() => currentPage(previousPage)}
      style={previousPage ? 'display: inline-block;' : 'display: none;'}
    >arrow_back</i>
  </div>
  <div id="add">
  </div>

  <style>
    .nav {
      display: inline-block;
      width: 640px;
      max-width: 100vw;
    }

    button[name='previous'] {
      float: left;
    }

    #done {
      float: right;
    }

  </style>
  <script type="text/javascript">
    const tag = this
    let stream, d, page

    tag.on('before-unmount', () => {
      if (stream)
        stream.getTracks().forEach(track => track.stop())
    })

    tag.storeStream = (s) => {
      stream = s
    }

    tag.setDataURL = (dataURL) => {
      d = dataURL
      tag.update()
    }

    tag.getDataURL = () => {
      return d
    }

    tag.currentPage = (page) => {
      if (page === 'details') {
        tag.previousPage = 'capture'
        tag.nextPage = null
        riot.mount(tag.add, 'details', { set_page: tag.setPage })
      } else {
        tag.previousPage = null
        tag.nextPage = 'details'
        riot.mount(tag.add, 'capture', {
          set_data_url: tag.setDataURL,
          get_data_url: tag.getDataURL,
          set_page: tag.setPage,
          store_stream: tag.storeStream
        })
      }
    }

    tag.setPage = (p) => {
      page = p
      tag.currentPage(p)
    }

    tag.setPage(page)


  </script>
</add-item>
