import { primes, squareCoord } from './utils/math'

const params = new URLSearchParams(document.location.search)
let limit = parseInt(params.get('limit'))
const set = primes(isNaN(limit) ? 1e5 : limit)
if (isNaN(limit)) {
  params.append('limit', 1e5.toString())
  history.pushState(null, document.title, `?${params.toString()}`)
}

const ulam = params.get('type') === 'ulam'
const sacks = params.get('type') === 'sacks'

const canvas = document.querySelector<HTMLCanvasElement>('canvas')
const ctx = canvas.getContext('2d')

setSize()

function render() {
  ctx.fillStyle = "#111"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#ff0a"
  for (const n of set) renderNum(n)
}

let scale = 1

const pts: Record<number, [x: number, y: number, r: number]> = {}

if (ulam) {
  const coord = squareCoord()
  let pi = 0
  for (let i = 0; i <= set[set.length - 1]; i++) {
    if (i < set[pi]) coord.next()
    else {
      pts[i] = [...coord.next().value, 10] as any
      pi++
    }
  }
}
else if (sacks) {
  for (const n of set) {
    const r = Math.sqrt(n)
    pts[n] = [Math.sin(2 * Math.PI * r), Math.cos(2 * Math.PI * r), r * 5]
  }
}
else
  for (const n of set) pts[n] = [Math.sin(n), Math.cos(n), n]

const ds = devicePixelRatio

function renderNum(num: number) {
  const x = pts[num][0] * pts[num][2] * scale
  const y = pts[num][1] * pts[num][2] * scale
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

canvas.addEventListener('wheel', ({ deltaY: y, deltaMode, DOM_DELTA_LINE }) => {
  if (deltaMode === DOM_DELTA_LINE) y *= 20
  scale *= (1 - y / 1000)
  render()
}, { passive: true })