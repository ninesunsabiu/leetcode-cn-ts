/*
 * @lc app=leetcode.cn id=646 lang=typescript
 *
 * [646] 最长数对链
 *
 * https://leetcode.cn/problems/maximum-length-of-pair-chain/description/
 *
 * algorithms
 * Medium (58.57%)
 * Likes:    330
 * Dislikes: 0
 * Total Accepted:    52.6K
 * Total Submissions: 86.1K
 * Testcase Example:  '[[1,2],[2,3],[3,4]]'
 *
 * 给出 n 个数对。 在每一个数对中，第一个数字总是比第二个数字小。
 * 
 * 现在，我们定义一种跟随关系，当且仅当 b < c 时，数对(c, d) 才可以跟在 (a, b) 后面。我们用这种形式来构造一个数对链。
 * 
 * 给定一个数对集合，找出能够形成的最长数对链的长度。你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入：[[1,2], [2,3], [3,4]]
 * 输出：2
 * 解释：最长的数对链是 [1,2] -> [3,4]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 给出数对的个数在 [1, 1000] 范围内。
 * 
 * 
 */

// @lc code=start
function findLongestChain(pairs: Array<[s: number, e: number]>): number {

    return pairs
        .slice()
        // 按照右区间进行递增排序
        .sort(([,a], [,b]) => a < b ? -1 : a === b ? 0 : 1)
        // 遍历 区间数组，只要不和累积最右端区间有重叠 即可加入当前链
        .reduce(
            (accumulator, [s, e]) => {
                return accumulator.curMaxRight < s
                        // 如果满足不交叉 则最长链数 加一 
                        ? { curMaxRight: e, ans: accumulator.ans + 1 }
                        // 否则抛弃该区间 进行下一次迭代
                        : accumulator
            },
            { curMaxRight: Number.NEGATIVE_INFINITY, ans: 0 }
        )
        // 最后返回结果
        .ans
};
// @lc code=end

