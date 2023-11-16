
# audio


### fft
fft = Array(4)


```hydra
// default
osc().modulate(noise(3),()=>a.fft[0]).out(o0)
```

### setSmooth
setSmooth( smooth = 0.4 )


```hydra
// default
a.setSmooth(0.8)
osc().modulate(noise(3),()=>a.fft[0]).out(o0)
```

### setCutoff
setCutoff( cutoff = 2 )


```hydra
// threshold
a.setCutoff(4)
osc().modulate(noise(3),()=>a.fft[0]).out(o0)
```

### setBins
setBins( numBins = 4 )


```hydra
// change color with hissing noise
a.setBins(8)
osc(60,0.1,()=>a.fft[7]*3).modulate(noise(3),()=>a.fft[0]).out(o0)
```

### setScale
setScale( scale = 10 )


```hydra
// the smaller the scale is, the bigger the output is
a.setScale(5)
osc().modulate(noise(3),()=>a.fft[0]).out(o0)
```

### hide
hide(  )



### show
show(  )



