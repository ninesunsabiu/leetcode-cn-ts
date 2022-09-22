/*
 * @lc app=leetcode.cn id=234 lang=typescript
 *
 * [234] 回文链表
 *
 * https://leetcode.cn/problems/palindrome-linked-list/description/
 *
 * algorithms
 * Easy (52.35%)
 * Likes:    1514
 * Dislikes: 0
 * Total Accepted:    505.8K
 * Total Submissions: 963.5K
 * Testcase Example:  '[1,2,2,1]'
 *
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：head = [1,2,2,1]
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：head = [1,2]
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中节点数目在范围[1, 10^5] 内
 * 0 <= Node.val <= 9
 * 
 * 
 * 
 * 
 * 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 * 
 */
export {}
type ListNode = { val: number, next: ListNode | null }
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

function isPalindrome(head: ListNode): boolean {
    const toStackRec = (stack: Array<number>, node: ListNode): Array<number> => {
        const { next, val } = node
        stack.push(val)
        return next ? toStackRec(stack, next) : stack
    }

    const stack: Array<number> = toStackRec([], head)

    // 弹出长度的一半，开始判断相等性
    const halfSize = stack.length >> 1

    // 判断弹出的这一半是否和头部形成对称的回文
    const check = (stack: Array<number>, list: ListNode, count: number): boolean => {
        if (count > 0) {
            const item = stack.pop()!
            const { val, next } = list
            return item === val && next != null ? check(stack, next, count - 1) : false
        } else {
            return true
        }
    }

    return check(stack, head, halfSize)


};

// @lc code=end

