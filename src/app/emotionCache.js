import createCache from '@emotion/cache';

const cache = createCache({ key: 'css', prepend: true });
export default cache; 