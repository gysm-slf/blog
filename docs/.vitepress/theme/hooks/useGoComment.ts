// useGoComment.ts

/**
 * 使用事件委托为所有（包括动态出现的）带有 title="前往评论" 的元素绑定点击事件，
 * 点击后平滑滚动到 id="giscus" 的目标区域。
 *
 * 委托范围：document（也可改为指定的父容器）
 *
 * @returns 清理函数，用于移除事件监听（适用于组件卸载或路由切换）
 */
export function useGoComment(): () => void {

    // 1. 委托点击处理
    const handleClick = (event: Event) => {

        // 2. 获取目标元素（滚动目的地）
        const target = document.getElementById('giscus');
        if (!target) {
            console.warn('[useGoComment] 未找到 id="giscus" 的目标元素');
            return () => {}; // 返回空清理函数
        }

        // 检查点击的元素或其祖先是否匹配选择器
        const trigger = (event.target as HTMLElement)?.closest?.('[title="前往评论"]');
        if (!trigger) return; // 不匹配则忽略

        // 阻止默认行为（如 a 标签的 href 跳转）
        event.preventDefault();

        // 平滑滚动到目标区域
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        // 可选：高亮反馈
        target.style.transition = 'background 0.3s ease';
        target.style.background = '#f0f9ff';
        setTimeout(() => {
            target.style.background = '';
        }, 800);
    };

    // 3. 在 document 上绑定事件（委托）
    document.addEventListener('click', handleClick);

    // 4. 返回清理函数
    return () => {
        document.removeEventListener('click', handleClick);
    };
}
