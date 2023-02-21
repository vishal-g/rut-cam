<?php

function tbt_registrations()
{

	// Register block styles

	$block_styles = array(
		'core/paragraph' => array(
			'big-text'    => __('Big Text', 'tbones')
		),
		'core/cover' => array(
			'bottom-button'    => __('Bottom Button', 'tbones')
		)
	);

	foreach ($block_styles as $block => $styles) {
		foreach ($styles as $style_name => $style_label) {
			register_block_style(
				$block,
				array(
					'name'  => $style_name,
					'label' => $style_label,
				)
			);
		}
	}

	// Register pattern categories

	register_block_pattern_category('rutgers', array(
		'label' => __('Rutgers', 'tbones')
	));

	register_block_pattern_category('sections', array(
		'label' => __('Sections', 'tbones')
	));

	register_block_pattern_category('templates', array(
		'label' => __('Templates', 'tbones')
	));
}
