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

registerBlockType("tbones-p/video-slider", {
  icon: {
    src: icons.primary,
  },
  edit({ attributes, setAttributes }) {
    const { showImage, showCTA } = attributes;

    const imageClass = showImage ? "" : "ta-img-hidden";
    const wrapperClass = showImage ? "" : "ta-wrapper-rounded-border";
    const ctaClass = showCTA ? "" : "ta-cta-hidden";

    const blockProps = useBlockProps({
      className: `ta-carousel-container ${imageClass} ${wrapperClass} ${ctaClass}`,
    });

    return (
      <>
      <InspectorControls>
        <PanelBody title={__("Settings", "tbones-p")}>
          <ToggleControl
            label="Enable Images"
            help={
              showImage
                ? "Show Images for Carousel Items"
                : "Hide Images for Carousel Items"
            }
            checked={showImage}
            onChange={(state) => {
              setAttributes({ showImage: state });
            }}
          />
          <ToggleControl
            label="Enable CTA (Call To Action)"
            help={
              showCTA
                ? "Show CTA Button for Carousel Items"
                : "Hide CTA Buttons  for Carousel Items"
            }
            checked={showCTA}
            onChange={(state) => {
              setAttributes({ showCTA: state });
            }}
          />
        </PanelBody>
      </InspectorControls>
        <div {...blockProps}>
          <div class="sfas-carousel min-h-fit pt-12 overflow-hidden">
            <div class="swiper">
              <div class="swiper-wrapper">
                <InnerBlocks
                  orientation="horizontal"
                  allowedBlocks={["tbones-p/video-slider-item"]}
                  template={[
                    [
                      "tbones-p/video-slider-item",
                      {
                        title: "Center for Learning and Student Success",
                        desc: "Resources to build your academic skills. Open to all students.",
                        imgURL: "/wp-content/uploads/2022/12/sfas-1.jpg",
                        cta: {
                          url: "#",
                          buttonText: "Learn More",
                          target: "",
                        },
                      },
                    ],
                    [
                      "tbones-p/video-slider-item",
                      {
                        title: "Fellowships & National Awards",
                        desc: "Providing students and alumni with information about available awards and fellowships and application assistance.",
                        imgURL: "/wp-content/uploads/2022/12/ibs-2.jpg",
                        cta: {
                          url: "#",
                          buttonText: "Learn More",
                          target: "",
                        },
                      },
                    ],
                    [
                      "tbones-p/video-slider-item",
                      {
                        title: "Student Success Coaches",
                        desc: "Cultivating the personal and academic success of each student. Open to all students.",
                        imgURL: "/wp-content/uploads/2022/12/sfas-3.jpg",
                        cta: {
                          url: "#",
                          buttonText: "Learn More",
                          target: "",
                        },
                      },
                    ],
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
  save({ attributes }) {
    const { showImage, showCTA } = attributes;

    const imageClass = showImage ? "" : "ta-img-hidden";
    const wrapperClass = showImage ? "" : "ta-wrapper-rounded-border";
    const ctaClass = showCTA ? "" : "ta-cta-hidden";

    const blockProps = useBlockProps.save({
      className: `ta-carousel-container ${imageClass} ${wrapperClass} ${ctaClass}`,
    });

    return (
      <div {...blockProps}>
        <div className="sfas-carousel min-h-fit pt-12 overflow-hidden">
          <div className="swiper">
            <div className="swiper-wrapper">
              <InnerBlocks.Content />
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      </div>
    );
  },
});
