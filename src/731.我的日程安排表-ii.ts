/*
 * @lc app=leetcode.cn id=731 lang=typescript
 *
 * [731] 我的日程安排表 II
 */

// @lc code=start
type EventDateRange = [start: number, end: number];

class MyCalendarTwo {
    constructor(
        /**
         * 所有已经存储的日程
         */
        private allEventArray: Array<EventDateRange> = [],
        /**
         * 存放所有二重冲突的日程
         */
        private doubleConflictEventArray: Array<EventDateRange> = []
    ) {}

    /**
     * 判断两个区间的交集情况
     * 并返回交集的区间
     * @example
     * ```typescript
     * getRangeIntersection([1, 2], [2, 3]) === null
     * getRangeIntersection([5, 12], [1, 5]) === null
     * 
     * getRangeIntersection([5, 16], [20, 21]) === null
     * getRangeIntersection([5, 16], [2, 4]) === null
     *
     * getRangeIntersection([5, 100], [2, 10]) === [2, 5] 
     * getRangeIntersection([5, 100], [50, 200]) === [50, 100] 
     * getRangeIntersection([5, 100], [50, 51]) === [50, 51] 
     * ```
     */
    private static getRangeIntersection(a: EventDateRange, b: EventDateRange): EventDateRange | null {
        const left = Math.max(a[0], b[0])
        const right = Math.min(a[1], b[1])
        return left < right ? [left, right] : null 
    }

    /**
     * 判断一个日程范围，是否和已有的二重冲突日程有交集
     */
    private isConflictWithDoubleConflictEventArray(r: EventDateRange): boolean {
        for (const it of this.doubleConflictEventArray) {
            if (MyCalendarTwo.getRangeIntersection(r, it)) {
                return true
            }
        }
        return false
    }

    /**
     * 计算出待添加的日程与当前所有日程有交集的二重冲突日程
     */
    private getDoubleConflictEventArray(event: EventDateRange): Array<EventDateRange> {
        const ret: Array<EventDateRange> = []
        for(const it of this.allEventArray) {
            const conflictEventRange = MyCalendarTwo.getRangeIntersection(it, event)
            conflictEventRange && ret.push(conflictEventRange)
        }
        return ret
    }

    book(start: number, end: number): boolean {
        const forbidThisEvent = this.isConflictWithDoubleConflictEventArray([start, end])

        if (!forbidThisEvent) {
            const newDoubleConflictEventArray = this.getDoubleConflictEventArray([start, end])
            if (newDoubleConflictEventArray.length > 0) {
                this.doubleConflictEventArray.push(...newDoubleConflictEventArray)
            }
            this.allEventArray.push([start, end])
        }

        return !forbidThisEvent
    }
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */
// @lc code=end

