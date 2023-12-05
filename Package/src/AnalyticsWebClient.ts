import axios, { AxiosResponse, AxiosError } from "axios";
import { AnalyticsWebOptions } from "./Models/AnalyticsWebOptions";
import { InteractionManager } from "./Managers/InteractionManager";
import Logger from "./util/Logger";
import { BrowserManager } from "./Managers/BrowserManager";
import { UserSessionManager } from "./Managers/UserSessionManager";
import UserInteraction from "./Models/UserInteraction";
import BrowserData from "./Models/BrowserData";
import UserSessionData from "./Models/UserSessionData";

export class AnalyticsWebClient {
	private interactionManager: InteractionManager;
	private userSessionManager: UserSessionManager;
	private browserManager: BrowserManager;

	private options: AnalyticsWebOptions;
	private sendInteractionsTimerId: number | undefined;

	private userInteractionEndpoint = "/api/collection/userInteraction";
	private userSessionEndpoint = "/api/collection/userSession";
	private browserDataEndpoint = "/api/collection/browserData";

	constructor(options: AnalyticsWebOptions) {
		this.options = options;
		this.startSendInteractionsTimer();

		this.interactionManager = new InteractionManager(options);
		this.browserManager = new BrowserManager();
		this.userSessionManager = new UserSessionManager();

		window.addEventListener('beforeunload', () => {
			this.sendUserSessionData({
				product: this.options.product,
				customer: this.options.customer,
				timestamp: new Date(),
				timeSpent: this.userSessionManager.recordPageExitTime(),
			});
		});

		this.sendBrowserData({
			product: this.options.product,
			customer: this.options.customer,
			timestamp: new Date(),
			browser: this.browserManager.getBrowserName(),
			isMobileDevice: this.browserManager.isMobileDevice(),
		});
	}

	destroy(): void {
		this.stopSendInteractionsTimer();
	}

	public logUserInteraction(label: string, feature: string, customTags: Record<string, string>): void {
		const collectedDataLength = this.interactionManager.logUserInteraction(label, feature, customTags);

		if (collectedDataLength >= 10) {
			this.sendInteractionsAsync();
		}
	}

	private startSendInteractionsTimer(): void {
		this.sendInteractionsTimerId = window.setInterval(() => this.sendInteractionsAsync(), 30000);
	}

	private stopSendInteractionsTimer(): void {
		if (this.sendInteractionsTimerId !== undefined) {
			window.clearInterval(this.sendInteractionsTimerId);
			this.sendInteractionsTimerId = undefined;
		}
	}

	private async sendInteractionsAsync(): Promise<void> {
		const accumulatedData = this.interactionManager.dequeueUserInteractions();

		for (const data of accumulatedData) {
			try {
				await this.sendUserInteractionData(data);
			} catch (error) {
				console.error('Error sending interaction:', error);
			}
		}
	}

	private async sendUserInteractionData(data: UserInteraction): Promise<void> {
		try {
			const response: AxiosResponse = await axios.post(this.options.address + this.userInteractionEndpoint, data);

			if (response.status !== 200) {
				Logger.warn('Failed to send data. Status code: ' + response.status);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				Logger.warn('Axios error: ' + axiosError.message);
			} else {
				Logger.warn('Error sending data: ' + error);
			}
		}
	}

	private async sendUserSessionData(data: UserSessionData): Promise<void> {
		try {
			const response: AxiosResponse = await axios.post(this.options.address + this.userSessionEndpoint, data);

			if (response.status !== 200) {
				Logger.warn('Failed to send data. Status code: ' + response.status);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				Logger.warn('Axios error: ' + axiosError.message);
			} else {
				Logger.warn('Error sending data: ' + error);
			}
		}
	}

	private async sendBrowserData(data: BrowserData): Promise<void> {
		try {
			const response: AxiosResponse = await axios.post(this.options.address + this.browserDataEndpoint, data);

			if (response.status !== 200) {
				Logger.warn('Failed to send data. Status code: ' + response.status);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				Logger.warn('Axios error: ' + axiosError.message);
			} else {
				Logger.warn('Error sending data: ' + error);
			}
		}
	}
}

export default AnalyticsWebClient;