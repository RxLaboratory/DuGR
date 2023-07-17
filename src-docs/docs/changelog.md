![META](license:GNU-FDL;copyright:2021;updated:2022/10/29)

# DuGR Changelog

This is the list of what has changed since the previous major version of Dugr (*3.02*).

## ▹ 5.0.1

- Performance improvement when reloading groups/refreshing the UI
- Updated translations

## ▹ 5.0.0

- Improved user interface
- New settings to customize DuGR
- Auto-select corresponding layers when selecting groups (can be disabled in the settings)
- Expanded the list of property filters:
    - Added layer styles
    - Added matte and blending
    - Added animation properties
- Improved support of Duik Ángela
- Added ability to select layers in either *all selected groups* or *any selected group* (AND/OR selection)
- Updated translations
- You can now easily add keyboard shortcuts

## ▹ 4.0.5

- Now available in Japanese 日本語
- Updated translations.
- UI Tweaks.

## ▹ 4.0.4

- Added ***Russian*** and ***German*** Translations.
- Fixed some issues with the settings.

## ▹ 4.0.3

### Improvements

- UI tweaks.

### Fixes

- Track Mattes are no longer shown/hidden with the show button.
- The "apply" button in the settings should now work correctly.

## ▹ 4.0.2

### New

- Chinese translation.

### Improvements

- UI tweaks.

### Fixes

- Fixed the "All layers" entry not working.

## ▹ 4.0.1

### New

- German translation thanks to René Andritsch.

### Improvements

- UI tweaks.
- Updated Esperanto translation.

### Fixes

- Fixed ask for file and network access if needed.
- When a layer is moved to the left in the timeline, markers are brought back in the timeline if they're not set to be hidden.
- Colors of the UI are now correctly adjusted according to the brightness setting of the UI of After Effects.
- Added missing tooltip on the "Get Info" button for the layers/groups.

## ▹ 4.0.0

### New

- Added **Pre-composition** type to the properties list.
- Added **update check** at script startup.
- Added an option to **hide tags (markers)** from the layers.
- Added **Ch'ti | Picard** translation.
- Added **French** translation.
- Added **Spanish** translation.
- Added **Exit Isolation** button for non-interactive (sticky) mode.

### Improvements

- Creating/Editing groups user experience has been improved: The field is automatically highlit and [Enter] now validates the new group/edit.

### Fixes

- Creating/Editing group popup no longer fails to show at random.
- Fixed Isolation button getting out of isolation when the interactive (sticky) mode is disabled.

## ▹ 4.0.0-Beta

4.0.0 will be the next major release of *DuGR* for *After Effects*, which brings a lot of changes.

### New

- **New User Interface**: Along with a complete code refactor, *DuGR* underwent a complete UI redesign. Performance (loading time and isolation) has been improved (*a lot*), *DuGR* now fits better in the interface of After Effects, it is more discreet and let you focus on your work.
- *DuGR* now uses **markers** to identify groups on the layers. Note that due to this important change (which improves performance and user experience), it won't be able to detect groups made by previous versions and by older versions of *Duik*.
- New dynamic groups: **orphans** and **have children** to help you manage your layer parenting.
- New ***Ignored*** group; use it to set some layers to be ignored no matter what.

### Improvements

- **Complete code refactor**: *DuGR* is easier to maintain, code is better organizezd, performance has been improved a lot...
- *DuGR* now remembers which panel you were on and restores it when opening it.
- Added the *Selected*, *All layers* and *Grouped* groups in the custom groups panel.

### Fixes

### Other changes

- We've finally dropped support of *After Effects CS6*, sorry, it was too much work to keep compatibility for too few users. *CS6* (*v11.0.2*) dates back to October 2012, it's time to update! *DuGR* should now work on all versions of After Effects starting with *After Effects CC* (*v12.0*, July 2013).