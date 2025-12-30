# AI知识学习网站

一个功能丰富的个人AI知识管理平台，用于收集、管理和分享AI领域的优秀内容。

## 功能特性

### 📚 内容管理
- **AI优秀实践** - 收录来自各网站的优秀AI实践案例（链接和文章）
- **AI图片流** - 展示优秀的AI生成图片，附带提示词和模型信息
- **学习博客** - 记录AI学习过程中的心得体会和技术总结
- **Twitter精选** - 抓取Twitter上的优质AI内容，按点赞数等维度筛选

### 🔐 权限管理
- 密码保护的管理后台
- 路由级别的权限控制
- 安全的JWT认证

### 🎨 设计特点
- 深色简约主题
- 丝滑的Framer Motion动效
- 响应式设计
- 优雅的交互体验

## 技术栈

- **前端框架**: Next.js 14 (App Router) + TypeScript
- **UI组件**: Tailwind CSS + 自定义组件
- **动画**: Framer Motion
- **数据库**: Supabase (PostgreSQL)
- **认证**: JWT + bcrypt
- **部署**: Vercel

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd ai-knowledge-hub
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local`:

```bash
cp .env.example .env.local
```

填入以下配置：

```env
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Twitter API（可选）
RAPIDAPI_KEY=your_rapidapi_key
TWITTER_API_ENDPOINT=your_api_endpoint

# 管理员密码（首次设置）
ADMIN_PASSWORD=your_secure_password

# JWT密钥
JWT_SECRET=your_jwt_secret
```

### 4. 设置Supabase数据库

1. 创建Supabase项目：访问 [https://supabase.com](https://supabase.com)
2. 在SQL编辑器中运行 `supabase/schema.sql` 文件
3. 在Storage中创建名为 `images` 的bucket，设置为公开访问

### 5. 设置管理员密码

在项目根目录运行：

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"
```

然后在Supabase中更新admin_config表的password_hash字段。

### 6. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 使用指南

### 公开页面
- `/` - 首页
- `/practices` - AI优秀实践
- `/gallery` - AI图片流
- `/blog` - 学习博客
- `/twitter` - Twitter精选

### 管理后台
- `/admin/login` - 管理员登录
- `/admin` - 管理仪表盘
- `/admin/practices` - 管理AI实践
- `/admin/gallery` - 管理图片
- `/admin/blog` - 管理博客
- `/admin/twitter` - 管理Twitter抓取

## 项目结构

```
ai-knowledge-hub/
├── app/
│   ├── (public)/          # 公开页面
│   ├── admin/             # 管理后台
│   ├── api/               # API路由
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
├── lib/                   # 工具函数和Supabase客户端
├── hooks/                 # 自定义Hooks
├── types/                 # TypeScript类型定义
├── supabase/              # 数据库schema
└── public/                # 静态资源
```

## 数据库设计

项目使用6张表：

1. **ai_practices** - AI优秀实践（链接/文章）
2. **ai_images** - AI图片流
3. **blog_posts** - 学习博客
4. **twitter_posts** - Twitter抓取的推文
5. **twitter_thresholds** - Twitter抓取阈值配置
6. **admin_config** - 管理员配置

详细的schema请参考 `supabase/schema.sql`

## 部署

### Vercel部署

1. 将代码推送到GitHub
2. 在[Vercel](https://vercel.com)导入项目
3. 配置环境变量
4. 点击部署

### 环境变量清单

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RAPIDAPI_KEY`（可选）
- `TWITTER_API_ENDPOINT`（可选）
- `JWT_SECRET`

## 待实现功能

- [ ] 完善Twitter抓取API集成
- [ ] 添加图片上传功能
- [ ] 实现博客Markdown编辑器
- [ ] 添加搜索功能
- [ ] 添加标签过滤
- [ ] 实现数据统计仪表盘
- [ ] 添加评论系统（可选）

## 常见问题

### Q: 如何重置管理员密码？
A: 在Supabase SQL编辑器中运行：
```sql
UPDATE admin_config
SET password_hash = 'your_new_hashed_password'
WHERE id = 'default-config';
```

### Q: 图片上传失败？
A: 检查Supabase Storage bucket是否已创建并设置为公开访问

### Q: Twitter抓取不工作？
A: 确保RAPIDAPI_KEY有效，并且API配额充足

## 许可证

MIT

## 贡献

欢迎提交Issue和Pull Request！

---

Built with ❤️ using Next.js and Supabase
