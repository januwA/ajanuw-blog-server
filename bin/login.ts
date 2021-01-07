const bcrypt = require('bcrypt');

(async () => {
  const saltRounds = 10;
  console.log({
    username: 'ajanuw',
    password: await bcrypt.hash('1234567', saltRounds),
  });
})();
