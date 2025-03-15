// process: current node process
// process.env: system environment 
// you can set it in scripts section in package.json file
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  isDevelopment,
  isProduction
};
