import { browser } from '$app/environment';
import { writable } from 'svelte/store';
 
const maxScoreConfig = 'maxScore';
const storedMaxScore = browser? localStorage[maxScoreConfig] : 100;
export const maxScoreStore = writable(parseInt(storedMaxScore) || 100);
maxScoreStore.subscribe((value) => {
    if (browser) {
        localStorage[maxScoreConfig] = value;
        document.cookie = `${maxScoreConfig}=${value}`;
    }
});

const gradeSetConfig = 'gradeSet';
/** @type {string} */
const storedGradeSet = browser? localStorage[gradeSetConfig] : 'AT';
export const gradeSetStore = writable(storedGradeSet || 'AT');
gradeSetStore.subscribe((value) => {
    if (browser) {
        localStorage[gradeSetConfig] = value;
        document.cookie = `${gradeSetConfig}=${value}`;
    }
});