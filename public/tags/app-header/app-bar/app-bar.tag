<app-bar>
  <div class="header">
    <i class="material-icons left icons"
      onclick={() => opts.action(opts.state.leftIcon.onclick)}
    >{opts.state.leftIcon.icon}</i>

    <div class="logo">
      <a href="/">SwapShop</a>
    </div>
    <i class="material-icons icons"
      id="right"
      onclick={() => opts.action(opts.state.rightIcon.onclick)}
    >{opts.state.rightIcon.icon}</i>

  </div>

  <style media="screen">
    .logo {
      display: inline-block;
    }

    .icons {
      margin: 15px;
      color: white;
    }

    .left {
      float: left;
    }

    #right {
      float: right;
    }

    i.material-icons {
      min-width: 24px;
    }
  </style>

  <script type="text/javascript">
  </script>
</app-bar>
