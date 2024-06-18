![META](authors:Nicolas "Duduf" Dufresne;license:GNU-FDL;copyright:2022;updated:2022/09/28)

# Getting started

## Download the API

The API and its documentation can be downloaded from **[RxLaboratory](https://rxlaboratory.org/tools/dugr/)**, or from the **[*Github* Repository](https://github.com/RxLaboratory/DuGR)**.

## Include it in your script

The DuGR API comes in a few files:

- `DuGR_API.jsxinc` is the complete API, including all dependencies. This is the only file you should include in your script by default.

- A Subfolder called `libs` contains the actual API code, separated in a few different libraries. These may be useful if you need to handle specific versions of these libraries, if you know what you're doing... Have a look at the main `DuGR_API.jsxinc` file if you want to see in which order they should be included in your scripts.

All these files (both the `.jsxinc` file and the `libs` folder) need to be located next to your script in the following examples.

### Using only DuGR

If you're only needing the DuGR API, you just have to include `DuGR_API.jsxinc` at the beginning of your own script.

Here's an example.

```js
// Encapsulate everything to avoid global variables!
// thisObj is either undefined (for stand alone script) or the panel containing the ui (for ScriptUI panel)
(function(thisObj)
{
     // If you only need Duik, just include DuAEF_Duik_api at the beginning
     #include "DuGR_API.jsxinc";
     
```

### Combining the DuGR API with other APIs and DuAEF

If you're going to include APIs other than DuGR, you'll need to include everything separately to be sure that all frameworks are included only once. In this case, include the APIs at the beginning of your script.

Here's an example:

```js
// Encapsulate everything to avoid global variables!
// The parameter is either undefined (stand alone script) or the panel containing the ui (ScriptUI)
(function(thisObj)
{
     // If you need to combine DuGR and other APIs like DuIO
     // Include DuAEF first, and then stand-alone APIs
     #include "libs/DuAEF.jsxinc";
     #include "libs/api.jsxinc"; // DuGR API, you may rename it if needed.

     // Now you can also include any other API which also depends on DuAEF or one of the above APIs
     #include "another_API.jsxinc"
```

### Initialisation

Just after you've included the API, you have to run the `DuAEF.init()` method, to setup the framework:

```js
     // Running the init() method of DuAEF is required to setup everything properly.
     DuAEF.init( "YourScriptName", "1.0.0", "YourCompanyName" );
```

***DuAEF*** is the *Duduf After Effects Framework*, and is used by the DuGR API. It is a (big) set of objects and methods to ease scripting for *After Effects*.

Once *DuAEF* has bee initialised, you can set a few parameters to improve the UX:

```js
     // These info can be used by the framework to improve UX, but they're all optional
     DuESF.chatURL = 'http://chat.rxlab.info'; // A link to a live-chat server like Discord or Slack...
     DuESF.bugReportURL = 'https://github.com/RxLaboratory/DuAEF_Dugr/issues/new/choose'; // A link to a bug report form
     DuESF.aboutURL = 'http://rxlaboratory.org/tools/duik'; // A link to the webpage about your script
     DuESF.docURL = 'http://duik.rxlab.guide'; // A link to the documentation of the script
     DuESF.scriptAbout = 'Duik: The comprehensive rigging and animation tool set'; // A short string describing your script
     DuESF.companyURL = 'https://rxlaboratory.org'; // A link to your company's website
     DuESF.rxVersionURL = 'http://api.rxlab.io' // A link to an RxAPI server to check for updates
```

***DuESF*** here refers to the *Duduf ExtendScript Framework*, which is used by *DuAEF* and the *DuGR API*. It is another set of objects and methods to ease scripting for any *Adobe* application.

Now everything is ready, you can add your own methods, and build the UI. For this, you can use *DuScriptUI*, a set of objects and methods to easily build nice UI with ExtendScript and its ScriptUI objects:

```js     
     // This will be our main panel
     var ui = DuScriptUI.scriptPanel( thisObj, true, true, new File($.fileName) );
     ui.addCommonSettings(); // Automatically adds the language settings, location of the settings file, etc

     DuScriptUI.staticText( ui.settingsGroup, "Hello world of settings!" ); // Adds a static text to the settings panel

     DuScriptUI.staticText( ui.mainGroup, "Hello worlds!" ); // Adds a static text to the main panel
     
     // When you're ready to display everything
     DuScriptUI.showUI(ui);
```

**If, and only if** you're not calling the `DuScriptUI.showUI(ui)` method, because you don't use *DuScriptUI* to build your UI for example, you have to call `DuAEF.enterRunTime()` before running any other function.

```js  
     // Note that if you don't have a UI or if you don't use DuScriptUI to show it,
     // you HAVE TO run this method before running any other function:
     DuAEF.enterRunTime();
```

Don't forget to close the anonymous function we've created at the beginning to avoid global variables, and pass `this` so the script can be built in its own panel, if any.

```js
})(this);
```

### Complete example

```js
// Encapsulate everything to avoid global variables!
// thisObj is either undefined (for stand alone script) or the panel containing the ui (for ScriptUI panel)
(function(thisObj)
{
     // If you only need Duik, just include DuAEF_Duik_api at the beginning
     #include "DuGR_api.jsxinc";
     
     // Running the init() method of DuAEF is required to setup everything properly.
     DuAEF.init( "YourScriptName", "1.0.0", "YourCompanyName" );

     // These info can be used by the framework to improve UX, but they're all optional
     DuESF.chatURL = 'http://chat.rxlab.info'; // A link to a live-chat server like Discord or Slack...
     DuESF.bugReportURL = 'https://github.com/RxLaboratory/DuAEF_Dugr/issues/new/choose'; // A link to a bug report form
     DuESF.aboutURL = 'http://rxlaboratory.org/tools/duik'; // A link to the webpage about your script
     DuESF.docURL = 'http://duik.rxlab.guide'; // A link to the documentation of the script
     DuESF.scriptAbout = 'Duik: The comprehensive rigging and animation tool set'; // A short string describing your script
     DuESF.companyURL = 'https://rxlaboratory.org'; // A link to your company's website
     DuESF.rxVersionURL = 'http://api.rxlab.io' // A link to an RxAPI server to check for updates

     // === Add your own functions, develop your script here ===

     // And build the UI, for example

     // This will be our main panel
     var ui = DuScriptUI.scriptPanel( thisObj, true, true, new File($.fileName) );
     ui.addCommonSettings(); // Automatically adds the language settings, location of the settings file, etc

     DuScriptUI.staticText( ui.settingsGroup, "Hello world of settings!" ); // Adds a static text to the settings panel

     DuScriptUI.staticText( ui.mainGroup, "Hello worlds!" ); // Adds a static text to the main panel
     
     // When you're ready to display everything
     DuScriptUI.showUI(ui);

     // /!\
     // Note that if and only if you don't have a UI or if you don't use DuScriptUI to show it,
     // you HAVE TO run this method before running any other function:
     // DuAEF.enterRunTime();
})(this);
```

## Using DuGR features, the High-level Duik API

Using basic DuGR features in your script is pretty easy. Most of theses features are simple methods.

```js
    // Exit the current isolation
    DuGR.exitIsolation();
```

Of course, all these methods are fully documented; you can read the reference of [the `DuGR` namespace](https://dugr.rxlab.io/DuGR.html) to learn all of them.

## DuAEF, After Effects Framework

[DuAEF](https://duik.rxlab.io//DuAEF.html) includes a lot of useful methods to help After Effects Scripting, and a few specific objects. They're all objects and namespaces which name start with *DuAE*.

Example:

```js
    // Get the active composition
    var comp = DuAEProject.getActiveComp();
    // May be null if there's no active comp.
    if (comp) {
        // Add a 20 px wide null layer
        // Note that DuAEF uses a shape layer as null layer,
        // so it doesn't pollute the "Solids" folder of the project.
        var null = DuAEComp.addNull( comp, 20 );
    }
```

Some objects are available to make things easier. Especially with properties (to work around the dreaded *invalid object* from AE's strange behaviour).

```js
    var comp = DuAEProject.getActiveComp();
    var layer = comp.layer(1);
    var transform = new DuAEProperty( layer.transform )
    // Replaces some text in all expressions of all properties in the "transform" PropertyGroup
    transform.replaceInExpressions("before", "after");

    // We can also select all keyframes for example
    transform.selectKeys();

    // Or change the interpolation for all keyframes
    transform.setInterpolation( KeyframeInterpolationType.BEZIER );
```

!!! note
    In the future, namespaces like `DuAEComp` may be also available as wrappers, objects, like `DuAEProperty`.

## DuESF, ExtendScript Framework

[DuESF](https://duik.rxlab.io//DuESF.html) extends the default ExtendScript framework with useful objects and methods.

For example, a set is available to ease the creation of UIs.

```js
    // This will be our main panel
     var ui = DuScriptUI.scriptPanel( thisObj, true, true, new File($.fileName) );
     ui.addCommonSettings(); // Automatically adds the language settings, location of the settings file, etc

     DuScriptUI.staticText( ui.settingsGroup, "Hello world of settings!" ); // Adds a static text to the settings panel

     DuScriptUI.staticText( ui.mainGroup, "Hello worlds!" ); // Adds a static text to the main panel
     DuScriptUI.button( ui.mainGroup, "A Button"); // Adds a button, which can have an icon
     
     // When you're ready to display everything
     DuScriptUI.showUI(ui);
```

It also includes a lot of lower level objects and methods. Here are some examples.

```js
    // COLORS
    var red = new DuColor([1, 0, 0, 1]);
    // alerts "#ff0000"
    alert(red.hex); 
    // Get a darker red
    var darkerRed = red.darker();
    // You can also create a color from hex
    var blue = DuColor.fromHex("#0000ff");
    // Or use a predefined color
    var aeBlue = DuColor.Color.AFTER_EFFECTS_BLUE;

    // MATH
    // Clamp a value (works also with a set of values)
    var clamped = DuMath.clamp( aValue, -5, 5);
    // Linear interpolation (or extrapolation)
    var interpolation = DuMath.linear( aValue, 0, 1, 12, 27);
    
    // Some useful functions are available
    var gauss = DuMath.gaussian( aValue );
    var randomValue = DuMath.gaussRandom( 0, 10 );

    // FILES

    // Get the first line of a text file
    var info = DuFile.readFirstLine( "C:/a/path/file.txt" );
    // Save a JS object to a JSON file
    var obj = { one: "A text", two: [ "an", "array"] };
    DuFile.saveJSON(obj, "C:/a/path/file.json" );
```

