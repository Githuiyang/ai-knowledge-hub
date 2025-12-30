# 🚀 立即部署到Vercel

## 第一步：推送到GitHub（3分钟）

### 1.1 在GitHub创建仓库

1. 访问：https://github.com/new
2. 仓库名称：`ai-knowledge-hub`
3. 可见性：Public 或 Private（都可以）
4. **重要**：不要勾选 "Add a README file"
5. 点击 "Create repository"

### 1.2 推送代码

在项目目录执行以下命令：

```bash
# 添加远程仓库
git remote add origin https://github.com/Githuiyang/ai-knowledge-hub.git

# 推送到GitHub
git push -u origin main
```

如果提示输入用户名和密码：
- **Username**: 你的GitHub用户名
- **Password**: 使用Personal Access Token（不是GitHub密码）
  - 创建Token: https://github.com/settings/tokens
  - 勾选 `repo` 权限
  - 生成并复制Token

## 第二步：在Vercel配置环境变量（5分钟）

### 2.1 访问Vercel项目设置

直接访问：
```
https://vercel.com/Githuiyang/ai-knowledge-hub/settings/environment-variables
```

或从Dashboard：
1. 访问 https://vercel.com/dashboard
2. 选择项目 `ai-knowledge-hub`
3. 点击 "Settings" → "Environment Variables"

### 2.2 添加环境变量

**逐个添加以下环境变量**（点击"Add New"）：

#### 1. NEXT_PUBLIC_SUPABASE_URL
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://fvhodoznamvatfzkodef.supabase.co
Environments: ✓ Production ✓ Preview ✓ Development
```

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2aG9kb3puYW12YXRmemtvZGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MjE0NTAsImV4cCI6MjA4MTE5NzQ1MH0.w6BquKnt6Ho-3L3sa3d1Ss-b2nNTOeevwqzfKAPIr7g
Environments: ✓ Production ✓ Preview ✓ Development
```

#### 3. RAPIDAPI_KEY
```
Key: RAPIDAPI_KEY
Value: 2c3093ae18msh95025d8d0f4fcd5p101987jsn4450debd2449
Environments: ✓ Production ✓ Preview ✓ Development
```

#### 4. TWITTER_API_ENDPOINT
```
Key: TWITTER_API_ENDPOINT
Value: https://twitter241.p.rapidapi.com
Environments: ✓ Production ✓ Preview ✓ Development
```

#### 5. ADMIN_PASSWORD
```
Key: ADMIN_PASSWORD
Value: admin123
Environments: ✓ Production ✓ Preview ✓ Development
```
**⚠️ 部署后立即修改！**

#### 6. JWT_SECRET
```
Key: JWT_SECRET
Value: your-super-secret-jwt-key-change-this-in-production-12345678
Environments: ✓ Production ✓ Preview ✓ Development
```
**⚠️ 部署后立即修改！生成方法：**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 7. NEXT_PUBLIC_APP_URL
```
Key: NEXT_PUBLIC_APP_URL
Value: https://ai-knowledge-hub.vercel.app
Environments: ✓ Production ✓ Preview ✓ Development
```
**注**：部署后Vercel会告诉你实际域名，可能需要更新这个值

## 第三步：部署（自动）

环境变量添加完成后：

1. **Vercel会自动检测到GitHub推送**
2. **自动开始部署**
3. **2-3分钟后部署完成**

你可以在以下位置查看部署进度：
```
https://vercel.com/Githuiyang/ai-knowledge-hub/deployments
```

## 第四步：访问你的网站

部署成功后，Vercel会提供：
```
https://ai-knowledge-hub-xxx.vercel.app
```
或
```
https://ai-knowledge-hub.vercel.app
```

## 第五步：部署后必做

### 5.1 初始化Supabase数据库

1. 访问 https://supabase.com/dashboard
2. 选择项目 `fvhodoznamvatfzkodef`
3. 点击 "SQL Editor"
4. 点击 "New Query"
5. 复制 `supabase/schema.sql` 的内容
6. 粘贴并点击 "Run"

### 5.2 修改默认密码

**方式A：在Vercel环境变量中修改**
1. 访问环境变量设置
2. 找到 `ADMIN_PASSWORD`
3. 修改为新密码
4. 重新部署

**方式B：在Supabase中直接修改**
```bash
# 生成新密码哈希
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_NEW_PASSWORD', 10));"
```
然后在Supabase SQL Editor中运行：
```sql
UPDATE admin_config
SET password_hash = '你的哈希值'
WHERE id = 'default-config';
```

### 5.3 测试功能

1. ✅ 访问首页
2. ✅ 访问 `/admin/login`
3. ✅ 登录（使用admin123或新密码）
4. ✅ 添加一条AI实践
5. ✅ 测试Twitter抓取

## 📊 部署状态查看

- **Vercel Dashboard**: https://vercel.com/dashboard
- **项目页面**: https://vercel.com/Githuiyang/ai-knowledge-hub
- **部署日志**: https://vercel.com/Githuiyang/ai-knowledge-hub/deployments
- **设置**: https://vercel.com/Githuiyang/ai-knowledge-hub/settings

## 🆘 遇到问题？

### GitHub推送失败
```bash
# 如果提示认证失败，使用Personal Access Token
# 1. 生成Token: https://github.com/settings/tokens
# 2. 使用Token代替密码
```

### Vercel部署失败
- 检查 "Build Logs" 查看错误
- 确保所有环境变量都已添加
- 确认GitHub仓库已正确连接

### 环境变量不生效
- 确保选择了正确的Environment（Production, Preview, Development）
- 添加环境变量后需要重新部署

### 登录失败
- 确认Supabase数据库已初始化
- 检查admin_config表是否有数据
- 验证ADMIN_PASSWORD是否正确

## ✅ 部署成功后你的网站将拥有

- 🌍 全球CDN加速
- 🔒 HTTPS加密
- ⚡ 自动部署（推送代码即部署）
- 📊 实时分析
- 🚀 极速加载

---

**准备好了吗？现在就开始部署吧！** 🚀

1. 推送代码到GitHub
2. 在Vercel配置环境变量
3. 等待自动部署完成
4. 访问你的网站

需要帮助？随时告诉我！💪
