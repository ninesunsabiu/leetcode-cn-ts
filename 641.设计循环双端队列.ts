/*
 * @lc app=leetcode.cn id=641 lang=typescript
 *
 * [641] 设计循环双端队列
 *
 * https://leetcode.cn/problems/design-circular-deque/description/
 *
 * algorithms
 * Medium (53.07%)
 * Likes:    173
 * Dislikes: 0
 * Total Accepted:    45.2K
 * Total Submissions: 79.9K
 * Testcase Example:  '["MyCircularDeque","insertLast","insertLast","insertFront","insertFront","getRear","isFull","deleteLast","insertFront","getFront"]\n' +
  '[[3],[1],[2],[3],[4],[],[],[],[4],[]]'
 *
 * 设计实现双端队列。
 * 
 * 实现 MyCircularDeque 类:
 * 
 * 
 * MyCircularDeque(int k) ：构造函数,双端队列最大为 k 。
 * boolean insertFront()：将一个元素添加到双端队列头部。 如果操作成功返回 true ，否则返回 false 。
 * boolean insertLast() ：将一个元素添加到双端队列尾部。如果操作成功返回 true ，否则返回 false 。
 * boolean deleteFront() ：从双端队列头部删除一个元素。 如果操作成功返回 true ，否则返回 false 。
 * boolean deleteLast() ：从双端队列尾部删除一个元素。如果操作成功返回 true ，否则返回 false 。
 * int getFront() )：从双端队列头部获得一个元素。如果双端队列为空，返回 -1 。
 * int getRear() ：获得双端队列的最后一个元素。 如果双端队列为空，返回 -1 。
 * boolean isEmpty() ：若双端队列为空，则返回 true ，否则返回 false  。
 * boolean isFull() ：若双端队列满了，则返回 true ，否则返回 false 。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入
 * ["MyCircularDeque", "insertLast", "insertLast", "insertFront",
 * "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
 * [[3], [1], [2], [3], [4], [], [], [], [4], []]
 * 输出
 * [null, true, true, true, false, 2, true, true, true, 4]
 * 
 * 解释
 * MyCircularDeque circularDeque = new MycircularDeque(3); // 设置容量大小为3
 * circularDeque.insertLast(1);                    // 返回 true
 * circularDeque.insertLast(2);                    // 返回 true
 * circularDeque.insertFront(3);                    // 返回 true
 * circularDeque.insertFront(4);                    // 已经满了，返回 false
 * circularDeque.getRear();                  // 返回 2
 * circularDeque.isFull();                        // 返回 true
 * circularDeque.deleteLast();                    // 返回 true
 * circularDeque.insertFront(4);                    // 返回 true
 * circularDeque.getFront();                // 返回 4
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= k <= 1000
 * 0 <= value <= 1000
 * insertFront, insertLast, deleteFront, deleteLast, getFront, getRear,
 * isEmpty, isFull  调用次数不大于 2000 次
 * 
 * 
 */

export {}
// @lc code=start
const mathMode = (m: number, p: number) => {
    return ((m % p) + p | 0) % p
}

class MyCircularDeque {

    private hd: number = 0
    private last: number = 0
    private dequeue: Array<number> = []
    private fullLength: number

    constructor(private capacity : number) {
        this.fullLength = this.capacity + 1 | 0
    }

    private nextPosition = (i: number) => {
        return mathMode(i + 1, this.fullLength)
    }

    private prevPosition = (i: number) => {
        return mathMode(i - 1, this.fullLength)
    }

    insertFront(value: number): boolean {
        if (this.isFull()) {
            return false
        } else {
            this.hd = this.prevPosition(this.hd)
            this.dequeue[this.hd] = value
            return true
        }
    }

    insertLast(value: number): boolean {
        if (this.isFull()) {
            return false
        } else {
            this.dequeue[this.last] = value
            this.last = this.nextPosition(this.last)
            return true
        }
    }

    deleteFront(): boolean {
        if (this.isEmpty()) {
            return false
        } else {
            this.hd = this.nextPosition(this.hd)
            return true
        }
    }

    deleteLast(): boolean {
        if (this.isEmpty()) {
            return false
        } else {
            this.last = this.prevPosition(this.last)
            return true
        }
    }

    getFront(): number {
        if (this.isEmpty()) {
            return -1
        } else {
            return this.dequeue[this.hd] ?? -1
        }
    }

    getRear(): number {
        if (this.isEmpty()) {
            return -1
        } else {
            return this.dequeue[this.prevPosition(this.last)] ?? -1
        }
    }

    isEmpty(): boolean {
        return this.hd === this.last
    }

    isFull(): boolean {
        return this.nextPosition(this.last) === this.hd
    }
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
// @lc code=end

