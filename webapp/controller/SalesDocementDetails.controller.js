sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"ZSOLIST/model/formatter"
], function (Controller, MessageToast, formatter) {
	"use strict";
	var salesOrg;
	return Controller.extend("ZSOLIST.controller.SalesDocementDetails", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZSOLIST.view.SalesDocementDetails
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("salesDocumentDetails1").attachPatternMatched(this._onObjectMatched, this);
			var tableId = this.getView().byId("idMaterialData");
			// iconTabBar.setSelectedKey("salesTab");

			tableId.addEventDelegate({
				onAfterRendering: function () {
					alert("hello")
						// $("#idMaterialData").pagination({
						// 	items: 2,
						// 	itemsOnPage: 1,
						// 	cssStyle: 'light-theme'
						// });
				}
			}, this);

		},

		_onObjectMatched: function (oEvt) {

			salesOrg = oEvt.getParameter("arguments").salesdoc;
		},
		onBarcodeScan: function () {

			var that = this;
			var code;
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					code = result.text;

					that.getView().byId("salesDocId").setValue(code);
					//that.onSearch();
				},
				function (error) {
					MessageToast.show("Scanning failed: " + error);
				}
			);

		},

		getMaterialInfo: function () {
			var salesDocument = this.getView().byId("salesDocId").getValue();
			if (salesDocument !== "") {
				var sPath = "/SOHEADERSet('" + salesOrg + "')/SDHEADERSet('" + salesDocument + "')/SDITEMSet";
				var that = this;
				var iconTabBar = this.getView().byId("salesDetaisId");
				iconTabBar.setSelectedKey("materialsTab");
				var oModel = that.getOwnerComponent().getModel();
				this.getView().getModel().refresh();
				//var salesOrg = oEvent.getParameter().arguments.salesdoc;
				oModel.read(sPath, {
					success: function (odata, response) {
						var oModel2 = new sap.ui.model.json.JSONModel(odata);
						that.getView().byId("idMaterialData").setModel(oModel2);
					}
				});
				//	this.getView().byId("salesDocId").setValue();
			} else {
				MessageToast.show("Please Enter The Sales Document");
			}
		},
		onDataExportPDF: function (oEvent) {
			// var fnSuccess = function(oData, oResponse) {
			debugger;
			var oModel = this.getView().getModel();
			var tableId = this.getView().byId("idMaterialData");

			//var columns = ["Vbeln", "posnr", "Matnr","Arktx","Pstyv"];
			var columns = [];
			var columnLength = tableId.getColumns().length;
			for (var i = 0; i < columnLength; i++) {
				columns[i] = tableId.getColumns()[i].getHeader().getText();
			}
			var data = [];
			var length = tableId.getItems().length;
			for (var i = 0; i < length; i++) {
				var itemsLength = tableId.getItems()[i].getCells().length;
				//alert(itemsLength);
				var dataItems = [];
				for (var j = 0; j < itemsLength; j++) {
					dataItems[j] = tableId.getItems()[i].getCells()[j].getText();
				}
				data[i] = dataItems;
			}
			var doc = new jsPDF("p", "pt");
			doc.autoTable(columns, data);
			doc.save("table.pdf");
			//var doc = new jsPDF("p", "pt", "a2");

			//           doc.addHTML($('<div />').html($('#idMaterialData').clone()).html(),function() {

			//               doc.save("form.pdf");

			//           });
			//};

		}
	});

});