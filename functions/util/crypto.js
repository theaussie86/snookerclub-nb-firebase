const functions = require('firebase-functions')
const crypto = require('crypto');

const alg = 'aes-256-gcm'
const secret = Buffer.from(functions.config().bill.secret, 'base64')

module.exports = {
    encrypt: (text) => {
        const iv = Buffer.from(crypto.randomBytes(12), 'utf8')
        const cipher = crypto.createCipheriv(alg, secret, iv)
        let encrypted = cipher.update(text, 'utf8', 'base64')
        encrypted += cipher.final('base64')
        return {
            iv: encodeURIComponent(iv.toString('base64')),
            content: encodeURIComponent(encrypted),
            tag: encodeURIComponent(cipher.getAuthTag().toString('base64'))
        }
    },
    decrypt: (enc, iv, authTag) => {
        const decipher = crypto.createDecipheriv(alg, secret, Buffer.from(iv, 'base64'))
        decipher.setAuthTag(Buffer.from(authTag, 'base64'))
        let str = decipher.update(enc, 'base64', 'utf8')
        str += decipher.final('utf8')
        return str
    }
}
