/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 *
 * https://leetcode.cn/problems/implement-trie-prefix-tree/description/
 *
 * algorithms
 * Medium (71.99%)
 * Likes:    1351
 * Dislikes: 0
 * Total Accepted:    240.8K
 * Total Submissions: 334.4K
 * Testcase Example:  '["Trie","insert","search","search","startsWith","insert","search"]\n' +
  '[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]'
 *
 * Trie（发音类似 "try"）或者说 前缀树
 * 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。
 * 
 * 请你实现 Trie 类：
 * 
 * 
 * Trie() 初始化前缀树对象。
 * void insert(String word) 向前缀树中插入字符串 word 。
 * boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回
 * false 。
 * boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true
 * ；否则，返回 false 。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * 输出
 * [null, null, true, false, true, null, true]
 * 
 * 解释
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // 返回 True
 * trie.search("app");     // 返回 False
 * trie.startsWith("app"); // 返回 True
 * trie.insert("app");
 * trie.search("app");     // 返回 True
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * word 和 prefix 仅由小写英文字母组成
 * insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次
 * 
 * 
 */

// @lc code=start
type rec trie = {isEnd: bool, table: Js.Dict.t<trie>}

let str2List = {
  open Js
  str => str->String2.castToArrayLike->Array2.from->Belt.List.fromArray
}

let insert = (t, keyword) => {
  open Js
  let chList = keyword->str2List
  let rec go = (t, l) => {
    switch (t, l) {
    | ({table}, list{hd, ...rest}) =>
      let {isEnd, table: nextTable} = switch table->Dict.get(hd) {
      | Some(node) => node
      | None => {
          let node = {isEnd: false, table: Dict.empty()}
          table->Js.Dict.set(hd, node)
          node
        }
      }
      if rest->Belt.List.length === 0 {
        table->Dict.set(hd, {isEnd: true, table: nextTable})
      } else {
        go({isEnd, table: nextTable}, rest)
      }

    | (_, list{}) => assert false
    }
  }

  if chList->Belt.List.length > 0 {
    go(t, chList)
  } else {
    ()
  }
}

let get = (t, keyword) => {
  open Js
  let chList = keyword->str2List
  let rec go = (t, l) => {
    switch (t, l) {
    | ({table}, list{hd, ...rest}) =>
      switch table->Dict.get(hd) {
      | Some(node) => go(node, rest)
      | None => None
      }

    | (_, list{}) => Some(t)
    }
  }
  go(t, chList)
}

let search = (t, keyword) =>
  switch get(t, keyword) {
  | Some({isEnd: true}) => true
  | _ => false
  }

let startsWith = (t, keyowrd) =>
  switch get(t, keyowrd) {
  | Some(_) => true
  | None => false
  }
// @lc code=end
