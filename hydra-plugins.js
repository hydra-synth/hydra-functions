module.exports = [
  {
    name: 'initCam',
    type: 'ext',
    inputs: [
      {
        type: 'int',
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
]
