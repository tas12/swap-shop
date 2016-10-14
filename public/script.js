const DOM = {
  canvas: document.querySelector('canvas'),
  video: document.querySelector('video'),
  captureButton: document.querySelector('button[name="capture"]'),
  saveButton: document.querySelector('button[name="save"]'),
  openMenuButton: document.getElementById('openMenuButton'),
  closeMenuButton: document.getElementById('closeMenuButton'),
  navbar: document.getElementById('navbar')
}

const { canvas, video, captureButton, saveButton, openMenuButton, closeMenuButton, navbar } = DOM
let dataURL

if (openMenuButton) {
  openMenuButton.addEventListener('click', (e) => {
    e.preventDefault()
    navbar.style.height = '100%'
  })
}

if (closeMenuButton) {
  closeMenuButton.addEventListener('click', (e) => {
    e.preventDefault()
    navbar.style.height = '0%'
  })
}

if (captureButton) {
  captureButton.addEventListener('click', () => {
    captureButton.disabled = true
    canvas.classList = ''
    canvas.width = video.scrollWidth
    canvas.height = video.scrollHeight
    video.classList.add('hide')
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    dataURL = canvas.toDataURL('image/png')
    saveButton.classList = ''
  })
}

if (saveButton) {
  saveButton.addEventListener('click', () => {
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
  })
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
  video.srcObject = stream
}

const fail = (error) => {
  console.log('navigator.getUserMedia() error: ', error)
}

if (video)
  navigator.mediaDevices.getUserMedia(config).then(success).catch(fail)
