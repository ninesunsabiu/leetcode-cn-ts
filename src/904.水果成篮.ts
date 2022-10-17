/*
 * @lc app=leetcode.cn id=904 lang=typescript
 *
 * [904] 水果成篮
 *
 * https://leetcode.cn/problems/fruit-into-baskets/description/
 *
 * algorithms
 * Medium (43.30%)
 * Likes:    348
 * Dislikes: 0
 * Total Accepted:    92K
 * Total Submissions: 204.7K
 * Testcase Example:  '[1,2,1]'
 *
 * 你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果 种类 。
 * 
 * 你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：
 * 
 * 
 * 你只有 两个 篮子，并且每个篮子只能装 单一类型 的水果。每个篮子能够装的水果总量没有限制。
 * 你可以选择任意一棵树开始采摘，你必须从 每棵 树（包括开始采摘的树）上 恰好摘一个水果
 * 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到下一棵树，并继续采摘。
 * 一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。
 * 
 * 
 * 给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：fruits = [1,2,1]
 * 输出：3
 * 解释：可以采摘全部 3 棵树。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：fruits = [0,1,2,2]
 * 输出：3
 * 解释：可以采摘 [1,2,2] 这三棵树。
 * 如果从第一棵树开始采摘，则只能采摘 [0,1] 这两棵树。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：fruits = [1,2,3,2,2]
 * 输出：4
 * 解释：可以采摘 [2,3,2,2] 这四棵树。
 * 如果从第一棵树开始采摘，则只能采摘 [1,2] 这两棵树。
 * 
 * 
 * 示例 4：
 * 
 * 
 * 输入：fruits = [3,3,3,1,2,1,1,2,3,3,4]
 * 输出：5
 * 解释：可以采摘 [1,2,1,1,2] 这五棵树。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= fruits.length <= 10^5
 * 0 <= fruits[i] < fruits.length
 * 
 * 
 */
export {}
// @lc code=start
type Fruit = number
type Range = [start: number, end: number]

type Basket = 
    (
        | ({ readonly _tag: "one"; } & { fruit: number })
        | { readonly _tag: "two"; firstContinuousIdx: number; lastAddFruit: Fruit; fruits: [Fruit, Fruit] }
    ) & { range: Range } 

type Either<E, T> = { readonly _tag: "left", left: E } | { readonly _tag: "right"; right: T }
const right = <T>(v: T): Either<never, T> => ({ _tag: "right", right: v })
const left = <E>(v: E): Either<E, never> => ({ _tag: "left", left: v })

const pickOneFruit = (fruit: number, idx: number) => {
    return (basket: Basket): Either<Basket, Basket> => {
        if (basket._tag === "one") {
            const { fruit: existFruit, range: [start] } = basket
            const range: Range = [start, idx]
            if (fruit === existFruit) {
                return right({ _tag: "one", fruit, range })
            } else {
                return right({ _tag: 'two', fruits: [existFruit , fruit], firstContinuousIdx: idx, range, lastAddFruit: fruit })
            }
        } else {
            const { fruits, range: [start], lastAddFruit } = basket
            const [fstFruit, secondFruit] = fruits
            if (fruit === fstFruit || fruit === secondFruit) {
                const firstContinuousIdx = fruit === lastAddFruit ? basket.firstContinuousIdx : idx
                return right({ _tag: 'two', firstContinuousIdx, fruits, range: [start, idx], lastAddFruit: fruit })
            } else {
                return left(abandonFruit(basket))
            }
        }
    }
}

const abandonFruit = (
    basket: Extract<Basket, { readonly _tag: 'two' }>
): Extract<Basket, { readonly _tag: 'one' }> => {
    const { firstContinuousIdx, lastAddFruit } = basket
    return {
        _tag: 'one',
        fruit: lastAddFruit,
        range: [firstContinuousIdx, firstContinuousIdx]
    }
}

const totalInBasket = ({ range }: Basket) => {
    return range[1] - range[0] + 1
}

function totalFruit(fruits: [number, ...Array<number>]): number {
    const size = fruits.length

    const pickFruitProgram = (ans: number, basket: Basket): number => {
        const { range: [, end] } = basket
        // 尝试摘取的果树编号
        const pickupTree = end + 1
        if (pickupTree >= size) {
            // 结束 数一数篮子里的水果数 并和记录的最值进行最终的比较
            return Math.max(ans, totalInBasket(basket))
        } else {
            // pickupTree < size
            const newFruit = fruits[pickupTree]!
            const newBasket = pickOneFruit(newFruit, pickupTree)(basket)
            if (newBasket._tag === "left") {
                // 无法放入新水果
                // 对当前的篮子进行一次汇总记录 更新结果
                const newAns = Math.max(ans, totalInBasket(basket))
                return pickFruitProgram(newAns, newBasket.left)
            } else {
                // 直接放入新水果 进行下一次尝试摘取
                return pickFruitProgram(ans, newBasket.right)
            }
        }
    }

    return pickFruitProgram(0, { _tag: "one", fruit: fruits[0], range: [0, 0] })
};
// @lc code=end

