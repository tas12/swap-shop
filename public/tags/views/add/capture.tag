
require('../../theme-button/theme-button.tag')

<capture>
  <div>
    <video id="video" autoplay></video>
    <canvas id="canvas" class="hide"></canvas>
    <theme-button id="captureButton" text={state.dataUrl ? 'retake' : 'Take photo'}
      onclick={state.dataUrl ? retake : capture }></theme-button>
  </div>

  <style>
    video, canvas {
      display: block;
      margin: 0 auto;
      width: 640px;
      max-width: 100vw;
    }

    video {
      border: 1px solid orange;
    }

    canvas {
      border: 1px solid pink;
    }

  </style>

  <script>
    const tag = this

    const store = tag.opts.store
    tag.state = store.getState().addViewData

    tag.on('before-mount', () => {
      store.dispatch({ type: 'SET_CAPTURE_STEP' })
    })

    store.subscribe(() => {
      tag.state = store.getState().addViewData
      tag.update()
    })

    const setCanvasDimensions = () => {
      tag.canvas.width = tag.video.scrollWidth
      tag.canvas.height = tag.video.scrollHeight
    }

    tag.capture = () => {
      tag.canvas.classList = ''
      setCanvasDimensions()
      tag.video.classList.add('hide')
      tag.canvas.getContext('2d').drawImage(video, 0, 0, tag.canvas.width, tag.canvas.height)
      store.dispatch({
        type: 'STORE_DATA_URL',
        payload: tag.canvas.toDataURL('image/png', 1)
      })
    }

    tag.retake = () => {
      tag.canvas.classList.add('hide')
      tag.canvas.getContext('2d').clearRect(0, 0, tag.canvas.width, tag.canvas.height)
      tag.video.classList.remove('hide')
      store.dispatch({
        type: 'RESET_DATA_URL'
      })
    }

    if (tag.state.dataUrl) {
      tag.video.onloadedmetadata = () => {
        tag.canvas.classList = ''
        setCanvasDimensions()
        tag.video.classList.add('hide')
        const img = new Image
        img.onload = () => {
          tag.canvas.getContext('2d').drawImage(img, 0, 0, tag.canvas.width, tag.canvas.height)
        }
        img.src = tag.state.dataUrl
      }
    }

    tag.on('before-unmount', () => {
      if (tag.state.stream) {
        tag.state.stream.getTracks().forEach(track => track.stop())
        store.dispatch({
          type: 'RESET_STREAM'
        })
      }
    })

    const config = {
      video: {
        maxWidth: '640',
        maxHeight: '480',
        facingMode: {
          ideal: 'environment'
        },
      },
      audio: false,
    }

    const success = (stream) => {
      tag.stream = stream
      store.dispatch({
        type: 'STORE_STREAM',
        payload: stream
      })
      // window.stream = stream
      tag.video.srcObject = stream
    }

    const fail = (error) => {
      console.log('navigator.getUserMedia() error: ', error)
    }

    navigator.mediaDevices.getUserMedia(config).then(success).catch(fail)

  </script>
</capture>
