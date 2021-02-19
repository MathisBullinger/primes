export function primes(max, min = 2): number[] {
  const nums = new Set(Array(max - min + 1).fill(0).map((_, i) => min + i))

  for (let i = 2; i < max; i++) {
    for (let m = i ** 2; m < max; m += i)
      nums.delete(m)
  }

  console.log(`found ${nums.size} primes between ${min} and ${max}`)
  return Array.from(nums)
}