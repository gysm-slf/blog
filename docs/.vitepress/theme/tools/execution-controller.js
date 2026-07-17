/**
 * 函数执行控制器，基于事件管理中心实现的（为了统一现有的所有调用方式）
 * @author: slf
 * @date: 2025/7/21 15:42
 */
import { EventManagementCenter } from './event-management-center'

const eventBinder = {
  untilExecute: {
    bind () {
      const handler = function (fn, { ms = 100, maxTimeMs = 5000, errorHandler = msg => console.warn(msg) } = {}) {
        const startTime = Date.now()
        const retry = () => {
          if (Date.now() - startTime >= maxTimeMs) {
            console.log(fn)
            errorHandler(new Error(`After ${maxTimeMs}ms, the function fails to execute correctly`))
            return
          }
          const result = fn() // 因遵循 Promises/A+ 规范，此处可以将fn调用使用promise封装起来，这样就无需额外判断返回值类型
          if (result instanceof Promise) {
            result.then(status => {
              if (!status) {
                setTimeout(() => retry(), ms)
              }
            })
          } else {
            if (!result) {
              setTimeout(() => retry(), ms) // 减少性能开销
            }
          }
        }
        retry()
      }
      EventManagementCenter.regist('untilExecute', handler)
    }
  }, // 满足回调
  /**
   * event: 降频事件
   * { key, delay_times }: 相同key名的事件在delay_times周期内至多执行一次
   * eventArgs: 回调函数
   */
  reduceFrequency: {
    bind () {
      EventManagementCenter.regist('reduceFrequency', (event, { key = 'default__', delay_times = 200 } = {}, eventArgs = []) => {
        this['time__out__' + key] !== null && clearTimeout(this['time__out__' + key])
        this['time__out__' + key] = setTimeout(() => {
          if (!(eventArgs instanceof Array)) {
            eventArgs = [eventArgs]
          }
          event(...eventArgs)
          this['time__out__' + key] = null
        }, delay_times)
      })

      // 使用示例 为热词检索事件进行降频
      /* const keyupSearch = (event, type, custom) => {
        // xxx
      }
      const keyupSearchEvent = (event, custom) => {
        EventManagementCenter.emit('reduceFrequency', keyupSearch, {}, [event, 2, custom])
      }
      <xxx @keyup=keyupSearchEvent xxx /> */
    }
  } // 降频事件
}

const eventBinderInit = function (eventBinder) {
  Object.keys(eventBinder).forEach(name => typeof eventBinder[name].bind === 'function' && eventBinder[name].bind())
}

eventBinderInit(eventBinder)

export {
  EventManagementCenter
}
