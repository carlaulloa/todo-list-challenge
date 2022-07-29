module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '5.0.0',
      skipMD5: true,
    },
    instance: {},
    autoStart: false,
  },
  mongoURLEnvName: 'DATABASE_URL',
};