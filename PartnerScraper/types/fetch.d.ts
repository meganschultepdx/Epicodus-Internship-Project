export class CookieJar {
	constructor(options: any);
	options: any;
	cookies: any;
	addCookie(cookie: any): void;
	getCookies(url: any): any;
	matchCookie(cookie: any, url: any): any;
	setCookie(cookie_str: any, url: any): void;
}
export class FetchStream {
	constructor(url: any, options: any);
	url: any;
	userAgent: any;
	options: any;
	responseBuffer: any;
	ended: any;
	readyToRead: any;
	addListener(ev: any, fn: any): any;
	destroy(ex: any): void;
	drainBuffer(): void;
	emit(type: any, ...args: any[]): any;
	getMaxListeners(): any;
	isPaused(): any;
	listenerCount(type: any): any;
	listeners(type: any): any;
	normalizeOptions(): void;
	on(ev: any, fn: any): any;
	once(type: any, listener: any): any;
	parseUrl(url: any): any;
	pause(): any;
	pipe(dest: any, pipeOpts: any): any;
	push(chunk: any, encoding: any): any;
	read(n: any): any;
	removeAllListeners(type: any, ...args: any[]): any;
	removeListener(type: any, listener: any): any;
	resume(): any;
	runStream(url: any): void;
	setEncoding(encoding: any): void;
	setMaxListeners(n: any): any;
	unpipe(dest: any): any;
	unshift(chunk: any): any;
	wrap(stream: any): any;
}
export function fetchUrl(url: any, options: any, callback: any): void;
