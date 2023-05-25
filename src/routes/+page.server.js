import { dev } from "$app/environment";
import { maxScoreStore, gradeSetStore, fractionStore, hideLabelStore } from "$lib/grades/gradeLocalStores";

export async function load({ cookies }) {

	maxScoreStore.setStoreByCookie(cookies);
	gradeSetStore.setStoreByCookie(cookies);
	fractionStore.setStoreByCookie(cookies);
	hideLabelStore.setStoreByCookie(cookies);

	if (dev) {
		return new Promise((fulfil) => {
			setTimeout(fulfil, 2000);
		});
	}
}