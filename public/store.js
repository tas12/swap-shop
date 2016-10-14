const DOM = {
  container: document.querySelector('.flex-container'),
  imgContainer: document.querySelector('.images')
}

fetch('/data')
  .then((res) => {
    return res.json()
  })
  .then((json) => {
    let clone
    json.result.forEach((file) => {
      clone = DOM.imgContainer.cloneNode(true)
      clone.children[0].src = file
      clone.style.display = ''
      DOM.container.appendChild(clone)
    })
  })
  .catch((err) => {
    console.log(err)
    const p = document.createElement('p')
    p.innerHTML = 'you are offline'
    DOM.container.appendChild(p)
  })
