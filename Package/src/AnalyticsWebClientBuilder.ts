import { AnalyticsWebClient } from "./AnalyticsWebClient";
import { AnalyticsWebOptions } from "./Models/AnalyticsWebOptions";

export class AnalyticsWebClientBuilder {
	private options: AnalyticsWebOptions = {
		address: '',
		product: '',
		customer: ''
	};

	constructor() { }

	withBackendAddress(address: string): this {
		this.options.address = address;
		return this;
	}

	withProductName(product: string): this {
		this.options.product = product;
		return this;
	}

	withCustomerName(customer: string): this {
		this.options.customer = customer;
		return this;
	}

	build(): AnalyticsWebClient {
		return new AnalyticsWebClient(this.options);
	}
}

export default AnalyticsWebClientBuilder;