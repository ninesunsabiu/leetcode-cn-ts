/*
 * @lc app=leetcode.cn id=1450 lang=typescript
 *
 * [1450] 在既定时间做作业的学生人数
 *
 * https://leetcode.cn/problems/number-of-students-doing-homework-at-a-given-time/description/
 *
 * algorithms
 * Easy (80.43%)
 * Likes:    68
 * Dislikes: 0
 * Total Accepted:    50.7K
 * Total Submissions: 61.5K
 * Testcase Example:  '[1,2,3]\n[3,2,7]\n4'
 *
 * 给你两个整数数组 startTime（开始时间）和 endTime（结束时间），并指定一个整数 queryTime 作为查询时间。
 * 
 * 已知，第 i 名学生在 startTime[i] 时开始写作业并于 endTime[i] 时完成作业。
 * 
 * 请返回在查询时间 queryTime 时正在做作业的学生人数。形式上，返回能够使 queryTime 处于区间 [startTime[i],
 * endTime[i]]（含）的学生人数。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：startTime = [1,2,3], endTime = [3,2,7], queryTime = 4
 * 输出：1
 * 解释：一共有 3 名学生。
 * 第一名学生在时间 1 开始写作业，并于时间 3 完成作业，在时间 4 没有处于做作业的状态。
 * 第二名学生在时间 2 开始写作业，并于时间 2 完成作业，在时间 4 没有处于做作业的状态。
 * 第三名学生在时间 3 开始写作业，预计于时间 7 完成作业，这是是唯一一名在时间 4 时正在做作业的学生。
 * 
 * 
 * 示例 2：
 * 
 * 输入：startTime = [4], endTime = [4], queryTime = 4
 * 输出：1
 * 解释：在查询时间只有一名学生在做作业。
 * 
 * 
 * 示例 3：
 * 
 * 输入：startTime = [4], endTime = [4], queryTime = 5
 * 输出：0
 * 
 * 
 * 示例 4：
 * 
 * 输入：startTime = [1,1,1,1], endTime = [1,3,2,4], queryTime = 7
 * 输出：0
 * 
 * 
 * 示例 5：
 * 
 * 输入：startTime = [9,8,7,6,5,4,3,2,1], endTime = [10,10,10,10,10,10,10,10,10],
 * queryTime = 5
 * 输出：5
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * startTime.length == endTime.length
 * 1 <= startTime.length <= 100
 * 1 <= startTime[i] <= endTime[i] <= 1000
 * 1 <= queryTime <= 1000
 * 
 * 
 */
export {}

// @lc code=start
function busyStudent(startTime: number[], endTime: number[], queryTime: number): number {
    return zip(startTime, endTime).filter( ([start, end]) => betweenNumber(start, end + 1)(queryTime)).length
};

type NonEmptyArray<T> = [T, ...Array<T>];
const isNonEmptyArray = <T>(arr: Array<T>): arr is NonEmptyArray<T> => arr.length > 0

/**
 * 对两个数组进行拉练 按找顺序 一一对应  
 * 数组长度以 两者 短的为准
 * @example
 * ```typescript
 * zip([1,2,3,4], ['a', 'b', 'c', 'd']) // is [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]
 * ```
 */
const zip = <A, B>(a: Array<A>, b: Array<B>): Array<[A, B]> => {
    const doRecursion = (ret: Array<[A, B]>, left: Array<A>, right: Array<B>): Array<[A, B]> => {
        return isNonEmptyArray(left) && isNonEmptyArray(right)
                ? doRecursion([...ret, [left[0], right[0]]], left.slice(1), right.slice(1))
                : ret
    }
    return doRecursion([], a, b)
}

type Eq<A> = {
    readonly equal: (a: A, b: A) => boolean
}

type Ordering = -1 | 0 | 1

type Ord<A> = Eq<A> & {
    readonly compare: (first: A, second: A) => Ordering;
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 */
const between = <A>(O: Ord<A>) => {
    return (low: A, hi: A) => (a: A): boolean => {
        const cmpLowAndA = O.compare(low, a)
        return [0, 1].includes(cmpLowAndA) && O.compare(a, hi) === 1
    }
}

const betweenNumber = between<number>({
    equal: (a, b) => a === b,
    compare: (a, b) => a - b < 0 ? 1 : a === b ? 0 : -1
})

// @lc code=end

