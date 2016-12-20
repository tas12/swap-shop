
require('../../theme-button/theme-button.tag')

<capture>
  <div>
    <video id="video" autoplay></video>
    <canvas id="canvas" class="hide"></canvas>
    <theme-button id="captureButton" text={captureText} onclick={toggleCapture}></theme-button>
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

    const setCanvasDimensions = () => {
      tag.canvas.width = tag.video.scrollWidth
      tag.canvas.height = tag.video.scrollHeight
    }

    tag.captureText = tag.opts.get_data_url() ? 'retake' : 'Take photo'

    const capture = () => {
      console.log('ksldscapture');
      tag.canvas.classList = ''
      setCanvasDimensions()
      tag.video.classList.add('hide')
      tag.canvas.getContext('2d').drawImage(video, 0, 0, tag.canvas.width, tag.canvas.height)
      tag.opts.set_data_url(tag.canvas.toDataURL('image/png', 1))
      tag.captureText = 'retake'
      tag.toggleCapture = retake
      tag.update()
    }

    const retake = () => {
      console.log('retlakefl');
      tag.canvas.classList.add('hide')
      tag.canvas.getContext('2d').clearRect(0, 0, tag.canvas.width, tag.canvas.height)
      tag.video.classList.remove('hide')
      tag.captureText = 'Take photo'
      tag.toggleCapture = capture
      tag.update()
      tag.opts.set_data_url(null)
    }

    if (tag.opts.get_data_url()) {
      tag.video.onloadedmetadata = () => {
        tag.canvas.classList = ''
        setCanvasDimensions()
        tag.video.classList.add('hide')
        const img = new Image
        img.onload = () => {
          tag.canvas.getContext('2d').drawImage(img, 0, 0, tag.canvas.width, tag.canvas.height)
        }
        img.src = tag.opts.get_data_url()
      }
    }

    tag.on('before-unmount', () => {
      if (tag.stream)
        tag.stream.getTracks().forEach(track => track.stop())
    })

    tag.toggleCapture = tag.opts.get_data_url() ? retake : capture

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
      tag.opts.store_stream(stream)
      window.stream = stream
      tag.video.srcObject = stream
    }

    const fail = (error) => {
      console.log('navigator.getUserMedia() error: ', error)
    }

    navigator.mediaDevices.getUserMedia(config).then(success).catch(fail)

  </script>
</capture>
