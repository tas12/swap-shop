<complete>
  <p></p>

  <script type="text/javascript">
    const tag = this
    
    const store = tag.opts.store

    tag.on('before-mount', () => {
      store.dispatch({ type: 'SET_COMPLETE_STEP' })
    })
  </script>
</complete>
