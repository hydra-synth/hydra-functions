module.exports = {
   noise: {
      description: "Generate [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise).",
      example: `
// noise interpolating between different scales and offsets
noise( ({time}) => Math.sin(time/10)*50 , ({time}) => Math.sin(time/2)/500 )
.out(o0)`
   },
   voronoi: {
      description: "Generate [voronoi shapes](https://en.wikipedia.org/wiki/Voronoi_diagram).",
      example: `
// default
voronoi(5,0.3,0.3).out(o0)
// fireflies
voronoi(25,2,10).color(1,1,0).brightness(0.15).out(o0)`
   },
   osc: {
      example: `
// frequency
osc( [1,10,50,100,250,500].fast(2) ).out(o0)
// frequency 2
osc( ({time}) => Math.sin(time/10) * 100 ).out(o0)
// sync
osc( 10, [-10,-1,-0.1,0,0.1,1,10], 0 ).out(o0)
// offset
osc(10,0.1, ({time}) => Math.sin(time/10) * 100 ).out(o0)`
   },
   shape: {
      example: `
// inverting blurry circle
shape(100,0.01,1).invert(({time})=>Math.sin(time)*2).out(o0)
// a... rainbow ball?
shape(5,0.5,0.1).repeat(19,19)
  .mult(osc(10,1,2))
  .rotate( ({time}) => time%360 )
  .scrollX(1,-0.25)
  .mult(shape(15,0.3,0.01)
  .rotate( ({time}) => time%360 )
  .scrollX(1,-0.25))
  .out(o0)`
   },
   gradient: {
      example: `
// gradient sequence at speeds of 1, 2 & 4
gradient([1,2,4]).out(o0)`
   },
   src: {
      description: "See `hydra-examples` repository"
   },
   solid: {
      example: `
// cycling through red, green and blue
solid([1,0,0],[0,1,0],[0,0,1],1).out(o0)`
   },
   rotate: {
      description: "Rotate texture.",
      example: `
osc(50).rotate( ({time}) => time%360 ).out(o0)
osc(10,1,1)
  .rotate( ({time}) => time%360, ({time}) => Math.sin(time*0.1)*0.05 )
  .out(o0)`
   },
   scale: {
      description: "Scale texture.",
      example: `
// default
shape().scale(1.5,1,1).out()
shape().scale(1.5,[0.25,0.5,0.75,1].fast(0.25),[3,2,1])
  .invert([0,1].fast(0.25))
  .kaleid(5)
  .kaleid(12)
  .scale( ({time})=>Math.sin(time/5)*0.5 )
  .rotate(1,1)
  .out(o0)`
   },
   pixelate: {
      description: "Pixelate texture with `pixelX` segments and `pixelY` segments.",
      example: `
// default
noise().pixelate(20,20).out(o0)
noise()
  .mult(osc(10,0.25,1))
  .scrollY(1,0.25)
  .pixelate([100,40,20,70].fast(0.25))
  .modulateRotate(src(o0).scale(0.5),0.125)
  .diff(src(o0).rotate([-0.05,0.05].fast(0.125)))
    .out(o0)`
   },
   posterize: {
      example: `
// static gradient posterized, varying bins
gradient(0).posterize( [1, 5, 15, 30] , 0.5 ).out(o0)
// static gradient posterized, varying gamma
gradient(0).posterize( 3, [0.1, 0.5, 1.0, 2.0] ).out(o0)`
   },
   shift: {

   },
   repeat: {
      example: `
// default
shape().repeat(3.0, 3.0, 0.0, 0.0).out()
// dogtooth factory
shape(1.25,0.5,0.25)
  .repeat(3, 3)
  .scale(2)
  .repeat(5, 5, ({time}) => Math.sin(time), ({time}) => Math.sin(time/2))
  .out(o0)`
   },
   modulateRepeat: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
// default
shape(4,0.9)
  .mult(osc(3,0.5,1))
  .modulateRepeat(osc(10), 3.0, 3.0, 0.5, 0.5)
  .out(o0)`
   },
   repeatX: {
      example: `
// default
shape().repeatX(3.0, 0.0).out()
osc(5,0,1)
  .rotate(1.57)
  .repeatX([1,2,5,10], ({time}) => Math.sin(time))
  .out()`
   },
   modulateRepeatX: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
// straight lines illusion
shape(4,0.9)
  .mult(osc(4,0.25,1))
  .modulateRepeatX(osc(10), 5.0, ({time}) => Math.sin(time) * 5)
  .scale(1,0.5,0.05)
  .out(o0)`
   },
   repeatY: {
      example: `
// default
shape().repeatY(3.0, 0.0).out()
osc(5,0,1)
  .repeatY([1,2,5,10], ({time}) => Math.sin(time))
  .out()`
   },
   modulateRepeatY: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
// morphing grid
shape(4,0.9)
  .mult(osc(4,0.25,1))
  .modulateRepeatY(osc(10), 5.0, ({time}) => Math.sin(time) * 5)
  .scale(1,0.5,0.05)
  .out(o0)`
   },
   kaleid: {
      description: "Kaleidoscope effect with `nSides` repetition.",
      example: `
osc(25,-0.1,0.5).kaleid(50).out(o0)`
   },
   modulateKaleid: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`kaleid`](#kaleid).",
      example: `
osc(9,-0.1,0.1)
  .modulateKaleid(osc(11,0.5,0),50)
  .scale(0.1,0.3)
  .modulate(noise(5,0.1))
  .mult(solid(1,1,0.3))
  .out(o0)`
   },
   scrollX: {
      example: `
// default
osc(10,0,1).scrollX(0.5,0).out()
// x position
osc(10,0,1).scrollX([0,0.25,0.5,0.75,1].fast(4),0).out()
// scroll speed
gradient(1).scrollX(0, ({time}) => Math.sin(time*0.05)*0.05 ).out()
gradient(0.125)
  .scrollX(0, ({time}) => Math.sin(time*0.05)*0.05 )
  .scrollY(0, ({time}) => Math.sin(time*0.01)*-0.07 )
  .pixelate([5,2,10],[15,8])
  .scale(0.15)
  .modulate(noise(1,0.25))
  .out()`
   },
   modulateScrollX: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scrollX`](#scrollX)",
      example: `
// default
voronoi(25,0,0)
  .modulateScrollX(osc(10),0.5,0)
  .out(o0)
// different scroll and speed
voronoi(25,0,0)
  .modulateScrollX(osc(10),0.5,0.25)
  .out(o0)`
   },
   scrollY: {
      example: `
// default
osc(10,0,1).scrollY(0.5,0).out()
// y position
osc(10,0,1).scrollY([0,0.25,0.5,0.75,1].fast(4),0).out()
// scroll speed
gradient(1).scrollY(0, ({time}) => Math.sin(time*0.05)*0.05 ).out()
gradient(0.125)
  .scrollX(0, ({time}) => Math.sin(time*0.05)*0.05 )
  .scrollY(0, ({time}) => Math.sin(time*0.01)*-0.07 )
  .pixelate([5,2,10],[15,8])
  .scale(0.15)
  .modulate(noise(1,0.25))
  .out()`
   },
   modulateScrollY: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scrollY`](#scrollY)",
      example: `
// default
voronoi(25,0,0)
  .modulateScrollY(osc(10),0.5,0)
  .out(o0)
// different scroll and speed
voronoi(25,0,0)
  .modulateScrollY(osc(10),0.5,0.25)
  .out(o0)`
   },
   add: {
      description: "\nAdd textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
shape().scale(0.5).add(shape(4),[0,0.25,0.5,0.75,1]).out()
osc(9,0.1,1).add(osc(13,0.5,5)).out()`
   },
   layer: {
      description: "Overlay texture based on alpha value.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
solid(1,0,0,1).layer(shape(4).color(0,1,0,({time})=>Math.sin(time*2))).out()`
   },
   blend: {
      description: "\nBlend textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
shape().scale(0.5).blend(shape(4),[0,0.25,0.5,0.75,1]).out()
osc(9,0.1,1).blend(osc(13,0.5,5)).out()`
   },
   mult: {
      description: "\nMultiply images and blend with the texture by `amount`.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
osc(9,0.1,2).mult(osc(13,0.5,5)).out()`
   },
   diff: {
      description: "\nReturn difference of textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
osc(9,0.1,1).diff(osc(13,0.5,5)).out()
osc(1,1,2)
  .diff(shape(6,1.1,0.01)
        .scale(({time})=>Math.sin(time)*0.05 + 0.9)
        .kaleid(15)
        .rotate(({time})=>time%360))
  .out()`
   },
   modulate: {
      description: "\nModulate texture.\nMore about modulation at: <https://lumen-app.com/guide/modulation/>\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: `
// chocolate whirlpool
voronoi()
  .color(0.9,0.25,0.15)
  .rotate(({time})=>(time%360)/2)
  .modulate(osc(25,0.1,0.5)
              .kaleid(50)
              .scale(({time})=>Math.sin(time*1)*0.5+1)
              .modulate(noise(0.6,0.5)),
              0.5)
  .out(o0)`
   },
   modulateScale: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scale`](#scale).",
      example: `
// cosmic radiation
gradient(5).repeat(50,50).kaleid([3,5,7,9].fast(0.5))
  .modulateScale(osc(4,-0.5,0).kaleid(50).scale(0.5),15,0)
  .out(o0)`
   },
   modulatePixelate: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`pixelate`](#pixelate)",
      example: `
// what lies beneath\nvoronoi(10,1,5).brightness(()=>Math.random()*0.15)\n  .modulatePixelate(noise(25,0.5),100)\n  .out(o0)`
   },
   modulateRotate: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`rotate`](#rotate)",
      example: `
// wormhole\nvoronoi(100,3,5)\n  .modulateRotate(osc(1,0.5,0).kaleid(50).scale(0.5),15,0)\n  .mult(osc(50,-0.1,8).kaleid(9))\n  .out(o0)`
   },
   modulateHue: {
      description: "\nChanges coordinates based on hue of second input. Based on: https://www.shadertoy.com/view/XtcSWM\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape)."
   },
   invert: {
      description: "Invert color.",
      example: `
solid(1,1,1).invert([0,1]).out(o0)`
   },
   contrast: {
      description: "Larger amount value makes higher contrast.",
      example: `
// 20Hz oscillator with contrast interpolating between 0.0-5.0\nosc(20).contrast( ({time}) => Math.sin(time) * 5 ).out(o0)`
   },
   brightness: {
      example: `
osc(20,0,2)
  .brightness( ({time}) => Math.sin(time) )
  .out(o0)`
   },
   mask: {
      example: `
// default
gradient(5).mask(voronoi(),3,0.5).invert([0,1]).out()
// algae pulse
osc(10,-0.25,1).color(0,0,1).saturate(2).kaleid(50)
  .mask(noise(25,2).modulateScale(noise(0.25,0.05)))
  .modulateScale(osc(6,-0.5,2).kaleid(50))
  .mult(osc(3,-0.25,2).kaleid(50))
  .scale(0.5,0.5,0.75)
  .out()`
   },
   luma: {
      example: `
// default
osc(10,0,1).luma(0.5,0.1).out(o0)
osc(10,0,[0,0.5,1,2]).luma([0.1,0.25,0.75,1].fast(0.25),0.1).out(o0)`
   },
   thresh: {
      example: `
// default
noise(3,0.1).thresh(0.5,0.04).out(o0)
noise(3,0.1)
  .thresh( ({time})=>Math.sin(time/2) , [0.04,0.25,0.75,1].fast(0.25) )
  .out(o0)`
   },
   color: {

   },
   saturate: {
      example: `
osc(10,0,1).saturate( ({time}) => Math.sin(time) * 10 ).out()`
   },
   hue: {

   },
   colorama: {
      description: "Shift HSV values.",
      example: `
// 20Hz oscillator source
// color sequence of Red, Green, Blue, White, Black
// colorama sequence of 0.005, 0.5, 1.0 at 1/8 speed
// output to buffer o0
osc(20)
  .color([1,0,0,1,0],[0,1,0,1,0],[0,0,1,1,0])
  .colorama([0.005,0.33,0.66,1.0].fast(0.125))
  .out(o0)`
   }
}
