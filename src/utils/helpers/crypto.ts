const SECRET_KEY = 'g6&ATanSrjsz$?@<FUvHPKE%yYkXLbGR'

/**
 * Get crypto key
 */
async function getCryptoKey() {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(SECRET_KEY), { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ])
}

/**
 * Encrypt data
 */
export async function encrypt(data: object) {
  const initializationVector = crypto.getRandomValues(new Uint8Array(12))
  const key = await getCryptoKey()

  const encoded = new TextEncoder().encode(JSON.stringify(data))

  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: initializationVector }, key, encoded)

  return {
    initializationVector: Array.from(initializationVector),
    data: Array.from(new Uint8Array(encrypted)),
  }
}

/**
 * Decrypt data
 */
export async function decrypt(payload: { iv: number[]; data: number[] }) {
  try {
    const key = await getCryptoKey()

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(payload.iv) },
      key,
      new Uint8Array(payload.data)
    )

    const decoded = new TextDecoder().decode(decrypted)
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Error decrypting data', error)
    return null
  }
}
