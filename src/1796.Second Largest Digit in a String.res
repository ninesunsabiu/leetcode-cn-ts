module type Order = {
  type t
  let compare: (t, t) => int
}

module MakePrioritySetQueue = (Order: Order) => {
  type rec queue<'a> = Some(node<'a>) | None
  and node<'a> = {el: 'a, left: queue<'a>, right: queue<'a>}

  type t = queue<Order.t>

  let rec insert = (el, queue) => {
    switch queue {
    | None => {el, left: None, right: None}
    | Some(node) => {
        let {el: curEl, left, right} = node
        let order = Order.compare(el, curEl)
        if order <= 0 {
          // el lt curEl
          {el, left: Some(insert(curEl, right)), right: left}
        } else {
          // el gt curEl
          {el: curEl, left: Some(insert(el, right)), right: left}
        }
      }
    }
  }

  let rec pop = queue => {
    switch queue {
    | None => assert false
    | Some({left: None, right}) => right
    | Some({left, right: None}) => left
    | Some({left: Some({el: l}) as left, right: Some({el: r}) as right}) => {
        // 选举新的 top 并调整子树
        let order = Order.compare(l, r)
        if order <= 0 {
          // left lt right
          // left win
          Some({el: l, left: pop(left), right})
        } else {
          // left gt right
          // right win
          Some({el: r, left, right: pop(right)})
        }
      }
    }
  }

  let extract = queue => {
    let {el} = queue
    (el, pop(Some(queue)))
  }

  let empty: t = None
}

module IntComp = Belt.Id.MakeComparable({
  type t = int
  let cmp = (a, b) => Pervasives.compare(a, b)
})

let secondHighest = s => {
  let digitRe = %re("/\d/")

  module PrioritySetQueue = MakePrioritySetQueue(Int32)

  let {empty: emptyQueue, insert, extract} = module(PrioritySetQueue)

  let queue =
    Js.Array2.from(s)
    ->Js.Array2.filter(Js.Re.test_(digitRe, _))
    ->Belt.Array.flatMap(it => {
      switch it->Belt.Int.fromString {
      | Some(int) => [int]
      | None => []
      }
    })
    ->Belt.Set.fromArray(~id=module(IntComp))
    ->Belt.Set.toArray
    ->Belt.Array.reduce(emptyQueue, (acc, cur) => Some(insert(cur, acc)))

  switch queue {
  | None => -1
  | Some(node) =>
    switch extract(node) {
    | (_, None) => -1
    | (_, Some({el})) => el
    }
  }
}
