/**
 * 功能描述:事件管理中心
 * 对比Vue.$emit特点：
 * 1.支持单一事件接收返回值
 * 2.支持同一类型注册多事件，且支持按优先级顺序执行
 * 3.可跨任意层级
 * 4.支持一次性事件
 * 5.支持在某条件下取消注册的事件（需要保留注册函数的引用）
 * 6.支持事件类型独占（isRefresh：true 以最后一次注册为准）
 * 7.支持链式注册与移除
 *
 * ！！！ 值得注意的一点是，要注意组件的生命周期，要保证事件先注册，后触发，否则第一次事件将无法正常触发
 * ！！！ 值得注意的一点是，如果不熟悉该组件建议注册事件时第三个参数固定传true，避免重复注册 （或者在组件销毁时移除相应事件）
 * @author: slf
 * @date: 2024/12/19 16:09
 */

export const EventManagementCenter = (function () {
  const events = {}
  return {
    // type: 事件名称 fn: 事件处理器  isRefresh:是否刷新(注册事件时会把之前注册过的同名事件先清空,如果出现组件内切换导致重复注册了事件可打开此选项)
    regist: function (type, fn, isRefresh = false, { priority = 0, isAllowRepeatRegist = false } = {}) { // 订阅某个事件
      fn = typeof fn === 'function' ? fn : () => {}
      fn.priority = priority
      if (typeof events[type] === 'undefined' || isRefresh) {
        events[type] = [fn]
      } else {
        if (isAllowRepeatRegist) {
          events[type].push(fn)
        } else {
          events[type].indexOf(fn) === -1 && events[type].push(fn)
        }
      }
      return this
    },
    emit: function (type) { // 向订阅者发送信息
      if (!events[type] || events[type].length === 0) return
      if (events[type].length === 1) return events[type][0].call(this, ...(Array.from(arguments).slice(1)))
      events[type].sort((a, b) => b.priority - a.priority)
      let cacheLen = events[type].length
      for (let i = 0; i < events[type].length; i++) { // 注意，当某事件需要多处订阅时，不支持返回注册的函数结果 因为无法保证与识别对应顺序 也不要调整存储结构增加复杂性 一般不建议使用emit的返回值 即使是支持该功能的时候 如果需要接收多返回值 建议使用不同事件名称，最终效果是一致的
        events[type][i].call(this, ...(Array.from(arguments).slice(1)))
        if (cacheLen > events[type].length) { // 发生触发后即时销毁事件(即在一个类型事件调用期间,发生了部分事件取消订阅) 依旧从原索引处任务开始
          i--
          cacheLen = events[type].length
        }
      }
    },
    remove: function (type, fn) {
      if (typeof fn === 'function') {
        for (let i = events[type].length - 1; i >= 0; i--) {
          if (events[type][i] === fn) events[type].splice(i, 1)
        }
      } else {
        delete events[type]
      }
      return this
    }
  }
})()
