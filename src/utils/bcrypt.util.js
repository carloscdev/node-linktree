const bcrypt = require('bcrypt');

async function encryptPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function comparePassword(password, passwordHash) {
  const compare = await bcrypt.compare(password, passwordHash);
  return compare;
}

module.exports = { encryptPassword, comparePassword };
