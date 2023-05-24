/**
 * @typedef {import('svelte/store').Writable<number> & import('$lib/grades/stores/cookieStore').Cookie} NumberCookieStore
 */
import { getCookie } from '$lib/grades/stores/cookieStore';
import { writable } from 'svelte/store';


/**
 * @param {string} key
 * @param {number} defaultValue
 * @returns {NumberCookieStore}
 */
export function createNumberCookieStore(key, defaultValue) {
    const storedValue = getCookie(key);
    const initialValue = storedValue === undefined? defaultValue : parseInt(storedValue);
    const { subscribe, set, update } = writable(initialValue);
    /**
     * @param {import('@sveltejs/kit').Cookies} cookies
     * @this {NumberCookieStore}
     */
    function setByCookie(cookies) {
        const cookieValue = cookies.get(this.cookieKey);
        if (cookieValue === undefined) {
            return;
        }
        this.set(parseInt(cookieValue));
    }
	return {
		subscribe,
        set,
        update,
        setByCookie,
        cookieKey: key
	};
}
