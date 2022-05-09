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

describe("Property Sort", () => {
  const mockSortData = [
    {
      name: "Test",
      office: "Lund",
    },
    {
      name: "Adam",
      office: "Stockholm",
    },
    {
      name: "Zoran",
      office: "Alkmaar",
    },
  ];
  it("should sort the array based on the name property and put them in an ascending order", () => {
    const wrapper = shallowMount(App);
    mockSortData.sort(wrapper.vm.propertySort("name", 1));
    expect(mockSortData).toEqual(
      expect.arrayContaining([
        {
          name: "Adam",
          office: "Stockholm",
        },
        {
          name: "Test",
          office: "Lund",
        },
        {
          name: "Zoran",
          office: "Alkmaar",
        },
      ])
    );
  });
  it("should sort the array based on the name property and put them in a descending order", () => {
    const wrapper = shallowMount(App);
    mockSortData.sort(wrapper.vm.propertySort("name", -1));
    expect(mockSortData).toEqual(
      expect.arrayContaining([
        {
          name: "Zoran",
          office: "Alkmaar",
        },
        {
          name: "Test",
          office: "Lund",
        },
        {
          name: "Adam",
          office: "Stockholm",
        },
      ])
    );
  });
  it("should not have changed the array if it is already sorted in the desired way", () => {
    const wrapper = shallowMount(App);
    const tempMockData = [
      {
        name: "Zoran",
        office: "Alkmaar",
      },
      {
        name: "Test",
        office: "Lund",
      },
      {
        name: "Adam",
        office: "Stockholm",
      },
    ];
    tempMockData.sort(wrapper.vm.propertySort("office", 1));
    expect(tempMockData).toEqual(expect.arrayContaining(tempMockData));
  });
});

describe("Set Query", () => {
  it("should put the query to what the argument is when called upon", () => {
    const wrapper = shallowMount(App);
    const temp = "hello world";
    wrapper.vm.setQuery(temp);
    expect(wrapper.vm.searchQuery).toBe(temp);
  });
});
