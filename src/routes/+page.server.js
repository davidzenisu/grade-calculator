import { maxScoreStore,gradeSetStore, fractionStore, hideLabelStore } from "$lib/grades/gradeLocalStores";

export function load({ cookies }) {
	maxScoreStore.setByCookie(cookies);
	gradeSetStore.setByCookie(cookies);
	fractionStore.setByCookie(cookies);
	hideLabelStore.setByCookie(cookies);
}