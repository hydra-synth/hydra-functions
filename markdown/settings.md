---
title: Synth Settings
date: 2023-11-16
---
# Synth Settings

### render
```javascript
render( texture = all )
```
```hydra
// default
osc(30,0.1,1.5).out(o0)
noise().out(o1)
solid(1).out(o2)
gradient().out(o3)
render()
```

### update
```javascript
update(  )
```
```hydra
// update is called every frame
b = 0
update = () => b += 0.01 * Math.sin(time)
shape().scrollX(()=>b).out(o0)
```

### setResolution
```javascript
setResolution( width, height )
```
```hydra
// make the canvas small (100 pixel x 100 pixel)
setResolution(100,100)
osc().out(o0)
```

### hush
```javascript
hush(  )
```
```hydra
// clear the buffers
osc().out(o0)
hush()
```

### setFunction
```javascript
setFunction( options )
```
```hydra
// from https://www.shadertoy.com/view/XsfGzn
setFunction({
  name: 'chroma',
  type: 'color',
  inputs: [
    ],
  glsl: `
   float maxrb = max( _c0.r, _c0.b );
   float k = clamp( (_c0.g-maxrb)*5.0, 0.0, 1.0 );
   float dg = _c0.g; 
   _c0.g = min( _c0.g, maxrb*0.8 ); 
   _c0 += vec4(dg - _c0.g);
   return vec4(_c0.rgb, 1.0 - k);
`})
osc(60,0.1,1.5).chroma().out(o0)
```

### speed
```javascript
speed = 1
```
```hydra
// change overall speed
speed = 3
osc(60,0.1,[0,1.5]).out(o0)
```

### bpm
```javascript
bpm = 30
```
```hydra
// change array speed
bpm = 60
osc(60,0.1,[0,1.5]).out(o0)
```

### width
```javascript
width
```
```hydra
shape(99).scrollX(() => -mouse.x / width).out(o0)
```

### height
```javascript
height
```
```hydra
shape(99).scrollY(() => -mouse.y / height).out(o0)
```

### time
```javascript
time
```
```hydra
// default
shape(2,0.8).kaleid(()=>6+Math.sin(time)*4).out(o0)
```

### mouse
```javascript
mouse = { x, y }
```
```hydra
shape(99).scroll(
  () => -mouse.x / width,
  () => -mouse.y / height)
  .out(o0)
```

