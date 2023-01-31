import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function ({ attributes }) {
  const { title, desc, imgURL, imgID, imgAlt, cta, showImage, showCTA } =
    attributes;
  const blockProps = useBlockProps.save({
    className:
      "group flex flex-col swiper-slide shadow-sh-01 ta-rounded-border",
  });
  const imageClass = `wp-image-${imgID}`;

  return (
    <div {...blockProps}>
      {imgURL && <img src={imgURL} alt={imgAlt} className={imageClass} />}

      <div
        class={`bg-white px-4 pt-4 ta-rounded-border-div ta-carousel-text-wrapper`}
      >
        <RichText.Content tagName="h4" value={title} />
        <RichText.Content tagName="p" value={desc} />

        <a
          href={cta.url}
          target={cta.target}
          rel="noopener"
          className={`ta-carousel__button`}
        >
          {cta.buttonText}
        </a>
      </div>
    </div>
  );
}
