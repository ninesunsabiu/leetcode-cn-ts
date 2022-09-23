/*
 * @lc app=leetcode.cn id=1206 lang=typescript
 *
 * [1206] 设计跳表
 *
 * https://leetcode.cn/problems/design-skiplist/description/
 *
 * algorithms
 * Hard (62.53%)
 * Likes:    197
 * Dislikes: 0
 * Total Accepted:    20.6K
 * Total Submissions: 30.2K
 * Testcase Example:  '["Skiplist","add","add","add","search","add","search","erase","erase","search"]\n' +
  '[[],[1],[2],[3],[0],[4],[1],[0],[1],[1]]'
 *
 * 不使用任何库函数，设计一个 跳表 。
 * 
 * 跳表 是在 O(log(n))
 * 时间内完成增加、删除、搜索操作的数据结构。跳表相比于树堆与红黑树，其功能与性能相当，并且跳表的代码长度相较下更短，其设计思想与链表相似。
 * 
 * 例如，一个跳表包含 [30, 40, 50, 60, 70, 90] ，然后增加 80、45 到跳表中，以下图的方式操作：
 * 
 * 
 * Artyom Kalinin [CC BY-SA 3.0], via Wikimedia Commons
 * 
 * 跳表中有很多层，每一层是一个短的链表。在第一层的作用下，增加、删除和搜索操作的时间复杂度不超过 O(n)。跳表的每一个操作的平均时间复杂度是
 * O(log(n))，空间复杂度是 O(n)。
 * 
 * 了解更多 : https://en.wikipedia.org/wiki/Skip_list
 * 
 * 在本题中，你的设计应该要包含这些函数：
 * 
 * 
 * bool search(int target) : 返回target是否存在于跳表中。
 * void add(int num): 插入一个元素到跳表。
 * bool erase(int num): 在跳表中删除一个值，如果 num 不存在，直接返回false. 如果存在多个 num
 * ，删除其中任意一个即可。
 * 
 * 
 * 注意，跳表中可能存在多个相同的值，你的代码需要处理这种情况。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入
 * ["Skiplist", "add", "add", "add", "search", "add", "search", "erase",
 * "erase", "search"]
 * [[], [1], [2], [3], [0], [4], [1], [0], [1], [1]]
 * 输出
 * [null, null, null, null, false, null, true, false, true, false]
 * 
 * 解释
 * Skiplist skiplist = new Skiplist();
 * skiplist.add(1);
 * skiplist.add(2);
 * skiplist.add(3);
 * skiplist.search(0);   // 返回 false
 * skiplist.add(4);
 * skiplist.search(1);   // 返回 true
 * skiplist.erase(0);    // 返回 false，0 不在跳表中
 * skiplist.erase(1);    // 返回 true
 * skiplist.search(1);   // 返回 false，1 已被擦除
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 0 <= num, target <= 2 * 10^4
 * 调用search, add,  erase操作次数不大于 5 * 10^4 
 * 
 * 
 */

// @lc code=start
/**
 *  根据 [宫水三叶](https://leetcode.cn/u/ac_oier/) 对于题目空间数据的推算，最大层数，用 10 合适  
 * 实际跳表的最大层数，是一个可以根据实际业务情况，动态调整的参数
 */
 const maxLevel = 10

 /**
  * 跳跃比例
  * 这个是 三叶 的题解中没有涉及的部分  
  * 按照 [京城打工人](https://leetcode.cn/u/capital-worker/) 的题解，这也是一个可以配置的参数  
  * 在 redis 也可以见到他的作用
  */
 const skipRatio = 0.5
 
 interface SkipListNode<T> {
     /**
      * data 域
      */
     data: T;
     /**
      * 链接在不同 level 中的下一个结点  
      * level[i] 表示 第 i 层的下一个结点  
      * level 是一个稀疏的数组，i 越大，表示层数越高，0 是最底，也是最全数据的一层
      * 
      * ![图片](https://pic.leetcode-cn.com/1658804871-KBpiio-image.png)
      */
     level: Array<SkipListNode<T>>
 }
 
 const ofListNode = <T>(i: T): SkipListNode<T> => ({ data: i, level: [] })
 
 /**
  * 随机的返回 1 - `maxLevel` 中的一个数  
  * 特别的，在概率上有  
  * `skipRatio` 的概率返回 2  
  * `skpRatio ^ 2` 的概率返回 3  
  * `skpRatio ^ 3` 的概率返回 4  
  * ...等等 
  */
 const randomLevel = (): number => {
     const randomRec = (acc: number) => {
         return acc < maxLevel && Math.random() < skipRatio ? randomRec(acc + 1) : acc
     }
     return randomRec(1)
 }
 
 type SkipNode = SkipListNode<number>
 
 class Skiplist {
 
     /**
      * 起始结点，可用于开头查找
      */
     private headListNode: SkipNode
 
     constructor(
         /**
          * 动态最大层数
          */
         private curMaxLevel = randomLevel(),
     ) {
         this.headListNode = ofListNode(-1, this.curMaxLevel)
     }
     
 
     /**
      * 收集每一个层级之中，最后一个严格小于目标的结点于数组中  
      * 返回该数组
      */
     private collectMaxNodeWhichLtTarget(target: number): Array<SkipNode> {
 
         const splitListInEveryLevel = (
             start: SkipNode | null | undefined,
             curLevel: number,
             curNode: SkipNode 
         ): typeof accumulator => {
         }
 
         const ret: Array<SkipListNode<number>> = []
         let cur: SkipListNode<number> = this.headListNode;
 
         // 从高到低查找最后一个严格小于目标的结点
         for (let i = this.curMaxLevel - 1; i >= 0; i--) {
             // 移动查找
             while (cur.level[i] && cur.level[i]!.data < target) {
                 cur = cur.level[i]!
             }
             // cur 为最后一个满足 node == null || node.data >= target 的结点
             ret[i] = cur
         }
 
         return ret
     }
 
     search(target: number): boolean {
         const ns = this.collectMaxNodeWhichLtTarget(target)
         // 如果元素存在于跳表之中，只可能是最小的一个 node >= target 的结点，才有可能相等
         return ns[0]?.level[0]?.data === target
     }
 
     add(num: number): void {
         const node = ofListNode(num)
         const ns = this.collectMaxNodeWhichLtTarget(num)
 
         // ns 记录着最大的小于 num 的结点，因此就是将 `node` 插入其后
         // 第零层是维护着所有结点的安全层，必然需要插入 `node`
         // 其余的层数 按照某种 “随机” 的规则，安排插入 `node`
 
         // 产生新的最大层数
         const curMaxLevel = randomLevel()
         // 记录新的最大值层数
         this.curMaxLevel = Math.max(this.curMaxLevel, curMaxLevel)
         for (let i = 0; i < curMaxLevel; i++) {
             node.level[i] = ns[i]?.level[i] ?? null
             ns[i].level[i] = node
         }
     }
 
     erase(num: number): boolean {
         const ns = this.collectMaxNodeWhichLtTarget(num)
         // 如果没有查找到该结点 按照题意返回 false
         const maxNodeWhichLtTarget = ns[0]?.level[0]
         if (maxNodeWhichLtTarget == null || maxNodeWhichLtTarget.data !== num) {
             return false
         }
         // 否则 逐层 进行删除，并返回 true
 
         // 此时的 maxNodeWhichLtTarget 就是等于删除的结点
         const deletingNode = maxNodeWhichLtTarget
         for (let i = 0; i < this.curMaxLevel && ns[0].level[0] === deletingNode; i++) {
             ns[i].level[i] = ns[i].level[i]?.level[i] ?? null
         }
 
         // 持续删除维持的空的最大记录
         while (this.curMaxLevel > 1 && this.headListNode.level[this.curMaxLevel - 1] === null) {
             this.curMaxLevel--
         }
 
         return true
     }
 }
 
 /**
  * Your Skiplist object will be instantiated and called as such:
  * var obj = new Skiplist()
  * var param_1 = obj.search(target)
  * obj.add(num)
  * var param_3 = obj.erase(num)
  */
 // @lc code=end
 
 