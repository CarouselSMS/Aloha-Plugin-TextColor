/**
 * register the plugin with unique name
 */
GENTICS.Aloha.TextColor = new GENTICS.Aloha.Plugin('com.gentics.aloha.plugins.TextColor');

/**
 * Configure the available languages
 */
GENTICS.Aloha.TextColor.languages = ['en', 'ru'];

/**
 * Initialize the plugin and set initialize flag on true
 */
GENTICS.Aloha.TextColor.init = function () {	
	
  var that = this,
      buttons = {},
      colors = ['black', 'red', 'green', 'blue'],
      stylePath = GENTICS_Aloha_base + '/plugins/com.gentics.aloha.plugins.TextColor/css/TextColor.css';
      
  jQuery('<link rel="stylesheet" />').attr('href', stylePath).appendTo('head');
  
  jQuery.each(colors, function(index, value){
    buttons[value] = new GENTICS.Aloha.ui.Button({
      "iconClass" : "GENTICS_button_" + value,
      "size" : "small",
      "onclick": function () {
        if (GENTICS.Aloha.activeEditable) {
  				GENTICS.Aloha.activeEditable.obj[0].focus()
  			}
  			var markup = jQuery('<span style="color:' + value + '"></span>');
  			var rangeObject = GENTICS.Aloha.Selection.rangeObject;
  			var foundMarkup = rangeObject.findMarkup(function() {
  				return this.nodeName.toLowerCase() == markup.get(0).nodeName.toLowerCase()
  			},
  			GENTICS.Aloha.activeEditable.obj);

  			if (foundMarkup) {
  				if (rangeObject.isCollapsed()) {
  					GENTICS.Utils.Dom.removeFromDOM(foundMarkup, rangeObject, true)
  				} else {
  					GENTICS.Utils.Dom.removeMarkup(rangeObject, markup, GENTICS.Aloha.activeEditable.obj)
  				}
  			} else {
  				if (rangeObject.isCollapsed()) {
  					GENTICS.Utils.Dom.extendToWord(rangeObject)
  				}
  				GENTICS.Utils.Dom.addMarkup(rangeObject, markup)
  			}
  			rangeObject.select();
  			return false
      },
      "tooltip" : that.i18n("button.textcolor." + value + ".tooltip")
    });
  });

  // // add it to the floating menu
  // GENTICS.Aloha.FloatingMenu.addButton(
  //   'GENTICS.Aloha.continuoustext',
  //   button,
  //   GENTICS.Aloha.i18n(GENTICS.Aloha, 'floatingmenu.tab.format'),
  //   1
  // );
  
  jQuery.each(colors, function(index, value){
    GENTICS.Aloha.FloatingMenu.addButton(
      "GENTICS.Aloha.continuoustext", 
      buttons[value], 
      that.i18n("floatingmenu.tab.color"), 
      1
    );    
  });
};