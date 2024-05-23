




export default class ParticleGenerator {

	canvas: HTMLCanvasElement
	height: number
	width: number
	id: string = 'particles'
	constructor(canvasElement?: HTMLCanvasElement) {

		if (canvasElement) {
			this.canvas = canvasElement
			this.height = canvasElement.height | 300
			this.width = canvasElement.width | 300
		}
		else {
			this.canvas = document.createElement('canvas')
			this.height = 300
			this.width = 300
		}
		this.canvas.id = this.id

	}
	createCanvas(element?: HTMLElement) {

		element ? element.append(this.canvas) : document.body.append(this.canvas)
	}


}