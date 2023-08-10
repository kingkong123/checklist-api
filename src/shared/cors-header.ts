const { CORS_ALLOWED_DOMAIN = '' } = process.env;

const baseResponse = {
  'Access-Control-Allow-Origin': CORS_ALLOWED_DOMAIN,
  'Access-Control-Allow-Headers': 'Content-Type, Accept'
};

console.log('Cors header', CORS_ALLOWED_DOMAIN);
const header = (options = null) => {
  const { allowMethods = null } = options;

  if (allowMethods) {
    return {
      ...baseResponse,
      'Access-Control-Allow-Methods': allowMethods
    };
  }
  return baseResponse;
};

export default header;
