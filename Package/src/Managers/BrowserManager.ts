export class BrowserManager {
	private browserMap = {
		Chrome: "Google Chrome",
		Firefox: "Mozilla Firefox",
		Safari: "Apple Safari",
		Edge: "Microsoft Edge",
		"MSIE": "Internet Explorer",
		"Trident/": "Internet Explorer"
	};

	public getBrowserName(): string {
		const userAgent = navigator.userAgent;
		const defaultBrowser = "Unknown";

		const detectedBrowser = Object.keys(this.browserMap)
			.find(browser => userAgent.includes(browser))
			|| defaultBrowser;

		return detectedBrowser;
	}

	public isMobileDevice(): boolean {
		return /Mobi|Android/i.test(navigator.userAgent);
	}
}

export default BrowserManager;