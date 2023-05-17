import GradePreset from '$lib/presets/gradePresets';

/**
 * @typedef Grade
 * @prop {string} label The label to 
 * @prop {number} max The max score of a grade.
 * @prop {number} min The min score of a grade.
 * @prop {Grade[]} [children] The list of child grades.
 * 
 * @typedef GradeDefinition
 * @prop {string} label The label to 
 * @prop {number} base The base top score of a grade definition.
 * @prop {GradeDefinition[]} [children] The list of child scores.
 *
 * @typedef GradeCollection
 * @prop {GradeDefinition[]} grades List of grades to generate scores from.
 * @prop {string} [culture] Culture identifier to replace the grades
 *  
 * @typedef GradeOptions
 * @prop {number} max Max score to reach.
 * @prop {number} [fraction=1] Number to include fractions of points (1/2, 1/3, etc.)
 */

export default class GradeFactory {
	/**
	 * @param {string} [preset=AT]
	 */
	constructor(preset = 'AT') {
		const gradeDefinitions = GradePreset(preset);
		this.#gradeCollection =  { grades: gradeDefinitions } ;
	}

	/** @type {GradeCollection} @readonly */
	#gradeCollection;

	/**
	* Generates list of grades based on max score and predefined grade ranges
	* @param {GradeDefinition} gradeDefinition
	* @param {number} maxScore
	* @param {GradeDefinition} [nextDefinition]
	* @returns {Grade}
	 */
	#calculateGrade(gradeDefinition, maxScore, nextDefinition) {
		return {
			label: gradeDefinition.label,
			max: Math.round(gradeDefinition.base * maxScore / 100),
			min: nextDefinition? Math.round(nextDefinition.base * maxScore / 100)+1 : 0
		};
	}

	/**
	* Sorts a list of grade definitions
	* @param {GradeDefinition[]} gradeDefinitions
	* @param {boolean} [asc=false]
	* @returns {GradeDefinition[]}
	 */
	#sortGradeDef(gradeDefinitions, asc = false) {
		/**
		* Compares two grade definitions by base
		* @param {GradeDefinition} grade
		* @param {GradeDefinition} otherGrade
		* @returns {number}
		*/
		function compareGradeDef(grade, otherGrade) {
			const compared = grade.base - otherGrade.base;
			return asc? compared : compared * -1;
		}
		return gradeDefinitions.sort(compareGradeDef);
	}

	/**
	* Sorts a list of grade definitions ascendingly.
	* @param {GradeDefinition[]} gradeDefinitions
	* @returns {GradeDefinition[]}
	 */
	#sortGradeDefAsc(gradeDefinitions) {
		return this.#sortGradeDef(gradeDefinitions, true);
	}

	/**
	* Sorts a list of grade definitions descendingly.
	* @param {GradeDefinition[]} gradeDefinitions
	* @returns {GradeDefinition[]}
	 */
	#sorteGradeDefDesc(gradeDefinitions) {
		return this.#sortGradeDef(gradeDefinitions);
	}


	/**
	 * Recursively generates a list of grades based on max score and grade ranges
	 * @param {GradeDefinition[]} gradeDef
	 * @param {GradeOptions} options
	 * @returns {Grade[]}
	 */
	#generate(gradeDef, options) {
		const gradeDefSorted = this.#sortGradeDefAsc(gradeDef);
		const calculatedGrades = gradeDefSorted.map((g,i,gs) => {
			const calculatedGrade = this.#calculateGrade(g, options.max, gs[i-1]);
			if (g.children) {
				calculatedGrade.children = this.#generate(g.children, options);
			}
			return calculatedGrade;
		});
		return calculatedGrades.reverse();
	}

	/**
	 * Generates list of grades based on max score and predefined grade ranges
	 * @param {GradeOptions} options
	 * @returns {Grade[]}
	 */
	generate(options = { max: 100 }) {
		return this.#generate(this.#gradeCollection.grades, options);
	}
}
