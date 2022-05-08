import App from "../../src/App.vue";
import axios from "axios";
import { shallowMount } from "@vue/test-utils";

jest.mock("axios");

const mockData = [
  {
    name: "Ariton",
    office: "Kalmar",
  },
  {
    name: "Adam",
    office: "Kalmar",
  },
  {
    name: "Zamira",
    office: "Nybro",
  },
  {
    name: null,
    office: "Malmö",
  },
  {
    name: "Samsam",
    office: null,
  },
];

describe("fetch data", () => {
  describe("success", () => {
    it("should pass", async () => {
      axios.get.mockResolvedValue({ data: mockData });
      const wrapper = shallowMount(App);
      wrapper.vm.getEmployees();
    });
  });
});

describe("fix null props", () => {
  it("should remove the null properties of an array of objects and make them empty strings", () => {
    const wrapper = shallowMount(App);
    const result = wrapper.vm.fixNullData(mockData);

    expect(result).toEqual(
      expect.arrayContaining([
        {
          name: "Ariton",
          office: "Kalmar",
        },
        {
          name: "Adam",
          office: "Kalmar",
        },
        {
          name: "Zamira",
          office: "Nybro",
        },
        {
          name: "",
          office: "Malmö",
        },
        {
          name: "Samsam",
          office: "",
        },
      ])
    );
  });
});
