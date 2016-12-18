require('../form/form.tag')
require('../theme-button/theme-button.tag')

<add-item>
  <video id="video" autoplay></video>
  <canvas id="canvas" class="hide"></canvas>
  <theme-button id="captureButton" text="Take photo" onclick={capture}></theme-button>
  <button class="hide" name="cancelButton">Cancel</button>
  <form />
  <theme-button class="hide" id="saveButton" text="Save" onclick={save}>Save</theme-button>

  <style>
    video, canvas {
      display: block;
      margin: 0 auto;
      width: 640px;
      max-width: 100vw;
      height: 75vw
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
    let dataURL

    tag.on('before-unmount', () => {
      if (tag.stream)
        tag.stream.getTracks().forEach(track => track.stop())
    })

    tag.capture = () => {
      tag.captureButton.disabled = true
      tag.canvas.classList = ''
      tag.canvas.width = tag.video.scrollWidth
      tag.canvas.height = tag.video.scrollHeight
      tag.video.classList.add('hide')
      tag.canvas.getContext('2d').drawImage(video, 0, 0, tag.canvas.width, tag.canvas.height)
      dataURL = tag.canvas.toDataURL('image/png')
      tag.saveButton.classList = ''
    }

    tag.save = () => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.response)
        }
      }
      xhr.open('POST', '/save')
      xhr.send(JSON.stringify({
        dataURL
      }))
    }

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
      window.stream = stream
      tag.video.srcObject = stream
    }

    const fail = (error) => {
      console.log('navigator.getUserMedia() error: ', error)
    }

    navigator.mediaDevices.getUserMedia(config).then(success).catch(fail)

  </script>
</add-item>
