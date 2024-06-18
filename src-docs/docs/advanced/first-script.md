![META](authors:Nicolas "Duduf" Dufresne;license:GNU-FDL;copyright:2022;updated:2022/09/28)

# Create a headless script with DuGR

Using the Duik API, it is very easy to create simple headless scripts, which don't use any user interface, to automate your workflow, or to[ **assign keyboard shortcuts**](shortcuts.md) to DuGR features or your own automations for example.

## Create the file

Let's assume [you've already downloaded the API](getting-started.md), and saved it in the same folder where you're creating your headless script.

Now, **create a new text file** with any *text editor*[^1], and name it using the `.jsx` extension, which is the usual extension for After Effects scripts. In this example, we're creating a script which will automatically isolate the "Right" group, let's call it `Isolate Right.jsx`.

First, we're going to add what's is called an *anonymous function*. It's a standard function, but without any name. All the script will be written inside this function; this is a simple way to make sure everything stays contained and nothing leaks to the global space, which could break other scripts.

This is how the script looks like with just this anonymous function:

```js
(function(){

})();
```

The first line creates the function, the last line closes and executes it. We're going to write the script in between.

## Include the API

The first thing to do is to include the API with:

```js
    #include "DuAEF_DuGR_api.jsxinc"
```

Note that this will work only if the API is located next to the script, in the same folder. If not, you can use a path[^2] to the API instead of only the name.

After the inclusion, we need to call the [`DuAEF.init` function](http://duik.rxlab.io/DuAEF.html#.init) to prepare everything.

```js
    DuAEF.init( "Isolate Right", "1.0.0", "Your (company) Name" );
```

The three arguments are:

- A name for the script
- The version of the script
- Your name or the name of your company

## Example

Now that everything is ready, we can write the actual code. If this wasn't a headless script, we would start by writing the User Interface, and then show it to the user.

As it's not the case, we just need to tell the API we're going to run without UI.

```js
    DuAEF.enterRunTime();
```

And now, let's do something!

Our goal is to create a script which will isolate the group named "Right". DuGR can do that for us, it's the [`isolate` function](https://dugr.rxlab.io/DuGR.html#.isolate)!

```js
    // Notice that isolate() expects a list of groups, not a single one.
    DuGR.isolate( ["Right"] );
```

And that's all! We've finished the script.

Note that the [`isolate` function](https://dugr.rxlab.io/DuGR.html#.isolate) can take other arguments to adjust the way the isolation is made.

## The complete script

This is the finished script, with some comments[^3] to help you learn and understand.

```js
// First, create an anonymous function.
// This is very important to make sure we don't leak anything
// to the global space and won't break anything by mistake.
(function(){

    // Here we include the Duik API
    #include "DuAEF_Duik_api.jsxinc"

    // Running the init() method of DuAEF is required to setup everything properly.
    DuAEF.init( "Auto-Parent", "1.0.0", "RxLaboratory" );

    // There's no User Interface, which would have to be built here.
    // Let's go right to the execution.

    // This method has to be run once before any other method from the API.
    DuAEF.enterRunTime();

    DuGR.isolate( ["Right"] );

// Close the anonymous function.
})();
```

You can now use this script to assign a **[keyboard shortcut](shortcuts.md)** for parenting layers.

► **Have a look at the [*Scriptlets*](../install.md#keyboard-shortcuts) provided with DuGR to read more complete examples.**

## High-level API

Almost all features of DuGR are available as very simple functions in the API.

For example, you can list groups from the current composition:

```js
    var groups = DuGR.listGroups();
    // The listGroups method returns a DuList,
    // Which provide a useful do() method to iterate all groups
    groups.do(function(group) {
        alert(group);
    });
```

You can add groups (tags) to the selected layers like this:

```js
    DuGR.addSelectedLayersToGroup( "A group name" );
```

You can remove or rename a group from the composition:

```js
    // Remove a group
    DuGR.removeGroup( "Group name to remove" );

    // Rename a group
    DuGR.renameGroup( "Current name", "New name");
```

## Lower-level API

Groups used by DuGR are actually managed by [`DuAETag`](https://dugr.rxlab.io/DuAETag.html) included in DuAEF. This namespace includes methods to add, remove, rename groups for specific layers.

```js
    // Get the active composition
    var comp = DuAEProject.getActiveComp();
    // Get the selected layer
    if (comp) {
        var layer = comp.selectedLayers[0];

        // Add it to a group
        DuAETag.addGroup(layer, "A group");
        // And to another group
        DuAETag.addGroup(layer, "Another group");

        // Rename another group
        DuAETag.renameGroup(layer, "Another group", "The other group");

        // Remove the layer from the group
        DuAETag.removeGroup(layer, "The other group");

        // Get the list of groups this layer belongs to
        var groups = DuAETag.getGroups(layer);
    }
    
```

## Implementation

To use the DuGR API in your script, your script **must be released under a licence compatible with the [*GNU-GPL v3*](../license.md)**.

If that's not the case, you can still add and edit groups without using the DuGR API to make your script compatible with DuGR.

Groups are stored on each layer as a parameter in an After Effects layer marker.

```js
    var comp = app.project.activeItem;
    var layer = comp.layer(1);

    var groups = [
        "first group",
        "second group"
    ];
    
    // Create a marker and get its parameters
    // To be nice, we show the list of groups as a comment
    // but this is not actually needed by DuGR
    var tag = new MarkerValue( groups.join(" | ") );
    var tagParams = tag.getParameters();
    
    // DuGR will look for the duaef property to be true to get the groups
    tagParams["duaef"] = true;

    // The group list is a "groups" property
    // It must be a comma separated list string
    tagParams["groups"] = groups.join(',');

    // Set the tag to the layer
    tag.setParameters( tagParams );
    layer.property( 'ADBE Marker' ).setValueAtTime( 0, tag );
```

[^1]:
    We recommend [*Visual Studio Code*](https://code.visualstudio.com/), but it can be anything: *Windows Notepad*, [*Notepad++*](https://notepad-plus-plus.org/), [*Brackets*](https://brackets.io/)...  
    It must *not* be a word processor though (like *Microsoft Word* or *LibreOffice Writer*).

[^2]:
    It can be either an **absolute** path, which starts with a `/` on Mac or a drive letter like `C:\\` or `C:/` on Windows, or a **relative** path. Note that path separators can be `/` or `\\`, your choice.  
    Examples: `"C:/my scripts/DuAEF_Duik_api.jsx"` (absolute) or `../DuAEF_Duik_api` (relative, `../` denotes the parent folder).

[^3]:
    In After Effects scripts, comments start with `//`. You can also create a comment block: start it with `/*`, write the comment which can span on several lines, and close it with `*/`.