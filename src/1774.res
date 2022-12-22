/*
 * @lc app=leetcode.cn id=1774 lang=typescript
 *
 * [1774] 最接近目标价格的甜点成本
 *
 * https://leetcode.cn/problems/closest-dessert-cost/description/
 *
 * algorithms
 * Medium (52.37%)
 * Likes:    108
 * Dislikes: 0
 * Total Accepted:    17K
 * Total Submissions: 30.3K
 * Testcase Example:  '[1,7]\n[3,4]\n10'
 *
 * 你打算做甜点，现在需要购买配料。目前共有 n 种冰激凌基料和 m 种配料可供选购。而制作甜点需要遵循以下几条规则：
 *
 *
 * 必须选择 一种 冰激凌基料。
 * 可以添加 一种或多种 配料，也可以不添加任何配料。
 * 每种类型的配料 最多两份 。
 *
 *
 * 给你以下三个输入：
 *
 *
 * baseCosts ，一个长度为 n 的整数数组，其中每个 baseCosts[i] 表示第 i 种冰激凌基料的价格。
 * toppingCosts，一个长度为 m 的整数数组，其中每个 toppingCosts[i] 表示 一份 第 i 种冰激凌配料的价格。
 * target ，一个整数，表示你制作甜点的目标价格。
 *
 *
 * 你希望自己做的甜点总成本尽可能接近目标价格 target 。
 *
 * 返回最接近 target 的甜点成本。如果有多种方案，返回 成本相对较低 的一种。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：baseCosts = [1,7], toppingCosts = [3,4], target = 10
 * 输出：10
 * 解释：考虑下面的方案组合（所有下标均从 0 开始）：
 * - 选择 1 号基料：成本 7
 * - 选择 1 份 0 号配料：成本 1 x 3 = 3
 * - 选择 0 份 1 号配料：成本 0 x 4 = 0
 * 总成本：7 + 3 + 0 = 10 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：baseCosts = [2,3], toppingCosts = [4,5,100], target = 18
 * 输出：17
 * 解释：考虑下面的方案组合（所有下标均从 0 开始）：
 * - 选择 1 号基料：成本 3
 * - 选择 1 份 0 号配料：成本 1 x 4 = 4
 * - 选择 2 份 1 号配料：成本 2 x 5 = 10
 * - 选择 0 份 2 号配料：成本 0 x 100 = 0
 * 总成本：3 + 4 + 10 + 0 = 17 。不存在总成本为 18 的甜点制作方案。
 *
 *
 * 示例 3：
 *
 *
 * 输入：baseCosts = [3,10], toppingCosts = [2,5], target = 9
 * 输出：8
 * 解释：可以制作总成本为 8 和 10 的甜点。返回 8 ，因为这是成本更低的方案。
 *
 *
 * 示例 4：
 *
 *
 * 输入：baseCosts = [10], toppingCosts = [1], target = 1
 * 输出：10
 * 解释：注意，你可以选择不添加任何配料，但你必须选择一种基料。
 *
 *
 *
 * 提示：
 *
 *
 * n == baseCosts.length
 * m == toppingCosts.length
 * 1
 * 1
 * 1
 *
 *
 */

// @lc code=start
type rec tree =
  | Empty
  | Node(/* left */ tree, /* data */ int, /* right */ tree, /* height */ int)

let height = x =>
  switch x {
  | Empty => 0
  | Node(_, _, _, h) => h
  }

let create = (l, v, r) => {
  let hl = height(l)
  let hr = height(r)
  Node(
    l,
    v,
    r,
    if hl >= hr {
      hl + 1
    } else {
      hr + 1
    },
  )
}

let rec add = (x, tree) =>
  switch tree {
  | Empty => Node(Empty, x, Empty, 1)
  | Node(l, v, r, _) =>
    if x === v {
      tree
    } else if x < v {
      bal(add(x, l), v, r)
    } else {
      bal(l, v, add(x, r))
    }
  }
and bal = (l, v, r) => {
  let hl = height(l)
  let hr = height(r)
  if hl > hr + 2 {
    switch l {
    | Node(ll, lv, lr, _) if height(ll) >= height(lr) => create(ll, lv, create(lr, v, r))
    | Node(ll, lv, Node(lrl, lrv, lrr, _), _) => create(create(ll, lv, lrl), lrv, create(lrr, v, r))
    | _ => assert false
    }
  } else if hr > hl + 2 {
    switch r {
    | Node(rl, rv, rr, _) if height(rr) >= height(rl) => create(create(l, v, rl), rv, rr)
    | Node(Node(rll, rlv, rlr, _), rv, rr, _) => create(create(l, v, rll), rlv, create(rlr, rv, rr))
    | _ => assert false
    }
  } else {
    create(l, v, r)
  }
}

let closestCost = (baseCosts: array<int>, toppingCosts: array<int>, target: int): int => {
  let res = ref(Js.Math.minMany_int(baseCosts))

  let rec dsf = (toppingCosts, p, curCost, target) => {
    let absOfResAndTarget = Js.Math.abs_int(res.contents - target)
    let diffCurAndTarget = curCost - target
    if absOfResAndTarget < diffCurAndTarget {
      1
    } else {
      switch Js.Math.abs_int(diffCurAndTarget) {
      | v if absOfResAndTarget > v => res := curCost

      | v if absOfResAndTarget === v => res := Js.Math.min_int(res.contents, curCost)

      | _ => ()
      }

      if p === toppingCosts->Js.Array2.length {
        1
      } else {
        dsf(
          toppingCosts,
          p + 1,
          curCost + Js.Array2.unsafe_get(toppingCosts, p) * 2,
          target,
        )->ignore
        dsf(
          toppingCosts,
          p + 1,
          curCost + Js.Array2.unsafe_get(toppingCosts, p) * 1,
          target,
        )->ignore
        dsf(
          toppingCosts,
          p + 1,
          curCost + Js.Array2.unsafe_get(toppingCosts, p) * 0,
          target,
        )->ignore
        1
      }
    }
  }

  baseCosts->Js.Array2.forEach(b => dsf(toppingCosts, 0, b, target)->ignore)

  res.contents
}
// @lc code=end
