// 作者：AC_OIer
// 链接：https://leetcode.cn/problems/get-kth-magic-number-lcci/solution/by-ac_oier-2czm/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

class Solution {
    public int getKthMagicNumber(int k) {
        int[] nums = new int[]{3, 5, 7};
        PriorityQueue<Long> q = new PriorityQueue<>();
        Set<Long> set = new HashSet<>();
        q.add(1L); set.add(1L);
        while (!q.isEmpty()) {
            long t = q.poll();
            if (--k == 0) return (int) t;
            for (int x : nums) {
                if (!set.contains(x * t)) {
                    q.add(x * t); set.add(x * t);
                }
            }
        }
        return -1;
    }
}
