/*
 * @lc app=leetcode.cn id=919 lang=typescript
 *
 * [919] 完全二叉树插入器
 *
 * https://leetcode.cn/problems/complete-binary-tree-inserter/description/
 *
 * algorithms
 * Medium (66.96%)
 * Likes:    123
 * Dislikes: 0
 * Total Accepted:    20.4K
 * Total Submissions: 30.4K
 * Testcase Example:  '["CBTInserter","insert","get_root"]\n[[[1]],[2],[]]'
 *
 * 完全二叉树 是每一层（除最后一层外）都是完全填充（即，节点数达到最大）的，并且所有的节点都尽可能地集中在左侧。
 * 
 * 设计一种算法，将一个新节点插入到一个完整的二叉树中，并在插入后保持其完整。
 * 
 * 实现 CBTInserter 类:
 * 
 * 
 * CBTInserter(TreeNode root) 使用头节点为 root 的给定树初始化该数据结构；
 * CBTInserter.insert(int v)  向树中插入一个值为 Node.val == val的新节点
 * TreeNode。使树保持完全二叉树的状态，并返回插入节点 TreeNode 的父节点的值；
 * CBTInserter.get_root() 将返回树的头节点。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入
 * ["CBTInserter", "insert", "insert", "get_root"]
 * [[[1, 2]], [3], [4], []]
 * 输出
 * [null, 1, 2, [1, 2, 3, 4]]
 * 
 * 解释
 * CBTInserter cBTInserter = new CBTInserter([1, 2]);
 * cBTInserter.insert(3);  // 返回 1
 * cBTInserter.insert(4);  // 返回 2
 * cBTInserter.get_root(); // 返回 [1, 2, 3, 4]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数量范围为 [1, 1000] 
 * 0 <= Node.val <= 5000
 * root 是完全二叉树
 * 0 <= val <= 5000 
 * 每个测试用例最多调用 insert 和 get_root 操作 10^4 次
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

type Nullable<T> = TreeNode | null

declare interface TreeNode {
    val: number;
    left: Nullable<TreeNode>;
    right: Nullable<TreeNode>;
}

/**
 * 判断一个结点是否是满结点
 */
const isCompletableNode = (node: TreeNode) => {
    return node.left && node.right
}

class CBTInserter {
    constructor(
        /**
         * 头结点
         */
        public root: TreeNode | null,
        /**
         * 内部状态，记录当前可插入子结点的“未完成”结点
         */
        private noCompletableNode: Array<TreeNode> = []
    ) {
        // 按照层级一层层的遍历 root 收集，从倒数第二层的叶子结点 和 最后一层的叶子结点
        // 从左往右

        type NoneEmptyArray<T> = [T, ...Array<T>] 

        const collectLeavesRec = (accumulator: Array<TreeNode>, task: NoneEmptyArray<TreeNode>) => {
            const [head, ...tail] = task
            const { left, right } = head
            // 将左右子结点加入到收集起来，加入待访问列表
            const children = (left ? [left] : []).concat(right ? [right] : [])
            // 如果当前 head 是没有达到“完全” 即 缺少子结点
            const nextAccumulator = children.length !== 2 ? [...accumulator, head] : accumulator 

            // 下一轮的待访问列表
            const [nextHead, ...nextTail] = [...tail, ...children]
            if (nextHead) {
                // 出于类型原因的判断
                return collectLeavesRec(nextAccumulator, [nextHead, ...nextTail])
            } else {
                return nextAccumulator 
            }
        }

        // 初始化未完全结点
        this.noCompletableNode = root ? collectLeavesRec([], [root]) : []
    }

    insert(val: number): number {
        // 从未完成结点中，查找第一个 即为带插入子结点的结点
        const [head] = this.noCompletableNode
        if (head) {
            const thisNode: TreeNode = { left: null, right: null, val }

            // 使用可变操作，对其进行子结点的插入
            if (!head.left) {
                head.left = thisNode
            } else if (!head.right){
                head.right = thisNode
            }

            // 新鲜的结点，必然当前最后一个待插入的结点
            this.noCompletableNode = [...this.noCompletableNode, thisNode]
            // 如果 当前 head 已经满了，则从未完成中删除
            this.noCompletableNode = isCompletableNode(head) ? this.noCompletableNode.slice(1) : this.noCompletableNode

            // 按照题意，返回父结点的值
            return head.val
        } else {
            // or throw an error
            return 0
        }
    }

    get_root(): TreeNode | null {
        return this.root
    }
}

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 */
// @lc code=end

