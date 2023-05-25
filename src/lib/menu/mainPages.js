import { page } from "$app/stores";
import { get } from "svelte/store";

class PageIdentity {
    /**
     * @param {string} name
     * @param {string} [path]
     */
    constructor(name, path) {
        this.name = name;
        this.path = `/${path ?? name.toLowerCase()}`;
    }

    name;
    path;

    /**
    * Checks whether the identity matches the current page
    * @returns {boolean}
    */
    isCurrentPage() {
        const currentPage = get(page);
        return currentPage.url.pathname === this.path;
    }
}

/**
 * @typedef PageList
 * @prop {string} name 
 * @prop {string} [path] 
 * 
 * @param {PageList[]} pageList 
 * @returns {PageIdentity[]}
 */
function createPages(pageList) {
    return pageList.map(p => new PageIdentity(p.name, p.path));
}

/**
 * @type {PageList[]}
 */
const mainPages = [
    { name: "Home", path: "" },
    { name: "Presets", path: "sets" }
    { name: "Settings" },
    { name: "Privacy Policy", path: "policy" },
];

export default createPages(mainPages);