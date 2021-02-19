const canvas = document.querySelector<HTMLCanvasElement>('canvas')
const ctx = canvas.getContext('2d')

setSize()

// axes
ctx.strokeStyle = '#fff8'
ctx.lineWidth = 0.5
ctx.moveTo(0, canvas.height / 2)
ctx.lineTo(canvas.width, canvas.height / 2)
ctx.stroke()
ctx.moveTo(canvas.width / 2, 0)
ctx.lineTo(canvas.width / 2, canvas.height)
ctx.stroke()

ctx.fillStyle = '#ff08'
const scale = 1

function renderNum(num: number) {
  const dist = num * scale
  const x = Math.sin(num) * dist
  const y = Math.cos(num) * dist
  
  ctx.beginPath()
  ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, 2 * devicePixelRatio, 0, Math.PI * 2)
  ctx.fill()
}

for (let i = 0; i < 1000; i++) renderNum(i)

function setSize() {
  canvas.width = window.innerWidth * devicePixelRatio
  canvas.height = window.innerHeight * devicePixelRatio
}