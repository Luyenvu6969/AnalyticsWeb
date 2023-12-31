export interface BrowserData {
	browserDataList: Browser[];
}

export interface Browser {
	product: string; // Unique name for the product
	customer: string; // Unique name for the customer
	timestamp: Date; // Timestamp of the interaction
	browser: string; // Browser name
	isMobileDevice: boolean; // Whether or not the user using a mobile device
}

export default BrowserData;