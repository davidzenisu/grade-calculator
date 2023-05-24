
import { createFlagCookieStore } from '$lib/grades/stores/flagCookieStore';
import { createNumberCookieStore } from '$lib/grades/stores/numberCookieStore';
import { createTextCookieStore } from '$lib/grades/stores/textCookieStore';

export const maxScoreStore = createNumberCookieStore('maxScore', 100);
export const gradeSetStore = createTextCookieStore('gradeSet', 'AT');
export const fractionStore = createNumberCookieStore('fraction', 1);
export const hideLabelStore = createFlagCookieStore('hideLabels');