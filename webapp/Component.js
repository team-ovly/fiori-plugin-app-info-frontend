sap.ui.define([
	"sap/ui/core/Component",
	"sap/base/util/ObjectPath",
	"sap/ui/core/mvc/XMLView"
], function (
	Component,
	ObjectPath,
	XMLView
) {

	return Component.extend("ovly.flp.appinfo.Component", {

		metadata: {
			"manifest": "json"
		},

		/**
		 * Libs
		 */

		/**
		* Model references
		*/
		_oModelView: null,
		_oResourceModel: null,

		/**
		 * Controls captured using byId
		 */


		/**
		 * Global Variables
		 */

		/**
		 * Constants
		 */
		DIALOG_MAIN: "Main",

		/** 
		 * Hook methods
		 */
		init: function () {
			this._getModels();

			var rendererPromise = this._getRenderer();

			rendererPromise.then(function (oRenderer) {

				this._addPluginButton(oRenderer);

			}.bind(this));


		},

		/**
		 * Internal methods
		 */

		_getModels: function () {
			this._oResourceModel = this.getModel("i18n");
		},

		_getResourceBundle: function (sModelName) {
			var oResourceModelName = "i18n";
			if (sModelName) {
				oResourceModelName = sModelName;
			}
			return this.getModel(oResourceModelName).getResourceBundle();
		},

		_getText: function (sKey, aArgs) {
			return this._getResourceBundle().getText(sKey, aArgs);
		},

		_addPluginButton: function (oRenderer) {

			var oButtonSettings = {
				icon: "sap-icon://it-host",
				text: this._getText("button_text"),
				press: [this._displayDialog, this]
			};
			oRenderer.addHeaderEndItem(oButtonSettings, true);
		},

		_displayDialog: function () {

			var sViewName = this._getViewName(this.DIALOG_MAIN);

			XMLView.create({
				viewName: sViewName
			}).then(function (oView) {
				oView.setModel(this._oResourceModel, "i18n");
				var oDialog = oView.getContent()[0];
				oDialog.open();
			}.bind(this));

		},

		_getViewName: function (sView) {
			return "ovly.flp.appinfo.view." + sView;
		},

		/**
		 * Returns the shell renderer instance in a reliable way,
		 * i.e. independent from the initialization time of the plug-in.
		 * This means that the current renderer is returned immediately, if it
		 * is already created (plug-in is loaded after renderer creation) or it
		 * listens to the &quot;rendererCreated&quot; event (plug-in is loaded
		 * before the renderer is created).
		 *
		 *  @returns {object}
		 *      a jQuery promise, resolved with the renderer instance, or
		 *      rejected with an error message.
		 */
		_getRenderer: function () {
			var that = this,
				oDeferred = new jQuery.Deferred(),
				oRenderer;

			var sErrorMessage = this._getText("message_flp_not_found");

			that._oShellContainer = ObjectPath.get("sap.ushell.Container");

			if (!that._oShellContainer) {
				oDeferred.reject(sErrorMessage);
			} else {

				oRenderer = that._oShellContainer.getRenderer();

				if (oRenderer) {
					oDeferred.resolve(oRenderer);
				} else {
					// renderer not initialized yet, listen to rendererCreated event
					that._onRendererCreated = function (oEvent) {
						oRenderer = oEvent.getParameter("renderer");
						if (oRenderer) {
							oDeferred.resolve(oRenderer);
						} else {
							oDeferred.reject(sErrorMessage);
						}
					};
					that._oShellContainer.attachRendererCreatedEvent(that._onRendererCreated);
				}
			}
			return oDeferred.promise();
		}
	});
});