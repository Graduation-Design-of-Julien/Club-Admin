# Club Admin 社团管理系统

基于TypeScript语言的社团管理系统的设计与实现

## 前言

1. 本项目为学生毕业设计作品，项目代码除框架外均为原创。
2. 如果使用本项目，请遵守开源协议。

## 技术栈

- TypeScript
- Nest.js

## 包管理

- pnpm

## 版本管理

- git/Github

## 下载并启动调试

```sh
# 从GitHub中克隆项目
git clone https://github.com/Graduation-Design-of-Julien/Club-Admin.git

# 进入项目并下载依赖
npm install -g pnpm
cd Club-Admin
pnpm install

# 启动项目调试
pnpm run start:dev
```

在启动调试之前，请将`Club-Admin/config/`内的example按照文件说明填入您的信息才可使用。

## 打包并在生产环境中使用

```sh
# 打包项目
pnpm run build

# 打包完成后文件夹内会有一个main.js
# 使用你所熟悉的持久化工具启动main.js即可完成部署
# 如forever
forever main.js

# 或者使用node命令在控制台启动项目
# 注意，这需要你的Node.js版本>= 12, v13 版本除外
node main.js
```

## License

- Apache

## 免责声明

- 使用本项目或对本项目进行二次开发后出现的一切法律问题与项目作者本人无关。
