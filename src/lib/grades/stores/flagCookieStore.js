/**
 * @typedef {import('svelte/store').Writable<boolean> & import('$lib/grades/stores/cookieStore').Cookie} FlagCookieStore
 */
import { getCookie, setCookieClient, setCookieServer } from '$lib/grades/stores/cookieStore';
import { get, writable } from 'svelte/store';

/**
 * @param {string} key
 * @param {boolean} [defaultValue=false]
 * @returns {FlagCookieStore}
 */
export function createFlagCookieStore(key, defaultValue = false) {
    const storedValue = getCookie(key);
    const initialValue = storedValue === undefined ? defaultValue : storedValue === 'true';
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
     * @param {import('@sveltejs/kit').Cookies} [cookies]
     */
    function setCookieByStore(cookies) {
        if (cookies) {
            setCookieServer(cookies, this.cookieKey, get(this).toString());
        }
        setCookieClient(this.cookieKey, get(this));
    }
    /**
     * @this {FlagCookieStore}
     * @param {FormData} formData
     */
    function setByFormData(formData) {
        const textValue = formData.get(this.cookieKey);
        if (!textValue) {
            return;
        }
        const storeValue = textValue === 'true';
        this.set(storeValue);
    }
    const cookieStore = {
        subscribe,
        set,
        update,
        setStoreByCookie,
        setCookieByStore,
        setByFormData,
        cookieKey: key
    };
    setCookieClient(cookieStore.cookieKey, true);
    return cookieStore;
}