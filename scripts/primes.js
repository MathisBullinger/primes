const fs = require('fs')

// Sieve of Eratosthenes
function primes(max, min = 2) {
  const nums = new Set(Array(max - min + 1).fill().map((_, i) => min + i))

  for (let i = 2; i < max; i++) {
    for (let m = i ** 2; m < max; m += i)
      nums.delete(m)
  }

  console.log(`found ${nums.size} primes between ${min} and ${max}`)
  return Array.from(nums)
}

fs.mkdirSync('data', { recursive: true })
fs.writeFileSync('data/primes.json', JSON.stringify(primes(1e6)))