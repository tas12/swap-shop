<form>
  <div class="inputContent">
    <material-input id="name" label="Item name" value={opts.state.itemName}></material-input>
    <material-input id="description" label="Description" value={opts.state.description}></material-input>
  </div>
  <theme-button onclick={clearForm} text="clear" />

  <style>
    material-input {
      display: block;
      width: 450px;
      max-width: 90%;
      margin: 0 auto;
      text-align: left;
    }

    .inputContent input {
      font-size: 1em;
    }

    .inputContent label {
      color: #717373;
    }
  </style>

  <script type="text/javascript">
    const tag = this
    const inputs = tag.tags['material-input']

    tag.clearForm = (e) => {
      inputs.forEach((el) => {
        el.value = ''
        el.trigger('valueChanged')
      })
    }

    inputs.forEach((el) => {
      el.on('valueChanged', () => {
        console.log(el.opts.id, el.value);
        tag.opts.get_value(el.opts.id, el.value)
      })
    })

  </script>
</form>
