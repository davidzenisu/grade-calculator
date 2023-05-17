/**
 * @typedef GradePreset
 * @prop {string} culture The string to identity the culture of grade presets. 
 * @prop {import('$lib/gradeFactory').Grade[]} grades The low score of a grade
 *

/**
 * The default list of US grades.
 * @readonly
 * @const {GradePreset[]}
 * @type {GradePreset[]}
 */
const presets = [
    {
        culture: 'US',
        grades: [
            {
                label: 'A',
                base: 100
            },
            {
                label: 'B',
                base: 89
            },
            {
                label: 'C',
                base: 79
            },
            {
                label: 'D',
                base: 69
            },
            {
                label: 'F',
                base: 59
            }
        ]
    }
];

/**
 * Returns a list of predefined grade sets based on the two-letter country code (ISO 3166-1 alpha-2)
 * @param {string} culture
 * @returns {import('$lib/gradeFactory').Grade[]}
 */
 export default function GradePreset(culture) {
    const gradePreset = presets.find(p => p.culture.localeCompare(culture, undefined, { sensitivity: 'base' }) === 0);
    return gradePreset?.grades ?? [{label: 'N/A', base: 0}];
 }