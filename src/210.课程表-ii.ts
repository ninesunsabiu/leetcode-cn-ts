/*
 * @lc app=leetcode.cn id=210 lang=typescript
 *
 * [210] 课程表 II
 *
 * https://leetcode.cn/problems/course-schedule-ii/description/
 *
 * algorithms
 * Medium (56.08%)
 * Likes:    688
 * Dislikes: 0
 * Total Accepted:    147.8K
 * Total Submissions: 263.3K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites ，其中
 * prerequisites[i] = [ai, bi] ，表示在选修课程 ai 前 必须 先选修 bi 。
 * 
 * 
 * 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。
 * 
 * 
 * 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：numCourses = 2, prerequisites = [[1,0]]
 * 输出：[0,1]
 * 解释：总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * 输出：[0,2,1,3]
 * 解释：总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
 * 因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
 * 
 * 示例 3：
 * 
 * 
 * 输入：numCourses = 1, prerequisites = []
 * 输出：[0]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= numCourses * (numCourses - 1)
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * ai != bi
 * 所有[ai, bi] 互不相同
 * 
 * 
 */

// @lc code=start
function findOrder(numCourses: number, prerequisites: [number, number][]): number[] {
    const constraintMap =  prerequisites.map(([a, b]) => [b, a] as const)
                        .reduce(
                            (a, [k, v]) => {
                                a.set(k, (a.get(k) ?? []).concat(v))
                                return a
                            },
                            new Map<number, Array<number>>() 
                        )

    const i = topologicalOrder(
        (course: number) => {
            return constraintMap.get(course) ?? []
        }
    )(Array.from({ length: numCourses }, (_, i) => i))

    return i._t === "r" ? i.r : []
};

type Either<E, A> =
  | { readonly _t: "l"; l: E; }
  | { readonly _t: "r"; r: A; }

/**
 * 寻找一个数组的拓扑序  
 * 数组内的节点关系 有 `relationTo` 给出  
 * 该方法反映了某个节点出发到另外一些节点的关系  
 * 
 * 若找到 则返回一个拓扑序 Right<Array<A>> 否则 返回 Left<String(Circular dependencies)>
 */
const topologicalOrder = <A>(relationTo: (a: A) => Array<A>) => {
  return (nodes: Array<A>): Either<string, Array<A>> => {

    // 记录各个节点所依赖其他节点的数量关系
    const dependenciesCountMap = new Map(nodes.map(it => [it, 0]))

    // 邻接表 记录节点出发的节点关系 
    // 构造邻接表
    const nodeOutMap = new Map<A, Array<A>>()
    for (const i of nodes) {
      const toNodes = relationTo(i)
      for (const j of toNodes) {
        dependenciesCountMap.set(j, (dependenciesCountMap.get(j) ?? 0) + 1 | 0)
      }
      nodeOutMap.set(i, (nodeOutMap.get(i) ?? []).concat(toNodes))
    }

    // 返回值
    const ans = []
    // 入度0 节点数量
    const queue = [...dependenciesCountMap.entries()].filter(([, k]) => k === 0)

    while (queue.length > 0) {
      const [removed] = queue.shift()!  // 非空类型断言
      ans.push(removed)
      // 对 移除节点 遍历受其影响的所有下游节点，将他们的依赖数量 - 1
      for (const affectedNode of (nodeOutMap.get(removed) ?? [])) {
        const prevAffectNodeDependenciesCount = dependenciesCountMap.get(affectedNode) ?? 0
        dependenciesCountMap.set(affectedNode, prevAffectNodeDependenciesCount - 1 | 0)
        // 并对 依赖数量为 1 的下游节点加入待移除队列
        if (prevAffectNodeDependenciesCount === 1) {
          queue.push([affectedNode, 0])
        }
      }
    }

    return ans.length !== nodes.length ? { _t: "l", l: "Circular Dependencies" } : { _t: "r", r: ans }

  };
};

// @lc code=end

