<shop>
  <div id="spinner">
    <material-spinner></material-spinner>
  </div>
  <div class="flex-container">
    <div class="flex-item" each="{img in img_arr}">
      <img riot-src="{img}" style="width: 100%;">
    </div>
  </div>
  <p> {offline} </p>

  <style>
    .flex-item {
      margin: 0px 10px 20px 10px;
      width: 350px;
      max-width: 95%;
      height: auto;
      display: inherit;
    }

    .flex-container {
      display: inline-block;
      max-width: 90%;
      margin: 0 auto;
    }

  </style>

  <script>
    const tag = this

    fetch('/data')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        tag.spinner.style.display = 'none'
        tag.update({ img_arr: json.result })
      })
      .catch((err) => {
        tag.spinner.style.display = 'none'
        console.log(err)
        tag.update({ offline: 'you are offline' })
      })
  </script>
</shop>
