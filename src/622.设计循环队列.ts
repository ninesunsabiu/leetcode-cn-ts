/*
 * @lc app=leetcode.cn id=622 lang=typescript
 *
 * [622] 设计循环队列
 *
 * https://leetcode.cn/problems/design-circular-queue/description/
 *
 * algorithms
 * Medium (44.49%)
 * Likes:    365
 * Dislikes: 0
 * Total Accepted:    103.9K
 * Total Submissions: 221.8K
 * Testcase Example:  '["MyCircularQueue","enQueue","enQueue","enQueue","enQueue","Rear","isFull","deQueue","enQueue","Rear"]\n' +
  '[[3],[1],[2],[3],[4],[],[],[],[4],[]]'
 *
 * 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于
 * FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。
 * 
 * 
 * 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。
 * 
 * 你的实现应该支持如下操作：
 * 
 * 
 * MyCircularQueue(k): 构造器，设置队列长度为 k 。
 * Front: 从队首获取元素。如果队列为空，返回 -1 。
 * Rear: 获取队尾元素。如果队列为空，返回 -1 。
 * enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
 * deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
 * isEmpty(): 检查循环队列是否为空。
 * isFull(): 检查循环队列是否已满。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
 * circularQueue.enQueue(1);  // 返回 true
 * circularQueue.enQueue(2);  // 返回 true
 * circularQueue.enQueue(3);  // 返回 true
 * circularQueue.enQueue(4);  // 返回 false，队列已满
 * circularQueue.Rear();  // 返回 3
 * circularQueue.isFull();  // 返回 true
 * circularQueue.deQueue();  // 返回 true
 * circularQueue.enQueue(4);  // 返回 true
 * circularQueue.Rear();  // 返回 4
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 所有的值都在 0 至 1000 的范围内；
 * 操作数将在 1 至 1000 的范围内；
 * 请不要使用内置的队列库。
 * 
 * 
 */

// @lc code=start
class MyCircularQueue {
    private start = 0
    private end = 0
    private queue: Array<number | null> = []
    /**
     * 0 表示 empty  
     * 1 表示 full
     * 2 表示 others
     */
    private emptyOrFull: 0 | 1 | 2 = 0

    constructor(
        private capacity: number
    ) {}

    enQueue(value: number): boolean {
        if (this.isFull()) {
            return false
        }
        this.queue[this.end] = value
        this.moveEndPointNext()
        return true
    }

    deQueue(): boolean {
        if (this.isEmpty()) {
            return false
        }
        this.queue[this.start] = null
        this.moveStartPointNext()
        return true
    }

    Front(): number {
        return this.queue[this.start] ?? -1
    }

    Rear(): number {
        const prevCursor = MyCircularQueue.mathMod(this.end - 1, this.capacity)
        return this.queue[prevCursor] ?? -1
    }

    isEmpty(): boolean {
        return this.emptyOrFull === 0
    }

    isFull(): boolean {
        return this.emptyOrFull === 1
    }

    private moveEndPointNext() {
        const next = this.pointMoveNext(this.end)
        if (next === this.start) {
            // 下一个位置和 头指针 重合
            // 则表明此时队列已满
            this.emptyOrFull = 1
        } else {
            this.emptyOrFull = 2
        }
        this.end = next
    }

    private moveStartPointNext() {
        const next = this.pointMoveNext(this.start)
        if (next === this.end) {
            // 下一个位置和 尾指针 重合
            // 则表明此时队列为空
            this.emptyOrFull = 0
        } else {
            this.emptyOrFull = 2
        }
        this.start = next
    }

    private static mathMod = (m: number, p: number) => ((m % p) + p) % p

    /**
     * 循环指针 + 1 行为
     */
    private pointMoveNext(cursor: number): number {
        const capacity = this.capacity
        return capacity > 0 ? (cursor + 1 | 0) % this.capacity : 0
    }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
// @lc code=end

