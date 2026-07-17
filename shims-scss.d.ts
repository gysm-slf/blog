// typeScript 不识别样式文件，在 ts 中引入样式文件时会出现警告，此处进行声明可以忽略警告
declare module '*.scss' {
    const content: string;
    export default content;
}

declare module '*.css' {
    const content: string;
    export default content;
}
