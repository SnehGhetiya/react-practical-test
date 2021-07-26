import { fetch } from "./api";
import axios, { AxiosResponse } from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedResponse: AxiosResponse = {
	data: {
		lat: "23.04",
		lon: "72.6666",
	},
	status: 200,
	statusText: "OK",
	headers: {},
	config: {},
};

it("returns mocked name successfully", async () => {
	mockedAxios.get.mockResolvedValue(mockedResponse);

	expect(axios.get).not.toHaveBeenCalled();

	const actual = await fetch();

	expect(axios.get).toHaveBeenCalled();
	expect(actual.data.lat).toEqual("23.04");
	expect(actual.data.name).not.toEqual("72.6555");
});
