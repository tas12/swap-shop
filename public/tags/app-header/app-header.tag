require('./app-bar/app-bar.tag')
require('./navigation/navigation.tag')

<app-header>
  <app-bar state={opts.state} action={opts.action} />
  <navigation style={opts.state.addView ? 'display:none' : 'display:inline-flex'} />
</app-header>
