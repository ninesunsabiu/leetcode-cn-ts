/*
 * @lc app=leetcode.cn id=7 lang=typescript
 *
 * [7] 整数反转
 *
 * https://leetcode.cn/problems/reverse-integer/description/
 *
 * algorithms
 * Medium (35.36%)
 * Likes:    3582
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 3M
 * Testcase Example:  '123'
 *
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 * 
 * 如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。
 * 假设环境不允许存储 64 位整数（有符号或无符号）。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：x = 123
 * 输出：321
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：x = -123
 * 输出：-321
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：x = 120
 * 输出：21
 * 
 * 
 * 示例 4：
 * 
 * 
 * 输入：x = 0
 * 输出：0
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * -2^31 
 * 
 * 
 */

// @lc code=start
type Nil = null;
type Cons = { data: number, next: ConsList, length: number };
type ConsList = Nil | Cons;

const nil = null;

const cons = (data: number) => {
    return (list: ConsList): ConsList => 
        ({ data, next: list, length: (list?.length ?? 0) + 1 });
}

const foldLeftWithLength = <B>(zero: B, f: (b: B, a: number, length: number) => B) => {
    return (list: ConsList) => {
        const doItRec = (accumulator: B, cur: Cons): B => {
            const next = cur.next;
            const nextAcc = f(accumulator, cur.data, cur.length)
            return next ? doItRec(nextAcc, next) : nextAcc;
        }

        return list ? doItRec(zero, list) : zero;
    }
}

/**
 * 获得某个数 除以 divisor 的 余数 和 商
 */
const getRemainderAndQuotientInMetrication = (i: number, divisor: number): [
    remainder: number,
    quotient: number
] => {
    return [i % divisor, Math.trunc(i / divisor)];
}

/**
 * 将一个整数按十进制的位放入 List 中  
 * 从高到低位 存入 list
 */
const splitIntIntoConsListRec = (list: ConsList, it: number, length: number): ConsList => {
    return it === 0 ? list : (() => {
        const [r, q] = getRemainderAndQuotientInMetrication(it, Math.pow(10, length - 1));
        return splitIntIntoConsListRec(
            cons(q)(list),
            r,
            length - 1
        )
    })()
}

const fallbackSignedInt = (i: number) => {
    return i > (2 ** 31 - 1) || i < (-1 * 2 ** 31) ? 0 : i;
}

function reverse(x: number): number {
    const numberLength = String(x).replace(/^-/, '').length;

    const list = splitIntIntoConsListRec(nil, x, numberLength);

    return fallbackSignedInt(
        foldLeftWithLength(
            0,
            (accumulator, cur, length) => accumulator + cur * Math.pow(10, length - 1)
        )(list)
    )
};
// @lc code=end

