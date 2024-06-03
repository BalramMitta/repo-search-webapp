const logger = {
    info: (message: string, ...additionalParams: any[]) => {
      console.info(message, ...additionalParams);
    },
    warn: (message: string, ...additionalParams: any[]) => {
      console.warn(message, ...additionalParams);
    },
    error: (message: string, ...additionalParams: any[]) => {
      console.error(message, ...additionalParams);
    },
  };
  
  export default logger;
  