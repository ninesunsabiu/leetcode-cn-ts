/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第 N 个结点
 *
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (44.54%)
 * Likes:    2213
 * Dislikes: 0
 * Total Accepted:    923.3K
 * Total Submissions: 2.1M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：head = [1], n = 1
 * 输出：[]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中结点的数目为 sz
 * 1 <= sz <= 30
 * 0 <= Node.val <= 100
 * 1 <= n <= sz
 * 
 * 
 * 
 * 
 * 进阶：你能尝试使用一趟扫描实现吗？
 * 
 */
export {}
type ListNode = {
    val: number;
    next: ListNode | null
}
// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode, n: number): ListNode | null {
    // 删除倒数第 n 个节点
    // 如果是正向一次遍历 无法知道需要删除的是第几个
    const doRecursion = (pointArray: Array<ListNode>, node: ListNode): Array<ListNode> => {
        const { next } = node 
        const nextRet = [...pointArray, node]
        return next ? doRecursion(nextRet, next) : nextRet
    }

    const pointArray = doRecursion([], head)
    const nodePrevDeleteNode = pointArray[pointArray.length - n - 1]

    if (!nodePrevDeleteNode) {
        // 如果娶不到待删除的上一个节点
        // 那么删除的就是第一个节点 直接返回
        return pointArray[1] ?? null
    } else {
        nodePrevDeleteNode.next = nodePrevDeleteNode.next?.next ?? null
        return head
    }

};
// @lc code=end

