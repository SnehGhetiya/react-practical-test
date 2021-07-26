import { fetch } from "./api";
import axios, { AxiosResponse } from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedResponse: AxiosResponse = {
	data: {
		name: "Rājkot",
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
	expect(actual.data.name).toEqual("Rājkot");
});
