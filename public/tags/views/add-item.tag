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
      max-width: 100%;
    }

    video {
      border: 1px solid orange;
    }

    canvas {
      border: 1px solid pink;
    }

  </style>

  <script>
    let dataURL
    this.capture = () => {
      this.captureButton.disabled = true
      this.canvas.classList = ''
      this.canvas.width = this.video.scrollWidth
      this.canvas.height = this.video.scrollHeight
      this.video.classList.add('hide')
      this.canvas.getContext('2d').drawImage(video, 0, 0, this.canvas.width, this.canvas.height)
      dataURL = this.canvas.toDataURL('image/png')
      this.saveButton.classList = ''
    }

    this.save = () => {
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
      window.stream = stream
      this.video.srcObject = stream
    }

    const fail = (error) => {
      console.log('navigator.getUserMedia() error: ', error)
    }

    navigator.mediaDevices.getUserMedia(config).then(success).catch(fail)

  </script>
</add-item>
