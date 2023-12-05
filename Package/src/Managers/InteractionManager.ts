import { AnalyticsWebOptions } from "../Models/AnalyticsWebOptions";
import UserInteraction from "../Models/UserInteraction";
import Logger from "../util/Logger";
import Validator from "../util/Validator";

export class InteractionManager {
	private userInteractionQueue: UserInteraction[] = [];
	private clientOptions: AnalyticsWebOptions;

	constructor(clientOptions: AnalyticsWebOptions) {
		this.clientOptions = clientOptions;
	}

	logUserInteraction(label: string, feature: string, customTags: Record<string, string>): number {
		if (!Validator.validateClientOptions(this.clientOptions)) {
			Logger.warn('AnalyticsWebClient is not setup properly');
			return this.userInteractionQueue.length;
		}

		if (!Validator.validateInteraction(label, feature, customTags)) {
			Logger.warn('Invalid user interaction');
			return this.userInteractionQueue.length;
		}

		const product = this.clientOptions.product;
		const customer = this.clientOptions.customer;

		this.userInteractionQueue.push({
			label,
			product,
			customer,
			feature,
			timestamp: new Date(),
			customTags
		});

		return this.userInteractionQueue.length;
	}

	dequeueUserInteractions(): UserInteraction[] {
		const copiedData = this.userInteractionQueue.slice();
		this.userInteractionQueue = [];
		return copiedData;
	}
}

export default InteractionManager;