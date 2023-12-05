export interface UserSessionData {
	product: string; // Unique name for the product
	customer: string; // Unique name for the customer
	timestamp: Date; // Timestamp of the interaction
	timeSpent: number; // Time spent on the feature
}

export default UserSessionData;