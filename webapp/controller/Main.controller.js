sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (
    BaseController,
    JSONModel
) {
    "use strict";

    return BaseController.extend("ovly.flp.appinfo.controller.Main", {

        /**
        * Model references
        */
        _oModelView: null,

        /**
         * Controls captured using byId
         */
        _oDialog: null,

        /** 
         * Hook methods
         */
        onInit: function () {
            this._createLocalModels();
            this._getControlsById();
        },


        /**
         * Event handlers
         */

        /**
        * Closes dialog 
        */
        onClose: function (oEvent) {
            var oSource = oEvent.getSource();
            var oParameters = oEvent.getParameters();
            this._oDialog.close();
        },

        /**
         * Internal methods
         */
        _createLocalModels: function () {
            this._oModelView = this._createViewModel();
            this._createAppInfoModel();
        },

        _createViewModel: function () {
            var oViewModelData = {
            };
            var oModel = new JSONModel(oViewModelData);
            this.getView().setModel(oModel, "view");
            return oModel;
        },

        _createAppInfoModel: function () {

            var oModel = new JSONModel("/api");
            // this.getView().setModel(oModel, "info");
            sap.ui.getCore().setModel(oModel, "info");
            return oModel;
        },

        _getControlsById: function () {
            this._oDialog = this.byId("dialog");
        }


    });
});