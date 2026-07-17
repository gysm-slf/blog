---
coverImg: /img/人物/ada.gif
outline: [2, 3]
---

# vue3

[官方文档](https://cn.vuejs.org/guide/introduction.html)

## 要注意

::: warning
1. `Vue` 组件对应的不同实例不止 data 是不同的，方法指向也是不同的，即 `ref1.test === ref2.test` 为 `false`。
2. 在一个组件需要反复创建、销毁且使用 `beforeDestroy` 钩子时要注意钩子执行顺序。
3. 尽量不要更改响应式属性渲染的 `dom` （如删除内部某个节点） ，直接操作 Vue 渲染的 DOM 节点（如使用 removeChild 或 innerHTML 清空），会导致 真实 DOM 树与 Vue 的虚拟 DOM 树不同步。当响应式数据发生变化，Vue 进行 diff 比对并尝试更新视图时，会因为找不到预期的节点引用而抛出运行时错误（如 NotFoundError），或者产生重复、错乱的 DOM 元素，而非“响应式属性失效”。
:::

::: danger
当从一个响应式对象(ref())内接收赋值时，当值为

基本类型时：失去响应性，访问时不再需要.value，若期望保持响应式，可以使用 toRef / toRefs

引用类型时：不会失去响应性，但访问时同样不在需要.value
:::

## 经常忘记

- 新链接打开

```vue
window.open(router.resolve({
    name: 'Detail',
    params: query
    }).href, '_blank')
```

## echarts

### 里程碑图

```js
const categories = [
  '医疗大模型',
  '里程碑4: 跨模态预警',
  '多模态融合',
  '里程碑3: 迁移学习应用',
  '迁移学习',
  '里程碑2: U-Net分割',
  'CNN/U-Net',
  '里程碑1: 肺结节分类',
  '手工特征+SVM'
];

const startYear = 2014;

// 条形数据: [起始年份偏移, 结束年份偏移, 类别索引]
const barData = [
  { name: '手工特征+SVM', start: 2015, end: 2020, desc: '逐渐衰减' },
  { name: 'CNN/U-Net', start: 2018, end: 2023, desc: '核心期' },
  { name: '迁移学习', start: 2019, end: 2024, desc: '应用延伸' },
  { name: '多模态融合', start: 2021, end: 2024, desc: '当前主流' },
  { name: '医疗大模型', start: 2023, end: 2024, desc: '未来趋势' }
];

// 里程碑数据: [年份, 类别索引]
const milestoneData = [
  { name: '里程碑1: 肺结节分类', year: 2015 },
  { name: '里程碑2: U-Net分割', year: 2018 },
  { name: '里程碑3: 迁移学习应用', year: 2020 },
  { name: '里程碑4: 跨模态预警', year: 2022 }
];

option = {
  tooltip: {
    trigger: 'item'
  },
  grid: {
    left: 180,
    right: 80,
    top: 20,
    bottom: 40
  },
  xAxis: {
    type: 'value',
    show: false,
    min: startYear,
    max: 2025,
    axisLabel: {
      formatter: '{value}'
    }
  },
  yAxis: {
    type: 'category',
    data: categories,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      formatter: '● {value}'
    }
  },
  series: [
    // 透明偏移段
    {
      type: 'bar',
      stack: 'timeline',
      silent: true,
      itemStyle: { color: 'transparent' },
      data: categories.map(cat => {
        const item = barData.find(d => d.name === cat);
        return item ? item.start : 0;
      }),
      barWidth: 16
    },
    // 实际条形段
    {
      type: 'bar',
      stack: 'timeline',
      itemStyle: { color: '#8c8c8c' },
      barWidth: 16,
      label: {
        show: true,
        position: 'right',
        formatter: (params) => {
          const item = barData.find(d => d.name === categories[params.dataIndex]);
          return item ? `(${item.start}-${item.end}, ${item.desc})` : '';
        },
        color: '#666'
      },
      data: categories.map(cat => {
        const item = barData.find(d => d.name === cat);
        return item ? (item.end - item.start) : 0;
      })
    },
    // 里程碑菱形标记
    {
      type: 'scatter',
      symbol: 'diamond',
      symbolSize: 16,
      itemStyle: { color: '#595959' },
      label: {
        show: true,
        position: 'right',
        formatter: (params) => `(${params.value[0]})`,
        color: '#666'
      },
      data: milestoneData.map(m => ({
        value: [m.year, m.name],
        name: m.name
      }))
    }
  ]
};
```

## 宏函数

| 宏名称 | 作用 | 引入版本 |
| :--- | :--- | :--- |
| **`defineProps`** | **（最常用）** 声明父组件传递进来的 props，支持运行时声明和 TS 泛型声明。 | Vue 3.0 |
| **`defineEmits`** | **（最常用）** 声明组件可以触发的事件（`emit`），用于类型校验。 | Vue 3.0 |
| **`defineExpose`** | 暴露组件内部的属性或方法给父组件（通过 `ref` 或 `$parent` 访问）。默认 `<script setup>` 是关闭的，必须用此宏暴露。 | Vue 3.0 |
| **`defineOptions`** | **（你问的这个）** 在不写额外 `<script>` 块的情况下，设置组件选项，如 `name`、`inheritAttrs`、`components`（手动注册）等。 | Vue 3.3 |
| **`defineModel`** | **（重磅新特性）** 专门用于简化 `v-model` 双向绑定的声明，自动生成 `modelValue` prop 和 `update:modelValue` 事件。 | Vue 3.4 |
| **`defineSlots`** | 用于为插槽（slots）提供严格的类型检查，主要用在 TS 场景下约束父组件传入的插槽内容。 | Vue 3.3 |

### 注释分区

```js
// 使用以下注释可以对代码进行功能区划分并且支持折叠
// <editor-fold desc="API 请求方法" defaultstate="collapsed">

// </editor-fold>
```

### 基础模板

```vue
<!--
 * @name 组件名称（请替换为实际组件名）
 * @description 组件功能描述
 * @author 作者
 * @date 创建日期
-->
<template>
  <!-- 根节点：添加组件名 class，方便样式隔离与调试 -->
  <div :class="componentName">
    <!-- 头部区域 -->
    <header class="my-component__header">
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
    </header>

    <!-- 主体内容 -->
    <main class="my-component__body">
      <!-- 默认插槽，用于外部内容分发 -->
      <slot />
    </main>

    <!-- 底部区域 -->
    <footer class="my-component__footer">
      <slot name="footer">
        <span>© {{ new Date().getFullYear() }}</span>
      </slot>
    </footer>
  </div>
</template>

<!-- ==================== 脚本区域 ==================== -->
<script setup lang="ts">
  
const componentName = 'demo'
  
defineOptions({
  name: componentName
})

interface Props {
  /** 标题内容 */
  title?: string
  /** 是否启用某种功能 */
  enabled?: boolean
  /** 初始计数 */
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  enabled: false,
  initialCount: 0,
})

// （事件声明）
const emit = defineEmits<{
  /** 点击事件，返回当前计数 */
  (e: 'update', count: number): void
  /** 切换状态事件 */
  (e: 'toggle', value: boolean): void
}>()

// 响应式数据
const count: Ref<number> = ref(props.initialCount)
const isActive = ref(false)

// 计算属性
const doubleCount = computed(() => count.value * 2)
const statusText = computed(() => (isActive.value ? '激活' : '未激活'))

/** 增加计数 */
const increment = (): void => {
  count.value++
  emit('update', count.value)
}

/** 切换状态 */
const toggleStatus = (): void => {
  isActive.value = !isActive.value
  emit('toggle', isActive.value)
}

// 侦听器
watch(
  () => props.initialCount,
  (newVal) => {
    if (newVal !== undefined) {
      count.value = newVal
    }
  }
)

// 生命周期钩子
onMounted(() => {
  console.log(`${componentName} 组件已挂载`)
  // 初始化操作，例如请求数据
})

defineExpose({
  count,
  isActive,
  increment,
  toggleStatus,
})

</script>

<!-- ==================== 样式区域 ==================== -->
<style scoped lang="scss">
/* 使用 BEM 命名规范，作用域隔离 */
/* 
.block-name__element-name--modifier-name 
__ （双下划线）：用来分隔 块 与 元素。表示该元素是块的子节点，不能脱离父块独立存在。
-- （双连字符）：用来分隔 块/元素 与 修饰符。表示该块或元素在特定状态、主题或尺寸下的变体。 

1. Block（块）—— 独立实体

一个可复用的独立组件，相当于一个“容器”。

命名：header、menu、button、login-form

示例：.button { }

2. Element（元素）—— 组成部分

属于块内部的一部分，不能单独使用。

命名：button__icon、button__text、login-form__input

示例：.button__icon { }

3. Modifier（修饰符）—— 状态/外观

用于定义块或元素的不同外观（主题色、尺寸）或状态（禁用、激活）。

命名：button--disabled、button--large、button--primary

示例：.button--disabled { opacity: 0.5; }

<!-- HTML 结构 -->
<button class="button button--primary button--large" disabled>
  <i class="button__icon">👍</i>
  <span class="button__text">登录</span>
</button>

/* CSS 写法 */
.button { display: inline-flex; align-items: center; }
.button__icon { margin-right: 4px; }
.button__text { font-weight: bold; }
.button--primary { background: blue; color: white; }
.button--large { padding: 16px 32px; font-size: 18px; }
.button--disabled { opacity: 0.4; pointer-events: none; }

最常用的命名

分类	常见命名词汇（英文）	对应的中文场景
通用块 (Blocks)	header, footer, sidebar, main, container	页面骨架布局
UI组件块	button, input, modal, card, table, form, nav, menu, list	基础交互组件
常用元素 (Elements)	__title, __body, __footer, __item, __link, __icon, __wrapper, __label, __value	块内部的内部结构
状态修饰符 (Modifiers)	--active, --disabled, --hidden, --checked, --loading, --error, --success	交互状态（最常用）
主题/尺寸修饰符	--primary, --secondary, --danger, --success, --large, --small, --outlined	视觉风格变体

必须遵守的黄金法则（避坑指南）
只用 Class 名：绝对不要使用 ID（#id）或标签名（div、ul）来写 BEM 样式，因为 BEM 追求极低的优先级（权重），避免级联污染。

严禁过度嵌套：BEM 命名在 CSS 中只写一层即可（.block__elem），不要在 CSS 中写成 .block .block__elem .block__elem--mod。

元素不能有嵌套层级链：非常关键！请不要写成 block__elem1__elem2。如果元素内部还有子元素，在 BEM 眼里，它们都属于这个块（Block）的平级子元素，应该平铺写为 block__elem1 和 block__elem2。如果结构太深，说明你应该把这个子元素拆分成一个新的“块（Block）”。

修饰符不能单独使用：button--primary 必须和 button 类名一同写在 HTML 上，即 class="button button--primary"，绝不要单独写 class="button--primary"。
*/

.my-component {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;

  /* 头部样式 */
  &__header {
    font-size: 1.25rem;
    font-weight: bold;
    color: #2c3e50;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  /* 主体样式 */
  &__body {
    flex: 1;
    padding: 0.5rem 0;
  }

  /* 底部样式 */
  &__footer {
    margin-top: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid #ddd;
    font-size: 0.875rem;
    color: #666;
    text-align: center;
  }
}

/* 交互状态示例 */
.my-component--active {
  border-color: #42b883;
  background-color: #f0faf5;
}
</style>
```

### defineProps 定义示例

```vue
<script lang="ts">
  // 定义属性
  defineProps<{
    message: string // 必选 string 类型属性 message
    date?: string   // 可选 string 类型属性 date
  }>()
  
  // 如果值为可选并需要默认值
  withDefaults(defineProps<{
    message: string
    date?: string
  }>(), {
    date: 100       // 默认值
  })
</script>
```

## 关于 `ref` 和 `reactive`

### 区别

| 对比维度 | `ref` | `reactive` |
|---------|-------|------------|
| **可接受的类型** | 任意类型：基本类型、对象、数组、Map 等 | **仅对象类型**（对象、数组、Map、Set 等） |
| **内部实现** | 基本类型通过 `getter/setter` 拦截 `.value`；对象类型内部会自动调用 `reactive` 进行代理 | 完全基于 `Proxy` 代理整个对象 |
| **访问方式** | 在 `<script>` 中必须通过 `.value` 读写；模板中自动解包（顶层 ref） | 直接当作普通对象访问属性，无需 `.value` |
| **整体替换** | 可以**整体替换** `.value`，仍保持响应式（`state.value = newObj`） | **不能直接整体替换**变量引用，否则丢失响应式；只能用 `Object.assign` 或逐属性修改 |
| **解构行为** | 解构 `ref` 包裹对象的属性会丢失响应（`const { a } = state.value`），需要 `toRefs()` | 解构 `reactive` 对象的属性会丢失响应，必须配合 `toRefs()` 使用 |
| **模板解包细节** | 模板中顶层 ref 自动解包，但嵌套在 reactive 内的 ref 也会被自动解包（易混淆） | reactive 属性直接访问，但如果属性值是 ref，会自动解包，不推荐这样混用 |
| **Watch 监听** | 可以直接传入 ref 作为监听源，自动追踪 `.value` 变化 | 需要用一个 getter 函数返回具体属性，或监听整个 reactive 对象（深度监听） |
| **类型推断** | `Ref<T>` 类型，`.value` 有良好推断 | 直接推断为原始对象类型，使用起来更自然 |

### 使用黄金法则

1. 基本类型一律用 `ref`

```js
const count = ref(0)
const name = ref('Vue')
```

没有别的选择，reactive 根本不能处理基本类型。

2. 引用类型也优先使用 `ref`

```js
const user = ref({ name: 'John', age: 30 })
// 可以随意整体替换
user.value = { name: 'Jane', age: 25 }
```

3. 只有同时满足以下条件，才考虑使用 `reactive`

- 确定绝对不会整体替换这个对象，只修改内部属性。
- 你想避免大量 .value 书写，追求模板内简洁。
- 你能保证不直接解构，或总是用 toRefs() 处理。

```js
const form = reactive({
  username: '',
  password: '',
  remember: false
})
```

::: tip
即便如此，现在更流行的做法仍然是 const form = ref({...})，然后用 form.value.username，风格统一，风险更低。（忘记 reactive 吧(*^▽^*)）
:::

4. 组合函数返回数据时，一律使用 `ref` 或 `toRefs()`

组合函数应当返回 ref 组成的对象，方便调用方安全解构且保持响应：

```js
// ✅ 推荐：每个属性是独立的 ref
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  return { x, y }
}

// 如果是 reactive 对象，必须用 toRefs 包裹
export function useForm() {
  const state = reactive({ name: '', age: 0 })
  return { ...toRefs(state) }
}
```

## 关于 `setup()` 函数和 `<script setup>`

| 对比维度 | `setup()` 函数 (传统写法) | `<script setup>` (语法糖) |
| :--- | :--- | :--- |
| **本质** | 组件中一个普通的选项函数。 | 一个**编译时语法糖**，会被编译成 `setup()` 函数。 |
| **暴露变量/方法** | **需要手动 `return`**。只有返回对象里的东西才能在模板中用。 | **自动暴露**。所有顶层的变量、函数、甚至 `import` 的内容都能直接在模板中用。 |
| **定义Props/Emits** | 通过函数参数 `props` 和 `context` 获取。 | 使用**编译器宏** `defineProps` 和 `defineEmits` 来定义。 |
| **注册组件** | 需要在 `components` 选项中手动注册。 | 导入后即可在模板中直接使用，无需注册。 |
| **TypeScript支持** | 需要手动进行类型声明，较繁琐。 | 提供**更好的类型推导**，开发体验更佳。 |
| **顶层 `await`** | 不支持，需在异步函数内使用。 | **支持**，可直接在顶层使用 `await`。 |
| **与Options API混用** | 可以与 `data`、`methods` 等选项共存。 | 如需混用，需额外写一个普通的 `<script>` 标签。 |
| **性能** | 运行时处理。 | 有**编译时优化**，性能通常更好。 |

## h 函数

创建虚拟 DOM 节点 (vnode)。

- 类型

```ts
// 完整参数签名
function h(
  type: string | Component,
  props?: object | null,
  children?: Children | Slot | Slots
): VNode

// 省略 props
function h (type: string | Component, children?: Children | Slot): VNode

type Children = string | number | boolean | VNode | null | Children[]

type Slot = () => Children

type Slots = { [name: string]: Slot }
```

> 为了便于阅读，对类型进行了简化。

- 详细信息

第一个参数既可以是一个字符串 (用于原生元素) 也可以是一个 Vue 组件定义。第二个参数是要传递的 prop，第三个参数是子节点。

当创建一个组件的 vnode 时，子节点必须以插槽函数进行传递。如果组件只有默认槽，可以使用单个插槽函数进行传递。否则，必须以插槽函数的对象形式来传递。

为了方便阅读，当子节点不是插槽对象时，可以省略 prop 参数。

- 示例

创建原生元素：

```ts
import { h } from 'vue'

// 除了 type 外，其他参数都是可选的
h('div')
h('div', { id: 'foo' })

// attribute 和 property 都可以用于 prop
// Vue 会自动选择正确的方式来分配它
h('div', { class: 'bar', innerHTML: 'hello' })

// class 与 style 可以像在模板中一样
// 用数组或对象的形式书写
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// 事件监听器应以 onXxx 的形式书写
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 prop 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 vnode 和字符串
h('div', ['hello', h('span', 'hello')])
```

创建组件：

```ts
import Foo from './Foo.vue'

// 传递 prop
h(Foo, {
  // 等价于 some-prop="hello"
  someProp: 'hello',
  // 等价于 @update="() => {}"
  onUpdate: () => {}
})

// 传递单个默认插槽
h(Foo, () => 'default slot')

// 传递具名插槽
// 注意，需要使用 `null` 来避免
// 插槽对象被当作是 prop
h(MyComponent, null, {
  default: () => 'default slot',
  foo: () => h('div', 'foo'),
  bar: () => [h('span', 'one'), h('span', 'two')]
})
```

## 常用功能示例

```vue
<script setup>
import { ref, computed, watch, onMounted, onUnmounted, provide, inject, readonly  } from 'vue' // 在入口文件中,app主程序也可以通过此方法提供全局数据
import { useRoute } from 'vue-router'
const route = useRoute(), param = route.query
import useMouse from './mouse.js'
// 支持命名空间 Symbol 详见: https://cn.vuejs.org/guide/components/provide-inject.html
provide(/* 注入名 */ 'message', /* 值 */ readonly('hello!')) // 可以设置只读,子组件只能使用不能修改
provide('name', ref('hello vue3!')) // 可以是响应式的数据对象
const message = inject('message') // 所有子组件内均可通过inject获取提供数据
const name = inject('name', '') // 所有子组件内均可通过inject获取提供数据
// 定义组件名
defineOptions({
  name: getComponentName('search_select')
})
// 宏函数,无需导入
const props = defineProps({
  name: { type: String, default: 'hello!' },
  isShow: { type: Boolean, default: true },
  count: { type: Number, default: 0 }
})

// 宏函数,无需导入
const emits = defineEmits({ // 注册子组件的所有自定义事件 注意点1: 只能在setup中使用 2:template中直接$emit无需在此处注册,如@click="$emit('show')"
  add: null, // 注册add事件,不对参数进行校验
  change: null,
  submit: ({ email, password }) => { // 注册submit事件,并对参数进行校验
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
}) // 注册子组件的所有自定义事件 注意点1: 只能在setup中使用 2:template中直接$emit无需在此处注册,如@click="$emit('show')"
emits('add', 'slf') // 触发注册的事件add arg0: 事件名 arg1-n: 传递参数
emits('change', new Date().getTime()) // 触发注册的事件change arg0: 事件名 arg1-n: 传递参数

// 注册自定义指令,不推荐在组件上使用自定义指令
// 在模板中启用 v-focus
// 支持全局绑定 app.directive('focus', { mounted: el => el.focus })
const vFocus = { // 所有的指令钩子都是可选项
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted: (el, binding, vnode, prevVnode) => el.focus(),
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
// 简化形式
/*app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})*/
const computedData = {
  double: computed(() => props.count * 2), // readonly
  canwrite: computed({ get: () => {}, set: () => {} })
}

const stop = watch(() => props.count, (newValue, oldValue) => {}, { deep: true, immediate: true })
stop() // 取消监听

const data = {
  moduleId: ref(0)
}

const methods = {
  moduleIdAdd: () => data.moduleId.value++
}

onMounted(() => {
  console.log('顶层组件onMounted')
})
onUnmounted(() => {
  console.log('顶层组件onUnmounted')
})
const { x, y } = useMouse() // 接收引入mixins的值,避免了命名冲突,可以自定义变量名,如 const useMouseData = useMouse(), renameX = useMouseData.x;
// 双向绑定数据
const model = defineModel()
</script>

<template>
  <!-- 双向绑定demo: -->
  <input :name="props.name" v-model="model" />
  <!-- 自定义双向绑定emit(update:绑定变量名(在vue3版本v-model默认绑定到modelValue), 更新值) -->

  Mouse position is at: {{ x }}, {{ y }}

  <input v-focus v-model="computedData.double" />

  {{ data.moduleId }}
  <div @click="methods.moduleIdAdd">点我+1</div>
</template>
```

`mouse.js`

```js
import { ref, onMounted, onUnmounted } from 'vue'
// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  // 通过返回值暴露所管理的状态
  return { x, y }
}
```

## 圣斗士不能被同一招打败两次（经验）

### beforeDestroy

在一个组件需要反复创建、销毁且使用 beforeDestroy 钩子时要注意钩子执行顺序。

### template

```vue
<template>
  <vue-markdown v-for="node in renderHistoryData" :source="node.content" />  
</template>

<!-- 如何优雅的在迭代的节点中间某个节点处添加过渡效果？ ↓↓ -->

<template>
  <template v-for="(node, nIndex) in renderHistoryData">
    <vue-markdown :source="node.content" />
    <loading /> <!-- 你的过渡组件 -->
  </template>
</template>

<script>
  export default {
    data () {
      return {
        renderHistoryData: []
      }
    }
  }
</script>
```

### props 属性传递

注意：像子组件传递引用类型对象时，父组件修改对象属性后，子组件值会对应更新，但是若子组件也需要修改该对象属性，需要配合 data + watch 使用，示例：

```vue
<script setup>
  import {ref, watch} from 'vue'

  const props = defineProps({
    record: {
      type: Object,
      default: () => ({})
    }
  })

  const renderRecord = ref({})

  watch(
      () => props.record,   // 监听源
      (newval, oldval) => { // 监听回调
        renderRecord.value = newval
      },
      {
        immediate: true
      }
  )
</script>
```

## 功能基础模板

### 中文输入法判断

```vue
<template>
  <input
      ref="inputRef"
      type="text"
      class="border border-gray-300 rounded px-3 py-2 w-full"
      placeholder="请输入内容（中文输入法时不会触发）"
      @compositionstart="isComposing = true"
      @compositionend="isComposing = false"
      @keyup="handleKeyup"
  />
</template>

<script setup>
  const isComposing = ref(false)
  const handleKeyup = function (event) {
    if (isComposing.value) {
      console.log('输入法激活中，忽略 keyup');
      return;
    }
    
    // 过滤功能按键（可选）
  }
</script>
```

## 组件内定义临时模板

```vue
<template>
  <div>
    <message-data :data="message.content" />
  </div>
</template>

<script setup>
  const MessageData = {
    props: ['data'],
    // 当有 template 属性时会被识别为组件
    template: `<div v-if="data instanceof String">
    {{ data }}
  </div>
  <div v-if="data instanceof Object">
    {{ data.value }}
  </div>`
  }
</script>
```

## 组件模板

### 会话 

```vue
<template>
  <!-- 聊天列表 -->
  <div v-if="showResult" ref="chatScrollArea" class="chat-list-container">
    <div
        v-for="msg in chatList"
        :key="msg.id"
        :class="['chat-item', msg.role]"
    >
      <!-- 用户消息 -->
      <div v-if="msg.role === 'user'" class="user-message-bubble">
        {{ msg.content }}
      </div>

      <!-- AI消息 -->
      <div v-else class="system-card">
        <!-- 思考过程 -->
        <div v-if="msg.think" class="system-thinking">
          <div class="thinking-header" @click="toggleThinking(msg)">
            <span :class="['arrow-icon', { expanded: msg.think.isExpanded }]">▶</span>
            <span>{{ msg.think.isExpanded ? '收起' : '展开' }}思考过程</span>
          </div>
          <transition name="slide-fade">
            <div v-show="msg.think.isExpanded" class="thinking-content" :class="{ loading: msg.think.status === 'loading' }">
              <div v-if="msg.think.status === 'loading'" class="thinking-waves">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
              </div>
              <span>{{ msg.think.content }}</span>
            </div>
          </transition>
        </div>

        <!-- 回答内容 -->
        <div class="system-answer">
          <div class="markdown-content" v-html="renderMarkdown(msg.content)"></div>
        </div>

        <!-- 操作按钮 -->
        <div v-if="msg.options && msg.options.showActions" class="answer-actions">
          <button class="action-btn" @click="handleCopy(msg)">
            <img class="icon" :src="require('@@/images/whai/wh_copy.png')" alt="">
            <span>复制</span>
          </button>
          <button class="action-btn" @click="handleRead(msg)">
            <img class="icon" :src="require('@@/images/whai/wh_play.png')" alt="">
            <span>朗读</span>
          </button>
          <button class="action-btn" @click="handleRegenerate(msg)">
            <img class="icon" :src="require('@@/images/whai/wh_refresh.png')" alt="">
            <span>重新生成</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        messages: [
          {
            id: '',
            role: "system", // system | user
            content: '描写荷花的诗词有哪些？',
            type: 'markdown',
            attachments: '', // 附件
            timestamp: 1718000000,
            status: '', // loading | complete
            think: { // 基本上只有 role 为 system 时使用
              content: '',
              status: '', // loading | complete
              isExpanded: true, // 是否展开
            },
            options: {
              showActions: true // 是否显示底部按钮
            }
          }
        ]
      }
    }
  }
</script>
```
