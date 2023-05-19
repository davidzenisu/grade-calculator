import { browser } from '$app/environment';
import { writable } from 'svelte/store';
 
const storedMaxScore = browser? localStorage.maxScore : 100;
export const maxScoreStore = writable(parseInt(storedMaxScore) || 100);
maxScoreStore.subscribe((value) => {
    if (browser) {
        localStorage.maxScore = value
    }
});

/** @type {string} */
const storedGradeSet = browser? localStorage.gradeSet : 'AT';
export const gradeSetStore = writable(storedGradeSet || 'AT');
gradeSetStore.subscribe((value) => {
    if (browser) {
        localStorage.gradeSet = value
    }
});