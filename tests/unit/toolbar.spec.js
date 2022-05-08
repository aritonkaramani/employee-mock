import Toolbar from "../../src/components/ToolBar.vue";
import { shallowMount } from "@vue/test-utils";

describe("Toolbar emit", () => {
  it("should emit to the parent when search query updates", () => {
    const wrapper = shallowMount(Toolbar);
    wrapper.vm.query = "hej";
    expect(wrapper.emitted("hej"));
  });
});

it("should emit to the parent when we change the sorting order", async () => {
  const wrapper = shallowMount(Toolbar);
  const options = wrapper.find("select").findAll("option");

  await options.at(0).setSelected();
  expect(wrapper.find("option:checked").element.value).toBe("NameAsc");
  expect(wrapper.emitted("sort-order"));

  await options.at(1).setSelected();
  expect(wrapper.find("option:checked").element.value).toBe("NameDsc");
  expect(wrapper.emitted("sort-order"));

  await options.at(2).setSelected();
  expect(wrapper.find("option:checked").element.value).toBe("OfficeAsc");
  expect(wrapper.emitted("sort-order"));

  await options.at(3).setSelected();
  expect(wrapper.find("option:checked").element.value).toBe("OfficeDsc");
  expect(wrapper.emitted("sort-order"));
});
