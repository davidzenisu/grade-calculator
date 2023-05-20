import { maxScoreStore,gradeSetStore, fractionStore } from "$lib/grades/gradeLocalStores";

export function load({ cookies }) {
	maxScoreStore.set(parseInt(cookies.get('maxScore') || '100'));
	gradeSetStore.set(cookies.get('gradeSet') || 'AT');
	fractionStore.set(parseInt(cookies.get('fraction') || '1'));
}