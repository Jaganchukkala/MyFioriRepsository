sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Filter"
], function(Controller, FilterOperator, Filter) {
	"use strict";

	return Controller.extend("ZSOLIST.controller.MasterView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZSOLIST.view.MasterView
		 */
		// onInit: function() {
		// 	debugger;
		// 	var that = this;
		// 	var oview = that.getView();
		//// the below code is a test

		// the above code is a test

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZSOLIST.view.MasterView
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		getSDDeatails: function(oEvent) {
			//var theView=new sap.ui.xmlview('salesdoc', 'salesDocementDetails');
			//var pageHeader = new JSView("view.salesDocementDetails");
			debugger;
			// var view = sap.ui.core.mvc.View("SalesDocementDetails");
			var salesDocument = oEvent.getSource().getTitle();
			var oRouter = this.getOwnerComponent().getRouter();
			//	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.getView().getModel().refresh();
			oRouter.navTo("salesDocumentDetails1", {
				salesdoc: salesDocument
			});
			// var iconTabBar = sap.ui.getCore().byId("salesDetaisId");
			// alert(iconTabBar)
		},
		goBack: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("salesDocumentDetails1");
		},
		onSearch: function(oEvent) {
				alert("search")
				var query = oEvent.getParameter("query");
				var aFilter = [];
				if (query) {
					aFilter.push(new Filter("Vkorg", FilterOperator.Contains, query));
				}
				var list = this.byId("materailsList");
				var binding = list.getBinding("items");
				binding.filter(aFilter);
			}
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf ZSOLIST.view.MasterView
			 */
			//	onAfterRendering: function() {
			//
			//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZSOLIST.view.MasterView
		 */
		//	onExit: function() {
		//
		//	}

	});

});