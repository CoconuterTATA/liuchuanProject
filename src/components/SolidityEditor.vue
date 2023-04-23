<template>
  <div class="solidity-editor-container">
    <textarea class="editor-container" v-model="editorContent"></textarea>
    <button class="compile-button" @click="compile">编译</button>
    <button class="connect-wallet-button" @click="connectWallet">连接钱包</button>
    <button class="contract-deply" @click="deployContract">部署合约</button>
    <button class="check-events-button" @click="addGeneratedEvents">检查</button>
    <div class="input-container">
      <label for="gas-price">Gas Price (gwei)</label>
      <input type="number" id="gas-price" v-model="gasPrice" />
      <label for="initial-data">Initial Data</label>
      <input type="number" id="initial-data" v-model="initialData" />
    </div>
    <div class="input-container">
      <label for="gas-limit">Gas Limit</label>
      <input type="number" id="gas-limit" v-model="gasLimit" />
    </div>
    <compiled-output v-if="compiledResult" :abi="compiledResult.abi" :bytecode="compiledResult.bytecode"></compiled-output>
  </div>
</template>

<script>
import axios from 'axios';
import Web3 from "web3";
import CompiledOutput from './CompiledOutput.vue';

export default {
  name: 'SolidityEditor',
  components: {
    CompiledOutput
  },
  data() {
    return {
      editorContent: '',
      compiledResult: null,
      gasPrice: '',
      gasLimit: '',
      initialData: '',
    };
  },
  methods: {
    async addGeneratedEvents() {
      try {
        // 发送合约代码到后端，生成事件
        const response = await axios.post('http://localhost:8080/generateEvents', { input: this.editorContent });

        // 解析后端返回的事件
        const events = JSON.parse(response.data.events);
        console.log(events);

        // 将事件添加到合约代码中
        let newEditorContent = this.editorContent;
        events.forEach(event => {
          newEditorContent += '\n' + event;
        });

        // 更新编辑器内容
        this.editorContent = newEditorContent;
      } catch (error) {
        console.error(error);
      }
    },
    async deployContract() {
  try {
    // 获取当前网络 ID
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    // 从编译结果中获取 ABI 和字节码
    const abi = this.compiledResult.abi;
    const bytecode = this.compiledResult.bytecode;

    // 创建一个新的合约实例
    const contract = new web3.eth.Contract(abi);

    // 部署合约
    const accounts = await web3.eth.getAccounts();
    const gasPrice = this.gasPrice;
    const gasLimit = this.gasLimit;

    const deployOptions = {
      data: bytecode,
    };

    if (this.initialData !== '') {
      deployOptions.arguments = [this.initialData];
    }

    const result = await contract.deploy(deployOptions).send({ from: accounts[0], gasPrice: gasPrice * 1e9, gas: gasLimit });
    alert('合约部署成功！合约地址：' + result.options.address);
  } catch (error) {
    console.error(error);
  }
},

    async connectWallet() {
      try {
        // 检查 Metamask 是否安装
        if (window.ethereum) {
          // 请求连接到 Metamask 钱包
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('已连接到 Metamask 钱包');
        } else {
          console.error('请先安装 Metamask 钱包');
        }
      } catch (error) {
        console.error(error);
      }
    },

    compile() {
      // 获取编辑器内容
      const input = this.editorContent;

      // 发送数据到服务器
      axios.post('http://localhost:8080/compile', { input }, { withCredentials: true })
        .then(response => {
          // 在这里处理服务器响应
          console.log(response.data);
          this.compiledResult = response.data;
        })
        .catch(error => {
          // 在这里处理错误
          console.error(error);
        });
    }
  }
};
</script>
  
 
<style>
.solidity-editor-container {
  height: 80vh;
  width: 160vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.editor-container {
  flex: 1;
  width: 600px;
  resize: none;
  margin-bottom: 20px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
}

.compile-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4CAF50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  border-radius: 4px;
  width: 97px;
}

.compile-button:hover {
  background-color: #45a049;
}

.input-container {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 600px;
}

label {
  margin-bottom: 5px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}

button {
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4CAF50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}
</style>