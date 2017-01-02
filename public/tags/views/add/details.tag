require('../../form/form.tag')
require('../../theme-button/theme-button.tag')

<details>
  <form state={state} get_value={getValue} form_data={state}/>
  <theme-button class="hide" id="saveButton" text="Save" onclick={save}>Save</theme-button>

  <script type="text/javascript">
    const tag = this

    const store = tag.opts.store
    tag.state = store.getState().addViewData.formData

    tag.data = {
      name: tag.state.itemName,
      description: tag.state.description
    }

    tag.on('before-mount', () => {
      store.dispatch({ type: 'SET_DETAILS_STEP' })
    })

    tag.getValue = (id, value) => {
      tag.data[id] = value
    }

    tag.on('before-unmount', () => {
      store.dispatch({
        type: 'STORE_FORM_DATA',
        payload: { itemName: tag.data.name, description: tag.data.description }
      })
    })

  </script>
</details>
