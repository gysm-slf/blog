---
title: git # 默认为文档的一级标题
outline: [2, 3] # 右侧页内导航展示几级，默认: [2] （只展示 h2 ） 
coverImg: /img/人物/WXSJDW7vHQ1Yv6b.jpeg
categories: ['工具资源'] # 分类，将显示在首页的文章列表、分类卡片、文章页顶部，并在分类页渲染所有分类的文章。
tags: ['git', '版本控制工具'] # 标签，将显示在首页的文章列表、标签卡片、文章页顶部，并在标签页渲染所有标签的文章。
# date: # 指定日期
top: false # 是否设置为精选
sticky: false # 是否设置为置顶
pageStyle: segment-nav # "default" | "card" | "segment" | "card-nav" | "segment-nav"
---

# git

## 简介

 Git  是一种版本控制系统，是一个命令，是一种工具，有点像cmd(命令行工具)。
 Github 是一个基于git实现在线代码托管的仓库，向互联网开放，企业版要收钱。
 Gitlab 类似 github，一般用于在企业内搭建git私服，要自己搭环境。
 Gitee  即码云，是 oschina 免费给企业用的，不用自己搭建环境，可以建立自己的私有仓库。
 Git-ce 是社区版，gitlab-ee是企业版，收费的。

## 常用命令

```bash
# 创建本地分支并切换(-b：切换)
git checkout -b 分支名
# 将本地分支推送到远程仓库，并在远程创建同名的分支
git push -u origin 分支名

# ====> stash <====
# 临时保存工作区
git stash -m "总库检索计入电商日志"
# 恢复临时工作区并删除临时保存的工作区
git stash pop
# 查看所有临时工作区
git stash list
# 恢复指定临时工作区
git stash pop stash@{1}
# 清空
git stash clear
# 删除最近一次
git stash drop
# 删除指定
git stash drop stash@{1}

# ====> tag(可以将 Git tag 理解为一个快照) <==== 
# 创建附注标签
git tag -a v1.0 -m "这是一个标签"
# 查看标签详情
git show v1.0

# 不过需要注意的是，Git 的设计原则是"几乎不可变"，你不能直接"恢复"到某个标签，而是需要通过创建新的提交来达到目的。以下是几种常见的处理方式
## 1.基于标签创建新分支
git checkout -b new_branch v1.0

## 2.创建一个新提交来撤销从标签到当前的所有更改
## 首先获取标签和当前 HEAD 之间的提交范围
git log v1.0..HEAD
## 然后使用 revert 撤销这些提交（需要逐个指定或使用范围）
git revert v1.0..HEAD --no-commit
git commit -m "Revert to version 1.0"

# ====> 代理 <==== 
# 全局设置代理 (clash使用的端口为7890; --global换成--locale是仅为该项目设置代理)
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

<ribbon />
