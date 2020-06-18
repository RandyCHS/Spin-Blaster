namespace SpriteKind {
    export const polygon = SpriteKind.create()
    export const none = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.polygon, function (sprite, otherSprite) {
    b_in_overlap = true
    mySpinner.speed = 0
    otherSprite.vx = 0
    otherSprite.ax = 0
    pause(200)
    music.powerDown.play()
    otherSprite.startEffect(effects.fire, 1000)
    otherSprite.ay = 150
    mySpinner.speed = 20
    mySpinner.direction = Direction.Reverse
    pause(300)
    mySpinner.direction = Direction.Reverse
    pause(500)
    info.changeScoreBy(myPolygon.sides)
    spinner.destroySpinner(mySpinner)
    pause(200)
    b_in_overlap = false
    launchSpinner()
})
function buildGun () {
    gun = sprites.create(img`
. . . . . . . c 7 . . . . . . . 
. . . . . . . c 7 . . . . . . . 
. . . . . . . c 7 . . . . . . . 
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
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
`, SpriteKind.Player)
    gun.bottom = scene.screenHeight()
    gun.left = 0
    gun.vx = 50
    gun.setFlag(SpriteFlag.BounceOnWall, true)
}
function gun_charging () {
    gun.image.replace(7, 2)
    b_gun_ready = false
    start_gun_charging_time = game.runtime()
}
function launchSpinner () {
    myPolygon = polygon.createPolygon(Math.randomRange(3, 6), Math.randomRange(20, 40), Math.randomRange(1, 14), 0)
    mySpinner = spinner.createSpinner(myPolygon, Math.randomRange(0, 20), Direction.Random)
    myPolygon.spokes = true
    myPolygon.sprite.setKind(SpriteKind.polygon)
    myPolygon.sprite.x = 0
    myPolygon.sprite.y = 30
    myPolygon.sprite.vx = Math.randomRange(20, 150)
    myPolygon.sprite.ax = Math.randomRange(-50, 50)
    myPolygon.sprite.setFlag(SpriteFlag.BounceOnWall, true)
    output.say(myPolygon.type, 2000)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    info.changeScoreBy(-1)
    if (b_gun_ready) {
        music.magicWand.play()
        particle = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . 2 2 2 . . . . . . 
. . . . . . 4 b 4 4 . . . . . . 
. . . . . 2 b 4 f 2 4 2 . . . . 
. . . . 2 b b b f f 4 2 2 . . . 
. . . . b b f 4 b b 4 4 2 . . . 
. . . . 2 b f f b 4 f 2 4 . . . 
. . . . . 2 4 4 2 b b 4 . . . . 
. . . . . . 2 2 2 2 . . . . . . 
. . . . . . . 2 . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
        particle.bottom = gun.top
        particle.x = gun.x
        particle.vy = -100
        particle.startEffect(effects.trail)
    } else {
        gun.startEffect(effects.ashes)
    }
    gun_charging()
})
function gun_ready () {
    gun.image.replace(2, 7)
    b_gun_ready = true
}
let particle: Sprite = null
let gun: Sprite = null
let myPolygon: Polygon = null
let mySpinner: spinner.Spinner = null
let start_gun_charging_time = 0
let b_gun_ready = false
let output: Sprite = null
let b_in_overlap = false
b_in_overlap = false
output = sprites.create(img`
. 
`, SpriteKind.none)
output.y = 80
buildGun()
launchSpinner()
info.setScore(0)
b_gun_ready = true
start_gun_charging_time = game.runtime()
info.startCountdown(60)
game.onUpdate(function () {
    if (game.runtime() - start_gun_charging_time > 1000) {
        if (!(b_in_overlap)) {
            gun_ready()
        }
    }
})
