export default [
  {
    name: 'out',
    type: 'src',
    inputs: [
      {
        type: 'vec4',
        name: 'texture',
        default: 'all',
      },
    ],
  },
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
    name: 'update',
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
  // {
  //   name: 'fps',
  //   type: 'settings',
  //   inputs: [
  //   ],
  // },
  {
    name: 'speed',
    type: 'settings',
    default: 1,
  },
  {
    name: 'bpm',
    type: 'settings',
    default: 30,
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
    default: '{ x, y }'
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
    default: 'Array(4)',
  },
  {
    name: 'setSmooth',
    type: 'audio',
    inputs: [
      {
        type: 'number',
        name: 'smooth',
        default: 0.4,
      },
    ],
  },
  {
    name: 'setCutoff',
    type: 'audio',
    inputs: [
      {
        type: 'number',
        name: 'cutoff',
        default: 2,
      },
    ],
  },
  {
    name: 'setBins',
    type: 'audio',
    inputs: [
      {
        type: 'number',
        name: 'numBins',
        default: 4,
      },
    ],
  },
  {
    name: 'setScale',
    type: 'audio',
    inputs: [
      {
        type: 'number',
        name: 'scale',
        default: 10,
      },
    ],
  },
  {
    name: 'hide',
    type: 'audio',
    inputs: [
    ],
  },
  {
    name: 'show',
    type: 'audio',
    inputs: [
    ],
  },
]
