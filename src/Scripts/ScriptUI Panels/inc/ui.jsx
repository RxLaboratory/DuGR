function buildUI()
{
    var ui = DuScriptUI.scriptPanel( thisObj, true, true, mainScriptFile );
    ui.addCommonSettings();

    // Settings
    #include "settings.jsx"

    // Build ui in ui.mainGroup
    #include "mainPanel.jsx"

    DuScriptUI.showUI(ui);
}
