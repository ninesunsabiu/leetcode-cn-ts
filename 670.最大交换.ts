/*
 * @lc app=leetcode.cn id=670 lang=typescript
 *
 * [670] 最大交换
 *
 * https://leetcode.cn/problems/maximum-swap/description/
 *
 * algorithms
 * Medium (46.32%)
 * Likes:    351
 * Dislikes: 0
 * Total Accepted:    55.5K
 * Total Submissions: 116.6K
 * Testcase Example:  '2736'
 *
 * 给定一个非负整数，你至多可以交换一次数字中的任意两位。返回你能得到的最大值。
 * 
 * 示例 1 :
 * 
 * 
 * 输入: 2736
 * 输出: 7236
 * 解释: 交换数字2和数字7。
 * 
 * 
 * 示例 2 :
 * 
 * 
 * 输入: 9973
 * 输出: 9973
 * 解释: 不需要交换。
 * 
 * 
 * 注意:
 * 
 * 
 * 给定数字的范围是 [0, 10^8]
 * 
 * 
 */

// @lc code=start
function maximumSwap(num: number): number {
    // 分割成数组 遍于操作
    const splitNumWithBitToArray = numToBitArray(num)

    const swapMaximumRec = (retArray: Array<number>, num: Array<number>): Array<number> => {
        if (isNotEmpty(num)) {
            const [head, ...rest] = num
            if (head === 9) {
                // 提前优化，如果当前最高位是 9 则以最大，无需交换
                // 直接进入下一个阶段
                return swapMaximumRec([...retArray, head], rest)
            } else {
                // 否则 在余下数组中查找最大值  如果最大值大于当前值，则直接进行交换 并返回结果
                const [max, idxForMax] = findLastMax(0, rest)
                if (max > head) {
                    // 剩余数组中具有比当前最高位更大的数，那么则按照题意进行一次交换 结束递归
                    return [...retArray, max, ...rest.slice(0, idxForMax), head, ...rest.slice(idxForMax + 1 | 0)]
                } else {
                    // 如果不存在大于当前值的最大值，则需要进行下一轮递归
                    return swapMaximumRec([...retArray, head], rest);
                }
            }
        } else {
            // 递归结束 返回结果集
            return retArray
        }
    }

    return bitArrayToNum(swapMaximumRec([], splitNumWithBitToArray))
};

/**
 * 将一个 10 进制数，按照每位分割放进一个数组  
 */
const numToBitArray = (num: number): Array<number> => {
    const doRecursion = (ret: Array<number>, restNum: number): Array<number> => {
        if (restNum < 10) {
            return [restNum, ...ret]
        } else {
            // 将 rest 除以 10 得到 下一轮递归
            // 将 rest mod 10 得到的数 放入结果数组
            const rest = restNum / 10 >> 0
            const modulo = restNum % 10
            return doRecursion([modulo, ...ret], rest);
        }
    }

    return doRecursion([], num)
}

/**
 * 将一个每项处于 0-9 的数组，按照十进制左高位右低位的规则 合成一个数字
 */
const bitArrayToNum = (array: Array<number>) => {
    const doRecursion = (ret: number, e: number, array: Array<number>): number => {
        if (isNotEmpty(array)) {
            const [head, ...rest] = array
            return doRecursion(ret + head * (10 ** e) | 0, e - 1 | 0, rest)
        } else {
            return ret
        }
    }
    return doRecursion(0, array.length - 1, array)
}

const isNotEmpty = <T>(it: Array<T>): it is [T, ...T[]] => it.length > 0

/**
 * 在一个数组中偏移量之后查找最后一个最大的数的所在索引位置
 */
const findLastMax = (offset: number, array: Array<number>): [max: number, idx: number] => {
    const doRecursion = (
        ret: [max: number, idx: number],
        curIdx: number,
        as: Array<number>
    ): [max: number, idx: number] => {
        if (isNotEmpty(as)) {
            const [curMax] = ret;
            const [head, ...rest] = as;
            // 比较当前元素和累积值中的 大小关系
            // 如果更大 则更新，否则，继续递归查找
            return doRecursion(curMax <= head ? [head, curIdx] : ret, (curIdx + 1) | 0, rest);
        } else {
            // 递归结束 返回结果
            return ret;
        }
    };
    // 以 [-1, -1] 来作为 e
    return doRecursion([-1, -1], offset, array.slice(offset));
}
// @lc code=end

