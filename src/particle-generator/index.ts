

type Position = {
	x: number;
	y: number
}


export default class ParticleGenerator {

	canvas: HTMLCanvasElement
	height: number
	width: number
	id: string = 'particles'
	ctx: CanvasRenderingContext2D
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
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
	}
	createCanvas(element?: HTMLElement) {

		element ? element.append(this.canvas) : document.body.append(this.canvas)
	}

	createRoundParticle(position: Position, size: number, color?: string) {

		this.ctx.beginPath();
		this.ctx.arc(position.x, position.y, size, 0, 2 * Math.PI)
		this.ctx.fillStyle = color || 'rgb(0,0,0)'

	}

	createSquareParticle(position: Position, size: number, color?: string): void {

		this.ctx.fillStyle = color || 'rgb(0,0,0)'
		this.ctx.fillRect(position.x, position.y, size, size)

	}


	moveUp(particleType: 'circle' | 'square', startPos: Position, limit: Position, speed: number) {


		let particleMethod;
		switch (particleType) {
			case 'circle':
				particleMethod = this.createRoundParticle
				break;
			case 'square':
			default:
				particleMethod = this.createSquareParticle
				break;
		}

		if (startPos.x + 1 < limit.x) return

		requestAnimationFrame((timeStamp) => {

			while (performance.now - timeStamp > 5000)
				particleMethod({ x: startPos.x, y: startPos.y + speed }, 10, "gray", delay)
		}
		)

	}
}