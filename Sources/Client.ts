import {version} from "node:process";
import pkg from "../package.json" with {type: "json"};

/**
 * Sends messages by SMS to a [FreeMobile](https://mobile.free.fr) account.
 */
export class Client {

	/**
	 * The base URL of the remote API endpoint.
	 */
	readonly baseUrl: URL;

	/**
	 * The Free Mobile password.
	 */
	readonly #password: string;

	/**
	 * The Free Mobile user name.
	 */
	readonly #userName: string;

	/**
	 * Creates a new client.
	 * @param userName The Free Mobile user name.
	 * @param password The Free Mobile password.
	 * @param baseUrl The base URL of the remote API endpoint.
	 */
	constructor(userName: string, password: string, baseUrl: string|URL = "https://smsapi.free-mobile.fr") {
		const url = baseUrl instanceof URL ? baseUrl.href : baseUrl;
		this.baseUrl = new URL(url.endsWith("/") ? url : `${url}/`);
		this.#userName = userName;
		this.#password = password;
	}

	/**
	 * Sends an SMS message to the underlying account.
	 * @param message The message text.
	 * @returns Resolves when the message has been sent.
	 */
	async sendMessage(message: string): Promise<void> {
		const query = new URLSearchParams({msg: message.trim().slice(0, 160), pass: this.#password, user: this.#userName});
		const userAgent = `Node.js/${version.slice(1)} | Belin.FreeMobile/${pkg.version}`;
		const response = await fetch(new URL(`sendmsg?${query}`, this.baseUrl), {headers: {"User-Agent": userAgent}});
		if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
	}
}
