/**
 * @typedef {import('svelte/store').Writable<boolean> & import('$lib/grades/stores/cookieStore').Cookie} FlagCookieStore
 */
import { getCookie, setCookie } from '$lib/grades/stores/cookieStore';
import { get, writable } from 'svelte/store';

/**
 * @param {string} key
 * @param {boolean} [defaultValue=false]
 * @returns {FlagCookieStore}
 */
export function createFlagCookieStore(key, defaultValue=false) {
    const storedValue = getCookie(key);
    const initialValue = storedValue === undefined? defaultValue : storedValue === 'true';
    const { subscribe, set, update } = writable(initialValue);
    /**
     * @param {import('@sveltejs/kit').Cookies} cookies
     * @this {FlagCookieStore}
     */
    function setStoreByCookie(cookies) {
        const cookieValue = cookies.get(this.cookieKey);
        if (cookieValue === undefined) {
            return;
        }
        this.set(cookieValue === 'true');
    }
    /**
     * @this {FlagCookieStore}
     */
    function setCookieByStore() {
        setCookie(this.cookieKey, get(this));
    }
    const cookieStore = {
		subscribe,
        set,
        update,
        setStoreByCookie,
        setCookieByStore,
        cookieKey: key
	};
    setCookie(cookieStore.cookieKey, true);
	return cookieStore;
}