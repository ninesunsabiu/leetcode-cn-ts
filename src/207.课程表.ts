/*
 * @lc app=leetcode.cn id=207 lang=typescript
 *
 * [207] 课程表
 *
 * https://leetcode.cn/problems/course-schedule/description/
 *
 * algorithms
 * Medium (53.86%)
 * Likes:    1465
 * Dislikes: 0
 * Total Accepted:    266.2K
 * Total Submissions: 494.5K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
 * 
 * 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi]
 * ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。
 * 
 * 
 * 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
 * 
 * 
 * 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：numCourses = 2, prerequisites = [[1,0]]
 * 输出：true
 * 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
 * 
 * 示例 2：
 * 
 * 
 * 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
 * 输出：false
 * 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 0 
 * prerequisites[i].length == 2
 * 0 i, bi < numCourses
 * prerequisites[i] 中的所有课程对 互不相同
 * 
 * 
 */
export {}
// @lc code=start
function canFinish(numCourses: number, prerequisites: [number, number][]): boolean {
    const order = findOrder(numCourses, prerequisites)
    return order.length > 0
};

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
    const dependenciesCountMap = new Map(
      nodes.map(it => [it, 0])
    )

    // 邻接表 记录节点出发的节点关系 
    const nodeOutMap = new Map<A, Array<A>>()

    for (const i of nodes) {
      const toNodes = relationTo(i)
      for (const j of toNodes) {
        dependenciesCountMap.set(j, (dependenciesCountMap.get(j) ?? 0) + 1 | 0)
      }
      nodeOutMap.set(i, (nodeOutMap.get(i) ?? []).concat(toNodes))
    }

    const ans = []
    const queue = [...dependenciesCountMap.entries()].filter(([, k]) => k === 0)

    while (queue.length > 0) {
      const [removed] = queue.shift()!
      ans.push(removed)
      for (const affectedNode of (nodeOutMap.get(removed) ?? [])) {
        const prevAffectNodeDependenciesCount = dependenciesCountMap.get(affectedNode) ?? 0
        dependenciesCountMap.set(affectedNode, prevAffectNodeDependenciesCount - 1 | 0)
        if (prevAffectNodeDependenciesCount === 1) {
          queue.push([affectedNode, 0])
        }
      }
    }

    return ans.length !== nodes.length ? { _t: "l", l: "Circular Dependencies" } : { _t: "r", r: ans }

  };
};
// @lc code=end

