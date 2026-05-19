import {Client} from "@cedx/free-mobile";
import {doesNotReject, rejects} from "node:assert/strict";
import {env} from "node:process";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link Client} class.
 */
describe("Client", () => {
	describe("sendMessage()", () => {
		it("should reject if a network error occurred", () =>
			rejects(new Client("anonymous", "secret", "http://localhost:666").sendMessage("Hello World!")));

		it("should reject if the credentials are invalid", () =>
			rejects(new Client("anonymous", "secret").sendMessage("Hello World!")));

		it("should send SMS messages if the credentials are valid", () => {
			const account = env.FREEMOBILE_ACCOUNT ?? "";
			const apiKey = env.FREEMOBILE_API_KEY ?? "";
			return doesNotReject(new Client(account, apiKey).sendMessage("Hello Cédric, from Node.js!"));
		});
	});
});
