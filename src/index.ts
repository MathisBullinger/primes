import {primes as genPrimes} from './utils/math'

let limit = parseInt(new URLSearchParams(document.location.search).get('limit'))
const primes = genPrimes(isNaN(limit) ? 1e5 : limit)
if (isNaN(limit)) history.pushState(null, document.title, `?limit=${1e5}`)

const canvas = document.querySelector<HTMLCanvasElement>('canvas')
const ctx = canvas.getContext('2d')

setSize()

function render() {
  ctx.fillStyle = "#111"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#ff0a"
  for (const n of primes) renderNum(n)
}

let scale = 1

const pts: Record<number, [x: number, y: number]> = {}
for (const n of primes) pts[n] = [Math.sin(n), Math.cos(n)]

const ds = devicePixelRatio * 1

function renderNum(num: number) {
  const dist = num * scale
  const x = pts[num][0] * dist
  const y = pts[num][1] * dist

  ctx.fillRect(canvas.width / 2 + x - ds, canvas.height / 2 + y - ds, ds * 2, ds * 2)
}

function setSize() {
  canvas.width = window.innerWidth * devicePixelRatio
  canvas.height = window.innerHeight * devicePixelRatio
}

render()

window.addEventListener('resize', () => {
  setSize()
  render()
})

canvas.addEventListener('wheel', ({ deltaY: y }) => {
  scale *= (1 - y / 1000)
  render()
}, { passive: true })