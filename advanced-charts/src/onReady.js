const configurationData = {
  supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
  // ... other configuration data
};

export const onReady = (callback) => {
  // console.log('[onReady]: Method call');
  setTimeout(() => callback(configurationData));
};
