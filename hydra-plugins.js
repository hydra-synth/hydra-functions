module.exports = [
  {
    name: 'initCam',
    type: 'ext',
    inputs: [
      {
        type: 'number',
        name: 'index',
        default: 0,
      },
    ],
  },
  {
    name: 'initImage',
    type: 'ext',
    inputs: [
      {
        type: 'string',
        name: 'url',
      },
    ],
  },
  {
    name: 'initVideo',
    type: 'ext',
    inputs: [
      {
        type: 'string',
        name: 'url',
      },
    ],
  },
  {
    name: 'init',
    type: 'ext',
    inputs: [
      {
        type: 'object',
        name: 'options',
      },
    ],
  },
  {
    name: 'initStream',
    type: 'ext',
    inputs: [
      {
        type: 'string',
        name: 'url',
      },
    ],
  },
  {
    name: 'initScreen',
    type: 'ext',
    inputs: [
      {
        type: 'string',
        name: 'name',
      },
    ],
  },
  {
    name: 'render',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'setResolution',
    type: 'settings',
    inputs: [
      {
        type: 'number',
        name: 'width',
      },
      {
        type: 'number',
        name: 'height',
      },
    ],
  },
  {
    name: 'hush',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'setFunction',
    type: 'settings',
    inputs: [
      {
        type: 'object',
        name: 'options',
      },
    ],
  },
  {
    name: 'fps',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'speed',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'bpm',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'width',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'height',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'time',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'mouse',
    type: 'settings',
    inputs: [
    ],
  },
  {
    name: 'fast',
    type: 'array',
    inputs: [
    ],
  },
  {
    name: 'smooth',
    type: 'array',
    inputs: [
    ],
  },
  {
    name: 'ease',
    type: 'array',
    inputs: [
    ],
  },
  {
    name: 'offset',
    type: 'array',
    inputs: [
    ],
  },
  {
    name: 'fit',
    type: 'array',
    inputs: [
    ],
  },
  {
    name: 'setSmooth',
    type: 'audio',
    inputs: [
    ],
  },
  {
    name: 'setCutoff',
    type: 'audio',
    inputs: [
    ],
  },
  {
    name: 'fft',
    type: 'audio',
    inputs: [
    ],
  },
]
