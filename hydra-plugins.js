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
      {
        type: 'vec4',
        name: 'texture',
        default: 'all',
      },
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
  // {
  //   name: 'fps',
  //   type: 'settings',
  //   inputs: [
  //   ],
  // },
  {
    name: 'speed',
    type: 'settings',
  },
  {
    name: 'bpm',
    type: 'settings',
  },
  {
    name: 'width',
    type: 'settings',
  },
  {
    name: 'height',
    type: 'settings',
  },
  {
    name: 'time',
    type: 'settings',
  },
  {
    name: 'mouse',
    type: 'settings',
  },
  {
    name: 'fast',
    type: 'array',
    inputs: [
      {
        type: 'number',
        name: 'speed',
        default: '1',
      },
    ],
  },
  {
    name: 'smooth',
    type: 'array',
    inputs: [
      {
        type: 'number',
        name: 'smooth',
        default: '1',
      },
    ],
  },
  {
    name: 'ease',
    type: 'array',
    inputs: [
      {
        type: 'string',
        name: 'ease',
        default: `'linear'`,
      },
    ],
  },
  {
    name: 'offset',
    type: 'array',
    inputs: [
      {
        type: 'number',
        name: 'offset',
        default: '0.5',
      },
    ],
  },
  {
    name: 'fit',
    type: 'array',
    inputs: [
      {
        type: 'number',
        name: 'low',
        default: '0',
      },
      {
        type: 'number',
        name: 'high',
        default: '1',
      },
    ],
  },
  {
    name: 'fft',
    type: 'audio',
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
]
