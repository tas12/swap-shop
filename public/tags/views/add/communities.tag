<communities>
  <h3 id="title">Which communities would you like to add your item to?</h3>
  <div class="communities">
    <div each={c in communities}>
      <material-checkbox name="checker" onclick={() => check(c.name)}>
        <img src={c.logo} alt={c.name}>
      </material-checkbox>
    </div>
  </div>

  <style media="screen">
    #title {
      width: 80%;
      color: grey;
      margin: 10px auto;
    }
    .communities {
      width: 70%;
      margin: 0px auto;
    }

    .communities label {
      -khtml-user-select: none;
      -o-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }

    .communities img {
      max-width: 150px;
    }

    material-checkbox {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .checkbox {
      border: 1.5px solid #00bcd4 !important;
    }

    .checked {
      background-color: #00bcd4 !important;
    }
  </style>

  <script type="text/javascript">
    const tag = this

    const store = tag.opts.store
    console.log(store.getState());

    tag.on('before-mount', () => {
      store.dispatch({ type: 'SET_COMMUNITIES_STEP' })
    })
    // this data will eventually come from the db
    tag.communities = [
      { name: 'MADE NGO', logo: 'https://www.made.ngo/images/logo-new.png'},
      { name: 'Oh So Ethical', logo: 'https://scontent-lhr3-1.cdninstagram.com/t51.2885-19/11376411_1454007531580900_428852064_a.jpg'},
      { name: 'Founders & Coders', logo: 'https://pbs.twimg.com/profile_images/534123785817829376/UE8T_TQF_400x400.png'},
    ]

    let checked = false

    tag.check = (communityName) => {
      checked = !checked
      if (checked) {
        store.dispatch({
          type: 'ADD_COMMUNITY',
          payload: communityName
        })
      } else {
        store.dispatch({
          type: 'REMOVE_COMMUNITY',
          payload: communityName
        })
      }
    }

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

    tag.on('before-unmount', () => {

    })
  </script>
</communities>
