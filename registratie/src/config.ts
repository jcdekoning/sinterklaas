type Config = {
  api: string;
  stripe: string;
}

const config: Config = {
  api: '',
  stripe: ''
};

export default config;

const load = async () => {
  const result = await fetch('config.json');
  const newconfig = await result.json();

  for (let prop in config) {
    delete (config as any)[prop]
  }
  for (let prop in newconfig) {
    (config as any)[prop] = newconfig[prop]
  }

  return config;
}

export { load };