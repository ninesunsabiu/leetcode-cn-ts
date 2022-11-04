/*
 * @lc app=leetcode.cn id=754 lang=typescript
 *
 * [754] 到达终点数字
 *
 * https://leetcode.cn/problems/reach-a-number/description/
 *
 * algorithms
 * Medium (44.48%)
 * Likes:    333
 * Dislikes: 0
 * Total Accepted:    28.9K
 * Total Submissions: 58.1K
 * Testcase Example:  '2'
 *
 * 在一根无限长的数轴上，你站在0的位置。终点在target的位置。
 * 
 * 你可以做一些数量的移动 numMoves :
 * 
 * 
 * 每次你可以选择向左或向右移动。
 * 第 i 次移动（从  i == 1 开始，到 i == numMoves ），在选择的方向上走 i 步。
 * 
 * 
 * 给定整数 target ，返回 到达目标所需的 最小 移动次数(即最小 numMoves ) 。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: target = 2
 * 输出: 3
 * 解释:
 * 第一次移动，从 0 到 1 。
 * 第二次移动，从 1 到 -1 。
 * 第三次移动，从 -1 到 2 。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: target = 3
 * 输出: 2
 * 解释:
 * 第一次移动，从 0 到 1 。
 * 第二次移动，从 1 到 3 。
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * -10^9 <= target <= 10^9
 * target != 0
 * 
 * 
 */
export {}
// @lc code=start
/**
 * 获得一个数字 向左 和 向右 移动 n 步的结果
 * 形如一颗二叉树，左子树节点为向左，右子树节点为向右  
 * 第 level 层，对应其移动的距离
 */
const ofChildren = (n: number, level: number) => {
    return [n - level | 0, n + level | 0] as const
}

const makeConditionTreeIter = () => {
    let level = 1
    let nodes = new Set([0])
    return function* () {
        while (true) {
            yield nodes
            const nextNodes = new Set<number>()
            nodes.forEach(
                (v) => {
                    const [a, b] = ofChildren(v, level)
                    nextNodes.add(a)
                    nextNodes.add(b)
                }
            )
            nodes = nextNodes
            level++
        }
    }()
}

function reachNumber(target: number): number {
    const iter = makeConditionTreeIter()
    let ans = 0
    for (const nodes of iter) {
        if (nodes.has(target)) {
            return ans
        }
        ans++
    }
    return ans
};
// @lc code=end

