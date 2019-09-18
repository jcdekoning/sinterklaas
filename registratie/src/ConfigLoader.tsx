import React from 'react';
import { load } from './config';

const ConfigLoader = (props: any) => {
  const [isLoaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function loadConfig() {
      await load();
      setLoaded(true);
    }

    if (!isLoaded) {
      loadConfig();
    }

  }, [isLoaded]);

  return isLoaded && props.children;
}

export default ConfigLoader;