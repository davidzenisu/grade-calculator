/// <reference lib="dom" />

import { browser } from "$app/environment";

/**
 * @typedef Cookie
 * @prop {string} cookieKey
 * @prop {(cookies:import('@sveltejs/kit').Cookies) => void} setStoreByCookie
 * @prop {() => void} setCookieByStore
 */

/** 
 * Function that fetches value from cookies. Client only!
 * @param {string} key 
 * @returns {string|undefined}
*/
export function getCookie(key) {
    if(!browser) {
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
export function setCookie(key, value, maxAge=31536000, sameSite='strict', secure=true) {
    if(!browser) {
        return;
    }
    document.cookie = `${key}=${value};max-age=${maxAge};samesite=${sameSite};${secure?'Secure':''}`;
}