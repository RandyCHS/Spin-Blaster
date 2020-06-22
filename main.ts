namespace SpriteKind {
    export const polygon = SpriteKind.create()
    export const none = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.polygon, function (sprite, otherSprite) {
    if (!(b_in_overlap)) {
        b_in_overlap = true
        mySpinner.speed = 0
        otherSprite.vx = 0
        otherSprite.ax = 0
        pause(200)
        music.playTone(262, music.beat(BeatFraction.Half))
        otherSprite.startEffect(effects.fire, 1000)
        otherSprite.ay = 150
        mySpinner.speed = 20
        pause(300)
        mySpinner.direction = Direction.Reverse
        pause(300)
        mySpinner.direction = Direction.Reverse
        pause(500)
        info.changeScoreBy(myPolygon.sides)
        spinner.destroySpinner(mySpinner)
        pause(500)
        launchSpinner()
        b_in_overlap = false
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(b_changing_level)) {
        level = 1
        level_changed()
    }
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
    gun.right = 120
    gun.vx = 50 + level * 50
    gun.setFlag(SpriteFlag.BounceOnWall, true)
}
function gun_charging () {
    gun.image.replace(7, 2)
    b_gun_ready = false
    start_gun_charging_time = game.runtime()
}
function launchSpinner () {
    radius = randint(r_min[level], r_max[level])
    myPolygon = polygon.createPolygon(randint(3, 10), radius, randint(1, 14), 0)
    mySpinner = spinner.createSpinner(myPolygon, randint(0, 20), Direction.Random)
    myPolygon.spokes = true
    myPolygon.sprite.setKind(SpriteKind.polygon)
    myPolygon.sprite.x = randint(0, 160)
    myPolygon.sprite.y = 30
    myPolygon.sprite.vx = randint(20, 150)
    myPolygon.sprite.ax = randint(-50, 50)
    myPolygon.sprite.setFlag(SpriteFlag.BounceOnWall, true)
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
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(b_changing_level)) {
        level = 0
        level_changed()
    }
})
function start_game () {
    output.say(Level_name[level], 3000)
    info.setScore(0)
    info.startCountdown(60)
    b_gun_ready = true
    start_gun_charging_time = game.runtime()
    buildGun()
    launchSpinner()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(b_changing_level)) {
        level = 2
        level_changed()
    }
})
function level_changed () {
    b_changing_level = true
    output.say(Level_name[level], 3000)
    spinner.destroySpinner(mySpinner)
    gun.destroy()
    pause(1000)
    start_game()
    b_changing_level = false
}
function gun_ready () {
    gun.image.replace(2, 7)
    b_gun_ready = true
}
let particle: Sprite = null
let radius = 0
let start_gun_charging_time = 0
let b_gun_ready = false
let gun: Sprite = null
let myPolygon: Polygon = null
let mySpinner: spinner.Spinner = null
let b_changing_level = false
let b_in_overlap = false
let output: Sprite = null
let r_max: number[] = []
let r_min: number[] = []
let Level_name: string[] = []
let level = 0
let T = "Buttons:  "
T = "" + T + "A = shoots. Left = Beginner. "
T = "" + T + "Up = Normal. Right = Advanced."
game.showLongText(T, DialogLayout.Center)
level = 1
Level_name = ["Beginner", "Normal", "Advanced"]
r_min = [30, 10, 10]
r_max = [50, 30, 20]
output = sprites.create(img`
. 
`, SpriteKind.none)
output.y = 80
b_in_overlap = false
b_changing_level = false
start_game()
game.onUpdate(function () {
    if (game.runtime() - start_gun_charging_time > 1000) {
        if (!(b_in_overlap)) {
            gun_ready()
        }
    }
})
