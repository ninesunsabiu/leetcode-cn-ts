/*
 * @lc app=leetcode.cn id=1460 lang=typescript
 *
 * [1460] 通过翻转子数组使两个数组相等
 *
 * https://leetcode.cn/problems/make-two-arrays-equal-by-reversing-sub-arrays/description/
 *
 * algorithms
 * Easy (77.00%)
 * Likes:    63
 * Dislikes: 0
 * Total Accepted:    34.6K
 * Total Submissions: 44.9K
 * Testcase Example:  '[1,2,3,4]\n[2,4,1,3]'
 *
 * 给你两个长度相同的整数数组 target 和 arr 。每一步中，你可以选择 arr 的任意 非空子数组 并将它翻转。你可以执行此过程任意次。
 * 
 * 如果你能让 arr 变得与 target 相同，返回 True；否则，返回 False 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：target = [1,2,3,4], arr = [2,4,1,3]
 * 输出：true
 * 解释：你可以按照如下步骤使 arr 变成 target：
 * 1- 翻转子数组 [2,4,1] ，arr 变成 [1,4,2,3]
 * 2- 翻转子数组 [4,2] ，arr 变成 [1,2,4,3]
 * 3- 翻转子数组 [4,3] ，arr 变成 [1,2,3,4]
 * 上述方法并不是唯一的，还存在多种将 arr 变成 target 的方法。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：target = [7], arr = [7]
 * 输出：true
 * 解释：arr 不需要做任何翻转已经与 target 相等。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：target = [3,7,9], arr = [3,7,11]
 * 输出：false
 * 解释：arr 没有数字 9 ，所以无论如何也无法变成 target 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * target.length == arr.length
 * 1 <= target.length <= 1000
 * 1 <= target[i] <= 1000
 * 1 <= arr[i] <= 1000
 * 
 * 
 */
export {}
// @lc code=start
function canBeEqual(target: number[], arr: number[]): boolean {
    // 第一组形成一个以元素出现次数记录的表
    const toTable = foldMap(getMonoidForRecord(NumberSemigroupSum))((it: number): Table => ({ [it]: 1 }))
    const targetTable = toTable(target)

    return theSameFraInTableRec(targetTable, arr)
};

type Item = number
type Count = number
type Table = Record<Item, Count>

// 自定义一个短路操作的循环 以优化性能
const theSameFraInTableRec = (table: Table, arr: Array<number>): boolean => {
    if (isNonEmpty(arr)) {
        const [item, ...rest] = arr;
        return hasOwn(table, item)
            ? (() => {
                  const count = table[item] ?? 0;
                  return count === 0
                      ? // 短路判断 如果记录表中没有出现过该元素 那么必然无法满足题意
                        false
                      : // 否则更新表 进行递归
                        theSameFraInTableRec({ ...table, [item]: (count - 1) | 0 }, rest);
              })()
            : // 不存在 则说明无法满足题意
              false;
    } else {
        // 数组遍历完成，则查看 table 是否所有元素出现次数都为 0
        return Object.values(table).every((it) => it === 0);
    }
};

type NonEmptyArray<T> = [T, ...T[]]
const isNonEmpty = <T>(it: Array<T>): it is NonEmptyArray<T> => it.length > 0

type Semigroup<A> = {
    readonly concat: (a: A, b: A) => A
}

type Monoid<A> = Semigroup<A> & {
    readonly empty: A;
}

const emptyRecord: Record<any, never> = {}

const hasOwn = <K extends PropertyKey, A>(a: Record<K, A>, b: PropertyKey): boolean =>
    Object.prototype.hasOwnProperty.call(a, b);

const getMonoidForRecord = <K extends keyof any, A>(S: Semigroup<A>): Monoid<Record<K, A>> => {
    return {
        concat: (a, b) => {
            const ret = { ...a }
            for (const [key, val] of Object.entries(b) as Array<[K, A]>) {
                ret[key] = hasOwn(ret, key) ? S.concat(ret[key], val) : val
            }
            return ret
        },
        empty: emptyRecord
    }
}

const NumberSemigroupSum: Semigroup<number> = {
    concat: (first, second) => first + second
};

const foldMap = <M>(M: Monoid<M>) => {
    return <A>(f: (a: A) => M) => {
        return (fa: Array<A>): M => {
            return fa.reduce(
                (a, b) => M.concat(a, f(b)), M.empty
            )
        }
    }
}
// @lc code=end

