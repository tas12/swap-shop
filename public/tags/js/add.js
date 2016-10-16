riot.tag2('add', '<video id="video" autoplay></video> <canvas id="canvas" class="hide" width="400"></canvas> <button name="captureButton" onclick="{capture}">Take photo</button> <button class="hide" name="saveButton" onclick="{save}">Save</button> <button class="hide" name="cancelButton">Cancel</button> <img src="" alt="">', '', '', function(opts) {
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
        width: 400,
        height: 300,
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

});
