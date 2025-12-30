# 设置指南

## 1. Supabase 设置

### 创建项目
1. 访问 [https://supabase.com](https://supabase.com)
2. 创建一个新项目
3. 等待项目初始化完成

### 运行 SQL 脚本
1. 在 Supabase Dashboard 中，点击左侧菜单的 "SQL Editor"
2. 点击 "New Query"
3. 复制 `supabase/schema.sql` 文件的内容
4. 粘贴到 SQL 编辑器中
5. 点击 "Run" 执行脚本

### 配置存储
1. 在 Supabase Dashboard 中，点击 "Storage"
2. 创建一个新的 bucket，命名为 "images"
3. 设置为公开访问 (Public bucket)
4. 配置 CORS 策略（如果需要）

### 获取 API 密钥
1. 在 Supabase Dashboard 中，点击 "Settings" → "API"
2. 复制以下信息：
   - Project URL
   - anon public key

### 更新环境变量
1. 复制 `.env.example` 为 `.env.local`
2. 填入你的 Supabase 凭据：
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## 2. 设置管理员密码

### 生成密码哈希
在项目根目录运行：
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"
```

### 更新数据库
1. 在 Supabase SQL Editor 中运行：
   ```sql
   UPDATE admin_config
   SET password_hash = 'your_hashed_password'
   WHERE id = 'default-config';
   ```

或者在 `.env.local` 中设置初始密码：
```
ADMIN_PASSWORD=your_secure_password
```

## 3. Twitter API 设置（可选）

### 使用 RapidAPI
1. 访问 [https://rapidapi.com](https://rapidapi.com)
2. 搜索 "Twitter API" 或 "Twitter Scraper"
3. 选择一个 API 服务（如 Twitter Scraper API）
4. 订阅并获取 API Key
5. 在 `.env.local` 中配置：
   ```
   RAPIDAPI_KEY=your_rapidapi_key
   TWITTER_API_ENDPOINT=your_api_endpoint
   ```

## 4. 运行项目

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 5. 首次使用

1. 访问 `/admin/login` 进入管理后台
2. 使用你设置的密码登录
3. 开始添加内容：
   - AI 优秀实践
   - 图片流
   - 学习博客
   - 配置 Twitter 抓取

## 6. 部署到 Vercel

### 准备工作
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目

### 配置环境变量
在 Vercel 项目设置中添加：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RAPIDAPI_KEY`（如果使用 Twitter 功能）
- `TWITTER_API_ENDPOINT`（如果使用 Twitter 功能）

### 部署
点击 "Deploy" 按钮，Vercel 会自动构建和部署。

## 故障排除

### 数据库连接错误
- 检查 `.env.local` 中的 Supabase URL 和 Key 是否正确
- 确认 Supabase 项目是否已启动

### 图片上传失败
- 检查 Supabase Storage bucket 是否已创建
- 确认 bucket 权限设置正确

### Twitter 抓取失败
- 验证 RapidAPI Key 是否有效
- 检查 API 配额是否用完
- 查看浏览器控制台的错误信息

### 认证失败
- 确认密码哈希已正确设置到数据库
- 检查 admin_config 表中是否有记录
