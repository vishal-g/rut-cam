(() => {
  // assets/src/js/ta-editor-script.js
  if (!wp.data.select("core/edit-post").isEditorPanelOpened("featured-image")) {
    wp.data.dispatch("core/edit-post").toggleEditorPanelOpened("featured-image");
  }
  if (!wp.data.select("core/edit-post").isEditorPanelOpened("post-link")) {
    wp.data.dispatch("core/edit-post").toggleEditorPanelOpened("post-link");
  }
  wp.data.select("core/edit-post").isFeatureActive("welcomeGuide") && wp.data.dispatch("core/edit-post").toggleFeature("welcomeGuide");
})();
