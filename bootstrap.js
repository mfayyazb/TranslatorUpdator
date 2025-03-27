var BasePlug;

function log(msg) {
	Zotero.debug("Base Plug: " + msg);
}

function install() {
	log("Installed Base Plug 2.0");
}

async function startup({ id, version, rootURI }) {
	log("Starting Base Plug 2.0");
	
	// Zotero.PreferencePanes.register({
	// 	pluginID: 'make-it-red@example.com',
	// 	src: rootURI + 'preferences.xhtml',
	// 	scripts: [rootURI + 'preferences.js']
	// });
	
	Services.scriptloader.loadSubScript(rootURI + 'base-plug.js');
	BasePlug.init({ id, version, rootURI });
	BasePlug.addToAllWindows();
	await BasePlug.main();
}


function onMainWindowLoad({ window }) {
	BasePlug.addToWindow(window);

}

function onMainWindowUnload({ window }) {
	BasePlug.removeFromWindow(window);
}

function shutdown() {
	log("Shutting down 2.0");
	BasePlug.removeFromAllWindows();
	BasePlug = undefined;
}

function uninstall() {
	log("Uninstalled 2.0");
}
