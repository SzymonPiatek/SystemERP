import helmet from 'helmet';

const helmetConfig = helmet({
  contentSecurityPolicy: true,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

export default helmetConfig;
