import crypto from 'crypto';

const algorithm = 'aes-256-ecb';
const key = crypto.createHash('sha256').update('upofitness-full-stack').digest().subarray(0, 32); // 256-bit key

export function encrypt(text) {
    console.log(text);
    const iv = Buffer.alloc(0); // empty buffer for IV
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encryptedText) {
    console.log(text);
    const iv = Buffer.alloc(0); // empty buffer for IV
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}