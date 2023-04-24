<template>
    <header class="AppHeader">
      <h1 class="title">面向金融庞氏骗局监管系统</h1>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppHeader'
  };
  </script>
  
  <style scoped>
  .AppHeader {
    background-color: #2c3e50;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  .title {
    margin: 0;
    padding: 0;
    font-size: 24px;
  }
  </style>
  