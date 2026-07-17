import type { Project } from '@components/task/ts/class'

export const TASK_LIST: Project[] = [
    {
        id: '1',
        name: '文献计量分析',
        tags: [],
        description: '',
        references: [
            { name: '调试地址', url: 'http://local.cnki.net:81/agent_navi?sysid=10', username: 'agent01', password: 'agent_01' },
            { name: '灰度地址', url: 'https://beta.cnki.net/cnkiai/bibliometrics', username: '15117992711', password: 'yiyang321.' },
            { name: '正式地址', url: 'https://ai.cnki.net/wxjl', username: '15117992711', password: 'yiyang321.' }
        ],
        requirements: [
            {
                id: '1-1',
                title: 'AI 成果日志',
                routePath: 'dify + web',
                tags: [],
                status: 'done',
                date: '2026-06-17',
                isUrgent: false,
                assignee: '',
                flowchartUrl: '',
                checklistUrl: '',
                htmlText: `<div>AI检索就是通过检索式检索文献那部分记录</div>
                    <div>AI下载就是dify节点中有应用选中文献篇关摘等信息进行模型生成时需要记录一次   如果有多个节点应用 记录多次</div>
                    <div>下载日志参数说明：</div>
                    {
    "DownLoadType": "AI下载",
    "FileFields": [
      {
        "DownloadType": "AI下载",
        "Expenses": 0,
        "FreeCount": 0,
        "ObjectCount": 1,
        "ObjectDescript": "无人机-TNGZ20161104002", // 题名
        "ObjectName": "TNGZ20161104002", // filename
        "ObjectSize": 0,
        "ProductId": "XPPT" // 产品代码
      }
    ],
    "IdenId": "WEEvREdxNmMyaUdWL2FLTGlabU1wMmk4bTlNb251ZmprOENnMmYyRy9Uc00=$AiWoHpiIFel01yPr3WTwZILu5pT4eNlHCFgTmNuUxm7PX2EZjPfADA!!",
    "ObjectCount": 1, // 文献篇数
    "ObjectDescript": "无人机", // 问题
    "ObjectName": "df1a956d56374ed18df0bcee18866515", // 随机数
    "ObjectRange": "1",
    "ObjectSize": 1,
    "Platform": "AIFZ",
    "ProductID": "XPPT"
  }`
            },
            {
                id: '1-2',
                title: '重新生成',
                routePath: '/register',
                tags: [],
                status: 'done',
                date: '2026-06-15',
                isUrgent: false,
                assignee: '',
                flowchartUrl: '',
                checklistUrl: '',
                htmlText: ''
            }
        ]
    },
    {
        id: '2',
        name: '文化馆员',
        tags: ['React', 'Java', 'v3.1'],
        description: '',
        references: [
            { name: '调试地址', url: 'http://local.cnki.net:81/h5_index?sysid=5541', username: 'wenhua01', password: 'wenhua_01' },
            { name: '正式地址', url: 'https://whai.cnki.net/inds/h5_index?sysid=5541', username: '18234192829', password: 'lxl18234192829' },
            { name: '设计图', url: 'https://www.figma.com/design/agrqwVVhbxknsoPf5N4qMY/%E6%96%87%E5%8C%96%E9%A6%86%E5%91%98?node-id=1441-2&p=f&t=zRBs5H1bjunqzcQm-0' },
            { name: '核对单', url: 'https://365.kdocs.cn/l/ctnn4TZrokIy' },
            { name: 'PC端', url: 'https://aiwh.cnki.net/inds/culture?JURSGhxpYQAHFkxyP7sxYkDpkteJZkdaQdw5ugSicnkimmd2BDhuuY8OcPUsOWGI8LvFnvyH19rs2DytdIIrUOL6ott', username: '18656085104', password: '123456Abc' },
        ],
        requirements: [
            {
                id: '2-1',
                title: '诗词创作',
                routePath: '/h5_wh_poem?sysid=5541',
                tags: [],
                status: 'done',
                date: '2026-06-16',
                isUrgent: true,
                assignee: '', // 相关负责人
                htmlText: ''
            },
            {
                id: '2-2',
                title: '诗词问答',
                routePath: '/h5_agent_answer?sysid=5541&title=古诗词趣味创作&code=1',
                tags: [],
                status: 'done',
                date: '2026-06-14',
                isUrgent: false,
                assignee: '', // 相关负责人
                htmlText: ''
            },
            {
                id: '2-3',
                title: '埋点',
                routePath: '',
                tags: [],
                status: 'done',
                date: '2026-06-23',
                isUrgent: false,
                assignee: '', // 相关负责人
                htmlText: '还包括传统文化（pc端）'
            }
        ]
    },
    {
        id: '3',
        name: 'AIGC',
        tags: [],
        description: '',
        references: [
            {
                name: '调试地址',
                url: 'http://local.cnki.net:81/aigc?sysid=4',
                username: 'agent01',
                password: 'agent_01'
            },
            {
                name: '灰度地址',
                url: 'https://kbsi.oversea.cnki.net/inds/aigc?sysid=4',
                username: '15911132614',
                password: 'TFzw6789'
            },
            {
                name: '正式地址',
                url: 'https://ai.oversea.cnki.net/inds/aigc?sysid=4',
                username: '15911132614',
                password: 'TFzw6789'
            }
        ],
        requirements: [
            {
                id: '3-1',
                title: '2026.6.23 bug 修复',
                routePath: '',
                tags: [],
                status: 'done',
                date: '2026-06-25',
                isUrgent: false,
                assignee: '', // 相关负责人
                htmlText: `
<div>
注意点：
<div>启动命令：dev-cnkismart</div>
<div>可能无法正常登陆，在测试环境同.cnki.net下登录即可</div>
</div>`
            }
        ]
    },
    {
        id: '4',
        name: '文献综述 2.0',
        tags: [],
        description: '',
        references: [
            { name: '调试地址', url: 'http://local.cnki.net:81/wenxianzongshu', username: 'agent01', password: 'agent_01' },
            { name: '灰度地址', url: '', username: '', password: '.' },
            { name: '正式地址', url: '', username: '', password: '.' }
        ],
        requirements: [
            {
                id: '4-1',
                title: '指标分析',
                routePath: '',
                tags: [],
                status: 'doing',
                date: '2026-06-30',
                isUrgent: false,
                assignee: '',
                flowchartUrl: '',
                checklistUrl: '',
                htmlText: `需要给用户的输入内容。加选择的文献的信息，加向量片段+生成的章节内容。<br>

判断张娜定义的那些提示词是否能生成图表

能生成的话，命中对应的图表并且渲染。同时输出 图表 对应的总结描述。

插入到文献综述对应章节

就这么个事儿

<div>涉及关键函数</div>
<div>
step4fulltext.ts.generateNextNode() => 首次生成、继续生成 （链式）
</div>
<div>step4fulltext.ts.refreshNode() => 重新生成</div>
请求参数：{"docid":"ba8d9b28-6fae-4fdc-86b3-7a5ddd589718","titleid":"e30d6dce4149488e90fa8c6d31436658","content":"人工智能投入与产出效比的研究背景"}
<div>需要考虑的几点：</div>
<li>生成章节内容后 -> 生成下一章节内容 改为 生成章节内容后 -> 生成当前章节内容指标分析 -> 更新历史（或者之前记录历史的时机往后调整下，改为在指标分析生成完成后在进行） -> 生成下一章节内容</li>
和张娜确认下参考数据用哪个字段，是不是全文？
向量检索接口(/hydsi/dataSearch/v2/kdata/searchVectorFragment)只支持传问题，searchdata 第一个条件放RULE_API_VECTOR_FRAGMENT 也会识别为向量检索还可以在附加条件

<div>dify待确认问题</div>
1. 实验数据对比 检索式干嘛用的
2. 对应章节 是指章节标题大概属于这个范畴就对应存在指标分析？
3. 是否完全限定在选中的文献内进行分析？万老师说使用向量片段 这里向量检索条件脱离选中的文献了。 指标分析参考 全文属性？
`
            },
        ]
    },
]
