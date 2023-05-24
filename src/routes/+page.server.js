import { maxScoreStore,gradeSetStore, fractionStore, hideLabelStore } from "$lib/grades/gradeLocalStores";

export function load({ cookies }) {
	maxScoreStore.setStoreByCookie(cookies);
	gradeSetStore.setStoreByCookie(cookies);
	fractionStore.setStoreByCookie(cookies);
	hideLabelStore.setStoreByCookie(cookies);
}