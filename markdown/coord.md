---
title: Geometry
date: 2023-11-16
---
# Geometry

### rotate
```javascript
rotate( angle = 10, speed )
```
Rotate texture.
```hydra
// constant rotation
osc(50).rotate( () => time%360 ).out(o0)
```

### scale
```javascript
scale( amount = 1.5, xMult = 1, yMult = 1, offsetX = 0.5, offsetY = 0.5 )
```
Scale texture.
```hydra
// default
shape().scale(1.5,1,1).out(o0)
```

### pixelate
```javascript
pixelate( pixelX = 20, pixelY = 20 )
```
Pixelate texture with `pixelX` segments and `pixelY` segments.
```hydra
// default
noise().pixelate(20,20).out(o0)
```

### repeat
```javascript
repeat( repeatX = 3, repeatY = 3, offsetX, offsetY )
```
```hydra
// default
shape().repeat(3.0, 3.0, 0.0, 0.0).out()
```

### repeatX
```javascript
repeatX( reps = 3, offset )
```
```hydra
// default
shape().repeatX(3.0, 0.0).out()
```

### repeatY
```javascript
repeatY( reps = 3, offset )
```
```hydra
// default
shape().repeatY(3.0, 0.0).out()
```

### kaleid
```javascript
kaleid( nSides = 4 )
```
Kaleidoscope effect with `nSides` repetition.
```hydra
// default
osc(25,-0.1,0.5).kaleid(50).out(o0)
```

### scroll
```javascript
scroll( scrollX = 0.5, scrollY = 0.5, speedX, speedY )
```
```hydra
// default
shape(3).scroll(0.1,-0.3).out(o0)
```

### scrollX
```javascript
scrollX( scrollX = 0.5, speed )
```
```hydra
// default
osc(10,0,1).scrollX(0.5,0).out(o0)
```

### scrollY
```javascript
scrollY( scrollY = 0.5, speed )
```
```hydra
// default
osc(10,0,1).scrollY(0.5,0).out(o0)
```

