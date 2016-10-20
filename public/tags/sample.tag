<sample>
  <div id="spinner">
    <material-spinner></material-spinner>
  </div>
  <div class="flex-item" each="{img in img_arr}" style="max-width: 85%;">
    <img riot-src="{img}" style="width: 100%; margin: 0px 0px 10px 0px;">
  </div>
  <p> {offline} </p>

  <script>
    const self = this

    fetch('/data')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        self.spinner.style.display = 'none'
        self.update({ img_arr: json.result })
      })
      .catch((err) => {
        self.spinner.style.display = 'none'
        console.log(err)
        self.update({ offline: 'you are offline' })
      })
  </script>
</sample>
