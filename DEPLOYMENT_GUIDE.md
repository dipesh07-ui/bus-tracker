# 🚀 Bus Tracker - Deployment & Collaboration Guide

## 📋 Quick Deployment Steps

### 1. Making Changes
```bash
# 1. Make your changes to the code
# 2. Test locally (optional)
npm run dev

# 3. Build for production
npm run build

# 4. Commit changes
git add .
git commit -m "Your descriptive message"

# 5. Push to GitHub
git push origin main

# 6. Deploy to live site
npm run deploy
```

### 2. Complete Workflow
```bash
# Full workflow in one go
npm run build && git add . && git commit -m "Update description" && git push origin main && npm run deploy
```

## 🔄 Daily Development Workflow

### Step 1: Start Development
```bash
# Start local development server
npm run dev
# Opens at: http://localhost:5173/bus-tracker/
```

### Step 2: Make Changes
- Edit files in `src/` folder
- Changes auto-reload in browser
- Test on different screen sizes

### Step 3: Test Build
```bash
# Test production build locally
npm run build
npm run preview
```

### Step 4: Deploy
```bash
# Quick deploy
git add . && git commit -m "Your changes" && git push origin main && npm run deploy
```

## 👥 Collaboration Setup

### For New Team Members

#### 1. Clone Repository
```bash
git clone https://github.com/dipesh07-ui/bus-tracker.git
cd bus-tracker
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development
```bash
npm run dev
```

#### 4. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# Make changes
git add .
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

### For Repository Owner

#### 1. Add Collaborators
1. Go to GitHub repository
2. Settings → Manage access → Invite a collaborator
3. Add their GitHub username/email

#### 2. Review Pull Requests
1. Go to "Pull requests" tab
2. Review changes
3. Merge if approved

## 🌐 Live URL Management

### Current Live URL
- **Production**: https://dipesh07-ui.github.io/bus-tracker/
- **Source Code**: https://github.com/dipesh07-ui/bus-tracker

### URL Structure
- Main app: `/bus-tracker/`
- Passenger page: `/bus-tracker/#/passenger`
- Driver login: `/bus-tracker/#/driver-login`
- Driver dashboard: `/bus-tracker/#/driver`

## 🚨 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues
```bash
# Check if gh-pages is installed
npm list gh-pages

# Reinstall if needed
npm install --save-dev gh-pages

# Try deployment again
npm run deploy
```

### Git Issues
```bash
# Reset to last working state
git reset --hard HEAD~1

# Force push (use carefully)
git push origin main --force
```

## 📱 Testing Checklist

### Before Deploying
- [ ] Test on desktop browser
- [ ] Test on mobile device
- [ ] Test all navigation flows
- [ ] Test driver login with demo credentials
- [ ] Test passenger search and map toggle
- [ ] Check console for errors

### After Deploying
- [ ] Visit live URL
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify map functionality

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality

# Deployment
npm run deploy       # Deploy to GitHub Pages

# Git
git status           # Check file changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push origin main # Push to GitHub
```

## 📁 Project Structure

```
bus-tracker/
├── src/
│   ├── components/     # React components
│   ├── data/          # Mock data
│   ├── assets/        # Images, icons
│   └── main.jsx       # App entry point
├── dist/              # Built files (auto-generated)
├── public/            # Static assets
├── package.json       # Dependencies
└── vite.config.js     # Build configuration
```

## 🎯 Best Practices

### Code Changes
1. **Test locally first** - Always run `npm run dev` before deploying
2. **Write descriptive commits** - "Fix mobile responsiveness" not "fix"
3. **Test on mobile** - Use browser dev tools or real device
4. **Check console** - Look for JavaScript errors

### Collaboration
1. **Use branches** - Don't work directly on main
2. **Communicate** - Discuss changes before implementing
3. **Test together** - Review each other's changes
4. **Document changes** - Update this guide if needed

### Performance
1. **Optimize images** - Compress before adding
2. **Minimize dependencies** - Only add what you need
3. **Test on slow networks** - Use browser throttling
4. **Monitor bundle size** - Check build output

## 🚀 Quick Start for New Features

1. **Plan** - Discuss the feature first
2. **Branch** - `git checkout -b feature/feature-name`
3. **Develop** - Make changes and test
4. **Commit** - `git add . && git commit -m "Add feature"`
5. **Push** - `git push origin feature/feature-name`
6. **Review** - Create pull request on GitHub
7. **Merge** - After approval, merge to main
8. **Deploy** - `npm run deploy`

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Look at console errors
3. Test locally with `npm run dev`
4. Check GitHub issues
5. Ask for help with specific error messages
