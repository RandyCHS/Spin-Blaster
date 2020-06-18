namespace SpriteKind {
    export const polygon = SpriteKind.create()
}
function buildGun () {
    gun = sprites.create(img`
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c b . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . c 7 . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . 8 7 . . . . . . . 
. . . . . . 8 8 5 6 . . . . . . 
. . . . . . 8 7 5 6 . . . . . . 
. . . . . c c c 6 6 6 . . . . . 
. . . . 8 8 7 7 7 5 6 6 . . . . 
. . 8 f f f c c 6 6 f f 6 6 . . 
. 8 8 8 8 6 6 7 7 7 7 5 7 6 6 . 
8 8 8 8 8 8 6 6 7 7 7 5 7 7 6 6 
8 8 8 8 8 8 6 6 7 7 7 7 5 7 6 6 
`, SpriteKind.Player)
    gun.bottom = scene.screenHeight()
    gun.left = 0
    gun.vx = 100
    gun.setFlag(SpriteFlag.BounceOnWall, true)
}
function launchSpinner () {
    myPolygon = polygon.createPolygon(Math.randomRange(3, 6), Math.randomRange(10, 20), Math.randomRange(1, 14), 0)
    mySpinner = spinner.createSpinner(myPolygon, Math.randomRange(0, 20), Direction.Random)
    myPolygon.sprite.setKind(SpriteKind.polygon)
    myPolygon.sprite.x = 0
    myPolygon.sprite.y = 30
    myPolygon.sprite.vx = Math.randomRange(20, 150)
    myPolygon.sprite.ax = Math.randomRange(-50, 50)
    myPolygon.sprite.setFlag(SpriteFlag.BounceOnWall, true)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.magicWand.play()
    info.changeScoreBy(-1)
    if (game.runtime() - priorShot > 1000) {
        particle = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . c c c . . . . . . 
. . . . . . a b a a . . . . . . 
. . . . . c b a f c a c . . . . 
. . . . c b b b f f a c c . . . 
. . . . b b f a b b a a c . . . 
. . . . c b f f b a f c a . . . 
. . . . . c a a c b b a . . . . 
. . . . . . c c c c . . . . . . 
. . . . . . . c . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
        particle.bottom = gun.top
        particle.x = gun.x
        particle.vy = -100
        particle.startEffect(effects.trail)
    }
    priorShot = game.runtime()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.polygon, function (sprite, otherSprite) {
    mySpinner.speed = 0
    otherSprite.vx = 0
    otherSprite.ax = 0
    pause(200)
    music.powerDown.play()
    otherSprite.startEffect(effects.fire, 1000)
    otherSprite.ay = 150
    mySpinner.speed = 20
    mySpinner.direction = Direction.Counterclockwise
    pause(500)
    mySpinner.direction = Direction.Clockwise
    pause(500)
    info.changeScoreBy(myPolygon.sides)
    spinner.destroySpinner(mySpinner)
    launchSpinner()
})
let particle: Sprite = null
let mySpinner: spinner.Spinner = null
let myPolygon: Polygon = null
let gun: Sprite = null
let priorShot = 0
buildGun()
launchSpinner()
info.setScore(0)
priorShot = game.runtime()
info.startCountdown(60)
