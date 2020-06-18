namespace SpriteKind {
    export const polygon = SpriteKind.create()
}
function launchSpinner () {
    myPolygon = polygon.createPolygon(Math.randomRange(3, 6), Math.randomRange(10, 20), Math.randomRange(1, 14), 0)
    mySpinner = spinner.createSpinner(myPolygon, Math.randomRange(0, 20), Direction.Random)
    myPolygon.sprite.setKind(SpriteKind.polygon)
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
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
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
    particle.vx = -100
    particle.startEffect(effects.trail)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.polygon, function (sprite, otherSprite) {
	
})
let particle: Sprite = null
let gun: Sprite = null
let mySpinner: spinner.Spinner = null
let myPolygon: Polygon = null
buildGun()
