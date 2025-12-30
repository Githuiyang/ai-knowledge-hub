# Vercel部署指南

## 🚀 快速部署步骤

### 1. 创建GitHub仓库并推送代码

在项目根目录执行：

```bash
# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: AI Knowledge Hub"

# 添加远程仓库（替换YOUR_USERNAME）
git remote add origin https://github.com/Githuiyang/ai-knowledge-hub.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

**如果GitHub上还没有仓库，先去GitHub创建：**
1. 访问 https://github.com/new
2. 仓库名：`ai-knowledge-hub`
3. 设为Public或Private都可以
4. 不要初始化README（我们已经有了）
5. 点击"Create repository"
6. 然后执行上面的命令

### 2. 在Vercel配置环境变量

访问你的Vercel项目：
```
https://vercel.com/Githuiyang/ai-knowledge-hub/settings/environment-variables
```

添加以下环境变量：

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fvhodoznamvatfzkodef.supabase.co` | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2aG9kb3puYW12YXRmemtvZGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MjE0NTAsImV4cCI6MjA4MTE5NzQ1MH0.w6BquKnt6Ho-3L3sa3d1Ss-b2nNTOeevwqzfKAPIr7g` | Production, Preview |
| `RAPIDAPI_KEY` | `2c3093ae18msh95025d8d0f4fcd5p101987jsn4450debd2449` | Production, Preview |
| `TWITTER_API_ENDPOINT` | `https://twitter241.p.rapidapi.com` | Production, Preview |
| `ADMIN_PASSWORD` | `admin123` (建议修改) | Production, Preview |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production` (建议修改) | Production, Preview |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` (部署后获得) | Production, Preview |

### 3. 部署

**方式A：自动部署（推荐）**
- 代码推送到GitHub后，Vercel会自动检测并部署
- 在Vercel Dashboard可以看到部署进度

**方式B：手动触发部署**
- 访问 Vercel Dashboard
- 点击 "Deployments"
- 点击 "Redeploy"

### 4. 访问你的网站

部署完成后，Vercel会给你一个域名：
```
https://ai-knowledge-hub-xxx.vercel.app
```

或者自定义域名（如果已配置）。

## ⚙️ Vercel项目配置

项目ID: `prj_ICMvlBezB1ZUHfJllQzO2s7mHcbX`

直接访问：
```
https://vercel.com/Githuiyang/ai-knowledge-hub
```

## 🔒 安全建议

部署后请立即修改：
1. `ADMIN_PASSWORD` - 创建强密码
2. `JWT_SECRET` - 使用随机字符串

生成随机密钥：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📊 部署检查清单

- [ ] GitHub仓库已创建
- [ ] 代码已推送到GitHub
- [ ] Vercel已连接GitHub仓库
- [ ] 所有环境变量已配置
- [ ] Supabase数据库已初始化
- [ ] 部署成功
- [ ] 测试登录功能
- [ ] 修改默认密码

## 🐛 常见问题

### 部署失败？
- 检查"Build Logs"查看错误信息
- 确保所有依赖都在package.json中

### 环境变量不生效？
- 确保选择了正确的Environment（Production, Preview, Development）
- 重新部署以应用新的环境变量

### 登录失败？
- 检查ADMIN_PASSWORD是否正确设置
- 查看Supabase的admin_config表

## 🎯 部署后下一步

1. **测试所有功能**
2. **修改默认密码**
3. **配置自定义域名**（可选）
4. **设置CDN**（图片加速）

---

祝部署顺利！🎉
