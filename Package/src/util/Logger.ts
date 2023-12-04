export default class Logger {
	static log(message: string) {
		console.log("Analytics Web: " + message);
	}

	static warn(message: string) {
		console.warn("Analytics Web: " + message);
	}
}