export interface UserInteractionData {
	userInteractionList: UserInteraction[];
}

export interface UserInteraction {
	label: string; // Type of interaction
	product: string; // Unique name for the product
	customer: string; // Unique name for the customer
	feature: string; // Unique name for the interacted feature
	timestamp: Date; // Timestamp of the interaction
	customTags: Record<string, string>; // Custom tags for additional context
}

export default UserInteraction;