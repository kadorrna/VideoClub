import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HomeView from "../HomeView.vue";

describe("HomeView", () => {
  it("renders properly", () => {
    const wrapper = mount(HomeView);
    const div = wrapper.find("div");
    expect(div.text()).toContain("Welcome to video club");
  });
});
