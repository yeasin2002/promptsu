import { blogs } from "@/.source";
import { loader } from "fumadocs-core/source";

// Blog source configuration without sidebar
export const blogSource = loader({
  baseUrl: "/blogs",
  source: blogs,
});
