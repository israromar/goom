import http from './accessid';

/**
 * Verify Hash
 * @returns {Promise<T | never>}
 */
export function verifyHash(payload) {
    return new Promise((resolve, reject) => {
        http.post('responders/verify', { hash: payload })
            .then(response => { resolve(response.data) })
            .catch(error => {
                console.error(error)
                // throw (error)
                reject(error)
            })
    })
}