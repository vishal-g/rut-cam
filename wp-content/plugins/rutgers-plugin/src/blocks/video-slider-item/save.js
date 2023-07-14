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

    <div className="image-video-icon-wrapper">
    {imgURL && <img src={imgURL} alt={imgAlt} className={imageClass} />}

    <a
    href={cta.url}
    target={cta.target}
    rel="noopener"
    className={`ta-carousel__button wpzoom-video-popup-block`}
  >
  <span class="wpzoom-video-popup-block_icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d="m14.25 10.367c-1-0.57778-2.2504 0.14388-2.2504 1.2988v8.6674c0 1.155 1.2504 1.8766 2.2504 1.2988l8.2498-4.7666c0.3094-0.1786 0.4998-0.5088 0.4998-0.86588 0-0.35714-0.1904-0.68718-0.4998-0.86586zm-14.25 5.6326c0-8.8366 7.1634-16 16-16 8.8366 0 16 7.1634 16 16 0 8.8366-7.1634 16-16 16-8.8366 0-16-7.1634-16-16zm16-14c-7.732 0-14 6.268-14 14 0 7.732 6.268 14 14 14 7.732 0 14-6.268 14-14 0-7.732-6.268-14-14-14z" fill="currentColor"></path></svg></span>
  </a>
    </div>
      

      <div
        class={`bg-white px-4 pt-4 ta-rounded-border-div ta-carousel-text-wrapper`}
      >
        <RichText.Content tagName="h4" value={title} />

       
      </div>
    </div>
    
  );
}
