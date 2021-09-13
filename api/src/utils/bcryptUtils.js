const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err) {
                reject(err);
            } else {
                resolve(hash);
            }
        })
    });
}

const comparePassword = (password, hash) => {
    console.log(password)
    console.log(hash)
    return bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    comparePassword
}