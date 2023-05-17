/**
 * @typedef GradePreset
 * @prop {string} culture The string to identity the culture of grade presets. 
 * @prop {import('$lib/gradeFactory').GradeDefinition[]} grades The low score of a grade
*/

import { JSONToGradeCollection } from './gradeConverter';
import gradeConfig from './gradePresets.json';

/**
 * Returns a list of predefined grade sets based on the two-letter country code (ISO 3166-1 alpha-2)
 * @param {string} culture
 * @returns {import('$lib/gradeFactory').GradeDefinition[]}
 */
 export default function GradePreset(culture) {
    const presets = JSONToGradeCollection(gradeConfig);
    const gradePreset = presets.find(p => p.culture.localeCompare(culture, undefined, { sensitivity: 'base' }) === 0);
    return gradePreset?.grades ?? [{label: 'N/A', base: 0}];
 }