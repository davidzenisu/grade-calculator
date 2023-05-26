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

export const actions = {
	calculate: async ({ cookies, request }) => {
		const formData = await request.formData();
		maxScoreStore.setByFormData(formData);
		maxScoreStore.setCookieByStore(cookies);
		gradeSetStore.setByFormData(formData);
		gradeSetStore.setCookieByStore(cookies);
		fractionStore.setByFormData(formData);
		fractionStore.setCookieByStore(cookies);
	}
};