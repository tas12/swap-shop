<account>
  <p>Coming soon</p>

  <script type="text/javascript">
    const tag = this
    
    tag.on('before-mount', () => {
      tag.opts.store.dispatch({ type: 'RESET_APP_BAR' })
    })
    console.log(this.opts.store.getState());

  </script>
</account>
