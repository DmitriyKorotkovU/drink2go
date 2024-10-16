module.exports = async (page, scenario, vp) => {
  await require('./interceptImages.cjs')(page, scenario);
};
