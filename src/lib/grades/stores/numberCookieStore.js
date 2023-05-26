/**
 * @typedef {import('svelte/store').Writable<number> & import('$lib/grades/stores/cookieStore').Cookie} NumberCookieStore
 */
import { getCookie, setCookieClient, setCookieServer } from '$lib/grades/stores/cookieStore';
import { get, writable } from 'svelte/store';


/**
 * @param {string} key
 * @param {number} defaultValue
 * @returns {NumberCookieStore}
 */
export function createNumberCookieStore(key, defaultValue) {
    const storedValue = getCookie(key);
    const initialValue = storedValue === undefined ? defaultValue : parseInt(storedValue);
    const { subscribe, set, update } = writable(initialValue);
    /**
     * @param {import('@sveltejs/kit').Cookies} cookies
     * @this {NumberCookieStore}
     */
    function setStoreByCookie(cookies) {
        const cookieValue = cookies.get(this.cookieKey);
        if (cookieValue === undefined) {
            return;
        }
        this.set(parseInt(cookieValue));
    }
    /**
     * @this {NumberCookieStore}
     * @param {import('@sveltejs/kit').Cookies} [cookies]
     */
    function setCookieByStore(cookies) {
        if (cookies) {
            setCookieServer(cookies, this.cookieKey, get(this).toString());
        }
        setCookieClient(this.cookieKey, get(this));
    }
    /**
     * @this {NumberCookieStore}
     * @param {FormData} formData
     */
    function setByFormData(formData) {
        const textValue = formData.get(this.cookieKey);
        if (!textValue) {
            return;
        }
        const storeValue = parseInt(/** @type {string}*/(textValue));
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
    cookieStore.subscribe(() => cookieStore.setCookieByStore());
    return cookieStore;
}
