import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  InspectorControls,
  InnerBlocks,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import icons from ".././icons.js";
import "./main.css";

registerBlockType("tbones-p/testimonials-slider", {
  icon: {
    src: icons.primary,
  },
  edit() {
    const blockProps = useBlockProps({
      className: "ta-testimonials-wrapper",
    });

    return (
      <div {...blockProps}>
        <img
          src="/wp-content/uploads/2022/12/quotes-left.svg"
          className="img-1"
          alt=""
        />
        <img
          src="/wp-content/uploads/2022/12/quotes-right.svg"
          className="img-2"
          alt=""
        />
        <div class="ta-testimonial-inner-section">
          <div class="mySwiper">
            <div class="swiper-wrapper">
              <InnerBlocks
                orientation="vertical"
                allowedBlocks={["tbones-p/testimonials-slider-item"]}
                template={[
                  [
                    "tbones-p/testimonials-slider-item",
                    {
                      text: `Rutgers Camden provides a small school atmosphere with big benefits. The name of rutgers allows for many opportunities to work with other programs and institutions. The faculty and staff at Rutgers work diligently to ensure that students have important instruments needed and work to have up to date technology on campus.`,
                      name: "Brianna Soreth, BA '14",
                      title: "RUTGERS ALUMNI",
                    },
                  ],
                  [
                    "tbones-p/testimonials-slider-item",
                    {
                      text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Accusantium, rerum ipsa eum totam nemo modi quae. Officiis beatae,
                      saepe fugit dolore error placeat, ea est in impedit aliquam quod
                      soluta inventore, eius repellendus vel odit sequi nobis aut
                      voluptates tenetur!`,
                      name: "Dianna Soreth, BA '14",
                      title: "RUTGERS ALUMNI",
                    },
                  ],
                  [
                    "tbones-p/testimonials-slider-item",
                    {
                      text: `Rutgers Camden provides a small school atmosphere with big benefits. The name of rutgers allows for many opportunities to work with other programs and institutions. The faculty and staff at Rutgers work diligently to ensure that students have important instruments needed and work to have up to date technology on campus.`,
                      name: "Jon Doe, BA '14",
                      title: "RUTGERS ALUMNI",
                    },
                  ],
                ]}
              />
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    );
  },
  save() {
    const blockProps = useBlockProps.save({
      className: "ta-testimonials-wrapper",
    });

    return (
      <div {...blockProps}>
        <img
          src="/wp-content/uploads/2022/12/quotes-left.svg"
          className="img-1"
          alt=""
        />
        <img
          src="/wp-content/uploads/2022/12/quotes-right.svg"
          className="img-2"
          alt=""
        />
        <div class="ta-testimonial-inner-section">
          <div class="mySwiper">
            <div class="swiper-wrapper">
              <InnerBlocks.Content />
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    );
  },
});
