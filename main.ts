scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    next_level()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    fun.vy = -200
})
function next_level () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    level += 1
    if (level == 1) {
        tiles.setTilemap(tilemap`level00`)
        scene.cameraFollowSprite(fun)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`platformer10`)
        scene.cameraFollowSprite(fun)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`platformer12`)
        scene.cameraFollowSprite(fun)
    } else {
        game.over(true)
    }
    tiles.setTilemap(tilemap`platformer1`)
    tiles.placeOnRandomTile(fun, assets.tile`tile3`)
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        mySprite = sprites.create(img`
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            `, SpriteKind.Player)
        tiles.placeOnTile(mySprite, value)
        mySprite.follow(fun, 30)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
    } else {
        info.changeLifeBy(-1)
    }
})
let mySprite: Sprite = null
let level = 0
let fun: Sprite = null
scene.setBackgroundColor(11)
fun = sprites.create(img`
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    a a 8 8 8 8 8 8 8 8 8 8 8 8 8 a 
    a a 1 1 1 8 8 8 8 8 8 1 1 1 a a 
    a a 1 1 1 8 8 8 8 8 8 1 1 1 a a 
    a a 1 1 1 8 8 8 8 8 8 1 1 1 a a 
    a a a a a a 8 8 8 8 8 a a a a a 
    a a a a a a 8 8 8 8 a a a a a a 
    a a a a a a a a 8 a a a a a a a 
    a a a a a a a 8 8 a a a a a a a 
    a a a a a a 8 8 8 8 a a a a a a 
    a a a a a 8 8 8 8 8 8 a a a a a 
    a a a a 8 8 8 8 8 8 8 8 a a a a 
    a a a 8 8 8 8 8 8 8 8 8 8 a a a 
    a a 8 8 8 8 8 8 8 8 8 8 8 8 a a 
    a 8 8 8 8 8 8 8 8 8 8 8 8 8 8 a 
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
    `, SpriteKind.Player)
fun.ay = 500
controller.moveSprite(fun, 100, 0)
tiles.setTilemap(tilemap`platformer1`)
tiles.placeOnRandomTile(fun, assets.tile`tile3`)
info.setLife(3)
next_level()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, assets.tile`tile1`)) {
                value.vy = -150
            } else if (value.vx > 0 && value.tileKindAt(TileDirection.Right, assets.tile`tile1`)) {
                value.vy = -150
            }
        } else if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -30
        }
    }
})
