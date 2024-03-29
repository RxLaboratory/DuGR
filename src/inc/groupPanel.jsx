var groupGroup = DuScriptUI.group( tab, 'row') ;
groupGroup.alignment = ['fill','fill'];

groupList = groupGroup.add('listbox',undefined,"Groups",{multiselect: true});
groupList.alignment = ['fill', 'fill'];

groupList.add('item',i18n._("All layers")).groupName = DuGR.Group.ALL;
groupList.add('item',i18n._("Selected")).groupName = DuGR.Group.SELECTED;
groupList.add('item',i18n._("Grouped")).groupName = DuGR.Group.GROUPED;
groupList.add('item',i18n._("Ignored")).groupName = DuGR.Group.IGNORED;

groupList.onChange = refreshIsolation;

var buttonGroup = DuScriptUI.group( groupGroup, 'column');
buttonGroup.alignment = ['right', 'fill'];
var topButtons = DuScriptUI.group( buttonGroup, 'column');
topButtons.alignment = ['right', 'top'];

var addLayerButton = DuScriptUI.button(
    topButtons,
    "",
    w12_add_layer,
    i18n._("Add selected layers to group.")
)
addLayerButton.alignment = ['right', 'top'];

var layerInfoButton = DuScriptUI.button(
    topButtons,
    "",
    w12_layer_info,
    i18n._("Get groups from selected layers.")
)
addLayerButton.alignment = ['right', 'top'];

var removeLayerButton = DuScriptUI.button(
    topButtons,
    "",
    w12_remove_layer,
    i18n._("Remove selected layers from group.")
)
removeLayerButton.alignment = ['right', 'top'];

var bottomButtons = DuScriptUI.group( buttonGroup, 'column');
bottomButtons.alignment = ['right', 'bottom'];

var addGroupButton = DuScriptUI.button(
    bottomButtons,
    "",
    w12_add,
    i18n._("Create new group.")
)
addGroupButton.alignment = ['right', 'bottom'];

var editGroupButton = DuScriptUI.button(
    bottomButtons,
    "",
    w12_edit,
    i18n._("Change group name")
)
editGroupButton.alignment = ['right', 'bottom'];

var removeGroupButton = DuScriptUI.button(
    bottomButtons,
    "",
    w12_remove,
    i18n._("Remove group.")
)
removeGroupButton.alignment = ['right', 'bottom'];

var nameEditor = DuScriptUI.popUp("Edit group name");
nameEditor.content.alignment = ['fill','top'];
var nameEdit = DuScriptUI.editText(
    nameEditor.content,
    '',
    '',
    '',
    i18n._("New group"),
    
)
nameEdit.alignment = ['fill','top'];

var nameButtons = DuScriptUI.group( nameEditor.content );
nameButtons.alignment = ['fill','top'];

var nameOKButton = DuScriptUI.button(
    nameButtons,
    i18n._("OK"),
    DuScriptUI.Icon.CHECK,
    i18n._("Change group name"),
    false,
    'row',
    'center'
)

nameEditor.previousName = '';

// =========== FUNCTIONS ==================

nameOKButton.onClick = function()
{
    if (nameEdit.text == '') return;

    // Create group
    if (nameEditor.previousName == '')
    {
        DuAE.beginUndoGroup("Create group");
        DuGR.addSelectedLayersToGroup( nameEdit.text );
        DuAE.endUndoGroup();
        refreshPanel();
    }
    // Rename group
    else
    {
        DuAE.beginUndoGroup("Rename group");
        DuGR.renameGroup( nameEditor.previousName, nameEdit.text );
        DuAE.endUndoGroup();
        refreshPanel();
    }

    nameEditor.hidePopup();
}

nameEditor.addEventListener('enterkey', nameOKButton.onClick );

editGroupButton.onClick = function()
{
    if (!groupList.selection)
    {
        nameEditor.block = true;
        return;
    }
    var item = groupList.selection[0];
    if (item.index < 4)
    {
        nameEditor.block = true;
        return;
    }

    var group = item.groupName;
    nameEditor.previousName = group;
    nameEdit.setText(group);
    nameEdit.clicked();
}

addGroupButton.onClick = function()
{
    nameEditor.previousName = '';
    nameEdit.setText('');
    nameEdit.clicked();
}

removeGroupButton.onClick = function()
{
    if (!groupList.selection) return;
    var item = groupList.selection[0];
    if (item.index < 4) return;

    var group = item.groupName;
    var ok = confirm("Are you sure you want to remove this group: " + group + "?", true, "Remove group");
    if (!ok) return;
    DuAE.beginUndoGroup("Remove group");
    DuGR.removeGroup( group );
    DuAE.endUndoGroup();
    refreshPanel();
}

addLayerButton.onClick = function()
{
    if (!groupList.selection) return;

    DuAE.beginUndoGroup("Add layers to groups");

    for (var i = 0, n = groupList.selection.length; i < n; i++)
    {
        var item = groupList.selection[i];
        if (item.index < 3) continue;
        var group = groupList.selection[i].groupName;
        DuGR.addSelectedLayersToGroup( group );
    }
    
    DuAE.endUndoGroup();
}

layerInfoButton.onClick = function()
{
    var groups = DuGR.listGroups( undefined, true);

    groupList.items[0].selected = false;
    groupList.items[1].selected = false;
    groupList.items[2].selected = false;
    
    // Select
    for (var i = 3, n = groupList.items.length; i < n; i++)
    {
        var item = groupList.items[i];
        var g = item.groupName;
        if (groups.indexOf(g) >= 0) item.selected = true;
        else item.selected = false;
    }
}

removeLayerButton.onClick = function()
{
    if (!groupList.selection) return;

    DuAE.beginUndoGroup("Remove layers from groups");

    for (var i = 0, n = groupList.selection.length; i < n; i++)
    {
        var item = groupList.selection[i];
        if (item.index < 3) continue;
        var group = groupList.selection[i].groupName;
        DuGR.removeGroup( group, undefined, true );
    }
    
    DuAE.endUndoGroup();
    
    refreshPanel();
}

nameEditor.tieTo( addGroupButton );
nameEditor.tieTo( editGroupButton );

// Init
refreshPanel();