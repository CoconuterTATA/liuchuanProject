<template>
  <div class="sidebar">
    <ul>
      <li>
        <router-link to="/" class="nav-link" active-class="active">智能合约编辑器</router-link>
      </li>
      <li>
        <router-link to="/dsl" class="nav-link" active-class="active">DSL</router-link>
      </li>
      <li>
        <router-link to="/chart" class="nav-link" active-class="active">变量图</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar'
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100%;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 16px 8px;
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  display: block;
  padding: 8px 16px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.active {
  background-color: #1fa858;
}
</style>
