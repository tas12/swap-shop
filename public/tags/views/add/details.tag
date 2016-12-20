require('../../form/form.tag')
require('../../theme-button/theme-button.tag')

<details>
  <form />
  <theme-button class="hide" id="saveButton" text="Save" onclick={save}>Save</theme-button>

  <script type="text/javascript">
    const tag = this
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

  </script>
</details>
