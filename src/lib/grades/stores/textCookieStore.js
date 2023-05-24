/**
 * @typedef {import('svelte/store').Writable<string> & import('$lib/grades/stores/cookieStore').Cookie} TextCookieStore
 */
import { getCookie } from '$lib/grades/stores/cookieStore';
import { writable } from 'svelte/store';


/**
 * @param {string} key
 * @param {string} defaultValue
 * @returns {TextCookieStore}
 */
export function createTextCookieStore(key, defaultValue) {
    const storedValue = getCookie(key);
    const initialValue = storedValue === undefined? defaultValue : storedValue;
    const { subscribe, set, update } = writable(initialValue);
    /**
     * @param {import('@sveltejs/kit').Cookies} cookies
     * @this {TextCookieStore}
     */
    function setByCookie(cookies) {
        const cookieValue = cookies.get(this.cookieKey);
        if (cookieValue === undefined) {
            return;
        }
        this.set(cookieValue);
    }
	return {
		subscribe,
        set,
        update,
        setByCookie,
        cookieKey: key
	};
}
