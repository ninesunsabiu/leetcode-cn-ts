open Js

let beautySum = s => {
    let len = s->String2.length
    let ans = ref(0)
    for i in 0 to len - 1 {
        let max = ref(0)
        let counter = Dict.empty()
        for (j in i to len - 1) {
            let char = s->String2.charAt(j)
            let count = switch counter->Dict.get(char) {
                | Some(i) => i + 1
                | None => 1
            }
            counter->Dict.set(char, count)
            max := Math.max_int(max.contents, count)
            let min = {
                counter
                ->Dict.values
                ->Array2.filter(it => it > 0)
                ->Math.minMany_int
            }
            ans := ans.contents + max.contents - min
        }
    }
    ans.contents
}