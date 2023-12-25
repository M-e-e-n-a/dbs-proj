const bcrypt = require('bcryptjs');

const passwordsToHash = ['abc', 'def']; // Replace with your actual passwords

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    console.log(`Hashed Password for '${password}': ${hashed}`);
};

passwordsToHash.forEach(password => {
    hashPassword(password);
});
