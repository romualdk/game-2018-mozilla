import { createCanvas2d, fillWithColor, repeatSpriteHorizontaly } from './Canvas.js'

class Sky {
  constructor (screen, tileset) {
    this.tileset = tileset
    this.screen = screen
    this.reset()
  }

  reset () {
    this.x = 0
    this.speed = 0

    let screen = this.screen
    let tileset = this.tileset
    let sprite = tileset.spritesheet.cloud

    let width = Math.ceil(screen.width / sprite.width) * sprite.width
    let height = screen.height
    let halfHeight = Math.floor(height / 2)

    let sky = createCanvas2d(width, height)

    let skyColor = tileset.colorByTileName('sky')
    let cloudColor = tileset.colorByTileName('cloud')

    fillWithColor(sky, 0, 0, width, halfHeight, skyColor)
    fillWithColor(sky, 0, halfHeight, width, height - halfHeight, cloudColor)

    repeatSpriteHorizontaly(sky, tileset, sprite, halfHeight - sprite.height)

    this.image = sky
  }

  update (dt) {
    this.x += this.speed * dt
    if (this.x < 0) {
      this.x += this.image.width
    }
  }

  render () {
    let x = Math.floor(this.x)
    let width = this.image.width
    let height = this.image.height

    this.screen.ctx.drawImage(this.image, x, 0)
    this.screen.ctx.drawImage(this.image, 0, 0, width, height, Math.floor(x - width), 0, width, height)
  }
}

export default Sky