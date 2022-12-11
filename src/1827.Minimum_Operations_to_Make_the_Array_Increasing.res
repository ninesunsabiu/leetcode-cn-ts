open Js

let minOperations = nums => {
  if nums->Array2.length === 1 {
    0
  } else {
    let (ans, _) = nums->Array2.sliceFrom(1)->Array2.reduce((acc, cur) => {
        let (ans, prev) = acc
        switch cur - prev {
        | v if v > 0 => (ans, cur)
        | v => {
            let diff = Math.abs_int(v)
            let increase = diff + 1
            (ans + increase, cur + increase)
          }
        }
      }, (0, nums->Array2.unsafe_get(0)))
    ans
  }
}
