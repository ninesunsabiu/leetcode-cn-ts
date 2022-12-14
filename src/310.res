let findMinHeightTrees = (_, edges) => {
  open Js
  // a -> array<reationToA> 相邻节点关系的记录表
  let relation = {
    let ret = Dict.empty()
    let setToRelation = (a, b) => {
      Dict.set(
        ret,
        a,
        switch ret->Dict.get(a) {
        | None => []
        | Some(t) => t
        }->Array2.concat([b]),
      )
    }

    // 设置双边邻接表
    edges->Array2.forEach(cur => {
      let (a, b) = cur
      setToRelation(a->Int.toString, b)
      setToRelation(b->Int.toString, a)
    })

    ret
  }

  // 节点度关系
  let degree = Dict.map((. v) => v->Array2.length, relation)

  // 分离从度数表中分离终端节点和剩余度表
  let extractLeafNode = degree => {
    let (leaf, noLeaf) = degree->Dict.entries->Belt.Array.partition(((_, v)) => v <= 1)

    // 找到所有被 leaf 影响的节点 对其度数 - 1
    let noLeaf =
      {
        if noLeaf->Array2.length->\"=="(0) {
          []
        } else {
          leaf
        }
      }
      ->Belt.Array.flatMap(((k, _)) =>
        // 从邻接表中查询关联节点
        switch relation->Dict.get(k) {
        | None => []
        | Some(k) => k
        }
      )
      ->Belt.Array.reduce(noLeaf->Dict.fromArray, (acc, cur) => {
        let key = cur->Int.toString
        // 对每个关联节点进行 - 1 操作 表示去除该终端节点
        switch acc->Dict.get(key) {
        | Some(i) => {
            // mutate update
            Dict.set(acc, key, i - 1)
            acc
          }

        | None => acc
        }
      })

    // 返回 叶子节点 以及去除了叶子结点的新的度表
    (leaf, noLeaf)
  }

  // 不断去除终端节点 剩余的最后节点 即为所求解
  let rec findAns = degree => {
    let (leaf, noLeaf) = degree->extractLeafNode
    if noLeaf->Dict.keys->Array2.length->\"=="(0) {
      leaf->Array2.map(((k, _)) => k)
    } else {
      findAns(noLeaf)
    }
  }

  findAns(degree)
}
