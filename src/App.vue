<template>
  <div id="app">
    <AppHeader />
    <AppSidebar />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
// import SolidityEditor from './components/SolidityEditor.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar,
    // SolidityEditor
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}

.main-content {
  margin-left: 200px;
  width: calc(100% - 200px);
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); /* 减去上边距的高度 */
}
</style>
