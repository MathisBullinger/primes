import primes from '../data/primes.json'

const canvas = document.querySelector<HTMLCanvasElement>('canvas')
const ctx = canvas.getContext('2d')

setSize()

function render() {
  ctx.fillStyle = "#111"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // renderAxes()
  ctx.fillStyle = "#ff06"
  for (const n of primes) renderNum(n)
}

let scale = 1

function renderAxes() {
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 0.5
  ctx.moveTo(0, canvas.height / 2)
  ctx.lineTo(canvas.width, canvas.height / 2)
  ctx.stroke()
  ctx.moveTo(canvas.width / 2, 0)
  ctx.lineTo(canvas.width / 2, canvas.height)
  ctx.stroke()
}

function renderNum(num: number) {
  const dist = num * scale
  const x = Math.sin(num) * dist
  const y = Math.cos(num) * dist

  ctx.beginPath()
  ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, 2 * devicePixelRatio, 0, Math.PI * 2)
  ctx.fill()
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
})