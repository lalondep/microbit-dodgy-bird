input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (paused == 0) {
        paused = 1
    } else {
        paused = 0
    }
})
let ticks = 0
let emptyobstacle = 0
let bird: game.LedSprite = null
let paused = 0
paused = 0
led.setBrightness(93)
bird = game.createSprite(0, 2)
bird.set(LedSpriteProperty.Blink, 300)
let obstacles: game.LedSprite[] = []
basic.forever(function () {
    if (paused == 0) {
        while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
            obstacles.removeAt(0).delete()
        }
        for (let obstacle of obstacles) {
            obstacle.change(LedSpriteProperty.X, -1)
        }
        emptyobstacle = randint(0, 4)
        if (ticks % 3 == 0) {
            for (let index = 0; index <= 4; index++) {
                if (index != emptyobstacle) {
                    obstacles.push(game.createSprite(4, index))
                }
            }
        }
        for (let obstacle of obstacles) {
            if (obstacle.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
                music.playMelody("C5 C5 - G G - C C ", 122)
                basic.pause(2000)
                game.setScore(ticks)
                game.gameOver()
            }
        }
        ticks += 1
        basic.pause(600)
    } else {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.pause(500)
    }
})
