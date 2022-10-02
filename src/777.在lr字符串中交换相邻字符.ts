/*
 * @lc app=leetcode.cn id=777 lang=typescript
 *
 * [777] 在LR字符串中交换相邻字符
 *
 * https://leetcode.cn/problems/swap-adjacent-in-lr-string/description/
 *
 * algorithms
 * Medium (33.09%)
 * Likes:    177
 * Dislikes: 0
 * Total Accepted:    12.8K
 * Total Submissions: 36.4K
 * Testcase Example:  '"RXXLRXRXL"\n"XRLXXRRLX"'
 *
 * 在一个由 'L' , 'R' 和 'X'
 * 三个字符组成的字符串（例如"RXXLRXRXL"）中进行移动操作。一次移动操作指用一个"LX"替换一个"XL"，或者用一个"XR"替换一个"RX"。现给定起始字符串start和结束字符串end，请编写代码，当且仅当存在一系列移动操作使得start可以转换成end时，
 * 返回True。
 * 
 * 
 * 
 * 示例 :
 * 
 * 输入: start = "RXXLRXRXL", end = "XRLXXRRLX"
 * 输出: True
 * 解释:
 * 我们可以通过以下几步将start转换成end:
 * RXXLRXRXL ->
 * XRXLRXRXL ->
 * XRLXRXRXL ->
 * XRLXXRRXL ->
 * XRLXXRRLX
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= len(start) = len(end) <= 10000。
 * start和end中的字符串仅限于'L', 'R'和'X'。
 * 
 * 
 */
export {}
// @lc code=start
function canTransform(start: string, end: string): boolean {
    // 映射为位置关系
    const [startInfo, endInfo] = [getRLIndex(start),getRLIndex(end)]

    /**
     * 挨个取出 "L" | "R" 的位置情况，进行对比
     *
     * 尾递归，but NodeJS 无优化手段，会爆栈
     */
    const checkRec = (start: Array<Info>, end: Array<Info>): boolean => {
        const sizeOfStart = start.length
        const sizeOfEnd = end.length
        if (sizeOfEnd !== sizeOfStart) {
            // 长度情况不相等 说明 L 和 R 的总和不相等，则无法满足题意
            return false 
        } else {
            if (sizeOfEnd === 0) {
                // 匹配结束 说明满足要求
                return true
            } else {
                // size 不为零，说明有元素
                const [/* 当前目标 */ [curChar, curIdx], ...restForStart] = start as NonEmptyArray<Info>
                const [/* 匹配目标 */ [targetChar, targetIdx], ...restForEnd] = end as NonEmptyArray<Info>
                if (targetChar !== curChar) {
                    // 当前字符无法等于匹配目标字符 即出现 R L 或者 L R
                    // 因为 这种字符无法 “穿过” 互换 所以必然不匹配
                    return false
                } else {
                    // 当相等时
                    // 如果是 L 则当前 L 得索引必须大于等于 匹配目标的索引 因为 L 只能向左移动而不能向右
                    // 同理 如果是 R 的话，则必须 小于等于
                    return (curChar === "L" ? curIdx >= targetIdx : curIdx <= targetIdx)
                            // 满足索引位置关系之后 则进行递归判断
                            && checkRec(restForStart, restForEnd)
                }
            }
        }
    }
    // 吃亏调用
    // return checkRec(startInfo, endInfo)

    const startInfoArray = startInfo
    const endInfoArray = endInfo
    // 尾递归 改 循环执行
    while (true) {
        const sizeOfStart = startInfoArray.length
        const sizeOfEnd = endInfoArray.length
        if (sizeOfEnd !== sizeOfStart) {
            // 长度情况不相等 说明 L 和 R 的总和不相等，则无法满足题意
            return false 
        } else {
            if (sizeOfEnd === 0) {
                // 匹配结束 说明满足要求
                return true
            } else {
                // size 不为零，说明有元素
                const [/* 当前目标 */ [curChar, curIdx]] = startInfoArray as NonEmptyArray<Info>
                const [/* 匹配目标 */ [targetChar, targetIdx]] = endInfoArray as NonEmptyArray<Info>
                if (targetChar !== curChar) {
                    // 当前字符无法等于匹配目标字符 即出现 R L 或者 L R
                    // 因为 这种字符无法 “穿过” 互换 所以必然不匹配
                    return false
                } else {
                    // 当相等时
                    // 如果是 L 则当前 L 得索引必须大于等于 匹配目标的索引 因为 L 只能向左移动而不能向右
                    // 同理 如果是 R 的话，则必须 小于等于
                    if (curChar === "L" ? curIdx >= targetIdx : curIdx <= targetIdx) {
                        // 是 shift 不是 pop ！！气死我了
                        startInfoArray.shift()
                        endInfoArray.shift()
                    } else {
                        return false
                    }
                }
            }
        }
    }
};

type Info = [char: 'L' | 'R', idx: number]

/**
 * 得到字符串的一个情况及其对应的信息
 * 
 * 这里为了类型优化，将其断言为 字面量联合类型
 */
const getRLIndex = (str: string): Array<Info> => Array.from(str).flatMap(
    (char, idx): Array<Info> => {
        const reTypeChar = char as unknown as  "X" | "L" | "R"
        return  reTypeChar === 'X' ? [] : [[reTypeChar, idx]]
    }
)
type NonEmptyArray<T> = [T, ...Array<T>]
// @lc code=end

