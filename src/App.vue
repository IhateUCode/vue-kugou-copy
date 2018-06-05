<template>
  <div id="app">
       <Head />
       <div class="marginT">
           <router-view></router-view>  
       </div>
       <Player />
       <detailPlayer />
  </div>
</template>

<script>
import Head from './components/Head'
import Player from './components/player'
import detailPlayer from './components/detailPlayer'
export default {
  name: 'App',
  components: {
      Head,
      Player,
      detailPlayer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.marginT {
  margin-top: 1.5rem;
}
</style>
