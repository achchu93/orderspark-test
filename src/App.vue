<template>
  <div id="app">
	<Header />
	<Hero />
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue'
import Hero from './components/ui/Hero.vue'

export default {
  name: 'App',
  components: {
	Header,
	Hero
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
