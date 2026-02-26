export const logger = ((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});
