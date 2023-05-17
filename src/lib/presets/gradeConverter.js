/**
 * @typedef GradeCollectionJson
 * @prop {GradePresetJson[]} p Short identifier for grade presets.
 *
 * @typedef GradePresetJson
 * @prop {string} c Short identifier for culture.
 * @prop {GradeJson[]} g Short identifier for grades.
 *
 * @typedef GradeJson
 * @prop {string} l Short identifier for label.
 * @prop {number} b Short identifier for base score.
 * @prop {GradeJson[]} [c] Short identifier for children scores.
 */

/**
 * Converts the minified json format to a grade.
 * @param {GradeJson} json
 * @returns {import('$lib/gradeFactory').Grade}
 */
function JSONToGrade(json) {
    const parsedGrade = {
        label: json.l,
        base: json.b,
        childRanges: json.c?.map(JSONToGrade)
    };
    return parsedGrade;
}

/**
 * Converts the minified json format to a grade preset.
 * @param {GradePresetJson} json
 * @returns {import('$lib/presets/gradePresets').GradePreset}
 */
function JSONToGradePreset(json) {
    const parsedPreset = {
        culture: json.c,
        grades: json.g.map(JSONToGrade)
    };
    return parsedPreset;
}

/**
 * Converts the minified json format to a grade preset list
 * @param {Object} json
 * @returns {import('$lib/presets/gradePresets').GradePreset[]}
 */
export function JSONToGradeCollection(json) {
    const gradePresetIdentifier = 'p';
    if (!Object.hasOwn(json, gradePresetIdentifier)) {
        return [];
    }
    const presetCollection = /** @type {GradeCollectionJson} */ (json);
    return presetCollection.p.map(JSONToGradePreset);
}


/**
 * Converts a grade to a minified json format.
 * @param {import('$lib/gradeFactory').Grade} grade
 * @returns {GradeJson}
 */
function GradeToJSON(grade) {
    /** @type {GradeJson} */
    const gradeJson = {
        l: grade.label,
        b: grade.base
    };
    if (grade.childRanges) {
        gradeJson.c = grade.childRanges?.map(GradeToJSON)
    }
    return gradeJson;
}

/**
 * Converts a grade preset to a minified json format.
 * @param {import('$lib/presets/gradePresets').GradePreset} gradePreset
 * @returns {GradePresetJson}
 */
function GradePresetToJSON(gradePreset) {
    const jsonPreset = {
        c: gradePreset.culture,
        g: gradePreset.grades.map(GradeToJSON)
    };
    return jsonPreset;
}

/**
 * Converts a grade preset list to a minified json format.
 * @param {import('$lib/presets/gradePresets').GradePreset[]} gradePresetList
 * @returns {GradeCollectionJson}
 */
export function GradeCollectionToJSON(gradePresetList) {
    const gradePresetJsonList = gradePresetList.map(GradePresetToJSON);
    return { p: gradePresetJsonList};
}