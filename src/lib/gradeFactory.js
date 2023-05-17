import GradePreset from '$lib/presets/gradePresets';

/**
 * @typedef Grade
 * @prop {string} label The label to 
 * @prop {number} base The base top score of a grade.
 * @prop {Grade[]} [childRanges] The list of child scores.
 *
 * @typedef GradeDef
 * @prop {Grade[]} grades List of grades to generate scores from.
 * @prop {string} [culture] Culture identifier to replace the grades
 *  
 * @typedef GradeOptions
 * @prop {number} max Max score to reach.
 * @prop {number} [fraction=1] Number to include fractions of points (1/2, 1/3, etc.)
 */

export default class GradeFactory {
	constructor(def = { grades:  GradePreset('US')} ) {
		this.#gradeDefinitions = def;
	}

	/** @type {GradeDef} @readonly */
	#gradeDefinitions;

	/**
	 * Generates list of grades based on max score and predefined grade ranges
	 * @param {GradeOptions} options
	 * @returns {Grade[]}
	 */
	generate(options = { max: 100 }) {
		return this.#gradeDefinitions.grades;
	}
}
