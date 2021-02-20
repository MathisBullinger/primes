export function primes(max, min = 2): number[] {
  const nums = new Set(range(min, max))

  for (let i = 2; i <= Math.sqrt(max); i++) {
    if (!nums.has(i)) continue
    for (let m = i ** 2; m < max; m += i)
      nums.delete(m)
  }

  console.log(`found ${nums.size} primes between ${min} and ${max}`)
  return Array.from(nums)
}

export function range(start: number, end: number): number[] {
  return new Array(end - start + 1).fill(0).map((_, i) => i + 1)
}

export function* squareCoord(): Generator<[x: number, y: number]> {
  let x = 0
  let y = 0
  for (let lw = 1; true; lw += 2) {
    const bound = (lw - 1) / 2
    // step up
    for (y; y > -bound; y--) yield [x, y]
    // step left
    for (x; x > -bound; x--) yield [x, y]
    // step down
    for (y; y < bound; y++) yield [x, y]
    // step right
    for (x; x < bound + 1; x++) yield [x, y]
  }
}
