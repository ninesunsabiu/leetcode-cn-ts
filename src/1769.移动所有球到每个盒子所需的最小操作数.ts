/*
 * @lc app=leetcode.cn id=1769 lang=typescript
 *
 * [1769] 移动所有球到每个盒子所需的最小操作数
 *
 * https://leetcode.cn/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/description/
 *
 * algorithms
 * Medium (85.26%)
 * Likes:    88
 * Dislikes: 0
 * Total Accepted:    31.3K
 * Total Submissions: 35.5K
 * Testcase Example:  '"110"'
 *
 * 有 n 个盒子。给你一个长度为 n 的二进制字符串 boxes ，其中 boxes[i] 的值为 '0' 表示第 i 个盒子是 空 的，而
 * boxes[i] 的值为 '1' 表示盒子里有 一个 小球。
 * 
 * 在一步操作中，你可以将 一个 小球从某个盒子移动到一个与之相邻的盒子中。第 i 个盒子和第 j 个盒子相邻需满足 abs(i - j) == 1
 * 。注意，操作执行后，某些盒子中可能会存在不止一个小球。
 * 
 * 返回一个长度为 n 的数组 answer ，其中 answer[i] 是将所有小球移动到第 i 个盒子所需的 最小 操作数。
 * 
 * 每个 answer[i] 都需要根据盒子的 初始状态 进行计算。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：boxes = "110"
 * 输出：[1,1,3]
 * 解释：每个盒子对应的最小操作数如下：
 * 1) 第 1 个盒子：将一个小球从第 2 个盒子移动到第 1 个盒子，需要 1 步操作。
 * 2) 第 2 个盒子：将一个小球从第 1 个盒子移动到第 2 个盒子，需要 1 步操作。
 * 3) 第 3 个盒子：将一个小球从第 1 个盒子移动到第 3 个盒子，需要 2 步操作。将一个小球从第 2 个盒子移动到第 3 个盒子，需要 1
 * 步操作。共计 3 步操作。
 * 
 * 
 * 示例 2：
 * 
 * 输入：boxes = "001011"
 * 输出：[11,8,5,4,3,4]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == boxes.length
 * 1 <= n <= 2000
 * boxes[i] 为 '0' 或 '1'
 * 
 * 
 */
export {}
// @lc code=start

type Item = {
    scope: number;
    oneCount: readonly [left: number, right: number]
}

function minOperations(boxes: ArrayLike<'0' | '1'>): number[] {
    // 扫描一边数据 记录 0-indexed 的分数 以及 1 的分布情况
    const initF = Array.from(boxes)
        .reduce<Item>(
            (acc, cur, idx) => {
                if (idx > 0 && cur === '1') {
                    const scope = acc.scope + idx | 0
                    const oneCount = [0, acc.oneCount[1] + 1 | 0] as const
                    return { oneCount, scope }
                } else {
                    return acc 
                }
            },
            { scope: 0, oneCount: [0, 0] } 
        )

    const dp = [initF]
    for (let i = 1; i < boxes.length; i++) {
        const prev = boxes[i - 1]!
        const prevDp = dp[i - 1]!
        const cur = boxes[i]!
        // 模式匹配所有情况
        if (cur === '1' && prev === '1') {
            const { scope, oneCount: [x, y] } = prevDp
            const newX = x + 1 | 0
            dp.push({ oneCount: [newX, y - 1 | 0], scope: scope + newX - y })
        } else if (cur === '0' && prev === '1') {
            const { scope, oneCount: [x, y] } = prevDp
            const newX = x + 1 | 0
            dp.push({ oneCount: [newX, y], scope: scope + newX - y })
        } else if (cur === '1' && prev === '0') {
            const { scope, oneCount: [x, y] } = prevDp
            dp.push({ oneCount: [x, y - 1 | 0], scope: scope + x - y })
        } else if (cur === '0' && prev === '0') {
            const { scope, oneCount: [x, y] } = prevDp
            dp.push({ oneCount: [x, y], scope: scope + x - y })
        } else {
            throw new Error("never here")
        }
    }

    return dp.map(it => it.scope)
};
// @lc code=end

