<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  min-width: 300px;
  background: #f5f5f5;
  overflow: auto;
}

html,
body,
#app {
  height: 100%;
  min-height: 100vh;
}

body,
input,
button {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
