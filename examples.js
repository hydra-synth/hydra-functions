module.exports = {
   "noise":{
      "description":"Generate [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise).",
      "example":"\n// noise interpolating between different scales and offsets\nnoise( ({time}) => Math.sin(time/10)*50 , ({time}) => Math.sin(time/2)/500 )\n.out(o0)"
   },
   "voronoi":{
      "description":"Generate [voronoi shapes](https://en.wikipedia.org/wiki/Voronoi_diagram).",
      "example":"\n// default\nvoronoi(5,0.3,0.3).out(o0)\n// fireflies\nvoronoi(25,2,10).color(1,1,0).brightness(0.15).out(o0)"
   },
   "osc":{
      "example":"\n// frequency\nosc( [1,10,50,100,250,500].fast(2) ).out(o0)\n// frequency 2\nosc( ({time}) => Math.sin(time/10) * 100 ).out(o0)\n// sync\nosc( 10, [-10,-1,-0.1,0,0.1,1,10], 0 ).out(o0)\n// offset\nosc(10,0.1, ({time}) => Math.sin(time/10) * 100 ).out(o0)"
   },
   "shape":{
      "example":"\n// inverting blurry circle\nshape(100,0.01,1).invert(({time})=>Math.sin(time)*2).out(o0)\n// a... rainbow ball?\nshape(5,0.5,0.1).repeat(19,19)\n  .mult(osc(10,1,2))\n  .rotate( ({time}) => time%360 )\n  .scrollX(1,-0.25)\n  .mult(shape(15,0.3,0.01)\n  .rotate( ({time}) => time%360 )\n  .scrollX(1,-0.25))\n  .out(o0)"
   },
   "gradient":{
      "example":"\n// gradient sequence at speeds of 1, 2 & 4\ngradient([1,2,4]).out(o0)"
   },
   "src":{
      "description":"See `hydra-examples` repository"
   },
   "solid":{
      "example":"\n// cycling through red, green and blue\nsolid([1,0,0],[0,1,0],[0,0,1],1).out(o0)"
   },
   "rotate":{
      "description":"Rotate texture.",
      "example":"\nosc(50).rotate( ({time}) => time%360 ).out(o0)\nosc(10,1,1)\n  .rotate( ({time}) => time%360, ({time}) => Math.sin(time*0.1)*0.05 )\n  .out(o0)"
   },
   "scale":{
      "description":"Scale texture.",
      "example":"\n// default\nshape().scale(1.5,1,1).out()\nshape().scale(1.5,[0.25,0.5,0.75,1].fast(0.25),[3,2,1])\n  .invert([0,1].fast(0.25))\n  .kaleid(5)\n  .kaleid(12)\n  .scale( ({time})=>Math.sin(time/5)*0.5 )\n  .rotate(1,1)\n  .out(o0)"
   },
   "pixelate":{
      "description":"Pixelate texture with `pixelX` segments and `pixelY` segments.",
      "example":"\n// default\nnoise().pixelate(20,20).out(o0)\nnoise()\n  .mult(osc(10,0.25,1))\n  .scrollY(1,0.25)\n  .pixelate([100,40,20,70].fast(0.25))\n  .modulateRotate(src(o0).scale(0.5),0.125)\n  .diff(src(o0).rotate([-0.05,0.05].fast(0.125)))\n  .out(o0)"
   },
   "posterize":{
      "example":"\n// static gradient posterized, varying bins\ngradient(0).posterize( [1, 5, 15, 30] , 0.5 ).out(o0)\n// static gradient posterized, varying gamma\ngradient(0).posterize( 3, [0.1, 0.5, 1.0, 2.0] ).out(o0)"
   },
   "shift":{

   },
   "repeat":{
      "example":"\n// default\nshape().repeat(3.0, 3.0, 0.0, 0.0).out()\n// dogtooth factory\nshape(1.25,0.5,0.25)\n  .repeat(3, 3)\n  .scale(2)\n  .repeat(5, 5, ({time}) => Math.sin(time), ({time}) => Math.sin(time/2))\n  .out(o0)"
   },
   "modulateRepeat":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"\n// default\nshape(4,0.9)\n  .mult(osc(3,0.5,1))\n  .modulateRepeat(osc(10), 3.0, 3.0, 0.5, 0.5)\n  .out(o0)"
   },
   "repeatX":{
      "example":"\n// default\nshape().repeatX(3.0, 0.0).out()\nosc(5,0,1)\n  .rotate(1.57)\n  .repeatX([1,2,5,10], ({time}) => Math.sin(time))\n  .out()"
   },
   "modulateRepeatX":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"\n// straight lines illusion\nshape(4,0.9)\n  .mult(osc(4,0.25,1))\n  .modulateRepeatX(osc(10), 5.0, ({time}) => Math.sin(time) * 5)\n  .scale(1,0.5,0.05)\n  .out(o0)"
   },
   "repeatY":{
      "example":"\n// default\nshape().repeatY(3.0, 0.0).out()\nosc(5,0,1)\n  .repeatY([1,2,5,10], ({time}) => Math.sin(time))\n  .out()"
   },
   "modulateRepeatY":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"\n// morphing grid\nshape(4,0.9)\n  .mult(osc(4,0.25,1))\n  .modulateRepeatY(osc(10), 5.0, ({time}) => Math.sin(time) * 5)\n  .scale(1,0.5,0.05)\n  .out(o0)"
   },
   "kaleid":{
      "description":"Kaleidoscope effect with `nSides` repetition.",
      "example":"osc(25,-0.1,0.5).kaleid(50).out(o0)"
   },
   "modulateKaleid":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`kaleid`](#kaleid).",
      "example":"\nosc(9,-0.1,0.1)\n  .modulateKaleid(osc(11,0.5,0),50)\n  .scale(0.1,0.3)\n  .modulate(noise(5,0.1))\n  .mult(solid(1,1,0.3))\n  .out(o0)"
   },
   "scrollX":{
      "example":"\n// default\nosc(10,0,1).scrollX(0.5,0).out()\n// x position\nosc(10,0,1).scrollX([0,0.25,0.5,0.75,1].fast(4),0).out()\n// scroll speed\ngradient(1).scrollX(0, ({time}) => Math.sin(time*0.05)*0.05 ).out()\ngradient(0.125)\n  .scrollX(0, ({time}) => Math.sin(time*0.05)*0.05 )\n  .scrollY(0, ({time}) => Math.sin(time*0.01)*-0.07 )\n  .pixelate([5,2,10],[15,8])\n  .scale(0.15)\n  .modulate(noise(1,0.25))\n  .out()"
   },
   "modulateScrollX":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scrollX`](#scrollX)",
      "example":"\n// default\nvoronoi(25,0,0)\n  .modulateScrollX(osc(10),0.5,0)\n  .out(o0)\n// different scroll and speed\nvoronoi(25,0,0)\n  .modulateScrollX(osc(10),0.5,0.25)\n  .out(o0)"
   },
   "scrollY":{
      "example":"\n// default\nosc(10,0,1).scrollY(0.5,0).out()\n// y position\nosc(10,0,1).scrollY([0,0.25,0.5,0.75,1].fast(4),0).out()\n// scroll speed\ngradient(1).scrollY(0, ({time}) => Math.sin(time*0.05)*0.05 ).out()\ngradient(0.125)\n  .scrollX(0, ({time}) => Math.sin(time*0.05)*0.05 )\n  .scrollY(0, ({time}) => Math.sin(time*0.01)*-0.07 )\n  .pixelate([5,2,10],[15,8])\n  .scale(0.15)\n  .modulate(noise(1,0.25))\n  .out()"
   },
   "modulateScrollY":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scrollY`](#scrollY)",
      "example":"\n// default\nvoronoi(25,0,0)\n  .modulateScrollY(osc(10),0.5,0)\n  .out(o0)\n// different scroll and speed\nvoronoi(25,0,0)\n  .modulateScrollY(osc(10),0.5,0.25)\n  .out(o0)"
   },
   "add":{
      "description":"\nAdd textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"\nshape().scale(0.5).add(shape(4),[0,0.25,0.5,0.75,1]).out()\nosc(9,0.1,1).add(osc(13,0.5,5)).out()"
   },
   "layer":{
      "description":"Overlay texture based on alpha value.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"solid(1,0,0,1).layer(shape(4).color(0,1,0,({time})=>Math.sin(time*2))).out()"
   },
   "blend":{
      "description":"\nBlend textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"\nshape().scale(0.5).blend(shape(4),[0,0.25,0.5,0.75,1]).out()\nosc(9,0.1,1).blend(osc(13,0.5,5)).out()"
   },
   "mult":{
      "description":"\nMultiply images and blend with the texture by `amount`.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"osc(9,0.1,2).mult(osc(13,0.5,5)).out()"
   },
   "diff":{
      "description":"\nReturn difference of textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"\nosc(9,0.1,1).diff(osc(13,0.5,5)).out()\nosc(1,1,2)\n  .diff(shape(6,1.1,0.01)\n        .scale(({time})=>Math.sin(time)*0.05 + 0.9)\n        .kaleid(15)\n        .rotate(({time})=>time%360))\n  .out()"
   },
   "modulate":{
      "description":"\nModulate texture.\nMore about modulation at: <https://lumen-app.com/guide/modulation/>\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      "example":"\n// chocolate whirlpool\nvoronoi()\n  .color(0.9,0.25,0.15)\n  .rotate(({time})=>(time%360)/2)\n  .modulate(osc(25,0.1,0.5)\n              .kaleid(50)\n              .scale(({time})=>Math.sin(time*1)*0.5+1)\n              .modulate(noise(0.6,0.5)),\n              0.5)\n  .out(o0)"
   },
   "modulateScale":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scale`](#scale).",
      "example":"\n// cosmic radiation\ngradient(5).repeat(50,50).kaleid([3,5,7,9].fast(0.5))\n  .modulateScale(osc(4,-0.5,0).kaleid(50).scale(0.5),15,0)\n  .out(o0)"
   },
   "modulatePixelate":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`pixelate`](#pixelate)",
      "example":"\n// what lies beneath\nvoronoi(10,1,5).brightness(()=>Math.random()*0.15)\n  .modulatePixelate(noise(25,0.5),100)\n  .out(o0)"
   },
   "modulateRotate":{
      "description":"\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`rotate`](#rotate)",
      "example":"\n// wormhole\nvoronoi(100,3,5)\n  .modulateRotate(osc(1,0.5,0).kaleid(50).scale(0.5),15,0)\n  .mult(osc(50,-0.1,8).kaleid(9))\n  .out(o0)"
   },
   "modulateHue":{
      "description":"\nChanges coordinates based on hue of second input. Based on: https://www.shadertoy.com/view/XtcSWM\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape)."
   },
   "invert":{
      "description":"Invert color.",
      "example":"solid(1,1,1).invert([0,1]).out(o0)"
   },
   "contrast":{
      "description":"Larger amount value makes higher contrast.",
      "example":"\n// 20Hz oscillator with contrast interpolating between 0.0-5.0\nosc(20).contrast( ({time}) => Math.sin(time) * 5 ).out(o0)"
   },
   "brightness":{
      "example":"\nosc(20,0,2)\n  .brightness( ({time}) => Math.sin(time) )\n  .out(o0)"
   },
   "mask":{
      "example":"\n// default\ngradient(5).mask(voronoi(),3,0.5).invert([0,1]).out()\n// algae pulse\nosc(10,-0.25,1).color(0,0,1).saturate(2).kaleid(50)\n  .mask(noise(25,2).modulateScale(noise(0.25,0.05)))\n  .modulateScale(osc(6,-0.5,2).kaleid(50))\n  .mult(osc(3,-0.25,2).kaleid(50))\n  .scale(0.5,0.5,0.75)\n  .out()"
   },
   "luma":{
      "example":"\n// default\nosc(10,0,1).luma(0.5,0.1).out(o0)\nosc(10,0,[0,0.5,1,2]).luma([0.1,0.25,0.75,1].fast(0.25),0.1).out(o0)"
   },
   "thresh":{
      "example":"\n// default\nnoise(3,0.1).thresh(0.5,0.04).out(o0)\nnoise(3,0.1)\n  .thresh( ({time})=>Math.sin(time/2) , [0.04,0.25,0.75,1].fast(0.25) )\n  .out(o0)"
   },
   "color":{

   },
   "saturate":{
      "example":"osc(10,0,1).saturate( ({time}) => Math.sin(time) * 10 ).out()"
   },
   "hue":{

   },
   "colorama":{
      "description":"Shift HSV values.",
      "example":"\n// 20Hz oscillator source\n// color sequence of Red, Green, Blue, White, Black\n// colorama sequence of 0.005, 0.5, 1.0 at 1/8 speed\n// output to buffer o0\nosc(20)\n  .color([1,0,0,1,0],[0,1,0,1,0],[0,0,1,1,0])\n  .colorama([0.005,0.33,0.66,1.0].fast(0.125))\n  .out(o0)"
   }
}
