/*
 * @lc app=leetcode.cn id=805 lang=typescript
 *
 * [805] 数组的均值分割
 *
 * https://leetcode.cn/problems/split-array-with-same-average/description/
 *
 * algorithms
 * Hard (30.12%)
 * Likes:    244
 * Dislikes: 0
 * Total Accepted:    16.3K
 * Total Submissions: 39.1K
 * Testcase Example:  '[1,2,3,4,5,6,7,8]'
 *
 * 给定你一个整数数组 nums
 * 
 * 我们要将 nums 数组中的每个元素移动到 A 数组 或者 B 数组中，使得 A 数组和 B 数组不为空，并且 average(A) ==
 * average(B) 。
 * 
 * 如果可以完成则返回true ， 否则返回 false  。
 * 
 * 注意：对于数组 arr ,  average(arr) 是 arr 的所有元素的和除以 arr 长度。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: nums = [1,2,3,4,5,6,7,8]
 * 输出: true
 * 解释: 我们可以将数组分割为 [1,4,5,8] 和 [2,3,6,7], 他们的平均值都是4.5。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: nums = [3,1]
 * 输出: false
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= nums.length <= 30
 * 0 <= nums[i] <= 10^4
 * 
 * 
 */
export {}
// @lc code=start
type Monoid<T> = {
    empty: T,
    concat: (a: T, b: T) => T
}

const numMonoid: Monoid<number> = {
    empty: 0,
    concat: (a, b) => a + b | 0
}


/**
 * 得到一个数组所有子数组的组合情况
 */
const getAllCombinationCondition = <T>(array: Array<T>, m: Monoid<T>) => {
    const len = array.length
    let idx = 0
    let tmpAns: Array<[Array<T>, T]> = []
    return {
        [Symbol.iterator]: function* () {
            while (idx < len) {
                const cur = array[idx]!
                const task = [[[], m.empty] as [Array<T>, T], ...tmpAns]

                for (const [items, sum] of task) {
                    const t: [Array<T>, T] = [[...items, cur], m.concat(sum, cur)]
                    yield t
                    tmpAns.push(t)
                }

                idx = idx + 1 | 0
            }
        }
    }
}

function splitArraySameAverage(nums: number[]): boolean {
    const len = nums.length
    // 面向用例编程
    if (len < 2) return false

    const s = nums.reduce(numMonoid.concat, numMonoid.empty)
    // 因为 A 和 B 是可以是对称的 所以只要考察一半的情况即可
    const middleLen = len / 2 | 0

    // 参考题解 将 nums 做一次变换
    // 将原题要求 转换为：分为两组 每组的和 均为 0 的方案是否存在
    const nums2 = nums.map(it => it * len - s)

    const left = nums2.slice(0, middleLen) 
    const iterForLeft = getAllCombinationCondition(left, numMonoid)

    const allLeftSum = new Set<number>()
    for (const [, sumOfItems] of iterForLeft) {
        if (sumOfItems === 0) {
            return true
        } else {
            allLeftSum.add(sumOfItems)
        }
    }

    const right = nums2.slice(middleLen)
    const sumOfRight = right.reduce(numMonoid.concat, numMonoid.empty)
    const iterForRight = getAllCombinationCondition(right, numMonoid)
    for (const [, sumOfItems] of iterForRight) {
        if (sumOfItems === 0 || (sumOfItems !== sumOfRight && allLeftSum.has(-sumOfItems))) {
            return true
        }
    }

    return false
};
// @lc code=end

