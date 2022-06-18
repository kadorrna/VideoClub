import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ItemView from "../ItemView.vue";

describe("ItemView", () => {
  it("renders properly", () => {
    const wrapper = mount(ItemView);
    const div = wrapper.find("div");
    expect(div.text()).toContain("Item View");
  });
});
