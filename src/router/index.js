import { createRouter, createWebHistory } from 'vue-router';
import SolidityEditor from '../components/SolidityEditor.vue';
// import OtherComponent from '../components/OtherComponent.vue'; // 导入其他组件
import DomainSpecificLanguage from '../components/DomainSpecificLanguage.vue';

const routes = [
  {
    path: '/',
    name: 'SolidityEditor',
    component: SolidityEditor
  },
  {
    path: '/dsl',
    name: 'DomainSpecificLanguage',
    component: DomainSpecificLanguage
  },
//   {
//     path: '/other',
//     name: 'OtherComponent',
//     component: OtherComponent // 添加其他路由
//   }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
