/**
 * register the plugin with unique name
 */
GENTICS.Aloha.TextColor = new GENTICS.Aloha.Plugin('com.gentics.aloha.plugins.TextColor');

/**
 * Configure the available languages
 */
GENTICS.Aloha.TextColor.languages = ['en'];

/**
 * Initialize the plugin and set initialize flag on true
 */
GENTICS.Aloha.TextColor.init = function () {
  // create a new button
  var that = this;

  var button = new GENTICS.Aloha.ui.Button({
    'iconClass' : 'GENTICS_button_c',
    'size' : 'small',
    'onclick': function () {
      var rangeObject = GENTICS.Aloha.Selection.rangeObject;
      var markup = jQuery('<span style="color: red;"></span>');
      GENTICS.Utils.Dom.addMarkup(rangeObject, markup);
    },
    'tooltip' : that.i18n('button.textcolor.tooltip')
  });

  // add it to the floating menu
  GENTICS.Aloha.FloatingMenu.addButton(
    'GENTICS.Aloha.continuoustext',
    button,
    GENTICS.Aloha.i18n(GENTICS.Aloha, 'floatingmenu.tab.format'),
    1
  );
};