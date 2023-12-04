import { AnalyticsWebOptions } from "../Models/AnalyticsWebOptions";
import Logger from "./Logger";

export default class Validator {
	static validateClientOptions(options: AnalyticsWebOptions): boolean {
		return options.address !== '' && options.product !== '' && options.customer !== '';
	}

	static validateInteraction(label: string, feature: string, customTags: Record<string, string>): boolean {
		if (label === '') {
			Logger.warn('Invalid label');
			return false;
		}
		if (feature === '') {
			Logger.warn('Invalid feature');
			return false;
		}
		if (customTags === null || customTags === undefined) {
			Logger.warn('Invalid custom tags');
			return false;
		}
		return true;
	}
}