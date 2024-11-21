import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import icons from ".././icons.js";
import "./main.css";

registerBlockType("tbones-p/custom-search", {
    icon: {
        src: icons.primary,
      },
    edit: ({ attributes, setAttributes }) => {
        const { placeholder, buttonText } = attributes;
        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__("Settings", "tbones-p")}>
                        <TextControl
                            label={__("Placeholder Text", "tbones-p")}
                            value={placeholder}
                            onChange={(value) => setAttributes({ placeholder: value })}
                        />
                        <TextControl
                            label={__("Button Text", "tbones-p")}
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="custom-search-block">
                    <input
                        type="text"
                        placeholder={placeholder}
                        readOnly
                        className="custom-search-input"
                    />
                    <Button isSecondary className="custom-search-button">
                        {buttonText}
                    </Button>
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { placeholder, buttonText } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <div className="custom-search-block">
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="custom-search-input"
                    />
                    <button className="custom-search-button">{buttonText}</button>
                </div>
            </div>
        );
    },
});
