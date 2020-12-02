sap.ui.define([
	"sap/base/util/ObjectPath",
	"sap/ushell/services/Container"
], function (ObjectPath, Container) {
	"use strict";

	ObjectPath.set(["sap-ushell-config"], {
		defaultRenderer: "fiori2",
		bootstrapPlugins: {
			"AppService": {
				component: "ovly.flp.appinfo",
				config: {
					validateAppVersion: false
				}
			}
		},
		renderers: {
			fiori2: {
				componentData: {
					config: {
						enableSearch: false,
						rootIntent: "Shell-home"
					}
				}
			}
		},
		services: {
			"LaunchPage": {
				"adapter": {
					"config": {
						"groups": [
							{
								"title": "Demo group",
								"isDefaultGroup": false,
								"tiles": [{
									"tileType": "sap.ushell.ui.tile.StaticTile",
									"properties": {
										"title": "App 1",
										"targetURL": "#SemanticObject1-action1"
									}
								}]
							}

						]
					}
				}
			},
			"ClientSideTargetResolution": {
				"adapter": {
					"config": {
						"inbounds": {
							"SemanticObject1-action1": {
								"semanticObject": "SemanticObject1",
								"action": "action1",
								"title": "App 1",
								"signature": {
									"parameters": {}
								},
								"resolutionResult": {
									"applicationType": "SAPUI5",
									"additionalInformation": "SAPUI5.Component=ovly.flp.demo1",
									"url": sap.ui.require.toUrl("ovly/flp/demo1")
								}
							}
						}
					}
				}
			},
			NavTargetResolution: {
				config: {
					"enableClientSideTargetResolution": true
				}
			}
		}
	});

	var oFlpSandbox = {
		init: function () {
			/**
			 * Initializes the FLP sandbox
			 * @returns {Promise} a promise that is resolved when the sandbox bootstrap has finshed
			 */

			// sandbox is a singleton, so we can start it only once
			if (!this._oBootstrapFinished) {
				this._oBootstrapFinished = sap.ushell.bootstrap("local");
				this._oBootstrapFinished.then(function () {
					sap.ushell.Container.createRenderer().placeAt("content");
				});
			}

			return this._oBootstrapFinished;
		}
	};

	return oFlpSandbox;
});