<template>
  <div id="app">
    <tab/>
    <router-view/>
    <player/>
  </div>
</template>

<script>
import tab from '@/components/header-bar/header-bar'
import player from '@/components/player/player.vue'
export default {
  name: 'app',
  components:{
    tab,
    player
  }
}
</script>

<style lang='scss'></style>
