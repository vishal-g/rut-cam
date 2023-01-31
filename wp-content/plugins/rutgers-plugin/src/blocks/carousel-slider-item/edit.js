import {
  useBlockProps,
  InspectorControls,
  RichText,
  MediaPlaceholder,
  BlockControls,
  MediaReplaceFlow,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
  PanelBody,
  TextareaControl,
  Spinner,
  ToolbarButton,
  Tooltip,
  TextControl,
  ToggleControl,
} from "@wordpress/components";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";

export default function ({ attributes, setAttributes, context, isSelected }) {
  const { title, desc, imgID, imgAlt, imgURL, cta } = attributes;
  const blockProps = useBlockProps();

  const [imgPreview, setImgPreview] = useState(imgURL);

  const showImage = context["tbones-p/show-image"];
  const showCTA = context["tbones-p/show-cta"];

  const [linkOpensInNewTab, setLinkOpensInNewTab] = useState(
    cta.target === "_blank" ? true : false
  );

  const selectImg = (image) => {
    let newImgURL = null;

    console.log(image);

    if (isBlobURL(image.url)) {
      newImgURL = image.url;
    } else {
      newImgURL = image.sizes
        ? image.sizes.carouselSlider.url
        : image.media_details.sizes.carouselSlider.source_url;

      setAttributes({
        imgID: image.id,
        imgAlt: image.alt,
        imgURL: newImgURL,
      });
      revokeBlobURL(imgPreview);
    }
    setImgPreview(newImgURL);
  };

  const selectImgURL = (url) => {
    setAttributes({
      imgID: null,
      imgAlt: null,
      imgURL: url,
    });

    setImgPreview(url);
  };

  const imageClass = `wp-image-${imgID}`;

  // console.log(showImage, showCTA);

  const [activeSocialLink, setActiveSocialLink] = useState(null);

  setAttributes({
    imageShape: context["tbones-p/image-shape"],
    showImage: context["tbones-p/show-image"],
    showCTA: context["tbones-p/show-cta"],
  });

  return (
    <div class="group flex flex-col swiper-slide shadow-sh-01 ta-rounded-border">
      {showImage && imgPreview && (
        <BlockControls group="inline">
          <MediaReplaceFlow
            name={__("Replace Image", "tbones-p")}
            mediaId={imgID}
            mediaURL={imgURL}
            allowedTypes={["image"]}
            accept="image/*"
            onError={(error) => console.error(error)}
            onSelect={selectImg}
            onSelectURL={selectImgURL}
          />
          <ToolbarButton
            onClick={() => {
              setAttributes({
                imgID: 0,
                imgAlt: "",
                imgURL: "",
              });

              setImgPreview("");
            }}
          >
            {__("Remove Image", "tbones-p")}
          </ToolbarButton>
        </BlockControls>
      )}
      {showImage && (
        <InspectorControls>
          <PanelBody title={__("Settings", "tbones-p")}>
            {imgPreview && !isBlobURL(imgPreview) && (
              <TextareaControl
                label={__("Alt Attribute", "tbones-p")}
                value={imgAlt}
                onChange={(imgAlt) => setAttributes({ imgAlt })}
                help={__(
                  "Description of your image for screen readers.",
                  "tbones-p"
                )}
              />
            )}
          </PanelBody>
        </InspectorControls>
      )}

      <div {...blockProps}>
        {showImage && imgPreview && (
          <img src={imgPreview} alt={imgAlt} className={imageClass} />
        )}
        {showImage && isBlobURL(imgPreview) && <Spinner />}
        {showImage && (
          <MediaPlaceholder
            allowedTypes={["image"]}
            accept="image/*"
            icon="admin-users"
            onSelect={selectImg}
            disableMediaButtons={imgPreview}
            onError={(err) => console.error(err)}
            onSelectURL={selectImgURL}
          />
        )}

        <div
          class={`bg-white px-4 pt-4 ta-rounded-border-div ta-carousel-text-wrapper`}
        >
          <RichText
            placeholder={__("Title", "tbones-p")}
            tagName="h4"
            className="ta-carousel-title"
            onChange={(title) => setAttributes({ title })}
            value={title}
          />

          <RichText
            placeholder={__("Description", "tbones-p")}
            tagName="p"
            className="ta-carousel-desc"
            onChange={(desc) => setAttributes({ desc })}
            value={desc}
          />

          {showCTA && (
            <div className="social-links">
              <Tooltip text={__("Edit Button", "tbones-p")}>
                <a
                  href={cta.url}
                  target={cta.target}
                  className={`ta-carousel__button`}
                  onClick={(e) => {
                    e.preventDefault();
                    activeSocialLink
                      ? setActiveSocialLink(null)
                      : setActiveSocialLink(1);
                  }}
                >
                  {cta.buttonText}
                </a>
              </Tooltip>
            </div>
          )}

          {showCTA && isSelected && activeSocialLink !== null && (
            <div className="ta-editor-form-wrapper">
              {/* {console.log(cta)} */}
              <TextControl
                label={__("Link", "tbones-p")}
                value={cta.url}
                onChange={(url) => {
                  const tempCta = { ...cta };

                  tempCta.url = url;

                  setAttributes({ cta: tempCta });
                }}
              />
              <TextControl
                label={__("Button Text", "tbones-p")}
                value={cta.buttonText}
                onChange={(buttonText) => {
                  const tempCta = { ...cta };

                  tempCta.buttonText = buttonText;

                  setAttributes({ cta: tempCta });
                }}
              />
              <ToggleControl
                label="Open in a new tab"
                help={
                  linkOpensInNewTab
                    ? "Link opens in a new tab"
                    : "Link opens in the same tab."
                }
                checked={linkOpensInNewTab}
                onChange={(state) => {
                  const tempCta = { ...cta };

                  tempCta.target = state ? "_balnk" : "";

                  setLinkOpensInNewTab((state) => !state);

                  setAttributes({ cta: tempCta });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
