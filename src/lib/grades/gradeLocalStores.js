import { browser } from '$app/environment';
import { writable } from 'svelte/store';
 
/** @param {string} key */
function getCookie(key) {
    if(browser) {
        var match = document?.cookie?.match(new RegExp(`(^| )${key}=([^;]+)`));
        if (match) return match[2];
    }
}

const maxScoreConfig = 'maxScore';
const storedMaxScore = parseInt(getCookie(maxScoreConfig) || '100');
export const maxScoreStore = writable(storedMaxScore);
maxScoreStore.subscribe((value) => {
    if (browser) {
        document.cookie = `${maxScoreConfig}=${value}`;
    }
});

const gradeSetConfig = 'gradeSet';
const storedGradeSet = getCookie(gradeSetConfig) || 'AT';
export const gradeSetStore = writable(storedGradeSet);
gradeSetStore.subscribe((value) => {
    if (browser) {
        document.cookie = `${gradeSetConfig}=${value}`;
    }
});

const fractionConfig = 'fraction';
const storedFraction = parseInt(getCookie(fractionConfig) || '1');
export const fractionStore = writable(storedFraction);
fractionStore.subscribe((value) => {
    if (browser) {
        document.cookie = `${fractionConfig}=${value}`;
    }
});