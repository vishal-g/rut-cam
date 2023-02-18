import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import icons from ".././icons.js";
import "./main.css";

registerBlockType("tbones-p/testimonials-slider-item", {
  icon: {
    src: icons.primary,
  },
  edit({ attributes, setAttributes, isSelected }) {
    const { text, name, title } = attributes;
    const blockProps = useBlockProps({ className: "swiper-slide" });

    return (
      <div {...blockProps}>
        <RichText
          placeholder={__("Text", "tbones-p")}
          tagName="p"
          className="ta-testimonials-text"
          onChange={(text) => setAttributes({ text })}
          value={text}
        />

        <RichText
          placeholder={__("Name", "tbones-p")}
          tagName="p"
          className="ta-testimonial-name"
          onChange={(name) => setAttributes({ name })}
          value={name}
        />

        <RichText
          placeholder={__("Title", "tbones-p")}
          tagName="p"
          className="ta-testimonial-title"
          onChange={(title) => setAttributes({ title })}
          value={title}
        />
      </div>
    );
  },
  save({ attributes }) {
    const { text, name, title } = attributes;
    const blockProps = useBlockProps.save({ className: "swiper-slide" });

    return (
      <div {...blockProps}>
        <RichText.Content
          tagName="p"
          className="ta-testimonials-text"
          value={text}
        />
        <RichText.Content
          tagName="p"
          className="ta-testimonial-name"
          value={name}
        />
        <RichText.Content
          tagName="p"
          className="ta-testimonial-title"
          value={title}
        />
      </div>
    );
  },
});
