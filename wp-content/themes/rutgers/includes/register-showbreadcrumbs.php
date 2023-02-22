<?php

// Meta Box Class: ShowBreadcrumbsMetaBox
// Get the field value: $metavalue = get_post_meta( $post_id, $field_id, true );
class ShowBreadcrumbsMetaBox{

	private $screen = array(
		'page',
                        
	);

	private $meta_fields = array(
                array(
                    'label' => 'class name',
                    'id' => 'show_breadcrumbs',
                    'default' => 'show',
                    'type' => 'radio',
                    'options' => array(
                        'Show',
                        'Hide'
                    )
                )

	);

	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'save_post', array( $this, 'save_fields' ) );
	}

	public function add_meta_boxes() {
		foreach ( $this->screen as $single_screen ) {
			add_meta_box(
				'ShowBreadcrumbs',
				__( 'ShowBreadcrumbs', '' ),
				array( $this, 'meta_box_callback' ),
				$single_screen,
				'normal',
				'default'
			);
		}
	}

	public function meta_box_callback( $post ) {
		wp_nonce_field( 'ShowBreadcrumbs_data', 'ShowBreadcrumbs_nonce' );
                echo 'add class (show or hide)';
		$this->field_generator( $post );
	}
	public function field_generator( $post ) {
		$output = '';
		foreach ( $this->meta_fields as $meta_field ) {
			$label = '<label for="' . $meta_field['id'] . '">' . $meta_field['label'] . '</label>';
			$meta_value = get_post_meta( $post->ID, $meta_field['id'], true );
			if ( empty( $meta_value ) ) {
				if ( isset( $meta_field['default'] ) ) {
					$meta_value = $meta_field['default'];
				}
			}
			switch ( $meta_field['type'] ) {
                        case 'radio':
                            $input = '<fieldset>';
                            $input .= '<legend class="screen-reader-text">' . $meta_field['label'] . '</legend>';
                            $i = 0;
                            foreach ( $meta_field['options'] as $key => $value ) {
                                $meta_field_value = !is_numeric( $key ) ? $key : $value;
                                $input .= sprintf(
                                    '<label><input %s id=" %s" name="%s" type="radio" value="%s"> %s</label>%s',
                                    $meta_value === $meta_field_value ? 'checked' : '',
                                    $meta_field['id'],
                                    $meta_field['id'],
                                    $meta_field_value,
                                    $value,
                                    $i < count( $meta_field['options'] ) - 1 ? '<br>' : ''
                                );
                                $i++;
                            }
                            $input .= '</fieldset>';
                            break;

				default:
                                    $input = sprintf(
                                        '<input %s id="%s" name="%s" type="%s" value="%s">',
                                        $meta_field['type'] !== 'color' ? 'style="width: 100%"' : '',
                                        $meta_field['id'],
                                        $meta_field['id'],
                                        $meta_field['type'],
                                        $meta_value
                                    );
			}
			$output .= $this->format_rows( $label, $input );
		}
		echo '<table class="form-table"><tbody>' . $output . '</tbody></table>';
	}

	public function format_rows( $label, $input ) {
		return '<tr><th>'.$label.'</th><td>'.$input.'</td></tr>';
	}

	public function save_fields( $post_id ) {
		if ( ! isset( $_POST['ShowBreadcrumbs_nonce'] ) )
			return $post_id;
		$nonce = $_POST['ShowBreadcrumbs_nonce'];
		if ( !wp_verify_nonce( $nonce, 'ShowBreadcrumbs_data' ) )
			return $post_id;
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
			return $post_id;
		foreach ( $this->meta_fields as $meta_field ) {
			if ( isset( $_POST[ $meta_field['id'] ] ) ) {
				switch ( $meta_field['type'] ) {
					case 'email':
						$_POST[ $meta_field['id'] ] = sanitize_email( $_POST[ $meta_field['id'] ] );
						break;
					case 'text':
						$_POST[ $meta_field['id'] ] = sanitize_text_field( $_POST[ $meta_field['id'] ] );
						break;
				}
				update_post_meta( $post_id, $meta_field['id'], $_POST[ $meta_field['id'] ] );
			} else if ( $meta_field['type'] === 'checkbox' ) {
				update_post_meta( $post_id, $meta_field['id'], '0' );
			}
		}
	}
}

if (class_exists('ShowBreadcrumbsMetabox')) {
	new ShowBreadcrumbsMetabox;
};

function custom_body_class( $classes ) {
    global $post;
	$meta_field = get_post_meta( get_the_ID(), 'show_breadcrumbs', true );
	if( $meta_field =='Show' ){
		$classes[] = 'ta-show-breadcrumbs';
	}
	if( $meta_field =='Hide' ){
		$classes[] = 'ta-hide-breadcrumbs';
	}
    return $classes;
}
add_filter( 'body_class', 'custom_body_class' );

?>