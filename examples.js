module.exports = {
   noise: {
      description: "Generate [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise).",
      example: [
         {
            code: `noise(10, 0.1).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
noise( () => Math.sin(time/10)*50 , () => Math.sin(time/2)/500 )
.out(o0)`,
            comments: {
               en: "noise interpolating between different scales and offsets",
               ja: "noise の異なるスケールやオフセットを補間",
            }
         }
      ]
   },
   voronoi: {
      description: "Generate [voronoi shapes](https://en.wikipedia.org/wiki/Voronoi_diagram).",
      example: [
         {
            code: `voronoi(5,0.3,0.3).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `voronoi(25,2,10).color(1,1,0).brightness(0.15).out(o0)`,
            comments: {
               en: "fireflies",
               ja: "蛍",
            }
         }
      ]
   },
   osc: {
      example: [
         {
            code: `osc( [1,10,50,100,250,500].fast(2) ).out(o0)`,
            comments: {
               en: "frequency",
               ja: "周波数",
            }
         },
         {
            code: `osc( () => Math.sin(time/10) * 100 ).out(o0)`,
            comments: {
               en: "frequency 2",
               ja: "周波数 2",
            }
         },
         {
            code: `osc( 10, [-10,-1,-0.1,0,0.1,1,10], 0 ).out(o0)`,
            comments: {
               en: "sync",
               ja: "シンク（同期）",
            }
         },
         {
            code: `osc(10,0.1, ({time}) => Math.sin(time/10) * 100 ).out(o0)`,
            comments: {
               en: "offset",
               ja: "オフセット",
            }
         },
      ]
   },
   shape: {
      example: [
         {
            code: `shape(3,0.5,0.001).out(o0)`,
            comments: {
               en: "triangle",
               ja: "三角形",
            }
         },
         {
            code: `shape(100,0.5,0.001).out(o0)`,
            comments: {
               en: "ellipse",
               ja: "楕円",
            }
         },
         {
            code: `shape(100,0.01,1).invert(()=>Math.sin(time)*2).out(o0)`,
            comments: {
               en: "inverting blurry circle",
               ja: "反転するぼかした円",
            }
         },
         {
            code: `
shape(5,0.5,0.1).repeat(19,19)
  .mult(osc(10,1,2))
  .rotate( ({time}) => time%360 )
  .scrollX(1,-0.25)
  .mult(shape(15,0.3,0.01)
  .rotate( ({time}) => time%360 )
  .scrollX(1,-0.25))
  .out(o0)`,
            comments: {
               en: "a... rainbow ball?",
               ja: "虹色のボール…？",
            }
         },
      ]
   },
   gradient: {
      example: [
         {
            code: `gradient([1,2,4]).out(o0)`,
            comments: {
               en: "gradient sequence at speeds of 1, 2 & 4",
               ja: "グラデーションのスピードを 1, 2, 4 の順に変える",
            }
         },
         {
            code: `gradient(0).r().repeat(16,1).scrollX(0,0.1).out(o0)`,
            comments: {
               en: "saw oscillator",
               ja: "のこぎり波",
            }
         },
      ]
   },
   src: {
      description: "See `hydra-examples` repository",
      example: [
         {
            code: `src(o0).modulate(noise(3),0.005).blend(shape(4),0.01).out(o0)`,
            comments: {
               en: "feedback",
               ja: "フィードバック",
            }
         },
      ]
   },
   solid: {
      example: [
         {
            code: `solid([1,0,0],[0,1,0],[0,0,1],1).out(o0)`,
            comments: {
               en: "cycling through red, green and blue",
               ja: "赤、緑、青を行き来する",
            }
         },
      ]
   },
   rotate: {
      description: "Rotate texture.",
      example: [
         {
            code: `osc(50).rotate( () => time%360 ).out(o0)`,
            comments: {
               en: "constant rotation",
               ja: "一定速度で回転",
            }
         },
         {
            code: `
osc(10,1,1)
  .rotate( () => time%360, () => Math.sin(time*0.1)*0.05 )
  .out(o0)`,
            comments: {
               en: "modulate rotation speed",
               ja: "回転速度を変化させる",
            }
         },
      ]
   },
   scale: {
      description: "Scale texture.",
      example: [
         {
            code: `shape().scale(1.5,1,1).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
shape().scale(1.5,[0.25,0.5,0.75,1].fast(0.25),[3,2,1])
  .invert([0,1].fast(0.25))
  .kaleid(5)
  .kaleid(12)
  .scale( ()=>Math.sin(time/5)*0.5 )
  .rotate(1,1)
  .out(o0)`,
            comments: {
               en: "flower",
               ja: "花",
            }
         },
      ],
   },
   pixelate: {
      description: "Pixelate texture with `pixelX` segments and `pixelY` segments.",
      example: [
         {
            code: `noise().pixelate(20,20).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `noise().pixelate(2000,1).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
         {
            code: `
noise()
  .mult(osc(10,0.25,1))
  .scrollY(1,0.25)
  .pixelate([100,40,20,70].fast(0.25))
  .modulateRotate(src(o0).scale(0.5),0.125)
  .diff(src(o0).rotate([-0.05,0.05].fast(0.125)))
    .out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   posterize: {
      example: [
         {
            code: `gradient(0).posterize( [1, 5, 15, 30] , 0.5 ).out(o0)`,
            comments: {
               en: "static gradient posterized, varying bins",
               ja: "",
            }
         },
         {
            code: `gradient(0).posterize( 3, [0.1, 0.5, 1.0, 2.0] ).out(o0)`,
            comments: {
               en: "static gradient posterized, varying gamma",
               ja: "",
            }
         },
         {
            code: `
osc().posterize(3,1)
  .layer(osc().pixelate(16,1)
    .mask(shape(2,0.5,0.001).scrollY(-0.25)))
  .out(o0)`,
            comments: {
               en: "posterize (top); compare with pixelate (bottom)",
               ja: "",
            }
         },
      ],
   },
   shift: {
      example: [
         {
            code: `osc().shift(0.1,0.9,0.3).out()`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ]
   },
   repeat: {
      example: [
         {
            code: `shape().repeat(3.0, 3.0, 0.0, 0.0).out()`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
shape(1.25,0.5,0.25)
  .repeat(3, 3)
  .scale(2)
  .repeat(5, 5, () => Math.sin(time), () => Math.sin(time/2))
  .out(o0)`,
            comments: {
               en: "dogtooth factory",
               ja: "",
            }
         },
      ],
   },
   modulateRepeat: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `
shape(4,0.9)
  .mult(osc(3,0.5,1))
  .modulateRepeat(osc(10), 3.0, 3.0, 0.5, 0.5)
  .out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   repeatX: {
      example: [
         {
            code: `shape().repeatX(3.0, 0.0).out()`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
osc(5,0,1)
  .rotate(1.57)
  .repeatX([1,2,5,10], ({time}) => Math.sin(time))
  .out()`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   modulateRepeatX: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `
shape(4,0.9)
  .mult(osc(4,0.25,1))
  .modulateRepeatX(osc(10), 5.0, ({time}) => Math.sin(time) * 5)
  .scale(1,0.5,0.05)
  .out(o0)`,
            comments: {
               en: "straight lines illusion",
               ja: "",
            }
         },
      ],
   },
   repeatY: {
      example: [
         {
            code: `shape().repeatY(3.0, 0.0).out()`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
osc(5,0,1)
  .repeatY([1,2,5,10], ({time}) => Math.sin(time))
  .out()`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   modulateRepeatY: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `
shape(4,0.9)
  .mult(osc(4,0.25,1))
  .modulateRepeatY(osc(10), 5.0, ({time}) => Math.sin(time) * 5)
  .scale(1,0.5,0.05)
  .out(o0)`,
            comments: {
               en: "morphing grid",
               ja: "",
            }
         },
      ],
   },
   kaleid: {
      description: "Kaleidoscope effect with `nSides` repetition.",
      example: [
         {
            code: `osc(25,-0.1,0.5).kaleid(50).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(25,-0.1,0.5).kaleid(4).kaleid(4).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   modulateKaleid: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`kaleid`](#kaleid).",
      example: [
         {
            code: `
osc(9,-0.1,0.1)
  .modulateKaleid(osc(11,0.5,0),50)
  .scale(0.1,0.3)
  .modulate(noise(5,0.1))
  .mult(solid(1,1,0.3))
  .out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(10,0.1,2)
  .modulateKaleid(osc(16).kaleid(999),1)
  .out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   scroll: {
      example: [
         {
            code: `shape(3).scroll(0.1,-0.3).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   scrollX: {
      example: [
         {
            code: `osc(10,0,1).scrollX(0.5,0).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(10,0,1).scrollX([0,0.25,0.5,0.75,1].fast(4),0).out(o0)`,
            comments: {
               en: "x position",
               ja: "",
            }
         },
         {
            code: `gradient(1).scrollX(0, () => Math.sin(time*0.05)*0.05 ).out(o0)`,
            comments: {
               en: "scroll speed",
               ja: "",
            }
         },
         {
            code: `gradient(0.125)
  .scrollX(0, ({time}) => Math.sin(time*0.05)*0.05 )
  .scrollY(0, ({time}) => Math.sin(time*0.01)*-0.07 )
  .pixelate([5,2,10],[15,8])
  .scale(0.15)
  .modulate(noise(1,0.25))
  .out()`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   modulateScrollX: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scrollX`](#scrollX)",
      example: [
         {
            code: `
voronoi(25,0,0)
  .modulateScrollX(osc(10),0.5,0)
  .out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
voronoi(25,0,0)
  .modulateScrollX(osc(10),0.5,0.25)
  .out(o0)`,
            comments: {
               en: "different scroll and speed",
               ja: "",
            }
         },
      ],
   },
   scrollY: {
      example: [
         {
            code: `osc(10,0,1).scrollY(0.5,0).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(10,0,1).scrollY([0,0.25,0.5,0.75,1].fast(4),0).out(o0)`,
            comments: {
               en: "y position",
               ja: "",
            }
         },
         {
            code: `gradient(1).scrollY(0, ({time}) => Math.sin(time*0.05)*0.05 ).out()`,
            comments: {
               en: "scroll speed",
               ja: "",
            }
         },
         {
            code: `gradient(0.125)
  .scrollX(0, () => Math.sin(time*0.05)*0.05 )
  .scrollY(0, () => Math.sin(time*0.01)*-0.07 )
  .pixelate([5,2,10],[15,8])
  .scale(0.15)
  .modulate(noise(1,0.25))
  .out()`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   modulateScrollY: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scrollY`](#scrollY)",
      example: [
         {
            code: `
voronoi(25,0,0)
  .modulateScrollY(osc(10),0.5,0)
  .out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
voronoi(25,0,0)
  .modulateScrollY(osc(10),0.5,0.25)
  .out(o0)`,
            comments: {
               en: "different scroll and speed",
               ja: "",
            }
         },
      ],
   },
   add: {
      description: "\nAdd textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `shape().scale(0.5).add(shape(4),[0,0.25,0.5,0.75,1]).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(9,0.1,1).add(osc(13,0.5,5)).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   sub: {
      example: [
         {
            code: `osc().sub(osc(6)).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(6,0,1.5).modulate(noise(3).sub(gradient()),1).out(o0)`,
            comments: {
               en: "color remapping",
               ja: "",
            }
         },
      ],
   },
   layer: {
      description: "Overlay texture based on alpha value.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `solid(1,0,0,1).layer(shape(4).color(0,1,0,()=>Math.sin(time*2))).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(30).layer(osc(15).rotate(1).luma()).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   blend: {
      description: "\nBlend textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `shape().scale(0.5).blend(shape(4),[0,0.25,0.5,0.75,1]).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(9,0.1,1).blend(osc(13,0.5,5)).out()`,
            comments: {
               en: "",
               ja: "",
            }
         },
         {
            code: `osc().thresh().blend(o0,0.9).out(o0)`,
            comments: {
               en: "motion-blur like feedback",
               ja: "",
            }
         },
      ],
   },
   mult: {
      description: "\nMultiply images and blend with the texture by `amount`.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `osc(9,0.1,2).mult(osc(13,0.5,5)).out()`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
osc()
  .layer(osc(30,0.1,2).mult(shape(4)))
  .out(o0)`,
            comments: {
               en: "mult is *not* transparent; compare with mask",
               ja: "",
            }
         },
      ],
   },
   diff: {
      description: "\nReturn difference of textures.\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `osc(9,0.1,1).diff(osc(13,0.5,5)).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
osc(1,1,2)
  .diff(shape(6,1.1,0.01)
        .scale(()=>Math.sin(time)*0.05 + 0.9)
        .kaleid(15)
        .rotate(()=>time%360))
  .out()`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   modulate: {
      description: "\nModulate texture.\nMore about modulation at: <https://lumen-app.com/guide/modulation/>\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `
voronoi()
  .color(0.9,0.25,0.15)
  .rotate(({time})=>(time%360)/2)
  .modulate(osc(25,0.1,0.5)
              .kaleid(50)
              .scale(({time})=>Math.sin(time*1)*0.5+1)
              .modulate(noise(0.6,0.5)),
              0.5)
  .out(o0)`,
            comments: {
               en: "chocolate whirlpool",
               ja: "",
            }
         },
         {
            code: `
osc(3,0,2)
  .modulate(noise().add(gradient(),-1),1)
  .out(o0)`,
            comments: {
               en: "color remapping",
               ja: "",
            }
         },
      ],
   },
   modulateScale: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`scale`](#scale).",
      example: [
         {
            code: `
gradient(5).repeat(50,50).kaleid([3,5,7,9].fast(0.5))
  .modulateScale(osc(4,-0.5,0).kaleid(50).scale(0.5),15,0)
  .out(o0)`,
            comments: {
               en: "cosmic radiation",
               ja: "",
            }
         },
         {
            code: `shape(4).modulateScale(gradient().g(),2,0.5).out(o0)`,
            comments: {
               en: "perspective",
               ja: "",
            }
         },
      ],
   },
   modulatePixelate: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`pixelate`](#pixelate)",
      example: [
         {
            code: `
voronoi(10,1,5).brightness(()=>Math.random()*0.15)
  .modulatePixelate(noise(25,0.5),100)
  .out(o0)`,
            comments: {
               en: "what lies beneath",
               ja: "",
            }
         },
         {
            code: `
noise(3).modulatePixelate(noise(3).pixelate(8,8),1024,8)
  .out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   modulateRotate: {
      description: "\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).\nSee also: [`rotate`](#rotate)",
      example: [
         {
            code: `
voronoi(100,3,5)
  .modulateRotate(osc(1,0.5,0).kaleid(50).scale(0.5),15,0)
  .mult(osc(50,-0.1,8).kaleid(9))
  .out(o0)`,
            comments: {
               en: "wormhole",
               ja: "",
            }
         },
         {
            code: `osc().modulateRotate(shape(999,0.3,0.5),1.57).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   modulateHue: {
      description: "\nChanges coordinates based on hue of second input. Based on: https://www.shadertoy.com/view/XtcSWM\nThe `texture` parameter can be any kind of [source](#sources), for\nexample a [`color`](#color), [`src`](#src), or [`shape`](#shape).",
      example: [
         {
            code: `
src(o0)
  .modulateHue(src(o0).scale(1.01),1)
  .layer(osc(4,0.5,2).mask(shape(4,0.5,0.001)))
  .out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   invert: {
      description: "Invert color.",
      example: [
         {
            code: `solid(1,1,1).invert([0,1]).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
osc(4,0.1,2).invert().luma().invert()
  .layer(osc(4,0.1,2).luma()
         .mask(shape(2,0.5).scrollY(-0.25))).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   contrast: {
      description: "Larger amount value makes higher contrast.",
      example: [
         {
            code: `osc(20).contrast( () => Math.sin(time) * 5 ).out(o0)`,
            comments: {
               en: "20Hz oscillator with contrast interpolating between 0.0-5.0",
               ja: "",
            }
         },
      ],
   },
   brightness: {
      example: [
         {
            code: `
osc(20,0,2)
  .brightness( () => Math.sin(time) )
  .out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `noise().brightness(1).color(0.5,0.5,0.5).out(o0)`,
            comments: {
               en: "scaling noise value to 0-1",
               ja: "",
            }
         },
      ],
   },
   mask: {
      example: [
         {
            code: `gradient(5).mask(voronoi(),3,0.5).invert([0,1]).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
osc()
  .layer(osc(30,0.1,2).mask(shape(4)))
  .out(o0)`,
            comments: {
               en: "mask is transparent; compare with mult",
               ja: "",
            }
         },
         {
            code: `
osc(10,-0.25,1).color(0,0,1).saturate(2).kaleid(50)
  .mask(noise(25,2).modulateScale(noise(0.25,0.05)))
  .modulateScale(osc(6,-0.5,2).kaleid(50))
  .mult(osc(3,-0.25,2).kaleid(50))
  .scale(0.5,0.5,0.75)
  .out(o0)`,
            comments: {
               en: "algae pulse",
               ja: "",
            }
         },
      ],
   },
   luma: {
      example: [
         {
            code: `osc(10,0,1).luma(0.5,0.1).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc(10,0,[0,0.5,1,2]).luma([0.1,0.25,0.75,1].fast(0.25),0.1).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
         {
            code: `osc(30).layer(osc(15).rotate(1).luma()).out(o0)`,
            comments: {
               en: "luma is transparent; compare with thresh",
               ja: "",
            }
         },
      ],
   },
   thresh: {
      example: [
         {
            code: `noise(3,0.1).thresh(0.5,0.04).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
noise(3,0.1)
  .thresh( ()=>Math.sin(time/2) , [0.04,0.25,0.75,1].fast(0.25) )
  .out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
         {
            code: `osc(30).layer(osc(15).rotate(1).thresh()).out(o0)`,
            comments: {
               en: "thresh is *not* transparent; compare with luma",
               ja: "",
            }
         },
      ],
   },
   color: {
      example: [
         {
            code: `osc().color(1,0,3).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   saturate: {
      example: [
         {
            code: `osc(10,0,1).saturate( () => Math.sin(time) * 10 ).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   hue: {
      example: [
         {
            code: `osc(30,0.1,1).hue(() => Math.sin(time)).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   colorama: {
      description: "Shift HSV values.",
      example: [
         {
            code: `
osc(20)
  .color([1,0,0,1,0],[0,1,0,1,0],[0,0,1,1,0])
  .colorama([0.005,0.33,0.66,1.0].fast(0.125))
  .out(o0)`,
            comments: {
               en: `
// 20Hz oscillator source
// color sequence of Red, Green, Blue, White, Black
// colorama sequence of 0.005, 0.5, 1.0 at 1/8 speed
// output to buffer o0`,
               ja: "デフォルト",
            }
         },
         {
            code: `osc(30,0.1,1).colorama(-0.1).out(o0)`,
            comments: {
               en: "negative value is less harsh",
               ja: "",
            }
         },
      ],
   },
   r: {
      example: [
         {
            code: `osc(60,0.1,1.5).layer(gradient().r()).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   g: {
      example: [
         {
            code: `osc(60,0.1,1.5).layer(gradient().g()).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   b: {
      example: [
         {
            code: `osc(60,0.1,1.5).layer(gradient().colorama(1).b()).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   initCam: {
      example: [
         {
            code: `
s0.initCam()
src(s0).invert().out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   initImage: {
      example: [
         {
            code: `
s0.initImage("https://upload.wikimedia.org/wikipedia/commons/2/25/Hydra-Foto.jpg")
osc(6).modulate(src(s0),1).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   initVideo: {
      example: [
         {
            code: `
s0.initVideo("https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4")
src(s0).modulate(noise(3)).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   init: {
      example: [
         {
            code: `
canvas = document.createElement("canvas")
canvas.width = 200
canvas.height = 200
ctx = canvas.getContext("2d")
ctx.fillStyle = "crimson"
ctx.fillRect(100,50,100,100)
s0.init({src:canvas})
src(s0).modulate(osc().kaleid(999)).out(o0)`,
            comments: {
               en: "load canvas",
               ja: "canvas をロード",
            }
         },
      ],
   },
   initScreen: {
      example: [
         {
            code: `
s0.initScreen()
src(s0).colorama(0.5).out(o0)`,
            comments: {
               en: "select a window",
               ja: "画面を選択",
            }
         },
      ],
   },
   render: {
      example: [
         {
            code: `
osc(30,0.1,1.5).out(o0)
noise().out(o1)
solid(1).out(o2)
gradient().out(o3)
render()`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `
voronoi().out(o1)
render(o1)`,
            comments: {
               en: "specify display buffer",
               ja: "",
            }
         },
      ],
   },
   update: {
      example: [
         {
            code: `
b = 0
update = () => b += 0.01 * Math.sin(time)
shape().scrollX(()=>b).out(o0)`,
            comments: {
               en: "update is called every frame",
               ja: "",
            }
         },
      ],
   },
   setResolution: {
      example: [
         {
            code: `
setResolution(100,100)
osc().out(o0)`,
            comments: {
               en: "make the canvas small (100 pixel x 100 pixel)",
               ja: "",
            }
         },
      ],
   },
   hush: {
      example: [
         {
            code: `
osc().out(o0)
hush()`,
            comments: {
               en: "clear the buffers",
               ja: "",
            }
         },
      ],
   },
   setFunction: {
      example: [
         {
            code: `
setFunction({
  name: 'chroma',
  type: 'color',
  inputs: [
    ],
  glsl: \`
   float maxrb = max( _c0.r, _c0.b );
   float k = clamp( (_c0.g-maxrb)*5.0, 0.0, 1.0 );
   float dg = _c0.g; 
   _c0.g = min( _c0.g, maxrb*0.8 ); 
   _c0 += vec4(dg - _c0.g);
   return vec4(_c0.rgb, 1.0 - k);
\`})
osc(60,0.1,1.5).chroma().out(o0)`,
            comments: {
               en: "from https://www.shadertoy.com/view/XsfGzn",
               ja: "",
            }
         },
      ],
   },
   speed: {
      example: [
         {
            code: `
speed = 3
osc(60,0.1,[0,1.5]).out(o0)`,
            comments: {
               en: "change overall speed",
               ja: "",
            }
         },
         {
            code: `
speed = 0.1
osc(60,0.1,[0,1.5]).out(o0)`,
            comments: {
               en: "change overall speed",
               ja: "",
            }
         },
      ],
   },
   bpm: {
      example: [
         {
            code: `
bpm = 60
osc(60,0.1,[0,1.5]).out(o0)`,
            comments: {
               en: "change array speed",
               ja: "",
            }
         },
         {
            code: `
bpm = 15
osc(60,0.1,[0,1.5]).out(o0)`,
            comments: {
               en: "change array speed",
               ja: "",
            }
         },
      ],
   },
   width: {
      example: [
         {
            code: `
shape(99).scrollX(() => -mouse.x / width).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   height: {
      example: [
         {
            code: `
shape(99).scrollY(() => -mouse.y / height).out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   time: {
      example: [
         {
            code: `shape(2,0.8).kaleid(()=>6+Math.sin(time)*4).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   mouse: {
      example: [
         {
            code: `
shape(99).scroll(
  () => -mouse.x / width,
  () => -mouse.y / height)
  .out(o0)`,
            comments: {
               en: "",
               ja: "",
            }
         },
      ],
   },
   fast: {
      example: [
         {
            code: `osc([10,30,60].fast(2),0.1,1.5).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
         {
            code: `osc([10,30,60].fast(0.5),0.1,1.5).out(o0)`,
            comments: {
               en: "argument less than 1 makes transition slower",
               ja: "",
            }
         },
      ],
   },
   smooth: {
      example: [
         {
            code: `shape(999).scrollX([-0.2,0.2].smooth()).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   ease: {
      example: [
         {
            code: `shape(4).rotate([-3.14,3.14].ease('easeInOutCubic')).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   offset: {
      example: [
         {
            code: `
shape(999).scrollY(.2).scrollX([-0.2,0.2])
  .add(
  shape(4).scrollY(-.2).scrollX([-0.2,0.2].offset(0.5))
  ).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   fit: {
      example: [
         {
            code: `shape().scrollX([0,1,2,3,4].fit(-0.2,0.2)).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   fft: {
      example: [
         {
            code: `osc().modulate(noise(3),()=>a.fft[0]).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   setSmooth: {
      example: [
         {
            code: `
a.setSmooth(0.8)
osc().modulate(noise(3),()=>a.fft[0]).out(o0)`,
            comments: {
               en: "default",
               ja: "デフォルト",
            }
         },
      ],
   },
   setCutoff: {
      example: [
         {
            code: `
a.setCutoff(4)
osc().modulate(noise(3),()=>a.fft[0]).out(o0)`,
            comments: {
               en: "threshold",
               ja: "",
            }
         },
      ],
   },
   setBins: {
      example: [
         {
            code: `
a.setBins(8)
osc(60,0.1,()=>a.fft[7]*3).modulate(noise(3),()=>a.fft[0]).out(o0)`,
            comments: {
               en: "change color with hissing noise",
               ja: "",
            }
         },
      ],
   },
   setScale: {
      example: [
         {
            code: `
a.setScale(5)
osc().modulate(noise(3),()=>a.fft[0]).out(o0)`,
            comments: {
               en: "the smaller the scale is, the bigger the output is",
               ja: "",
            }
         },
      ],
   },
}
