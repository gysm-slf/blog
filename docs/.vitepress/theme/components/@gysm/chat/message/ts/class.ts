/* type.ts */

/*
* {
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
              showActions: true // 是否显示消息下方功能按钮
            }
          }
* */

type Status = 'loading' | 'complete'

interface AttachmentFile extends File {
    url?: string;
}
type Attachment = AttachmentFile | { url: string };

export interface Message {
    id: string | number
    /** 角色 */
    role: 'system' | 'user'
    /** 头像 */
    profile?: string
    /** 消息内容 */
    content: string | {
        value: string,
        think: {
            content: string,
            status: Status,
            isExpanded: boolean
        }
    }
    /** 渲染类型（以哪种消息组件进行渲染） */
    renderType: 'message' | 'default' // 尝试使用 markdown-it ，在渲染自定义 echart 图时怎么样
    /** 消息内容类型 */
    type: 'mardkwon' | 'echarts' // 尝试使用 markdown-it ，在渲染自定义 echart 图时怎么样
    /** 附件：文件对象或 url */
    attachments: Attachment[]
    /** 时间戳 */
    timestamp: number
    /** 状态 */
    status: Status,
    /** 选项，随进度扩展 */
    options: {
        showActions: boolean
    }
}

// ✅ interface 自动合并
// interface User { name: string; }
// interface User { age: number; }
// 最终 User 类型为 { name: string; age: number; }

// ❌ type 重复定义报错
// type Animal = { legs: number; };
// type Animal = { tail: boolean; }; // 报错：标识符“Animal”重复

export interface TSDefineDemo {
    a: string // 必须存在 string 类型属性 a
    b?: string // 可选 string 类型属性 b
    readonly c: string // 只读 string 类型属性 c
    d: string | number // string 或 number 类型属性 d
    e: '枚举值1' | '枚举值2'
}
