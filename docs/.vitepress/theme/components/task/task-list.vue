<template>
  <div class="task-list">
    <!-- 项目列表（已排序） -->
    <el-collapse v-model="activeProjectNames" accordion>
      <el-collapse-item
          v-for="project in sortedProjects"
          :key="project.id"
          :name="project.name"
      >
        <!-- 项目标题区 -->
        <template #title>
          <div class="project-header">
            <span :class="['project-name', getProjectTitleClass(project.id) ]">{{ project.name }}</span>
            <div class="project-tags">
              <el-tag
                  v-for="tag in project.tags"
                  :key="tag"
                  size="small"
                  type="info"
                  class="tag"
              >
                {{ tag }}
              </el-tag>
            </div>
            <div class="project-stats">
              <span class="stat-todo">待办 {{ statsMap[project.id].todo }}</span>
              <span class="stat-doing">进行中 {{ statsMap[project.id].doing }}</span>
              <span class="stat-done">已完成 {{ statsMap[project.id].done }}</span>
            </div>
          </div>
        </template>

        <!-- 项目描述 -->
        <div v-if="!!project.description" class="project-description" v-html="project.description"></div>

        <details>
          <summary>链接与参考资料</summary>
          <div
              v-for="ref in project.references"
              :key="ref.name"
              :class="['reference-item', { 'no-account': !(ref.username && ref.password) }]"
          >
            <span class="ref-name">{{ ref.name }}：</span>
            <a :href="ref.url" target="_blank" class="ref-url">{{ ref.url }}</a>
            <code-line v-if="ref.username && ref.password" display="inline">{{ ref.username }} / {{ ref.password }}</code-line>
          </div>
        </details>

        <!-- 需求列表（已排序） -->
        <div class="requirements">
          <el-collapse v-model="activeReqNames">
            <el-collapse-item
                v-for="req in sortedRequirements(project.requirements)"
                :key="req.id"
                :name="req.id"
            >
              <!-- 需求标题行 -->
              <template #title>
                <div class="req-header">
                  <span class="req-title">{{ req.title }}</span>
                  <el-tag
                      size="small"
                      :type="statusTagType(req.status)"
                      class="status-tag"
                  >
                    {{ statusLabel(req.status) }}
                  </el-tag>
                  <el-tag
                      v-if="req.isUrgent && req.status !== 'done'"
                      size="small"
                      type="danger"
                      effect="dark"
                      class="urgent-tag"
                  >
                    紧急
                  </el-tag>
                  <el-tag
                      v-if="req.routePath"
                      size="small"
                      class="route-tag"
                  >
                    {{ req.routePath }}
                  </el-tag>
                  <span v-if="req.assignee" class="assignee">👤 {{ req.assignee }}</span>
                  <span class="req-date">{{ formatDate(req.date) }}</span>
                </div>
              </template>

              <!-- 需求内容 -->
              <div class="req-content">
                <div class="html-expand-content" v-html="req.htmlText" />
                <div v-if="req.tags.length > 0" class="req-tags">
                  <el-tag
                      v-for="tag in req.tags"
                      :key="tag"
                      size="small"
                      type="success"
                      class="tag"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
                <div v-if="req.flowchartUrl || req.checklistUrl" class="req-links">
                  <a v-if="req.flowchartUrl" :href="req.flowchartUrl" target="_blank">流程图</a>
                  <a v-if="req.checklistUrl" :href="req.checklistUrl" target="_blank">核对单</a>
                </div>
<!--                <div class="obstacle" v-if="req."></div>-->
<!--                <div class="step-breakdown"></div>-->
                <!-- 扩展插槽 -->
                <slot name="requirement-extra" :requirement="req" />
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import type { Project, Requirement } from '@components/task/ts/class' // 假设类型定义在 types.ts

const props = defineProps<{
  projects: Project[]
}>()

// 控制项目折叠（默认全部展开，使用项目名作为唯一标识，若重名可改用 id）
const activeProjectNames = ref<string[]>([])

// 控制需求折叠（默认全部展开，使用需求 id）
const activeReqNames = ref<string[]>([])

// 计算每个项目的状态统计
const statsMap = computed(() => {
  const map: Record<string, { todo: number; doing: number; done: number }> = {}
  props.projects.forEach(proj => {
    const counts = { todo: 0, doing: 0, done: 0 }
    proj.requirements.forEach(req => {
      counts[req.status]++
    })
    map[proj.id] = counts
  })
  return map
})

const getProjectTitleClass = (id: string) => {
  if (statsMap.value[id].doing > 0) return 'stat-doing'
  if (statsMap.value[id].todo > 0) return 'stat-todo'
}

// 项目排序：按 todo + doing 降序
const sortedProjects = computed(() => {
  return [...props.projects].sort((a, b) => {
    const aCount = statsMap.value[a.id].todo + statsMap.value[a.id].doing
    const bCount = statsMap.value[b.id].todo + statsMap.value[b.id].doing
    return bCount - aCount
  })
})

// 需求排序函数：doing > todo > done，同状态按日期降序
const sortedRequirements = (reqs: Requirement[]) => {
  const order = { doing: 0, todo: 1, done: 2 }
  return [...reqs].sort((a, b) => {
    if (order[a.status] !== order[b.status]) {
      return order[a.status] - order[b.status]
    }
    // 同状态，日期降序（最新的在前）
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// 工具函数
const statusLabel = (status: string) => {
  const map = { todo: '待办', doing: '进行中', done: '已完成' }
  return map[status as keyof typeof map] || status
}

const statusTagType = (status: string) => {
  const map = { todo: 'warning', doing: 'primary', done: 'success' }
  return map[status as keyof typeof map] || 'info'
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<style lang="scss" scoped>
.task-list {
  font-size: 14px;
}
.project-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  width: 100%;
}
.project-name {
  font-weight: bold;
  font-size: 16px;
}
.project-tags {
  display: flex;
  gap: 4px;
}
.project-stats {
  display: flex;
  gap: 12px;
  margin-left: auto;
  margin-right: 10px;
  font-size: 13px;
}
.stat-todo { color: #e6a23c; }
.stat-doing { color: #409eff; }
.stat-done { color: #67c23a; }
.project-description {
  margin: 8px 0 12px 0;
  padding: 8px 12px;
  background: #f5f7fa;
  border-radius: 4px;
  color: #555;
}
.reference-collapse {
  margin: 8px 0 12px 0;
}
.reference-item {
  padding: 4px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  a {
    width: 45%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :deep(.code-line) {
    flex: 1;
    width: 40%;
  }
}
.reference-item.no-account {
  a {
    width: auto;
  }
}
.ref-name {
  font-weight: 500;
}
.ref-url {
  color: #409eff;
  word-break: break-all;
}
.ref-cred {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.requirements {
  margin-top: 12px;
}
.req-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 12px;
  width: 100%;
}
.req-title {
  font-weight: 500;
}
.urgent-tag {
  font-weight: bold;
}
.route-tag {
  background: #ecf5ff;
  border: 1px solid #d9ecff;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.copy-route-btn {
  padding: 0 4px;
  font-size: 12px;
}
.assignee {
  color: #606266;
}
.req-date {
  color: #909399;
  font-size: 12px;
  margin-left: auto;
}
.req-content {
  padding: 8px 0;
}
.req-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}
.status-tag {
  font-weight: 500;
}
.req-links {
  display: flex;
  gap: 16px;
}
.req-links a {
  color: #409eff;
  text-decoration: none;
}
.req-links a:hover {
  text-decoration: underline;
}
</style>
