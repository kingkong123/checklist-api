const { CORS_ALLOWED_DOMAIN = '' } = process.env;

const baseResponse = {
  'Access-Control-Allow-Origin': CORS_ALLOWED_DOMAIN,
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};

const header = (options = { allowMethods: null }) => {
  const { allowMethods } = options;

  if (allowMethods) {
    return {
      ...baseResponse,
      'Access-Control-Allow-Methods': allowMethods
    };
  }
  return baseResponse;
};

export default header;
