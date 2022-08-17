/*
 * @lc app=leetcode.cn id=1302 lang=typescript
 *
 * [1302] 层数最深叶子节点的和
 *
 * https://leetcode.cn/problems/deepest-leaves-sum/description/
 *
 * algorithms
 * Medium (82.57%)
 * Likes:    129
 * Dislikes: 0
 * Total Accepted:    49.2K
 * Total Submissions: 57.5K
 * Testcase Example:  '[1,2,3,4,5,null,6,7,null,null,null,null,8]'
 *
 * 给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
 * 输出：15
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
 * 输出：19
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目在范围 [1, 10^4] 之间。
 * 1 
 * 
 * 
 */
export {}
type TreeNode = {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
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

const isNotNil = <T>(it: T): it is NonNullable<T> => it !== null && it !== undefined

const foldBFSWithLevel = <Ret>(zero: Ret, fn: (b: Ret, level: number, a: TreeNode) => Ret) => {
    return (node: TreeNode): Ret => {
        const doRecursionWithLevel = (
            accumulator: Ret,
            curLevel: number,
            nodeArray: Array<TreeNode>
        ): Ret => {
            // 初始状态
            const nodeArrayReduceZero: [
                result: Ret,
                nextLevelNodeArray: Array<TreeNode>
            ] = [accumulator, []]

            // 处理该层结点 并返回对应的下一层结点
            const [nextAcc, nextNodeArray] = nodeArray.reduce(
                ([ret, nextLevelCollector], node): typeof nodeArrayReduceZero => {
                    return [
                        fn(ret, curLevel, node),
                        [
                            ...nextLevelCollector,
                            ...[node.left, node.right].filter(isNotNil)
                        ]
                    ];
                },
                nodeArrayReduceZero
            )

            return nodeArray.length > 0
                ? doRecursionWithLevel(nextAcc, curLevel + 1, nextNodeArray)
                : accumulator
        }

        return doRecursionWithLevel(zero, 0, [node]) 
    }
}

const deepestLeavesSumWhenNonNil = (root: TreeNode): number => {
    const levelToNodeArrayMap =  foldBFSWithLevel(new Map<number, Array<TreeNode>>(), (map, level, node) => {
        const curLevel = map.get(level) ?? []
        map.set(level, [...curLevel, node])
        return map
    })(root)

    return Array.from(levelToNodeArrayMap.entries())
        // 按照层级降序排列
        .sort((a, b) => b[0] - a[0])[0]?.[1]
        // 第一个元素则为最深层级元素 对其进行求和操作
        .reduce((acc, node) => acc + node.val, 0)
}

function deepestLeavesSum(root: TreeNode | null): number {
    return root ? deepestLeavesSumWhenNonNil(root) : 0 
};
// @lc code=end

