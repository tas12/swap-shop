/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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

	openMenuButton.addEventListener('click', (e) => {
	  e.preventDefault()
	  navbar.style.height = '100%'
	})

	closeMenuButton.addEventListener('click', (e) => {
	  e.preventDefault()
	  navbar.style.height = '0%'
	})

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

	console.log(config)

	const success = (stream) => {
	  window.stream = stream
	  video.srcObject = stream
	}

	const fail = (error) => {
	  console.log('navigator.getUserMedia() error: ', error)
	}

	navigator.mediaDevices.getUserMedia(config).then(success).catch(fail)


/***/ }
/******/ ]);