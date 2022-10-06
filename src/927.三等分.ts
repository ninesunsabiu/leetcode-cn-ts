/*
 * @lc app=leetcode.cn id=927 lang=typescript
 *
 * [927] 三等分
 *
 * https://leetcode.cn/problems/three-equal-parts/description/
 *
 * algorithms
 * Hard (35.35%)
 * Likes:    102
 * Dislikes: 0
 * Total Accepted:    6.8K
 * Total Submissions: 17.5K
 * Testcase Example:  '[1,0,1,0,1]'
 *
 * 给定一个由 0 和 1 组成的数组 arr ，将数组分成  3 个非空的部分 ，使得所有这些部分表示相同的二进制值。
 * 
 * 如果可以做到，请返回任何 [i, j]，其中 i+1 < j，这样一来：
 * 
 * 
 * arr[0], arr[1], ..., arr[i] 为第一部分；
 * arr[i + 1], arr[i + 2], ..., arr[j - 1] 为第二部分；
 * arr[j], arr[j + 1], ..., arr[arr.length - 1] 为第三部分。
 * 这三个部分所表示的二进制值相等。
 * 
 * 
 * 如果无法做到，就返回 [-1, -1]。
 * 
 * 注意，在考虑每个部分所表示的二进制时，应当将其看作一个整体。例如，[1,1,0] 表示十进制中的 6，而不会是 3。此外，前导零也是被允许的，所以
 * [0,1,1] 和 [1,1] 表示相同的值。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：arr = [1,0,1,0,1]
 * 输出：[0,3]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：arr = [1,1,0,1,1]
 * 输出：[-1,-1]
 * 
 * 示例 3:
 * 
 * 
 * 输入：arr = [1,1,0,0,1]
 * 输出：[0,2]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 
 * 3 <= arr.length <= 3 * 10^4
 * arr[i] 是 0 或 1
 * 
 * 
 */
export {}
// @lc code=start
type Ans = [number, number]
const noFoundResult: Ans = [-1, -1] 
type Bit = 1 | 0

type DoneCollection = { _tag: "done"; binaryStr: string }

type Part = 
            | { _tag: "fillHighBit"; binaryStr: string; highBitLength: number }
            | { _tag: "fillLastLowBit"; binaryStr: string; lowBitLength: number }
            | DoneCollection

const emptyPart: Part = { _tag: "fillHighBit", binaryStr: '', highBitLength: 0 }

type PartRet = 
            | { _tag: "one", val: Part }
            | { _tag: "two", val: [DoneCollection, Part] } 

const appendCharToPart = (highBitCount: number, lowBitCount: number) => {
    return (bit: Bit) => {
        return (part: Part): Part => {
            const { _tag, binaryStr } = part
            // 模式匹配结果
            if (bit === 1 && _tag === "fillHighBit") {
                const { highBitLength } = part
                if (highBitLength < highBitCount) {
                    const newPart: Part = {
                        _tag: 'fillHighBit',
                        binaryStr: binaryStr + '1',
                        highBitLength: highBitLength + 1 | 0
                    }
                    // 1 收集完毕之后，进入末尾 0 收集状态
                    return newPart.highBitLength === highBitCount ? ((): Part => {
                        const ret: Part = {
                            _tag: "fillLastLowBit",
                            binaryStr: newPart.binaryStr,
                            lowBitLength: 0
                        }
                        return lowBitCount === 0 ? { _tag: "done", binaryStr: ret.binaryStr } : ret
                    })() : newPart
                } else {
                    // 异常情况 返回原值
                    return part
                }
            } else if (bit === 0 && _tag === "fillHighBit") {
                // 在收集 1 的情况下 加入了 0 直接加入
                return { _tag: 'fillHighBit', binaryStr: binaryStr + '0', highBitLength: part.highBitLength }
            } else if (bit === 1 && _tag === "fillLastLowBit") {
                // 在填充低位 0 时，无法再继续填充 1 属于异常情况 直接返回原对象
                return part
            } else if (bit === 0 && _tag === "fillLastLowBit") {
                const { lowBitLength } = part
                if (lowBitLength < lowBitCount) {
                    // 在填充低位 0 时 加入 0
                    const newPart: Part = {
                        _tag: "fillLastLowBit",
                        binaryStr: binaryStr + '0',
                        lowBitLength: part.lowBitLength + 1 | 0
                    }
                    return newPart.lowBitLength === lowBitCount ? { _tag: "done", binaryStr: newPart.binaryStr } : newPart
                } else {
                    // 异常情况 无法加入 直接返回原对象
                    return part
                }
            } else {
                throw new Error('never here')
            }
        }
    }
}

function threeEqualParts(arr: Array<Bit>): Ans {
    const totalHighBitCount = arr.filter(it => it === 1).length
    const canAverageByThree = (totalHighBitCount % 3) === 0

    if (canAverageByThree === false) {
        // 1 的个数无法3等分，必然满足题目要求返回
        return noFoundResult
    } else {
        if (totalHighBitCount === 0) {
            // 面向用例编程 没有 1 则由于允许前导 0 的存在 可以任意三等分
            return [0, arr.length - 1]
        } else {
            // 必然是 3 的倍数 因此可以整除
            const averageHighBitForEveryPart = (totalHighBitCount / 3) | 0
            // 每个部分末尾至少需要的 0 的数量
            const lowBitAtLeast = Math.max(0, arr.slice(3).reverse().indexOf(1)) 

            const appendBit = appendCharToPart(averageHighBitForEveryPart, lowBitAtLeast)

            const partitionMaybe = (part: PartRet, array: Array<Bit>): Ans => {
                if (array.length === 0) {
                    // 遍历结束 返回结果
                    return noFoundResult 
                } else {
                    const [hd, ...tail] = array as [Bit, ...Array<Bit>]
                    // 模式匹配 所有情况
                    if (part._tag === "one") {
                        const newPart: Part = appendBit(hd)(part.val)
                        if (newPart._tag === "done") {
                            // 收集完毕 进入下一个递归
                            return partitionMaybe(
                                { _tag: "two", val: [newPart, emptyPart] },
                                tail
                            )
                        } else {
                            // 否则 继续收集
                            return part.val === newPart ? noFoundResult : partitionMaybe({ _tag: 'one', val: newPart }, tail)
                        }
                    } else if (part._tag === "two") {
                        const [hd, ...tail] = array as [Bit, ...Array<Bit>]
                        const { val: [fstPart, prevPart] } = part
                        const { binaryStr: fistBinaryStr } = fstPart
                        const newPart = appendBit(hd)(prevPart)
                        if (newPart._tag === 'done') {
                            const { binaryStr } = newPart
                            const thirdBinaryStr = tail.join('')
                            if (eqBinaryStr(binaryStr, fistBinaryStr) && eqBinaryStr(binaryStr, thirdBinaryStr)) {
                                return [
                                    fistBinaryStr.length - 1,
                                    (fistBinaryStr.length + binaryStr.length)
                                ]
                            } else {
                                return noFoundResult 
                            }
                        } else {
                            // 否则 继续收集
                            return prevPart === newPart ? noFoundResult : partitionMaybe({ _tag: 'two', val: [fstPart, newPart] }, tail)
                        }
                    } else {
                        const neverHere: never = part
                        throw new Error(`never here ${neverHere}`)
                    }
                }
            }
            return partitionMaybe({ _tag: "one", val: emptyPart }, arr)
        }
    }
};

const eqBinaryStr = (a: string, b: string): boolean => {
    const regex = /^0*/
    return a.replace(regex, '') === b.replace(regex, '') 
}
// @lc code=end

