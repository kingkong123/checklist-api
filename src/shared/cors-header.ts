const { CORS_ALLOWED_DOMAIN = '' } = process.env;

console.log('Cors header', CORS_ALLOWED_DOMAIN);
const header = () => ({ 'Access-Control-Allow-Origin': CORS_ALLOWED_DOMAIN });

export default header;
