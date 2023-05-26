/// <reference lib="dom" />

import { browser, dev } from "$app/environment";

/**
 * @typedef Cookie
 * @prop {string} cookieKey
 * @prop {(cookies:import('@sveltejs/kit').Cookies) => void} setStoreByCookie
 * @prop {(cookies?:import('@sveltejs/kit').Cookies) => void} setCookieByStore
 * @prop {(formData:FormData) => void} setByFormData
 */

/** 
 * Function that fetches value from cookies. Client only!
 * @param {string} key 
 * @returns {string|undefined}
*/
export function getCookie(key) {
    if (!browser) {
        return undefined;
    }
    var match = document?.cookie?.match(new RegExp(`(^| )${key}=([^;]+)`));
    if (match) return match[2];
}

/** 
 * Function that stores value in cookies. Client only!
 * @param {string} key 
 * @template T
 * @param {T} value 
 * @param {number} [maxAge=31536000]
 * @param {'none'|'lax'|'strict'} [sameSite='strict']
 * @param {boolean} [secure=true]
*/
export function setCookieClient(key, value, maxAge = 31536000, sameSite = 'strict', secure = !dev) {
    if (!browser) {
        return;
    }
    document.cookie = `${key}=${value};max-age=${maxAge};samesite=${sameSite};${secure ? 'Secure' : ''}`;
}

/**
 * @param {import("@sveltejs/kit").Cookies} cookies
 * @param {string} key
 * @param {string} value 
 * @param {any} [maxAge=31536000]
 * @param {boolean |'none' | 'lax' | 'strict' | undefined} [sameSite='strict']
 * @param {boolean} [secure=true]
 * @param {boolean} [httpOnly=false]
 */
export function setCookieServer(cookies, key, value, maxAge, sameSite = 'strict', secure = !dev, httpOnly = false) {
    cookies.set(key, value, { maxAge: maxAge, sameSite: sameSite, secure: secure, httpOnly: httpOnly });
}