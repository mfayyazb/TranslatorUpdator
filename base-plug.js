BasePlug = {
	id: null,
	version: null,
	rootURI: null,
	initialized: false,
	addedElementIDs: [],
	
	init({ id, version, rootURI }) {
		if (this.initialized) return;
		this.id = id;
		this.version = version;
		this.rootURI = rootURI;
		this.initialized = true;
	},
	
	log(msg) {
		Zotero.debug("BasePlug: " + msg);
	},

	
	addToWindow(window) { // All we need to do in window must be added here!!
		let doc = window.document;
		
		// //  Add a stylesheet to the main Zotero pane
		// let link1 = doc.createElement('link');
		// link1.id = 'make-it-red-stylesheet';
		// link1.type = 'text/css';
		// link1.rel = 'stylesheet';
		// link1.href = this.rootURI + 'style.css';
		// doc.documentElement.appendChild(link1);
		// this.storeAddedElement(link1);
		
		// Insert ftl file : Use Fluent for localization
		window.MozXULElement.insertFTLIfNeeded("base-plug.ftl");
		
		// Add menu option
		let menuitem_1 = doc.createXULElement('menuitem');
		menuitem_1.id = 'for_test';
		menuitem_1.setAttribute('type', 'checkbox');
		// menuitem_1.setAttribute('data-l10n-id', 'first-menuitem-text'); //read from ftl file
		menuitem_1.setAttribute('label', 'Label for test')
		menuitem_1.addEventListener('command', () => {
            // what we want to do when click menuitem
			BasePlug.checkAlert();
		});
		doc.getElementById('menu_viewPopup').appendChild(menuitem_1); // we can choose any menupopup
		this.storeAddedElement(menuitem_1);		



	},

	checkAlert(){
        return;
    },

	addToAllWindows() {
		var windows = Zotero.getMainWindows();
		for (let win of windows) {
			if (!win.ZoteroPane) continue;
			this.addToWindow(win);
            // we can add another func to all windows
		}
	},
	
	storeAddedElement(elem) {
		if (!elem.id) {
			throw new Error("Element must have an id");
		}
		this.addedElementIDs.push(elem.id);
	},
	
	removeFromWindow(window) {
		var doc = window.document;
		// Remove all elements added to DOM
		for (let id of this.addedElementIDs) {
			doc.getElementById(id)?.remove();
		}
		doc.querySelector('[href="base_plug.ftl"]').remove();
	},
	
	removeFromAllWindows() {
		var windows = Zotero.getMainWindows();
		for (let win of windows) {
			if (!win.ZoteroPane) continue;
			this.removeFromWindow(win);
		}
	},
	

	
	async main() {
		// Global properties are included automatically in Zotero 7
		var host = new URL('https://foo.com/path').host;
		this.log(`Host is ${host}`);
		
		// Retrieve a global pref
		this.log(`Intensity is ${Zotero.Prefs.get('extensions.base-plug.intensity', true)}`);
	},
};

