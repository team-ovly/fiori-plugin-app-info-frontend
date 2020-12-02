sap.ui.define([
	"./flp",
	"sap/ui/fl/FakeLrepConnectorLocalStorage",
	"sap/m/MessageBox"
], function (oFLP, FakeLrepConnectorLocalStorage, MessageBox) {
	"use strict";

	oFLP.init().then(function () {
		FakeLrepConnectorLocalStorage.enableFakeConnector();
	}, function (oError) {
		MessageBox.error(oError.message);
	});
});