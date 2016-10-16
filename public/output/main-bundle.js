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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	riot.tag2('sample', '<h1>What\'s in store</h1> <div class="flex-item" each="{img in img_arr}"> <img riot-src="{img}"> </div> <p> {offline} </p>', '', '', function (opts) {
	  var self = this;

	  fetch('/data').then(function (res) {
	    return res.json();
	  }).then(function (json) {
	    self.update({ img_arr: json.result });
	  }).catch(function (err) {
	    console.log(err);
	    self.update({ offline: 'you are offline' });
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	riot.tag2('add', '<video id="video" autoplay></video> <canvas id="canvas" class="hide" width="400"></canvas> <button name="captureButton" onclick="{capture}">Take photo</button> <button class="hide" name="saveButton" onclick="{save}">Save</button> <button class="hide" name="cancelButton">Cancel</button> <img src="" alt="">', '', '', function (opts) {
	  var _this = this;

	  this.capture = function () {
	    _this.captureButton.disabled = true;
	    _this.canvas.classList = '';
	    _this.canvas.width = _this.video.scrollWidth;
	    _this.canvas.height = _this.video.scrollHeight;
	    _this.video.classList.add('hide');
	    _this.canvas.getContext('2d').drawImage(video, 0, 0, _this.canvas.width, _this.canvas.height);
	    dataURL = _this.canvas.toDataURL('image/png');
	    _this.saveButton.classList = '';
	  };

	  this.save = function () {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState === 4 && xhr.status === 200) {
	        console.log(xhr.response);
	      }
	    };
	    xhr.open('POST', '/save');
	    xhr.send(JSON.stringify({
	      dataURL: dataURL
	    }));
	  };

	  var config = {
	    video: {
	      width: 400,
	      height: 300,
	      facingMode: {
	        ideal: 'environment'
	      }
	    },
	    audio: false
	  };

	  var success = function success(stream) {
	    window.stream = stream;
	    _this.video.srcObject = stream;
	  };

	  var fail = function fail(error) {
	    console.log('navigator.getUserMedia() error: ', error);
	  };

	  navigator.mediaDevices.getUserMedia(config).then(success).catch(fail);
	});

/***/ }
/******/ ]);