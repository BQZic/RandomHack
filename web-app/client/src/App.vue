<template>
  <div id="app">      
        <p><router-link to="/">Home</router-link>&nbsp;</p>          
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app'  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#loader {
  position:fixed;
  padding-top: 250px;
}

</style>
