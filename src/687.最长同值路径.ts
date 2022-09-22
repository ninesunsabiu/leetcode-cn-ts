/*
 * @lc app=leetcode.cn id=687 lang=typescript
 *
 * [687] 最长同值路径
 *
 * https://leetcode.cn/problems/longest-univalue-path/description/
 *
 * algorithms
 * Medium (45.37%)
 * Likes:    617
 * Dislikes: 0
 * Total Accepted:    52.3K
 * Total Submissions: 114.2K
 * Testcase Example:  '[5,4,5,1,1,null,5]'
 *
 * 给定一个二叉树的 root ，返回 最长的路径的长度 ，这个路径中的 每个节点具有相同值 。 这条路径可以经过也可以不经过根节点。
 * 
 * 两个节点之间的路径长度 由它们之间的边数表示。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 
 * 
 * 输入：root = [5,4,5,1,1,5]
 * 输出：2
 * 
 * 
 * 示例 2:
 * 
 * 
 * 
 * 
 * 输入：root = [1,4,5,4,4,5]
 * 输出：2
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 树的节点数的范围是 [0, 10^4] 
 * -1000 <= Node.val <= 1000
 * 树的深度将不超过 1000 
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

function longestUnivaluePath(root: TreeNode | null): number {
    return root ? dsfRec(root, 0)[1] : 0
};

const dsfRec = (node: TreeNode, max: number): [curRootLongest: number, max: number] => {
    const { left, right, val } = node;

    // 递归左子树，获得以左子树为出发点的最长路径 以及整个过程中的最大值
    const [leftRet, maxFromLeft] = left ? dsfRec(left, max) : [0, max];
    // 如果当前左子树和当前节点的值相同，那么以本节点为出发点在左子树方向上的最大长度 + 1
    // 否则 发生了“断开”的现象，则以节点出发的左子树方向最大长度为 0
    const longestLeft = val === left?.val ? (leftRet + 1) | 0 : 0;

    // 同理，更新最大值并递归右子树，以获得右子树为出发点的最长路径，已经整个过程的最大值
    const [rightRet, maxFromRight] = right ? dsfRec(right, maxFromLeft) : [0, maxFromLeft];
    // 同理，以本节点出发的，在右子树方向的最长路径
    const longestRight = val === right?.val ? (rightRet + 1) | 0 : 0;

    return [
        // 以当前节点出发的最长路径，为左右子树中的最长路径取大值
        Math.max(longestLeft, longestRight),
        // 记录过程中的最大值
        // 要么是从左右子树中得到的最大值
        // 要么是本轮将左右合并到一起的值 （左右连起来，本层节点便可作为中间节点存在，而非起点）
        // 两者取最值
        Math.max(longestLeft + longestRight, maxFromRight)
    ];
};

// @lc code=end

