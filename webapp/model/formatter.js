sap.ui.define([], function() {
	"use strict";
	return {
		textChange: function(stext) {
		//	var statusToShow = this.getView().getModel("i18n").getResourceBundle();
			// stext.substring(0, 2);

			// alert("hello"+stext)
			return stext.substring(0, 4);
		}
	};
});