智能家居方案自助设计与报价系统

一个基于 Taro + React + TypeScript 的微信小程序，提供智能家居方案的可视化设计、设备配置和报价功能。

主要功能

可视化户型设计 - Canvas绘制房间、墙壁、门窗
智能设备管理- 设备选择、配置和价格计算  
预设方案模板 - 一室一厅、两室一厅、三室两厅模板
自动报价系统 - 实时计算设备和服务费用
工单管理系统 - 订单跟踪和状态管理

技术栈

框架: Taro 3.6.8 + React 18
语言: TypeScript
样式: Sass + Taro UI
状态管理: Zustand
构建工具: Webpack 5

 🚀 快速开始

环境要求

- Node.js >= 16.14.0
- npm >= 8.0.0
- 微信开发者工具

安装步骤

1. 安装 Taro CLI**
```bash
npm install -g @tarojs/cli
```

2. 安装项目依赖
```bash
npm install
```

3. 配置 AppID
```json

{
  "appid": "your-miniprogram-appid"
}
```

4. 启动开发服务器**
```bash
npm run dev:weapp
```

5. 微信开发者工具**
   - 打开微信开发者工具
   - 导入项目，选择 `dist` 目录
   - 设置 AppID
   - 点击预览

📁 项目结构

```
smart-home-taro/
├── src/
│   ├── pages/           页面组件
│   │   ├── index/       首页
│   │   ├── design/      户型设计
│   │   ├── template/    模板预览
│   │   ├── devices/     设备库
│   │   ├── quote/       报价页面
│   │   └── orders/      工单管理
│   ├── components/      公共组件
│   ├── store/          状态管理
│   ├── utils/           工具函数
│   ├── types/          TypeScript类型
│   └── assets/          静态资源
├── config/              配置文件
└── .vscode/            VS Code配置
```

 开发命令

```bash
开发
npm run dev:weapp       微信小程序
npm run dev:h5          H5 页面

构建
npm run build:weapp     构建微信小程序
npm run build:h5        构建 H5 页面

代码检查
npm run lint            ESLint 检查
npm run lint:fix        自动修复
```

核心功能说明

户型设计器
- 支持拖拽创建房间
- 墙壁、门、窗户等建筑元素绘制
- 预设户型模板快速应用
- Canvas 实时渲染和交互

设备管理
- 分类展示智能设备
- 设备选择和数量管理
- 实时价格计算
- 适用房间推荐

报价系统
- 设备费用自动计算
- 设计费、安装费、服务费
- 总价统计和明细展示

工单系统
- 订单状态跟踪
- 进度可视化显示
- 客服联系功能

页面预览

首页: 方案展示和快速入口
模板预览: 预设方案详情和户型图
设计页: 可视化户型编辑器
设备库: 智能设备选择和配置
报价页: 方案费用明细和总价
工单页: 订单管理和跟踪

开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 组件化开发，提高复用性
- 合理的状态管理和数据流
- 响应式设计适配不同屏幕

贡献指南

1. Fork 本仓库
2. 创建特性分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送分支: `git push origin feature/AmazingFeature`
5. 创建 Pull Request

许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

联系方式

如有问题或建议，请通过以下方式联系：

- 📧 Email: sionvid1@gmail.com
- 💬 微信: ForNewAvalon12
- 🐛 Issues: [GitHub Issues](repository-url/issues)