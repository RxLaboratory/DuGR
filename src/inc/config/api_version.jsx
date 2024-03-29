/**
 * <h3>Duduf Groups</h3>
 * <p><i>Group After Effects layers by tags, and run batch methods on them.</i><br />
 * <code>DuGR</code> is the high-level interface to the layer groups,<br />
 * and it relies on {@link DuAETag}, a lower-level interface which adds tags on layers,<br />
 * and stores data in these tags.</p>
 * <p>A group is created using {@link DuGR.addSelectedLayersToGroup DuGR.addSelectedLayersToGroup()} or {@link DuAETag.addGroup DuAETag.addGroup()}.<br />
 * Groups can be renamed with {@link DuGR.renameGroup DuGR.renameGroup()},<br />
 * They can be removed with {@link DuGR.removeGroup DuGR.removeGroup()}.<br />
 * You can run a method on all layers belonging to a set of groups with {@link DuGR.do DuGR.do()}.</p>
 * <p>{@link DuGR.Group} contains predefined groups to sort layers by type or attribute and use {@link DuGR.do DuGR.do()} on them.</p>
 * <P>You can use {@link DuGR.isolate DuGR.isolate()} to isolate layers in the timeline, the comp panel, or both,<br />
 * use {@link DuGR.exitIsolation DuGR.exitIsolation()} to get out of isolation mode.</p>
 * <p>DuGR requires <i>DuAEF</i>, the <i>Duduf After Effects Framework</i>. Two builds of the <i>DuGR API</i> are available:<br />
 * <ul><li><code>DuGR_api.jsxinc</code> does not include <i>DuAEF</i>, and can be used to compine multiple <i>Duduf APIs</i> with a single copy of <i>DuAEF</i>.<br />
 * Be careful to grab the right version of <i>DuAEF</i> in this case.</li>
 * <li><code>DuAEF_DuGR_api.jsxinc</code> includes all dependencies, with <i>DuAEF</i>, and is easier to include in your scripts.</li></ul></p>
 * @example
 * // Encapsulate everything to avoid global variables!
 * // The parameter is either undefined (stand alone script) or the panel containing the ui (ScriptUI)
 * (function(thisObj)
 * {
 *      // If you only need DuGR, just include DuAEF_DuGR_api
 *      #include "DuAEF_DuGR_api.jsxinc";
 *      
 *      // Running the init() method of DuAEF is required to setup everything properly.
 *      DuAEF.init( "YourScriptName", "1.0.0", "YourCompanyName" );
 *      
 *      // These info can be used by the framework to improve UX, but they're optional
 *      DuESF.chatURL = 'http://chat.rxlab.info'; // A link to a live-chat server like Discord or Slack...
 *      DuESF.bugReportURL = 'https://github.com/RxLaboratory/DuAEF_Dugr/issues/new/choose'; // A link to a bug report form
 *      DuESF.featureRequestURL = 'https://github.com/RxLaboratory/DuAEF_Dugr/issues/new/choose'; // A link to a feature request form
 *      DuESF.aboutURL = 'http://rxlaboratory.org/tools/dugr'; // A link to the webpage about your script
 *      DuESF.docURL = 'http://dugr.rxlab.guide'; // A link to the documentation of the script
 *      DuESF.scriptAbout = 'Duduf Groups: group After Effects layers!'; // A short string describing your script
 *      DuESF.companyURL = 'https://rxlaboratory.org'; // A link to your company's website
 *      DuESF.rxVersionURL = 'http://version.rxlab.io' // A link to an RxVersion server to check for updates
 *      
 *      // Build your UI here, declare your methods, etc.
 * 
 *      // This will be our main panel
 *      var ui = DuScriptUI.scriptPanel( thisObj, true, true, new File($.fileName) );
 *      ui.addCommonSettings(); // Automatically adds the language settings, location of the settings file, etc
 *
 *      DuScriptUI.staticText( ui.settingsGroup, "Hello world of settings!" ); // Adds a static text to the settings panel
 *      DuScriptUI.staticText( ui.mainGroup, "Hello worlds!" ); // Adds a static text to the main panel
 *      
 *      // When you're ready to display everything
 *      DuScriptUI.showUI(ui);
 *
 *      // Note that if you don't have a UI or if you don't use DuScriptUI to show it,
 *      // you HAVE TO run this method before running any other function:
 *      // DuAEF.enterRunTime();
 *  
 * })(this);
 * @example
 * // Encapsulate everything to avoid global variables!
 * // The parameter is either undefined (stand alone script) or the panel containing the ui (ScriptUI)
 * (function(thisObj)
 * {
 *      // If you need to combine DuGR and other APIs like DuIO or DuIK
 *      // Include DuAEF first, and then stand-alone APIs
 *      #include "DuAEF.jsxinc";
 *      #include "DuGR_api.jsxinc";
 *      #include "DuIK_api.jsxinc";
 *      #include "DuIO_api.jsxinc";
 *      
 *      // Running the init() method of DuAEF is required to setup everything properly.
 *      DuAEF.init( "YourScriptName", "1.0.0", "YourCompanyName" );
 *      
 *      // These info can be used by the framework to improve UX, but they're optional
 *      DuESF.chatURL = 'http://chat.rxlab.info'; // A link to a live-chat server like Discord or Slack...
 *      DuESF.bugReportURL = 'https://github.com/RxLaboratory/DuAEF_Dugr/issues/new/choose'; // A link to a bug report form
 *      DuESF.featureRequestURL = 'https://github.com/RxLaboratory/DuAEF_Dugr/issues/new/choose'; // A link to a feature request form
 *      DuESF.aboutURL = 'http://rxlaboratory.org/tools/dugr'; // A link to the webpage about your script
 *      DuESF.docURL = 'http://dugr.rxlab.guide'; // A link to the documentation of the script
 *      DuESF.scriptAbout = 'Duduf Groups: group After Effects layers!'; // A short string describing your script
 *      DuESF.companyURL = 'https://rxlaboratory.org'; // A link to your company's website
 *      DuESF.rxVersionURL = 'http://version.rxlab.io' // A link to an RxVersion server to check for updates
 *      
 *      // Build your UI here, declare your methods, etc.
 * 
 *      // This will be our main panel
 *      var ui = DuScriptUI.scriptPanel( thisObj, true, true, new File($.fileName) );
 *      ui.addCommonSettings(); // Automatically adds the language settings, location of the settings file, etc
 *
 *      DuScriptUI.staticText( ui.settingsGroup, "Hello world of settings!" ); // Adds a static text to the settings panel
 *      DuScriptUI.staticText( ui.mainGroup, "Hello worlds!" ); // Adds a static text to the main panel
 *      
 *      // When you're ready to display everything
 *      DuScriptUI.showUI(ui);
 *
 *      // Note that if you don't have a UI or if you don't use DuScriptUI to show it,
 *      // you HAVE TO run this method before running any other function:
 *      // DuAEF.enterRunTime();
 *  
 * })(this);
 * @namespace
 * @author Nicolas Dufresne and contributors
 * @copyright 2017 - 2023 Nicolas Dufresne, RxLaboratory
 * @version {dugrVersion}
 * @requires DuAEF>=1.0.0
 * @see {@link DuAETag} for low-level group management
 * @category DuGR
 * @license GPL-3.0 <br />
 * DuGR is free software: you can redistribute it and/or modify<br />
 * it under the terms of the GNU General Public License as published by<br />
 * the Free Software Foundation, either version 3 of the License, or<br />
 * (at your option) any later version.<br />
 *<br />
 * DuGR is distributed in the hope that it will be useful,<br />
 * but WITHOUT ANY WARRANTY; without even the implied warranty of<br />
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the<br />
 * GNU General Public License for more details.<br />
 *<br />
 * You should have received a copy of the GNU General Public License<br />
 * along with DuGR. If not, see {@link http://www.gnu.org/licenses/}.
 */
var DuGR = {}
DuGR.version = "{dugrVersion}";