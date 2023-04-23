<template>
    <div>
      <button @click="showABI" class="result-button">ABI</button>
      <button @click="showBytecode" class="result-button">字节码</button>
      <div v-if="showingABI" @click="closeABI" class="popup">
        <pre class="content-box">{{ abi }}</pre>
      </div>
      <div v-if="showingBytecode" @click="closeBytecode" class="popup">
        <pre class="content-box">{{ bytecode }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['abi', 'bytecode'],
    data() {
      return {
        showingABI: false,
        showingBytecode: false
      };
    },
    methods: {
      showABI() {
        this.showingABI = true;
      },
      closeABI() {
        this.showingABI = false;
      },
      showBytecode() {
        this.showingBytecode = true;
      },
      closeBytecode() {
        this.showingBytecode = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .result-button {
    margin-right: 10px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    background-color: #1e88e5;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    border-radius: 4px;
  }
  
  .result-button:hover {
    background-color: #1976d2;
  }
  
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  
  .content-box {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
  }
  </style>
  