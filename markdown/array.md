
# array


### fast
fast( speed = 1 )


```hydra
// default
osc([10,30,60].fast(2),0.1,1.5).out(o0)
```

### smooth
smooth( smooth = 1 )


```hydra
// default
shape(999).scrollX([-0.2,0.2].smooth()).out(o0)
```

### ease
ease( ease = 'linear' )


```hydra
// default
shape(4).rotate([-3.14,3.14].ease('easeInOutCubic')).out(o0)
```

### offset
offset( offset = 0.5 )


```hydra
// default
shape(999).scrollY(.2).scrollX([-0.2,0.2])
  .add(
  shape(4).scrollY(-.2).scrollX([-0.2,0.2].offset(0.5))
  ).out(o0)
```

### fit
fit( low = 0, high = 1 )


```hydra
// default
shape().scrollX([0,1,2,3,4].fit(-0.2,0.2)).out(o0)
```

