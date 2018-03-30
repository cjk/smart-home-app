const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BACKEND_URL': prod ? '192.168.1.28' : 'localhost',
  'process.env.DEBUG': prod ? 'smtApp:*,error' : 'smtApp:*,error,debug'
};
