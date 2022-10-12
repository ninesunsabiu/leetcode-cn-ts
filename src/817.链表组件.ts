/*
 * @lc app=leetcode.cn id=817 lang=typescript
 *
 * [817] 链表组件
 *
 * https://leetcode.cn/problems/linked-list-components/description/
 *
 * algorithms
 * Medium (59.35%)
 * Likes:    166
 * Dislikes: 0
 * Total Accepted:    39.4K
 * Total Submissions: 64.6K
 * Testcase Example:  '[0,1,2,3]\n[0,1,3]'
 *
 * 给定链表头结点 head，该链表上的每个结点都有一个 唯一的整型值 。同时给定列表 nums，该列表是上述链表中整型值的一个子集。
 * 
 * 返回列表 nums 中组件的个数，这里对组件的定义为：链表中一段最长连续结点的值（该值必须在列表 nums 中）构成的集合。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入: head = [0,1,2,3], nums = [0,1,3]
 * 输出: 2
 * 解释: 链表中,0 和 1 是相连接的，且 nums 中不包含 2，所以 [0, 1] 是 nums 的一个组件，同理 [3] 也是一个组件，故返回
 * 2。
 * 
 * 示例 2：
 * 
 * 
 * 
 * 
 * 输入: head = [0,1,2,3,4], nums = [0,3,1,4]
 * 输出: 2
 * 解释: 链表中，0 和 1 是相连接的，3 和 4 是相连接的，所以 [0, 1] 和 [3, 4] 是两个组件，故返回 2。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中节点数为n
 * 1 <= n <= 10^4
 * 0 <= Node.val < n
 * Node.val 中所有值 不同
 * 1 <= nums.length <= n
 * 0 <= nums[i] < n
 * nums 中所有值 不同
 * 
 * 
 */

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

 type MyListNode = {val: number;next: MyListNode | null};

 function numComponents(head: MyListNode, nums: Array<number>): number {
     const numsRecord: Set<number> = new Set(nums)
     const scanListRec = (
         ans: number, numsRecord: Set<number>, componentCollection: boolean, nodeList: MyListNode
     ): typeof ans => {
         if (numsRecord.size === 0) {
             // 没有数据需要统计 则返回结果
             return ans;
         } else {
             const { val, next } = nodeList
             // 模式匹配所有情况
             if (numsRecord.has(val) && componentCollection === true) {
                 // 当前正处于一个连续的收集状态
                 return !next ? ans : scanListRec(
                     ans,
                     // 无聊用来一下 JS 的 “糟粕” 逗号表达式
                     (numsRecord.delete(val), numsRecord),
                     true,
                     next
                 ) 
             } else if (numsRecord.has(val) && componentCollection === false) {
                 // 当前没有处在一个连续收集的状态
                 const nextAns = ans + 1
                 return !next ? nextAns : scanListRec(
                     nextAns,
                     (numsRecord.delete(val), numsRecord),
                     true,
                     next
                 )
             } else {
                 // !numsRecord.has(val) && componentCollection === true
                 // or !numsRecord.has(val) && componentCollection === false
                 return !next ? ans : scanListRec(ans, numsRecord, false, next)
             }
         }
     }

     return scanListRec(0, numsRecord, false, head)
 };
// @lc code=end

