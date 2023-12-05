import { AnalyticsWebOptions } from "../Models/AnalyticsWebOptions";

export class UserSessionManager {
	private pageEnterTime: number | null = null;


	constructor() {
		this.recordPageEnterTime();
	}

	private recordPageEnterTime(): void {
		this.pageEnterTime = new Date().getTime();
	}

	public recordPageExitTime(): number {
		if (this.pageEnterTime !== null) {
			const currentTime = new Date().getTime();
			return currentTime - this.pageEnterTime;
		}
		return 0;
	}
}

export default UserSessionManager;