---
title: External Sources
date: 2023-11-16
---
# External Sources

### initCam
```javascript
initCam( index )
```
```hydra
// default
s0.initCam()
src(s0).invert().out(o0)
```

### initImage
```javascript
initImage( url )
```
```hydra
// default
s0.initImage("https://upload.wikimedia.org/wikipedia/commons/2/25/Hydra-Foto.jpg")
osc(6).modulate(src(s0),1).out(o0)
```

### initVideo
```javascript
initVideo( url )
```
```hydra
// default
s0.initVideo("https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4")
src(s0).modulate(noise(3)).out(o0)
```

### init
```javascript
init( options )
```
```hydra
// load canvas
canvas = document.createElement("canvas")
canvas.width = 200
canvas.height = 200
ctx = canvas.getContext("2d")
ctx.fillStyle = "crimson"
ctx.fillRect(100,50,100,100)
s0.init({src:canvas})
src(s0).modulate(osc().kaleid(999)).out(o0)
```

### initStream
```javascript
initStream( url )
```


### initScreen
```javascript
initScreen(  )
```
```hydra
// select a window
s0.initScreen()
src(s0).colorama(0.5).out(o0)
```

