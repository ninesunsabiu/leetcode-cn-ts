/*
 * @lc app=leetcode.cn id=662 lang=typescript
 *
 * [662] 二叉树最大宽度
 *
 * https://leetcode.cn/problems/maximum-width-of-binary-tree/description/
 *
 * algorithms
 * Medium (41.28%)
 * Likes:    437
 * Dislikes: 0
 * Total Accepted:    58.2K
 * Total Submissions: 139K
 * Testcase Example:  '[1,3,2,5,3,null,9]'
 *
 * 给你一棵二叉树的根节点 root ，返回树的 最大宽度 。
 * 
 * 树的 最大宽度 是所有层中最大的 宽度 。
 * 
 * 
 * 
 * 每一层的 宽度 被定义为该层最左和最右的非空节点（即，两个端点）之间的长度。将这个二叉树视作与满二叉树结构相同，两端点间会出现一些延伸到这一层的
 * null 节点，这些 null 节点也计入长度。
 * 
 * 题目数据保证答案将会在  32 位 带符号整数范围内。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [1,3,2,5,3,null,9]
 * 输出：4
 * 解释：最大宽度出现在树的第 3 层，宽度为 4 (5,3,null,9) 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [1,3,2,5,null,null,9,6,null,7]
 * 输出：7
 * 解释：最大宽度出现在树的第 4 层，宽度为 7 (6,null,null,null,null,null,7) 。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：root = [1,3,2,5]
 * 输出：2
 * 解释：最大宽度出现在树的第 2 层，宽度为 2 (3,2) 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点的数目范围是 [1, 3000]
 * -100 <= Node.val <= 100
 * 
 * 
 * 
 * 
 */
export {}

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
type MyTreeNode = {
    left: MyTreeNode | null
    right: MyTreeNode | null
    val: number
}

function widthOfBinaryTree(root: MyTreeNode): number {
    return Number(foldTreeNodeWithLevelByBFS(
        0n,
        (maxWidthAccumulator, _level, nodesInSomeLevel) => {
            const codeArray = Array.from(nodesInSomeLevel.keys())
            // 此处由于 遍历顺序的特性，可以断定 最大值在最右侧 最小值在最左侧
            // 即 codeArray 是一个递增数组
            // 否则需要遍历求最值
            const max =  codeArray[codeArray.length - 1] ?? 0n
            const min =  codeArray[0] ?? 0n
            const width = max - min + 1n
            return maxWidthAccumulator > width ? maxWidthAccumulator: width
        }
    )(root))
};

// 使用 Map 模拟空洞数组

/**
 * 对 MyTreeNode 进行 广度优先搜索  
 * 并且 收集每一层的节点 进行 fold 变换  
 * 每一层的节点 以 满二叉树编号 作为 key，结点自身作为 val 放在一个 ReadonlyMap 中  
 */
const foldTreeNodeWithLevelByBFS = <A>(zero: A, fn: (a: A, idx: number, b: ReadonlyMap<bigint, MyTreeNode>) => A) => {
    return (treeNode: MyTreeNode): A => {

        const dsfRecursion = (ret: A, nodes: ReadonlyMap<bigint, MyTreeNode>, curLevel: number): A => {

            const retForThisLevel = fn(ret, curLevel, nodes)

            const next = Array.from(nodes.entries()).reduce<Map<bigint, MyTreeNode>>(
                (accumulator, [idx, cur]) => {
                    const { left, right } = cur
                    if (left) {
                        const idxForLeft =  idx << 1n | 0n
                        accumulator.set(idxForLeft, left)
                    }
                    if (right) {
                        const idxForRight =  idx << 1n | 1n
                        accumulator.set(idxForRight, right)
                    }
                    return accumulator
                },
                new Map()
            )

            return next.size === 0
                // 终结递归 因为下一层没有结点了
                ? retForThisLevel 
                // 继续递归
                : dsfRecursion(retForThisLevel, next, curLevel + 1 | 0)
        }

        return dsfRecursion(zero, new Map([[1n, treeNode]]), 0)
    }
}

// @lc code=end

