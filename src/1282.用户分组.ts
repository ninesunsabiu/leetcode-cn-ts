/*
 * @lc app=leetcode.cn id=1282 lang=typescript
 *
 * [1282] 用户分组
 *
 * https://leetcode.cn/problems/group-the-people-given-the-group-size-they-belong-to/description/
 *
 * algorithms
 * Medium (81.45%)
 * Likes:    109
 * Dislikes: 0
 * Total Accepted:    37.6K
 * Total Submissions: 43.6K
 * Testcase Example:  '[3,3,3,3,3,1,3]'
 *
 * 有 n 个人被分成数量未知的组。每个人都被标记为一个从 0 到 n - 1 的唯一ID 。
 * 
 * 给定一个整数数组 groupSizes ，其中 groupSizes[i] 是第 i 个人所在的组的大小。例如，如果 groupSizes[1] = 3
 * ，则第 1 个人必须位于大小为 3 的组中。
 * 
 * 返回一个组列表，使每个人 i 都在一个大小为 groupSizes[i] 的组中。
 * 
 * 每个人应该 恰好只 出现在 一个组 中，并且每个人必须在一个组中。如果有多个答案，返回其中 任何 一个。可以 保证 给定输入 至少有一个
 * 有效的解。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：groupSizes = [3,3,3,3,3,1,3]
 * 输出：[[5],[0,1,2],[3,4,6]]
 * 解释：
 * 第一组是 [5]，大小为 1，groupSizes[5] = 1。
 * 第二组是 [0,1,2]，大小为 3，groupSizes[0] = groupSizes[1] = groupSizes[2] = 3。
 * 第三组是 [3,4,6]，大小为 3，groupSizes[3] = groupSizes[4] = groupSizes[6] = 3。 
 * 其他可能的解决方案有 [[2,1,6],[5],[0,4,3]] 和 [[5],[0,6,2],[4,3,1]]。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：groupSizes = [2,1,3,3,3,2]
 * 输出：[[1],[0,5],[2,3,4]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * groupSizes.length == n
 * 1 <= n <= 500
 * 1 <= groupSizes[i] <= n
 * 
 * 
 */

// @lc code=start
type NonEmptyArray<T> = [T, ...Array<T>]

const isNonEmpty = <T>(it: Array<T>): it is NonEmptyArray<T> => {
    return it.length > 0
}

/**
 * Splits a `NonEmptyArray` into two pieces, the first piece has max `n` elements.
 * 当分离索引大于数组长度时，取数组最大偏移索引  
 * 当分离索引小于等于零时，将会被作为 1 处理  
 */
const splitAt = (num: number) => {
    const offset = Math.max(1, num)
    return <T>(as: NonEmptyArray<T>): [Array<T>, Array<T>] => {
        const isOutOfBound = offset > as.length
        return isOutOfBound ? [[...as], []] : [as.slice(0, offset), as.slice(offset)]
    }
}

const chop = <A, B>(f: (as: NonEmptyArray<A>) => [B, Array<A>]) =>  {
    return (as: NonEmptyArray<A>): NonEmptyArray<B> => {
        const recursionDo = (ret: NonEmptyArray<B>, as: NonEmptyArray<A>): typeof ret => {
            const [b, nextAs] = f(as)
            const nextRet: NonEmptyArray<B> = [...ret, b]
            return isNonEmpty(nextAs) ? recursionDo(nextRet, nextAs) : nextRet
        }
        const [b, nextAs] = f(as)
        const ret: NonEmptyArray<B> = [b]
        return isNonEmpty(nextAs) ? recursionDo(ret, nextAs) : ret
    }
}

const chunksOf = (num: number) =>  chop(splitAt(num))

type IndexType = string | number

const groupBy = <T, K extends IndexType>(groupKeyGen: (it: T) => K) => {
    return (as: Array<T>): Record<K, NonEmptyArray<T>> => {
        return as.reduce(
            (ret: Record<IndexType, Array<T>>, cur) => {
                const idx = groupKeyGen(cur)
                const exists: Array<T> = ret[idx] ?? []
                return Object.assign({}, ret, { [idx]: [...exists, cur] })
            },
            {}
        ) as any
    }
}

const map = <A, B>(fn: (a: A) => B) => {
    return (as: NonEmptyArray<A>): NonEmptyArray<B> => as.map(fn) as any
}

const entriesForRecord = <A extends IndexType, B>(record: Record<A, B>): Array<[k: A, v: B]> => {
    return Object.entries(record) as any
}

const getFirstInTuple = <A,B>() => (i: [A, B]) => i[0]
const getSecondInTuple = <A,B>() => (i: [A, B]) => i[1]

function groupThePeople(groupSizes: number[]): number[][] {
    const getFirst = getFirstInTuple<number, number>()
    const getSecond = getSecondInTuple<number, number>()

    const entries = Array.from(groupSizes.entries())
    const groupByPeopleGroupSize = groupBy(getSecond)(entries)

    return entriesForRecord(groupByPeopleGroupSize)
        .flatMap(
            ([groupKey, groups]) => {
                const peopleIdxArray = map(getFirst)(groups)
                return chunksOf(groupKey)(peopleIdxArray)
            }
        )
};
// @lc code=end
export {}