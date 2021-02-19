const canvas = document.querySelector<HTMLCanvasElement>('canvas')
const ctx = canvas.getContext('2d')

setSize()

function setSize() {
  canvas.width = window.innerWidth * devicePixelRatio
  canvas.height = window.innerHeight * devicePixelRatio
}