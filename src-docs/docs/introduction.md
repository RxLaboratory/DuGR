![META](authors:Nicolas "Duduf" Dufresne;license:GNU-FDL;copyright:2021-2022;updated:2022/09/28)

# DuGR Help

![](img/group_timeline.png)

Dugr lets you to tag the layers so they belong to groups. Those groups are listed in the panel, and it is easy to isolate them in the composition, change their attributes, etc.

## Group lists

With the selector just above the list, you can select what is shown in the list.

- ![](img/icons/prop_group.svg){: style="width:20px;"} ***Properties*** allows you to select the layers by type, property or hierarchy or other After Effects attributes.

![](img/properties.png)

- ![](img/icons/layer_group.svg){: style="width:20px;"} ***Groups*** contains the list of tags/custom groups you've added.

![](img/groups.png)

You can select the group of layers you need to manipulate from this list.

The ![](img/icons/invert.svg){: style="width:20px;"} ***Invert*** button on the right-hand side can be used to manipulate layers **not** contained in the selected groups.

The ![](img/icons/and.svg){: style="width:20px;"} ***And*** ![](img/icons/or.svg){: style="width:20px;"} ***Or*** button on the right-hand side is used to choose how multiple group selection is made, either using **all** groups (*and*) or **any** group (*or*).

## Isolation

The top line buttons are toggles to isolate the layers belonging to the selected groups.

- ![](img/icons/isolate.svg){: style="width:20px;"} ***Isolate*** isolates the layer both in the timeline and the comp viewer panel. Layers outside of selected groups are both hidden and set to shy mode.
- ![](img/icons/isolate_tl.svg){: style="width:20px;"} ***Timeline*** isolates the layer only in the timeline. Layers outside of selected groups are set to shy mode.
- ![](img/icons/isolate_comp.svg){: style="width:20px;"} ***Comp*** isolates the layer only in the comp viewer panel. Layers outside of selected groups are hidden.
- ![](img/icons/pin.svg){: style="width:20px;"} The *pin* button toggles the ***Interactive*** or ***Sticky*** mode. When checked, the isolation is updated as soon as you change the group selection. When disabled, you have to manually change the isolation mode after changing group selection. With heavy compositions containing a lot of layers, keeping it disabled improves the performance.
- ![](img/icons/close.svg){: style="width:20px;"} The *exit isolation* button can be used to de-activate the isolation when *not* in *interactive / sticky* mode.

!!! note
    You can assign keyboard shortcuts to these functions, using the provided [*Scriptlets*](install.md#keyboard-shortcuts)!

![](img/gif/layer_types.gif)  
*Auto-Select / Filter by layer type, property, attribute...*

![](img/gif/animation.gif)  
*Auto-Select / Filter by animation properties...*

A lot of other properties and attributes are available to select and isolate specific layers.

![](img/gif/duik.gif)  
*DuGR is fully compatible with Duik Ángela, which automatically assigns layers to useful DuGR custom groups.*

![](img/gif/keyboard_shortcut.gif)  
*You can also assign [keyboard shortcuts](install.md#keyboard-shortcuts) to DuGR features.*

### Interactive / Sticky mode

There are two ways to use *DuGR* to isolate layers:

- In standard mode, when the ![](img/icons/pin.svg){: style="width:12px;"} *pin* button is unchecked, clicking on the ![](img/icons/isolate.svg){: style="width:12px;"}![](img/icons/isolate_tl.svg){: style="width:12px;"}![](img/icons/isolate_comp.svg){: style="width:12px;"} isolation buttons isolates the selected groups; but nothing will change if you change the group selection, unless you click again on the isolation buttons. To exit the isolation mode, either select the "*All layers*" group, or click the ![](img/icons/close.svg){: style="width:12px;"} *exit* button.
- In interactive / sticky mode, when the ![](img/icons/pinned.svg){: style="width:12px;"} *pin* button is checked, changing the selection of the groups instantly updates the isolation. Click again on the ![](img/icons/isolate.svg){: style="width:12px;"}![](img/icons/isolate_tl.svg){: style="width:12px;"}![](img/icons/isolate_comp.svg){: style="width:12px;"} isolation buttons to exist the isolation mode.

## Layer properties

The two middle lines of small icons can be used to quickly change the usual properties of the layers contained in the selected groups.

The extra ![](img/icons/select.svg){: style="width:12px;"} *arrow* icon selects the layers contained in the selected groups.

## Managing custom groups

!![](img/groups.png)

On the ***custom groups tab***, a few extra buttons allow you to create, edit and remove groups.

### Layer buttons

- ![](img/icons/add_layer.svg){: style="width:20px;"} ***Add selected layer*** to the current groups.
- ![](img/icons/layer_info.svg){: style="width:20px;"} ***Select groups*** the current layers belong to.
- ![](img/icons/remove_layer.svg){: style="width:20px;"} ***Remove selected layers*** from the current group.

### Group buttons

- ![](img/icons/add.svg){: style="width:20px;"} ***Create group***.
- ![](img/icons/edit.svg){: style="width:20px;"} ***Rename group***.
- ![](img/icons/remove.svg){: style="width:20px;"} ***Remove group***.

### Bottom line icons

At the bottom line of the panel, a few icons are always there if you need them.

- ![](img/icons/bug.svg){: style="width:20px;"} Post a ***Bug Report*** if something goes wrong.
- ![](img/icons/feature.svg){: style="width:20px;"} Post a ***Feature Request*** if you have a good idea to share.
- ![](img/icons/settings.svg){: style="width:20px;"} Go to the ***Settings panel*** to customize the script.
- ![](img/icons/help.svg){: style="width:20px;"} Come here if you need ***Help***.
- ![](img/icons/heart.svg){: style="width:20px;"} Click this ***if you like*** *DuGR*!.