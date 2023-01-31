import { registerBlockType } from "@wordpress/blocks";
import icons from ".././icons.js";
import "./main.css";
import edit from "./edit";
import save from "./save";

registerBlockType("tbones-p/carousel-slider-item", {
  icon: {
    src: icons.primary,
  },
  edit,
  save,
});
