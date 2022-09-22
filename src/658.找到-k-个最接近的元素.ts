/*
 * @lc app=leetcode.cn id=658 lang=typescript
 *
 * [658] 找到 K 个最接近的元素
 *
 * https://leetcode.cn/problems/find-k-closest-elements/description/
 *
 * algorithms
 * Medium (45.92%)
 * Likes:    418
 * Dislikes: 0
 * Total Accepted:    68.3K
 * Total Submissions: 142.9K
 * Testcase Example:  '[1,2,3,4,5]\n4\n3'
 *
 * 给定一个 排序好 的数组 arr ，两个整数 k 和 x ，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。
 * 
 * 整数 a 比整数 b 更接近 x 需要满足：
 * 
 * 
 * |a - x| < |b - x| 或者
 * |a - x| == |b - x| 且 a < b
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：arr = [1,2,3,4,5], k = 4, x = 3
 * 输出：[1,2,3,4]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：arr = [1,2,3,4,5], k = 4, x = -1
 * 输出：[1,2,3,4]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= k <= arr.length
 * 1 <= arr.length <= 10^4
 * arr 按 升序 排列
 * -10^4 <= arr[i], x <= 10^4
 * 
 * 
 */
export {}
// @lc code=start
function findClosestElements(arr: number[], k: number, x: number): number[] {
    const getInstance = (a: number) => (b: number) => Math.abs(a - b | 0)

    const { left, right } = takeWhile((it: number): it is number => it <= x)(arr)

    const ans: Array<number> = []

    const leftIter = left.values()
    const rightIter = right.values()

    let leftTop = leftIter.next()
    let rightTop = rightIter.next()

    while (ans.length < k) {
        const existSize = ans.length
        const getInstanceOfX = getInstance(x);

        // 模式匹配结果 2 X 2 四种情况
        if (leftTop.done === true && rightTop.done === false) {
            // 左侧用尽，右侧有剩余，则剩余容量的所有右侧，均需要放入数组
            ans.push(rightTop.value)
            ans.push(
                ...Array.from(rightIter).slice(0, k - existSize - 1 | 0)
            )
        } else if (leftTop.done === false && rightTop.done === true) {
            // 同上
            ans.unshift(leftTop.value)
            ans.unshift(
                ...Array.from(leftIter).slice(0, k - existSize - 1 | 0).reverse()
            )
        } else if (leftTop.done === true && rightTop.done === true) {
            return  ans
        } else if (leftTop.done === false && rightTop.done === false) {
            const instanceOfLeft = getInstanceOfX(leftTop.value) 
            const instanceOfRight = getInstanceOfX(rightTop.value) 

            if (instanceOfLeft <= instanceOfRight) {
                ans.unshift(leftTop.value)
                leftTop = leftIter.next()
            } else {
                ans.push(rightTop.value)
                rightTop = rightIter.next()
            }
        } else {
            // 异常情况 这里应该枚举完了才对
            return ans 
        }
    }

    return ans
};

/**
 * 将数组一直取出
 */
 const takeWhile = <T, U extends T = T>(pred: (it: T) => it is U) => {
    return (as: Array<T>): Record<'left' | 'right', Array<T>> => {
        const entries = as.values()
        const left: Array<T> = []
        const right: Array<T> = []
        for (const item of entries) {
            if (pred(item)) {
                left.unshift(item)
            } else {
                right.push(item)
                break;
            }
        }
        return { left, right: [...right, ...Array.from(entries)] }
    }

}
// @lc code=end

