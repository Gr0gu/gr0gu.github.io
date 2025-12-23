const p = BigInt('1000201229');
const q = BigInt('1002950677');
const n = p * q;
const phi = (p - BigInt(1)) * (q - BigInt(1));
let e = BigInt(65537);

// Almost everyone uses e = 65537 (which is $2^{16} + 1$).
// It is a prime number, and its binary representation (10000000000000001) has only two 1s.
// This makes the encryption math extremely fast for computers.
// Since 65537 is prime, it will work unless your phi happens to be a perfect multiple of 65537 (which is statistically very rare).

function gcd(a, b) {
    while (b !== BigInt(0)) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

while (gcd(e, phi) !== BigInt(1)) {
    e += BigInt(2);
}

function modInverse(e, phi) {
    let m0 = phi;
    let y = 0n;
    let x = 1n;

    if (phi === 1n) return 0n;

    while (e > 1n) {
        let q = e / phi;
        let t = phi;

        phi = e % phi;
        e = t;
        t = y;

        y = x - q * y;
        x = t;
    }

    if (x < 0n) x += m0;

    return x;
}

function modPow(base, exp, mod) {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp = exp / 2n;
    }
    return result;
}

const d = modInverse(e, phi);
const N_BIT_LENGTH = n.toString(2).length;
const CHUNK_SIZE = Math.floor((N_BIT_LENGTH - 1) / 8);

function bytesToHex(bytes) {
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

function hexToBytes(hex) {
    const bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return new Uint8Array(bytes);
}

export function encrypt(message) {
    const encoder = new TextEncoder();
    const messageBytes = encoder.encode(message);
    const encryptedChunks = [];

    for (let i = 0; i < messageBytes.length; i += CHUNK_SIZE) {
        const chunk = messageBytes.slice(i, i + CHUNK_SIZE);

        const hex = bytesToHex(chunk);
        const m = BigInt('0x' + hex);

        const c = modPow(m, e, n);

        encryptedChunks.push(c.toString(16));
    }

    return encryptedChunks.join(',');
}

export function decrypt(ciphertext) {
    if (!ciphertext) return "";

    const chunks = ciphertext.split(',');
    const decoder = new TextDecoder();

    let allBytes = [];

    for (const chunkHex of chunks) {
        const c = BigInt('0x' + chunkHex);

        const m = modPow(c, d, n);

        let hex = m.toString(16);
        if (hex.length % 2) hex = '0' + hex;

        const chunkBytes = hexToBytes(hex);
        chunkBytes.forEach(b => allBytes.push(b));
    }

    return decoder.decode(new Uint8Array(allBytes));
}