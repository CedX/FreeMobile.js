import {Client} from "@cedx/free-mobile";
import {use} from "chai";
import chaiAsPromised from "chai-as-promised";
import "chai/register-should.js";
import {env} from "node:process";

/**
 * Tests the features of the {@link Client} class.
 */
describe("Client", () => {
	use(chaiAsPromised);

	context("sendMessage()", () => {
		it("should reject if a network error occurred", () =>
			new Client("anonymous", "secret", {baseUrl: "http://localhost:666"}).sendMessage("Hello World!").should.be.rejected);

		it("should reject if the credentials are invalid", () =>
			new Client("anonymous", "secret").sendMessage("Hello World!").should.be.rejected);

		it("should send SMS messages if the credentials are valid", () => {
			const account = env.FREEMOBILE_ACCOUNT ?? "";
			const apiKey = env.FREEMOBILE_API_KEY ?? "";
			return new Client(account, apiKey).sendMessage("Hello Cédric, from Node.js!").should.be.fulfilled;
		});
	});
});
