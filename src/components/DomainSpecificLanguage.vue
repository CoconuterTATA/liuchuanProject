<template>
  <div class="textareas-container">
    <div class="textarea-container">
      <h3>DSL</h3>
      <textarea v-model="dslText" rows="10" cols="30" class="textarea"></textarea>
    </div>
    <div class="textarea-container">
      <h3>代码</h3>
      <textarea v-model="codeText" rows="10" cols="30" class="textarea"></textarea>
    </div>
  </div>
  <div class="options-container">
    <div class="radio-group">
      <input type="radio" id="dsl" value="DSL" v-model="selectedOption" />
      <label for="dsl">DSL</label>
      <input type="radio" id="chatgpt" value="ChatGPT" v-model="selectedOption" />
      <label for="chatgpt">ChatGPT</label>
      <input type="radio" id="newbing" value="NewBing" v-model="selectedOption" />
      <label for="newbing">NewBing</label>
    </div>
    <button class="generate-button" @click="generate">Generate</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "DomainSpecificLanguage",
  data() {
    return {
      dslText: "",
      codeText: "",
      selectedOption: "DSL",
    };
  },
  methods: {
    async generate() {
      if (this.selectedOption === "ChatGPT") {
        const response = await axios.post("http://localhost:8080/generate", {
          dsl: this.dslText,
        });

        if (response.data.code) {
          this.codeText = response.data.code;
        } else {
          this.codeText = "未获取到结果";
        }
      } else if (this.selectedOption === "NewBing") {
        this.processNewBing();
      } else {
        // 添加对其他选项的处理逻辑，如 "DSL"
      }
    },
    async processNewBing() {
      // const cookie = document.cookie;
      const response = await axios.post("http://localhost:8080/newbing", {
        dsl: this.dslText,
        // cookie: cookie,
      });

      if (response.data) {
        this.codeText = response.data;
      } else {
        this.codeText = "未获取到结果";
      }
    },
  },
};
</script>

<style scoped>
/* ... 其他样式保持不变 ... */

.options-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
}

.radio-group {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.radio-group input[type='radio'] {
  margin-right: 0.5rem;
}

.generate-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #4a4a4a;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-button:hover {
  background-color: #2c3e50;
}
</style>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.textareas-container {
  display: flex;
  justify-content: space-between;
}

.textarea-container {
  flex: 1;
  margin-right: 10rem; /* 修改此值以调整两个 textarea 之间的间距 */
}

.textarea-container:last-child {
  margin-right: 0;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
}

.textarea {
  width: 50vh;
  height: 600px; /* 修改此值以调整 textarea 的高度 */
  resize: vertical;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.textarea:focus {
  border-color: #4a4a4a;
}
.options-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
}

.radio-group {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.radio-group input[type='radio'] {
  margin-right: 0.5rem;
}

.generate-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #4a4a4a;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-button:hover {
  background-color: #2c3e50;
}

</style>
