# Statistics_Visualizer
Statistics visualization * v *

You can play this here: https://cretgp.com/lab/stav

## Manipulation
`r` to regenerate samples
`s` to sort samples
`p` to change the mode to the Spectrum Mode.

`deviation` changes the distribution of samples.
https://stackoverflow.com/questions/16110758/generate-random-number-with-a-non-uniform-distribution
I used this distribution and generate sample by linear interpolation with `derivation` between `beta_left` and `beta_right`:
```
sample = derivation*beta_left + (1-derivation)*beta_right
```

`two derivation` to use `beta` itself.
`samples` changes the number of samles.
