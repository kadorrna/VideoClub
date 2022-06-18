import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CategoryView from "../CategoryView.vue";

describe("CategoryView", () => {
  it("renders properly", () => {
    const wrapper = mount(CategoryView);
    const div = wrapper.find("div");
    expect(div.text()).toContain("Category View");
  });
});
