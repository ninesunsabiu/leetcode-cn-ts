/*
 * @lc app=leetcode.cn id=1161 lang=typescript
 *
 * [1161] 最大层内元素和
 *
 * https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (62.87%)
 * Likes:    75
 * Dislikes: 0
 * Total Accepted:    17.4K
 * Total Submissions: 26.8K
 * Testcase Example:  '[1,7,0,7,-8,null,null]'
 *
 * 给你一个二叉树的根节点 root。设根节点位于二叉树的第 1 层，而根节点的子节点位于第 2 层，依此类推。
 * 
 * 请返回层内元素之和 最大 的那几层（可能只有一层）的层号，并返回其中 最小 的那个。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：root = [1,7,0,7,-8,null,null]
 * 输出：2
 * 解释：
 * 第 1 层各元素之和为 1，
 * 第 2 层各元素之和为 7 + 0 = 7，
 * 第 3 层各元素之和为 7 + -8 = -1，
 * 所以我们返回第 2 层的层号，它的层内元素之和最大。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [989,null,10250,98693,-89388,null,null,null,-32127]
 * 输出：2
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中的节点数在 [1, 10^4]范围内
 * -10^5 <= Node.val <= 10^5
 * 
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
 interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

const foldWithIndex = <T>(zero: T, fn: (b: T, level: number, cur: number) => T) => {
    return (root: TreeNode | null) => {
        const startLevel = 1
        const goRec = (accumulator: T, level: number, node: TreeNode): T => {
            const { left, right, val } = node;
            const thisRound = fn(accumulator, level, val)
            const leftAcc = left ? goRec(thisRound, level + 1, left) : thisRound 
            return right ? goRec(leftAcc ?? thisRound, level + 1, right) : thisRound 
        }

        return root ? goRec(zero, startLevel, root) : zero
    }
}

function maxLevelSum(root: TreeNode | null): number {
    type Level = number
    type Sum = number

    // 对每一层进行求和累加的函数
    const calcLevelSum = foldWithIndex<Map<Level, Sum>>(
        new Map(),
        (acc, level, cur) => {
            acc.set(level, (acc.get(level) ?? 0) + cur | 0)
            return acc
        }
    )
    // 累加结果
    const ret = calcLevelSum(root)

    let maxSum = Number.NEGATIVE_INFINITY
    let ans = Number.POSITIVE_INFINITY
    const entries = ret.entries() 
    // 遍历 level -> sumOfLevel 查找最大值以及所对应的层数
    for (const [level, sumOfLevel] of entries) {
        if (sumOfLevel >= maxSum) {
            ans = sumOfLevel === maxSum ? Math.min(ans, level) : level 
            maxSum = sumOfLevel
        }
    }

    return ans
}
// @lc code=end

