# 快速入门指南

## 🎉 恭喜！项目已成功配置

你的API凭证已配置完成，现在可以开始使用AI知识学习网站了！

## ⚡ 快速开始（5分钟内完成）

### 1. 设置Supabase数据库

1. **访问你的Supabase项目**
   - 打开：https://supabase.com/dashboard
   - 选择项目：fvhodoznamvatfzkodef

2. **运行SQL脚本**
   - 点击左侧菜单 "SQL Editor"
   - 点击 "New Query"
   - 复制 `supabase/schema.sql` 的全部内容
   - 粘贴到编辑器
   - 点击 "Run" 执行

3. **配置图片存储**
   - 点击左侧菜单 "Storage"
   - 创建新bucket，命名为 "images"
   - 设置为 "Public bucket"
   - 在"File size limit"中选择合适的限制（如10MB）

### 2. 启动项目

```bash
cd ai-knowledge-hub
npm run dev
```

项目将在 http://localhost:3000 运行

### 3. 首次登录

1. 访问：http://localhost:3000/admin/login
2. 输入初始密码：`admin123`
3. 登录成功后，你将看到管理仪表盘

### 4. 开始添加内容

在管理后台你可以：

#### 📝 AI优秀实践
- 点击 "AI优秀实践"
- 选择类型：链接 或 文章
- 填写标题和内容
- 保存

#### 🎨 图片流
- 点击 "图片流"（需要先实现上传功能）
- 添加图片URL、提示词、模型信息

#### 📚 学习博客
- 点击 "学习博客"
- 撰写文章，支持Markdown
- 设置为已发布后会在前台显示

#### 🐦 Twitter精选
- 点击 "Twitter工具"
- 输入Twitter用户名（不需要@）
- 设置筛选阈值（点赞、转发、回复数）
- 点击"开始抓取"

## 🔧 API配置说明

### 已配置的API

**Supabase**：
- ✅ 项目URL已配置
- ✅ Anon Key已配置
- ✅ 数据库连接正常

**Twitter API**：
- ✅ RapidAPI密钥已配置
- ✅ API端点已设置
- ⚠️ 需要测试实际抓取功能

### 环境变量

所有配置已写入 `.env.local` 文件：
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ✅ RAPIDAPI_KEY
- ✅ TWITTER_API_ENDPOINT
- ✅ ADMIN_PASSWORD（默认：admin123）
- ✅ JWT_SECRET

## 📱 功能清单

### ✅ 已完成
- [x] 首页展示
- [x] AI优秀实践（展示+管理）
- [x] 图片流（展示）
- [x] 学习博客（展示+详情+Markdown）
- [x] Twitter精选（展示）
- [x] 用户认证（登录+中间件）
- [x] 管理仪表盘
- [x] AI实践CRUD
- [x] Twitter抓取工具（UI+API）

### 🔨 待完善
- [ ] 图片上传到Supabase Storage
- [ ] 图片管理CRUD
- [ ] 博客管理CRUD
- [ ] Twitter API实际测试
- [ ] 数据统计仪表盘
- [ ] 搜索和过滤功能

## 🎯 推荐使用流程

1. **先添加一些测试内容**
   - 在AI实践中添加几个链接
   - 撰写一篇博客

2. **测试Twitter抓取**
   - 输入一个公开的Twitter账号
   - 尝试抓取（可能需要调整API配置）

3. **自定义设计**
   - 修改 `app/globals.css` 调整主题色
   - 修改 `components/navigation.tsx` 调整导航

## 🐛 常见问题

### Q: 登录失败怎么办？
A: 检查Supabase数据库的 `admin_config` 表是否有数据。如果没有，运行：
```sql
INSERT INTO admin_config (id, password_hash)
VALUES ('default-config', '$2a$10$YourHashedPasswordHere')
```

### Q: Twitter抓取不工作？
A:
1. 检查RapidAPI配额是否用完
2. 查看浏览器控制台的错误信息
3. 可能需要调整API调用方式

### Q: 图片显示不出来？
A:
1. 确保Supabase Storage bucket已创建
2. 检查bucket是否设置为公开访问
3. 检查图片URL是否正确

## 🚀 下一步

1. **修改默认密码**
   ```bash
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_new_password', 10));"
   ```
   然后在Supabase中更新 `admin_config` 表

2. **配置自定义域名**
   - 修改 `NEXT_PUBLIC_APP_URL`

3. **部署到Vercel**
   - 推送代码到GitHub
   - 在Vercel导入项目
   - 配置环境变量
   - 部署！

## 📞 获取帮助

- 查看 `README.md` - 完整文档
- 查看 `SETUP.md` - 详细设置说明
- 检查控制台错误信息
- 查看Supabase日志

祝你使用愉快！🎊
