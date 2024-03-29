DuScriptUI.separator(ui.settingsGroup);

// Show ae switches
var aeSwitchesButton = DuScriptUI.checkBox(
    ui.settingsGroup,
    i18n._("Hide Ae layer switches"),
    enabled,
    i18n._("Show or hide the After Effects layer switches buttons."),
    i18n._("Show Ae layer switches")
);

// Locked layers
var lockedLayersButton = DuScriptUI.checkBox(
    ui.settingsGroup,
    i18n._("Locked layers: deny changes"),
    w16_lock,
    i18n._("What to do if a layer is locked."),
    i18n._("Locked layers: allow changes"),
    w16_unlock
);

// Warning frame
var warningFrameSelector = DuScriptUI.selector(ui.settingsGroup, i18n._("Type of warning frame to use"));
warningFrameSelector.addButton(
    i18n._("Warning frame: None"),
    w16_no_frame,
    i18n._("Don't use any warning frame.")
);
warningFrameSelector.addButton(
    i18n._("Warning frame: Above"),
    w16_frame_above,
    i18n._("Draw the frame above the composition.")
);
warningFrameSelector.addButton(
    i18n._("Warning frame: Below"),
    w16_frame_below,
    i18n._("Draw the frame below the composition.")
);
warningFrameSelector.setCurrentIndex(2);

// Isolation mode
var useWireframeButton = DuScriptUI.checkBox(
    ui.settingsGroup,
    i18n._("Isolation: hide layers"),
    w16_hide,
    i18n._("Method used to isolate layers in the composition."),
    i18n._("Isolation: wireframe"),
    w16_wireframe
);

// Tags
var showTagsButton = DuScriptUI.checkBox(
    ui.settingsGroup,
    i18n._("Hide markers"),
    w16_no_tag,
    i18n._("whether to show or hide the tags on the layers."),
    i18n._("Show markers"),
    w16_tag
);

// Auto select
var autoSelectButton = DuScriptUI.checkBox( ui.settingsGroup, {
    text: i18n._("Auto-select layers"),
    helpTip: i18n._("Automatically select layers when selecting groups or properties"),
    image: w16_select
});

// Lock hidden
var lockHiddenButton = DuScriptUI.checkBox(
    ui.settingsGroup,
    i18n._("Lock hidden layers"),
    w16_lock_hidden,
    i18n._("whether the hidden layers have to be locked.")
);

// Read settings
ui.onResetSettings = function () {
    var allowLockedLayers = DuESF.scriptSettings.get("allowLockedLayers", true);
    lockedLayersButton.setChecked(allowLockedLayers);

    var warningFrameType = DuESF.scriptSettings.get("warningFrame", 2);
    warningFrameSelector.setCurrentIndex(warningFrameType);

    var useWireframe = DuESF.scriptSettings.get("useWireframe", true);
    useWireframeButton.setChecked(useWireframe);

    var lockHidden = DuESF.scriptSettings.get("lockHidden", true);
    lockHiddenButton.setChecked(lockHidden);

    var showTags = DuESF.scriptSettings.get("showTags", true);
    showTagsButton.setChecked(showTags);

    var autoSelect = DuESF.scriptSettings.get("autoSelect", true);
    autoSelectButton.setChecked(autoSelect);
    
    var showAeSwitches = DuESF.scriptSettings.get("aeSwitches", true);
    aeSwitchesButton.setChecked(showAeSwitches);
}

// Save settings
ui.onApplySettings = function () {
    DuESF.scriptSettings.set("allowLockedLayers", lockedLayersButton.value);
    DuESF.scriptSettings.set("warningFrame", warningFrameSelector.index);
    DuESF.scriptSettings.set("useWireframe", useWireframeButton.value);
    DuESF.scriptSettings.set("lockHidden", lockHiddenButton.value);
    DuESF.scriptSettings.set("showTags", showTagsButton.value);
    DuESF.scriptSettings.set("autoSelect", autoSelectButton.checked);
    DuESF.scriptSettings.set("aeSwitches", aeSwitchesButton.checked);

    DuAETag.hideTags = !DuESF.scriptSettings.get("showTags", true);

    DuESF.scriptSettings.save();
}

// Load settings on startup
DuAETag.hideTags = !DuESF.scriptSettings.get("showTags", true);
