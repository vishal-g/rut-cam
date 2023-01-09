//Hiding Gutenberg Editor panels
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-category' ) ; // category
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-post_tag' ); // tags
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'page-attributes' ); // page attributes
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'post-excerpt' ); // Excerpt
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'discussion-panel' ); // Discussion

// //Remove panels from certain plugins (this is just an example from plugins I have, you do this for your own plugins if you need, if not then just delete this part)
// wp.data.dispatch('core/edit-post').removeEditorPanel('meta-box-beehive_analytics_stats'); // Remove the Beehive Analytics Stats meta-box:
// wp.data.dispatch('core/edit-post').removeEditorPanel('meta-box-cmplz_edit_meta_box'); // Remove the Complianz Cookie Banner meta-box:
// wp.data.dispatch('core/edit-post').removeEditorPanel('meta-box-icl_div_config'); // Remove the Multilingual Content Setup WPML meta-box:
//
// //CPT taxonomies (here you can put yours, these are from one of my websites as an example for you)
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-project_category' ) ; // project category
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-type_of_work' ) ; // type of work
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-system' ) ; // system
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-glass_type' ) ; // glass type
// wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-location' ) ; // location

//Making Featured Image and Permalink opened initially (you can use this to toggle any existing box actually, just modify the names)
if(!wp.data.select('core/edit-post').isEditorPanelOpened('featured-image')){
    wp.data.dispatch('core/edit-post').toggleEditorPanelOpened('featured-image');
}
if(!wp.data.select('core/edit-post').isEditorPanelOpened('post-link')){
    wp.data.dispatch('core/edit-post').toggleEditorPanelOpened('post-link');
}

//Disable Gutenberg Tour Guide popup

wp.data.select( "core/edit-post" ).isFeatureActive( "welcomeGuide" ) && wp.data.dispatch( "core/edit-post" ).toggleFeature( "welcomeGuide" )