<sample>
  <h1>What's in store</h1>
  <div class="flex-item" each="{img in img_arr}">
    <img riot-src="{img}">
  </div>
  <p> {offline} </p>

  <script>
    fetch('/data')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        self.update({ img_arr: json.result })
      })
      .catch((err) => {
        console.log(err)
        self.update({ offline: 'you are offline' })
      })
  </script>
</sample>
