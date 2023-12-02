import {GetGradePresets} from '$lib/grades/presets/gradePresets';

/**
 * @typedef Grade
 * @prop {string} label The label to 
 * @prop {number} max The max score of a grade.
 * @prop {number} min The min score of a grade.
 * @prop {string} [display] The display string of a grade.
 * @prop {Grade[]} [children] The list of child grades.
 * 
 * @typedef GradeDefinition
 * @prop {string} label The label to 
 * @prop {number} base The base top score of a grade definition.
 * @prop {GradeDefinition[]} [children] The list of child scores.
 *
 * @typedef GradeCollection
 * @prop {GradeDefinition[]} grades List of grades to generate scores from.
 * @prop {string} id Identifier for grade collection.
 * @prop {string} label Label for grade collection.
 *  
 * @typedef GradeOptions
 * @prop {string} setId Id of the grade set to use.
 * @prop {number} max Max score to reach.
 * @prop {number} [fraction=1] Number to include fractions of points (1/2, 1/3, etc.)
 *
 * @typedef GradeFormat
 * @prop {'decimal'|'fraction'} format Format as decimal or fraction.
 * @prop {number} precision Rounding precision when formatting.
 */

export default class GradeFactory {
	constructor() {
		this.#gradeCollections = GetGradePresets();
	}

	/** @type {GradeCollection[]} */
	#gradeCollections;

  /**
   * Get number of decimal places.
   * @param {number} score
   * @returns
   */
  #calculateDecimals(score) {
    if (Math.floor(score.valueOf()) === score.valueOf()) return 0;
    return score.toString().split(".")[1].length || 0;
  }

  /**
   * Get place of decimal as number.
   * @param {number} place
   * @returns
   */
  #decimalToNumber(place) {
    return Math.pow(10, place * -1);
  }

	/**
	* Calculated score based on base and max score, rounded to the closest fraction
	* @param {number} baseScore
	* @param {number} maxScore
	* @param {number} [fraction=1]
	* @returns {number}
	 */
  #calculateScore(baseScore, maxScore, fraction = 1) {
    // Step1: Get number of decimals of baseScore
    const decimalPlaces = this.#calculateDecimals(baseScore);
    // Step2: Determine next highest score to compare against
    const nextGradeBase = baseScore + this.#decimalToNumber(decimalPlaces);
    // Step3: Calculate a cutoff score in the middle; anything above or equla is the next grade
    const cuttoffBase = (baseScore + nextGradeBase) / 2;
    // Step4: Calculate exact score off cutoff
    const cutoffScore = maxScore * (cuttoffBase / 100);
    // Step5: Multiply by fraction
    const cutoffFractionScore = cutoffScore * fraction;
    // Step6: Get next higher fractioned score
    const roundedFractionCutoffScore = Math.ceil(cutoffFractionScore);
    // Step7: Divide by fraction
    const cutoffRoundedScore = roundedFractionCutoffScore / fraction;
    // Step8: Calculate score a fraction below cutoff
    const targetScore = cutoffRoundedScore - 1 / fraction;
    return targetScore;
	}

	/**
	 * Calculates closest fraction of given remainder and base.
	 * @param {number} remainder
	 * @param {number} base
	 * @returns {number}
	 */
	#calculateFraction(remainder, base) {
		return this.#calculateScore(remainder, base*100);
	}

	/** 
	 * @description Method that returns number rounded to the given number of decimal places.
	 * @param {number} input
	 * @param {number} places
	 * @returns {string}
	 */
	#formatDecimal(input, places) {
		const placeModifier = 10 ** places;
		const result = Math.round((input + Number.EPSILON) * placeModifier) / placeModifier;
		return result.toString();
	}

	/**
	 * @description Method that returns number rounded to the given fraction.
	 * @param {number} input
	 * @param {number} fraction
	 * @returns {string} 
	 */
	#formatFraction(input, fraction) {
		const baseScore = Math.floor(input);
		const remainder = input-baseScore;
		if (fraction === 1 || remainder === 0) {
			return baseScore.toString();
		}
		const partOfFraction = this.#calculateFraction(remainder, fraction);
		return `${baseScore} ${partOfFraction}/${fraction}`;
	}


	/**
	 * @param {number} score
	 * @param {GradeFormat} formatter
	 * @returns {string}
	 */
	#formatScore(score, formatter) {
		switch (formatter.format) {
			case 'decimal':
				return this.#formatDecimal(score, formatter.precision);
			case 'fraction':
			default:
				return this.#formatFraction(score, formatter.precision);
		}
	}

	/**
	 * @param {Grade} grade
	 * @param {GradeFormat} formatter
	 * @returns {string}
	 */
	#formatGrade(grade, formatter) {
		const maxScoreFormat = this.#formatScore(grade.max, formatter);
		if (grade.max === grade.min) {
			return maxScoreFormat;
		}
		const minScoreFormat = this.#formatScore(grade.min, formatter);
		return `${minScoreFormat} - ${maxScoreFormat}`;
	}

	/**
	* Generates list of grades based on max score and predefined grade ranges
	* @param {GradeDefinition} gradeDefinition
	* @param {number} maxScore
	* @param {number} [fraction=1]
	* @param {GradeDefinition} [nextDefinition]
	* @returns {Grade}
	 */
	#calculateGrade(gradeDefinition, maxScore, fraction = 1, nextDefinition) {
		/** @type {Grade} */
		const calculatedGrade = {
			label: gradeDefinition.label,
			max: this.#calculateScore(gradeDefinition.base, maxScore, fraction),
			min: 0
		};
		if(nextDefinition) {
			calculatedGrade.min = Math.min(this.#calculateScore(nextDefinition.base, maxScore, fraction) +(1/fraction), calculatedGrade.max);
		}
		calculatedGrade.display = this.#formatGrade(calculatedGrade, { format: 'decimal', precision: 2});
		return calculatedGrade;
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
			const calculatedGrade = this.#calculateGrade(g, options.max, options.fraction, gs[i-1]);
			if (g.children) {
				calculatedGrade.children = this.#generate(g.children, options);
			}
			return calculatedGrade;
		});
		return calculatedGrades.reverse();
	}

	/**
	 * Returns list of available presets
	 * @returns {GradeCollection[]}
	 */
	getGradeDefinitions() {
		return this.#gradeCollections;
	}

	/**
	 * Generates list of grades based on max score and predefined grade ranges
	 * @param {GradeOptions} options
	 * @returns {Grade[]}
	 */
	generate(options = { max: 100, setId: 'US' }) {
		const gradeCollection = this.#gradeCollections.find(c => c.id === options.setId);
		if (!gradeCollection) {
			return [];
		}
		return this.#generate(gradeCollection.grades, options);
	}
}
