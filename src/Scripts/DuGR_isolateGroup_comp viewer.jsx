(function(thisObj) {

// Include the API
#include "DuGR_api.jsxinc"

// Init the Duduf After Effects Framework
DuAEF.init("DuGR", DuGR.version, "RxLaboratory");

// Create the UI Panel
var ui = DuScriptUI.mainPanel(thisObj, undefined, undefined, false);
ui.content.alignChildren = ['fill', 'fill'];
ui.content.orientation = 'column';

// The group list, a ListBox ScriptUI Object
var groupList = ui.content.add('listbox', undefined, "Groups", {multiselect: true});

// Buttons
// A group to align them
var buttonGroup = DuScriptUI.group(ui.content, "row");
buttonGroup.alignment = ['fill', 'bottom'];
// DuScriptUI provides nice DuButtons
var cancelButton = DuScriptUI.button( buttonGroup, i18n._("Cancel") );
var exitButton = DuScriptUI.button( buttonGroup, i18n._("Exit isolation") );
var okButton = DuScriptUI.button( buttonGroup, i18n._("Isolate") );

// When clicking cancel, just close and delete the window.
cancelButton.onClick = function() { ui.hide(); delete ui; };

// When clicking exit, just run the "exit isolation" function and close window
exitButton.onClick = function() { DuGR.exitIsolation(); ui.hide(); delete ui; };

// On OK, isolate
okButton.onClick = function() {
    var groups = [];
    // If there's no selection, exit isolation and quit
    if (!groupList.selection || groupList.selection.length == 0) {
        DuGR.exitIsolation();
        ui.hide();
        delete ui;
    }

    // Get all selected groups
    for (var i = 0; i < groupList.selection.length; i++)
    {
        groups.push( groupList.selection[i].groupName );
    }

    // Isolate, and quit.
    DuGR.isolate( groups, undefined, undefined, undefined, DuGR.IsolationMode.COMP_PANEL );
    ui.hide();
    delete ui;
}

// Populate group list
// Default groups
groupList.add('item',i18n._("All layers")).groupName = DuGR.Group.ALL;
groupList.add('item',i18n._("Selected")).groupName = DuGR.Group.SELECTED;
groupList.add('item',i18n._("Grouped")).groupName = DuGR.Group.GROUPED;
groupList.add('item',i18n._("Ignored")).groupName = DuGR.Group.IGNORED;
// List groups found in the current comp
var groups = DuGR.listGroups();
// The "groups" list is a DuList, which provids the "do" method
// to quickly loop through all items.
groups.do(function(g) {
    groupList.add('item', g).groupName = g;
});

// Show the UI
DuScriptUI.showUI(ui);

})(this);