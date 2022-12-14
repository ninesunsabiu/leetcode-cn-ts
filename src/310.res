module IntComp = Belt.Id.MakeComparable({
  type t = int
  let cmp = (a, b) => Pervasives.compare(a, b)
})

let findMinHeightTrees = (n, edges) => {
  open Js
  // a -> array<reationToA> 相邻节点关系的记录表
  let relation = {
    let ans = Dict.empty()
    let setToRelation = (a, b) => {
      let prev = switch ans->Dict.get(a) {
      | None => []
      | Some(t) => t
      }
      ans->Dict.set(a, prev->Array2.concat([b]))
    }
    edges->Array2.forEach(cur => {
      let (a, b) = cur
      setToRelation(a->Int.toString, b)
      setToRelation(b->Int.toString, a)
    })
    ans
  }

  // 节点度关系
  let degree = relation->Dict.map((. v) => v->Array2.length, _)

  let extractLeafNode = degree => {
    let (leaf, noLeaf) =
      degree
      ->Dict.entries
      ->Belt.Array.partition(it => {
        switch it {
        | (_, v) => v->\"<="(1)
        }
      })

    // 找到所有被 leaf 影响的节点 对其度数 - 1
    let noLeaf =
      {
        if noLeaf->Array2.length->\"=="(0) { [] } else {leaf}
      }
      ->Belt.Array.flatMap(it =>
        switch it {
        | (k, _) =>
          switch relation->Dict.get(k) {
          | None => []
          | Some(k) => k
          }
        }
      )
      ->Belt.Array.reduce(noLeaf->Dict.fromArray, (acc, cur) => {
        let key = cur->Int.toString
        let newDegree = switch acc->Dict.get(key) {
        | Some(i) => i
        | None => 1
        }->\"-"(1)
        Dict.set(acc, key, newDegree)
        acc
      })

    // 返回 叶子节点 以及去除了叶子结点的新的度表
    (leaf, noLeaf)
  }

  let rec findAns = degree => {
    let (leaf, noLeaf) = degree->extractLeafNode
    if noLeaf->Dict.keys->Array2.length === 0 {
      leaf->Array2.map(it =>
        switch it {
        | (k, _) => k
        }
      )
    } else {
      findAns(noLeaf)
    }
  }

  findAns(degree)
}
