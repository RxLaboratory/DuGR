var uiMode = DuESF.scriptSettings.get("common/uiMode", 0);

// =========== UTILS =================

function saveListSelection(list) {
    // Keep selection
    var currentSelection = [];
    if (list.selection) {
        for (var i = 0; i < list.selection.length; i++)
        {
            currentSelection.push(list.selection[i].text);
        }
    }
    return currentSelection;
}

function restoreListSelection(list, sel) {
    // Reselect
    var newSelection = [];
    for (var i = list.items.length -1 ; i >= 0; i-- )
    {
        var g = list.items[i].text;
        for (var j = 0; j < sel.length; j++)
        {
            if (g == sel[j]) {
                newSelection.push(i);
            }
        }
    }
    list.selection = newSelection;
}

// ========= ISOLATE BUTTONS =========

var isolateGroup = DuScriptUI.group( ui.mainGroup);
isolateGroup.alignment = ['center','top'];

var exitButton = DuScriptUI.button(
    isolateGroup,
    "",
    w16_exit_isolation,
    i18n._("Exit isolation.")
);
exitButton.alignment = ['center','center'];

if (uiMode < 1)
{
    var spacer = isolateGroup.add('group');
    spacer.spacing = 0;
    spacer.margins = 0;
    spacer.minimumSize = [5,-1];
}

var isolateButton = DuScriptUI.checkBox(
    isolateGroup,
    i18n._("Isolate"),
    w16_isolate,
    i18n._("Isolate selected groups."),
    undefined,
    undefined,
    'column'
);

if (uiMode < 1)
{
    var spacer = isolateGroup.add('group');
    spacer.spacing = 0;
    spacer.margins = 0;
    spacer.minimumSize = [5,-1];
}

var isolateTLButton = DuScriptUI.checkBox(
    isolateGroup,
    i18n._("Timeline"),
    w16_isolate_tl,
    i18n._("Isolate selected groups, in the timeline only."),
    undefined,
    undefined,
    'column'
);

if (uiMode < 1)
{
    var spacer = isolateGroup.add('group');
    spacer.spacing = 0;
    spacer.margins = 0;
    spacer.minimumSize = [5,-1];
}

var isolateCompButton = DuScriptUI.checkBox(
    isolateGroup,
    i18n._("Comp"),
    w16_isolate_comp,
    i18n._("Isolate selected groups, in the composition panel only"),
    undefined,
    undefined,
    'column'
);

if (uiMode < 1)
{
    var spacer = isolateGroup.add('group');
    spacer.spacing = 0;
    spacer.margins = 0;
    spacer.minimumSize = [5,-1];
}

var pinButton = DuScriptUI.checkBox(
    isolateGroup,
    "",
    DuScriptUI.Icon.PIN,
    i18n._("Set interactive (sticky) mode."),
    "",
    DuScriptUI.Icon.PINNED
);
pinButton.alignment = ['center','center'];
pinButton.setChecked( DuESF.scriptSettings.get("interactiveMode", false) );
exitButton.visible = !pinButton.checked;

pinButton.onClick = function()
{
    exitButton.visible = !pinButton.checked;
    DuESF.scriptSettings.set("interactiveMode", pinButton.checked);
    DuESF.scriptSettings.save();
}

exitButton.onClick = exit;

isolateButton.onClick = function()
{
    if (!pinButton.checked) isolateButton.setChecked(true);

    if (isolateButton.checked)
    {
        isolateTLButton.setChecked(false);
        isolateCompButton.setChecked(false);
    }

    if (isolateButton.checked) isolate();
    else exit(); 
}

isolateTLButton.onClick = function()
{
    if (!pinButton.checked) isolateTLButton.setChecked(true);

    if (isolateTLButton.checked)
    {
        isolateButton.setChecked(false);
        isolateCompButton.setChecked(false);
    }

    if (isolateTLButton.checked) isolateTL();
    else exit();
}

isolateCompButton.onClick = function()
{
    if (!pinButton.checked) isolateCompButton.setChecked(true);

    if (isolateCompButton.checked)
    {
        isolateButton.setChecked(false);
        isolateTLButton.setChecked(false);
    }

    if (isolateCompButton.checked) isolateComp();
    else exit();
}

//DuScriptUI.separator( ui.mainGroup );

// ========= TOGGLE BUTTONS ==========

if (DuESF.scriptSettings.get("aeSwitches", true))
{

    var aeSwitchesBG = DuScriptUI.group( ui.mainGroup, 'row');
    aeSwitchesBG.alignment = ['fill','top'];
    DuScriptUI.setBackgroundColor( aeSwitchesBG, DuColor.Color.DARK_GREY)
    var aeSwitchesGroup = DuScriptUI.group( aeSwitchesBG, 'column' );
    aeSwitchesGroup.alignment = ['center','top'];
    var aeSwitchesGroup1 = DuScriptUI.group( aeSwitchesGroup );
    var enableAEButton = DuScriptUI.button(
        aeSwitchesGroup1,
        "",
        enabled,
        i18n._("Show/Hide layers")
    )
    var audioAEButton = DuScriptUI.button(
        aeSwitchesGroup1,
        "",
        audioEnabled,
        i18n._("Toggle audio")
    )
    var soloAEButton = DuScriptUI.button(
        aeSwitchesGroup1,
        "",
        solo,
        i18n._("Toggle solo mode")
    )
    var lockAEButton = DuScriptUI.button(
        aeSwitchesGroup1,
        "",
        locked,
        i18n._("Lock layers")
    )
    var shyAEButton = DuScriptUI.button(
        aeSwitchesGroup1,
        "",
        shy,
        i18n._("Shy layers")
    )
    var collapseTransformationAEButton = DuScriptUI.button(
        aeSwitchesGroup1,
        "",
        collapseTransformation,
        i18n._("Collapse transformation / Continuous rasterization")
    )
    var guideAEButton = DuScriptUI.button(
        aeSwitchesGroup1,
        "",
        guide,
        i18n._("Guide layers")
    )
    var aeSwitchesGroup2 = DuScriptUI.group( aeSwitchesGroup );
    var qualityAEButton = DuScriptUI.button(
        aeSwitchesGroup2,
        "",
        quality,
        i18n._("Set quality")
    )
    var effectsActiveAEButton = DuScriptUI.button(
        aeSwitchesGroup2,
        "",
        effectsActive,
        i18n._("Toggle effects")
    )
    var frameBlendingAEButton = DuScriptUI.button(
        aeSwitchesGroup2,
        "",
        frameBlending,
        i18n._("Set frame blending mode")
    )
    var motionBlurAEButton = DuScriptUI.button(
        aeSwitchesGroup2,
        "",
        motionBlur,
        i18n._("Toggle motion blur")
    )
    var adjustmentLayerAEButton = DuScriptUI.button(
        aeSwitchesGroup2,
        "",
        adjustmentLayer,
        i18n._("Toggle adjustment layer mode")
    )
    var threeDLayerAEButton = DuScriptUI.button(
        aeSwitchesGroup2,
        "",
        threeDLayer,
        i18n._("Toggle 3D layer mode")
    )
    var selectLayerAEButton = DuScriptUI.button(
        aeSwitchesGroup2,
        "",
        select,
        i18n._("Select layers")
    )

    enableAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Show/Hide layers") );
        DuAE.toggleLayerControls();

        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleVisibility( groups, invertButton.checked, comps[i] );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    audioAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Toggle audio") );

        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleSound( groups, invertButton.checked, comps[i] );
        }

        DuAE.endUndoGroup();
    }

    soloAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups();

        DuAE.beginUndoGroup( i18n._("Toggle solo mode") );
        DuAE.toggleLayerControls();

        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleSolo( groups, invertButton.checked, comps[i] );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    lockAEButton.onClick  = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Lock layers") );

        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleLocked( groups, invertButton.checked, comps[i] );
        }

        DuAE.endUndoGroup();
    }

    shyAEButton.onClick  = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Shy layers") );

        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleShy( groups, invertButton.checked, comps[i] );
        }

        DuAE.endUndoGroup();
    }

    collapseTransformationAEButton.onClick  = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Collapse transformation / Continuous rasterization") );
        DuAE.toggleLayerControls();

        var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleCollapseTransformation( groups, invertButton.checked, comps[i], allowLockedLayers );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    guideAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Guide layers") );
        DuAE.toggleLayerControls();

        var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleGuide( groups, invertButton.checked, comps[i], allowLockedLayers );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    qualityAEButton.onClick = function()
    {   
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Set quality") );
        DuAE.toggleLayerControls();

        var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleQuality( groups, invertButton.checked, comps[i], allowLockedLayers );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    effectsActiveAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Toggle effects") );
        DuAE.toggleLayerControls();

        var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleEffects( groups, invertButton.checked, comps[i], allowLockedLayers );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    frameBlendingAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Set frame blending mode") );
        DuAE.toggleLayerControls();

        var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleFrameBlending( groups, invertButton.checked, comps[i], allowLockedLayers );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    motionBlurAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Toggle motion blur") );
        DuAE.toggleLayerControls();

        var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleMotionBlur( groups, invertButton.checked, comps[i], allowLockedLayers );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    adjustmentLayerAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Toggle adjustment layer mode") );
        DuAE.toggleLayerControls();

        var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleAdjustment( groups, invertButton.checked, comps[i], allowLockedLayers );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    threeDLayerAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Toggle 3D layer mode") );
        DuAE.toggleLayerControls();

        var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.toggleThreeD( groups, invertButton.checked, comps[i], allowLockedLayers );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    selectLayerAEButton.onClick = function()
    {
        var comps = getComps();
        if (comps.length == 0) return;
        var groups =  getGroups(false);

        DuAE.beginUndoGroup( i18n._("Select layers") );
        DuAE.toggleLayerControls();

        for (var i = 0, ni = comps.length; i < ni; i++) {
            DuGR.select( groups, invertButton.checked, comps[i] );
        }

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }
}

// ========= PANELS ==========

var compSelector = DuScriptUI.selector(ui.mainGroup);

compSelector.addButton( i18n._("Active Composition"),
    w16_composition,
    "",
    ""
    );
compSelector.addButton( i18n._("Active and Pre-compositions"),
    w16_precompositions,
    "",
    ""
    );
compSelector.addButton( i18n._("All Composition"),
    w16_compositions,
    "",
    ""
    );
compSelector.setCurrentIndex(1);

// Selector
var selectorGroup = DuScriptUI.group(ui.mainGroup, 'row');

var propSelector = DuScriptUI.selector(selectorGroup);
propSelector.addButton( i18n._p("DuGR selector", "Custom Groups"),
                    w16_layer_group,
                    i18n._p("DuGR selector", "Show custom layer groups"),
                    ""
                );
propSelector.addButton( i18n._p("DuGR selector", "All layer properties"),
                    w16_prop_group,
                    i18n._p("DuGR selector", "Show all properties"),
                    ""
                );
propSelector.addButton( i18n._p("DuGR selector", "Hierarchy"),
                    w16_hierarchy,
                    i18n._p("DuGR selector", "Show hierarchical (parenting) properties"),
                    i18n._p("DuGR selector", "Hierarchy")
                );
propSelector.addButton( i18n._p("DuGR selector", "Layer types"),
                    w16_layer_type,
                    i18n._p("DuGR selector", "Show layer types"),
                    i18n._p("DuGR selector", "Type") /// TRANSLATORS: a type, as a kind (layer types)
                );
propSelector.addButton( i18n._p("DuGR selector", "Layer attributes"),
                    w16_attribute,
                    i18n._p("DuGR selector", "Show layer attributes"),
                    i18n._p("DuGR selector", "Attribute")
                );
propSelector.addButton( i18n._p("DuGR selector", "Animation"),
                    w16_anim,
                    i18n._p("DuGR selector", "Show animation properties"),
                    i18n._p("DuGR selector", "Animation")
                );
propSelector.addButton( i18n._p("DuGR selector", "Matte & Blending"),
                    w16_blending,
                    i18n._p("DuGR selector", "Show matte, blending, and alpha properties"),
                    i18n._p("DuGR selector", "Matte")
                );
propSelector.addButton( i18n._p("DuGR selector", "Layer styles"),
                    w16_style,
                    i18n._p("DuGR selector", "Show layer styles"),
                    i18n._p("DuGR selector", "Layer Styles")
                );
propSelector.setCurrentIndex(1);

var invertButton = DuScriptUI.checkBox(
    selectorGroup,
    "",
    //i18n._("Invert"),
    w16_invert,
    i18n._("Invert the group/property selection"),
    //i18n._("Inverted"),
    "",
    w16_inverted,
    //'column'
);
invertButton.alignment = ['right','fill'];
invertButton.onClick = refreshIsolation;

var andOrButton = DuScriptUI.checkBox(
    selectorGroup,
    "",
    w16_or,
    i18n._("Use either the AND(&) or OR(/) operator for multiple group selection."),
    "",
    w16_and
);
andOrButton.setChecked( DuESF.scriptSettings.get("andOr", false) );
andOrButton.onClick = function()
{
    DuESF.scriptSettings.set("andOr", andOrButton.checked );
    DuESF.scriptSettings.save();
    refreshIsolation();
}

var searchGroup = DuScriptUI.group(ui.mainGroup, 'row');
searchGroup.spacing = 3;
searchGroup.alignment = ['fill', 'top'];

var clearButton = DuScriptUI.button(
    searchGroup,
    '',
    DuScriptUI.Icon.CLOSE,
    i18n._("Remove all")
);
clearButton.alignment = ['left', 'fill'];
clearButton.onClick = function() { searchEdit.setText(""); search(""); };

var searchEdit = DuScriptUI.editText(
    searchGroup,
    '',
    '',
    '',
    i18n._("Search...")
);
searchEdit.alignment = ['fill', 'fill'];
searchEdit.onChange = function() { search(searchEdit.text) };

var mainTabs = DuScriptUI.group( ui.mainGroup, 'stacked' );
mainTabs.alignment = ['fill', 'fill'];

var propList;
var groupList;

var propTab = DuScriptUI.group( mainTabs, 'column' );
propTab.built = false;
var groupTab = DuScriptUI.group( mainTabs, 'column');
groupTab.built = false;

propTab.build = function (tab)
{
    propTab.built = true;
    #include "propPanel.jsx"
    DuScriptUI.showUI(tab);
}

groupTab.build = function (tab)
{
    groupTab.built = true;
    #include "groupPanel.jsx"
    DuScriptUI.showUI(tab);
}

propSelector.onChange = function()
{
    var i = propSelector.index
    DuESF.scriptSettings.set("currentTab", i);
    DuESF.scriptSettings.save();
    if (i == 0 && !groupTab.built) groupTab.build(groupTab);
    if (i > 0 && !propTab.built) propTab.build(propTab);

    groupTab.visible = i == 0;
    propTab.visible = i != 0;

    if (i > 0 && propList) propList.resetItems( propSelector.currentData );
}

// =========== GENERAL METHODS ========

function search( text )
{
    pinButton.setChecked(false);
    refreshPanel();
}

function getGroups(incComps)
{
    incComps = def(incComps, true);

    var groups = [];
    if (propSelector.index > 0 && propList.selection)
    {
        for (var i = 0, n = propList.selection.length; i < n ; i++)
        {
            if (propList.selection[i].index == 0 && invertButton.checked) return [];
            groups.push( propList.selection[i].groupName );
        }
    }
    else if (propSelector.index == 0 && groupList.selection)
    {
        for (var i = 0, n = groupList.selection.length; i < n ; i++)
        {
            if (groupList.selection[i].index == 0 && invertButton.checked) return [];
            groups.push( groupList.selection[i].groupName );
        }
    }

    // Keep precomps if not working just in the active comp
    if (incComps && compSelector.index != 0) {
        groups.push( DuGR.Group.COMP );
    }

    return groups;
}

function getComps() {
    
    if (compSelector.index == 0) return [ DuAEProject.getActiveComp() ];

    if (compSelector.index == 1) {
        var comp = DuAEProject.getActiveComp();
        var comps = DuAEComp.getPrecomps(comp, true);
        comps.push(comp);
        return comps.list;
    }

    return DuAEProject.getComps();
}

function refreshPanel()
{
    // Check isolation mode
    var isolationMode = DuGR.isolationMode();
    isolateButton.setChecked( isolationMode == DuGR.IsolationMode.BOTH );
    isolateTLButton.setChecked( isolationMode == DuGR.IsolationMode.TIMELINE );
    isolateCompButton.setChecked( isolationMode == DuGR.IsolationMode.COMP_PANEL );

    // Get group list
    if (groupList && groupList.visible)
    {
        var groups = DuGR.listGroups();

        // Keep selection
        var currentSelection = saveListSelection(groupList);

        // Remove groups not in the list
        for (var i = groupList.items.length -1 ; i > 3; i-- )
        {
            var g = groupList.items[i].groupName;
            if (groups.indexOf(g) < 0) groupList.remove(i);
        }

        // Insert new ones
        groups.do(function (group) {
            var index = groups.current + 4;
            if (index >= groupList.items.length) {
                groupList.add('item', group).groupName = group;
                return;
            }

            if (groupList.items[index].text != group) {
                groupList.add('item', group, index).groupName = group;
            }
        });

        // Reselect
        restoreListSelection(groupList, currentSelection);
    }

    if (propList && propList.visible) propList.searchItems( searchEdit.text );
}

function refreshIsolation()
{
    var autoSelect = DuESF.scriptSettings.get("autoSelect", true);
    var sticky = pinButton.checked && DuGR.isolationMode() != DuGR.IsolationMode.NONE;
    if ( autoSelect && !sticky ) {
        DuAE.beginUndoGroup( i18n._("Select layers") );
        DuAE.toggleLayerControls();

        DuGR.select( getGroups(), invertButton.checked, undefined, andOrButton.checked );

        DuAE.toggleLayerControls();
        DuAE.endUndoGroup();
    }

    if (!pinButton.checked) return;

    if (isolateButton.checked) isolate();
    else if (isolateTLButton.checked) isolateTL();
    else if (isolateCompButton.checked) isolateComp();
}

function isolate()
{
    var stgs = DuESF.scriptSettings.data;

    if (DuESF.debug) $.hiresTimer;
    DuAE.beginUndoGroup( "Isolation" );
    DuAE.toggleLayerControls();

    var groups = getGroups();
    if (groups.length == 0)
    {
        exit();
        return;
    }

    var comps = getComps();
    if (comps.length == 0) return;

    for (var i = 0, ni = comps.length; i < ni; i++) {
        DuGR.isolate(
            groups,
            invertButton.checked,
            comps[i],
            stgs.warningFrame,
            DuGR.IsolationMode.BOTH,
            stgs.useWireframe,
            stgs.lockHidden
            );
    }

    DuAE.toggleLayerControls();
    DuAE.endUndoGroup();
    if (DuESF.debug) alert($.hiresTimer / 1000000 + ' seconds');
}

function isolateTL()
{
    var stgs = DuESF.scriptSettings.data;

    if (DuESF.debug) $.hiresTimer;
    DuAE.beginUndoGroup( "Isolation" );
    DuAE.toggleLayerControls();

    var comps = getComps();
    if (comps.length == 0) return;

    for (var i = 0, ni = comps.length; i < ni; i++) {
        DuGR.isolate(
            getGroups(),
            invertButton.checked,
            comps[i],
            stgs.warningFrame,
            DuGR.IsolationMode.TIMELINE,
            stgs.useWireframe,
            stgs.lockHidden
            );
    }

    DuAE.toggleLayerControls();
    DuAE.endUndoGroup();
    if (DuESF.debug) alert($.hiresTimer / 1000000 + ' seconds');
}

function isolateComp()
{
    var stgs = DuESF.scriptSettings.data;

    if (DuESF.debug) $.hiresTimer;
    DuAE.beginUndoGroup( "Isolation" );
    DuAE.toggleLayerControls();

    var comps = getComps();
    if (comps.length == 0) return;

    for (var i = 0, ni = comps.length; i < ni; i++) {
        DuGR.isolate(
            getGroups(),
            invertButton.checked,
            comps[i],
            stgs.warningFrame,
            DuGR.IsolationMode.COMP_PANEL,
            stgs.useWireframe,
            stgs.lockHidden
            );
    }

    DuAE.toggleLayerControls();
    DuAE.endUndoGroup();
    if (DuESF.debug) alert($.hiresTimer / 1000000 + ' seconds');
}

function exit()
{
    if (DuESF.debug) $.hiresTimer;
    DuAE.beginUndoGroup( "Exit Isolation" );
    DuAE.toggleLayerControls();

    var comps = getComps();
    if (comps.length == 0) return;

    for (var i = 0, ni = comps.length; i < ni; i++) {
        DuGR.exitIsolation(comps[i]);
    }

    DuAE.toggleLayerControls();
    DuAE.endUndoGroup();
    if (DuESF.debug) alert($.hiresTimer / 1000000 + ' seconds');
}

DuScriptUI.addEvent( refreshPanel, 3000);

// ========== INIT ==============

var currentTab = DuESF.scriptSettings.get("currentTab", 0);
propSelector.setCurrentIndex( currentTab );

refreshPanel();