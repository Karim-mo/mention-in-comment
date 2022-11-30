export class Timeout {
	public static timeout: NodeJS.Timeout | undefined;

	// constructor(private callback: () => void, private delay: number) {}

	public static trigger(callback: () => void, delay: number) {
		this.timeout && clearTimeout(this.timeout);
		this.timeout = setTimeout(callback, delay);
	}

	public static clear() {
		this.timeout && clearTimeout(this.timeout);
	}
}
