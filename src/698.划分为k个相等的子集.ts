/*
 * @lc app=leetcode.cn id=698 lang=typescript
 *
 * [698] 划分为k个相等的子集
 *
 * https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/description/
 *
 * algorithms
 * Medium (41.44%)
 * Likes:    783
 * Dislikes: 0
 * Total Accepted:    78.9K
 * Total Submissions: 187.7K
 * Testcase Example:  '[4,3,2,3,5,2,1]\n4'
 *
 * 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
 * 输出： True
 * 说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
 * 
 * 示例 2:
 * 
 * 
 * 输入: nums = [1,2,3,4], k = 3
 * 输出: false
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= k <= len(nums) <= 16
 * 0 < nums[i] < 10000
 * 每个元素的频率在 [1,4] 范围内
 * 
 * 
 */
export {}
// @lc code=start
function canPartitionKSubsets(nums: NonEmptyArray<number>, k: number): boolean {

    const sumOfNumbers = sum({ concat: (a: number,b) => a + b | 0 })(nums)
    if (sumOfNumbers % k !== 0) {
        // 不满足整除 显然
        return false
    } else {
        // 每个子集的和
        const perSum = sumOfNumbers / k
        const sortedNumbers = sort({
            compare: (a: number, b) => {
                return a < b ? 'lt' : a === b ? 'eq' : 'gt';
            }
        })(nums)

        const max = last(sortedNumbers)
        if (max > perSum) {
            // 由于 nums[i] > 0  因此该项无法让入任何一个非空子集
            // 所以
            return false
        } else {
            const size = sortedNumbers.length
            // 用 S 记录数组 `sortedNumbers` 中每一项位置的使用情况
            // 当某一位为 1 时，表示可用，为 0 时，表示已被使用过
            const S = (1 << size) - 1
            // 记录 S 为某个数字时，是否可划分为题目所求子集
            // S 一共有 n 位，每个位置有 0 或 1 种可能
            // 所以总共有 2^n 种可能存放的值
            const isOkWhenSInfo = Array.from({ length: S + 1 }, () => true)

            const searchRec = (curS: number, p: number): boolean => {
                if (curS === 0) {
                    // sortedNumbers 所有项均已使用完毕
                    // 是一个达到了题目要求的划分情况，所以返回真值
                    return true
                }
                if (!isOkWhenSInfo[curS]) {
                    // 当前 curS 状态已知为不可能方案情况
                    // 返回 false
                    return false
                }
                isOkWhenSInfo[curS] = false
                // 开始尝试迭代所有数组项，看看是否能到满足题意分组
                for (const [i, item] of sortedNumbers.entries()) {
                    if ((item + p) > perSum) {
                        // 不能放置在 跳过
                        break
                    }
                    if (((curS >> i) & 1) === 1) {
                        // 当前元素 尚未被使用，即可以尝试放入划分
                        const nextS = curS ^ (1 << i)
                        const nextP = (p + item) % perSum 
                        if (searchRec(nextS, nextP)) {
                            // 能成功
                            return true
                        }
                    }
                }
                return false
            }

            return searchRec(S, 0)
        }
    }
};

type NonEmptyArray<T> = [T, ...Array<T>]

const sort = <A>(O: { compare: (a: A, b: A) => 'lt' | 'eq' | 'gt' }) => {
    return (array: NonEmptyArray<A>): NonEmptyArray<A> => {
        return [...array].sort(
            (a, b) => {
                const order = O.compare(a, b);
                return order === 'eq' ? 0 : order === 'lt' ? -1 : 1
            }
        ) as NonEmptyArray<A>
    }
}

const last = <A>(array: NonEmptyArray<A>) => {
    return array[array.length - 1]!
}

const sum = <A>(S: { concat: (a: A, b: A) => A }) => {
    return (array: NonEmptyArray<A>) => {
        // return as.reduce(S.concat)

        let start = array[0]
        for (const [idx, item] of array.entries()) {
            if (idx === 0) {
                continue
            } else {
                start = S.concat(start, item)
            }
        }
        return start
    }
}
// @lc code=end

