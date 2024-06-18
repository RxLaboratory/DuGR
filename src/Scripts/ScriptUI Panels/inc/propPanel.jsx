propList = tab.add('listbox',undefined,"Groups",{multiselect: true});
propList.alignment = ['fill', 'fill'];

var propItems = {}
propItems[ i18n._("All layers") ] = DuGR.Group.ALL;
propItems[ i18n._("Selected") ] = DuGR.Group.SELECTED;
propItems[ i18n._("Grouped") ] = DuGR.Group.GROUPED;

propItems[ i18n._("Hierarchy: Orphans") ] = DuGR.Group.ORPHAN;
propItems[ i18n._("Hierarchy: Have children") ] = DuGR.Group.HAS_CHILD;

propItems[ i18n._("Type: Pre-compositions") ] = DuGR.Group.COMP;
propItems[ i18n._("Type: Null Objects") ] = DuGR.Group.NULL;
propItems[ i18n._("Type: Solids") ] = DuGR.Group.SOLID;
propItems[ i18n._("Type: Shapes") ] = DuGR.Group.SHAPE;
propItems[ i18n._("Type: Texts") ] = DuGR.Group.TEXT;
propItems[ i18n._("Type: Adjustment") ] = DuGR.Group.ADJUSTMENT;
propItems[ i18n._("Type: Lights") ] = DuGR.Group.LIGHT;
propItems[ i18n._("Type: Cameras") ] = DuGR.Group.CAMERA;
propItems[ i18n._("Type: 3D Models") ] = DuGR.Group.THREED_MODEL;

propItems[ i18n._("Attribute: Visible") ] = DuGR.Group.VISIBLE;
propItems[ i18n._("Attribute: Has Audio") ] = DuGR.Group.SOUND;
propItems[ i18n._("Attribute: Solo") ] = DuGR.Group.SOLO;
propItems[ i18n._("Attribute: Locked") ] = DuGR.Group.LOCKED;
propItems[ i18n._("Attribute: Shy") ] = DuGR.Group.SHY;
propItems[ i18n._("Attribute: Effects") ] = DuGR.Group.EFFECTS;
propItems[ i18n._("Attribute: Motion Blur") ] = DuGR.Group.MB;
propItems[ i18n._("Attribute: 3D") ] = DuGR.Group.THREE_D;
propItems[ i18n._("Attribute: Guide") ] = DuGR.Group.GUIDE;

propItems[ i18n._("Animation: At current time") ] = DuGR.Group.AT_TIME;
propItems[ i18n._("Animation: In preview range") ] = DuGR.Group.IN_TIME_RANGE;
propItems[ i18n._("Animation: Has keyframes") ] = DuGR.Group.HAS_KEYFRAMES;
propItems[ i18n._("Animation: Has expressions") ] = DuGR.Group.HAS_EXPRESSIONS;

propItems[ i18n._("Matte & Blending: Has mask") ] = DuGR.Group.HAS_MASK;
propItems[ i18n._("Matte & Blending: Has track matte") ] = DuGR.Group.HAS_MATTE;
propItems[ i18n._("Matte & Blending: Is track matte") ] = DuGR.Group.IS_MATTE;
propItems[ i18n._("Matte & Blending: Preserve transparency") ] = DuGR.Group.PRESERVE_TRANSPARENCY;
propItems[ i18n._("Matte & Blending: Normal blending mode") ] = DuGR.Group.NORMAL_BLENDING;
propItems[ i18n._("Matte & Blending: Other blending mode") ] = DuGR.Group.OTHER_BLENDING;

propItems[ i18n._("Layer Styles: All") ] = DuGR.Group.LAYER_STYLES;
propItems[ i18n._("Layer Styles: Drop Shadow") ] = DuGR.Group.STYLE_DROP_SHADOW;
propItems[ i18n._("Layer Styles: Inner Shadow") ] = DuGR.Group.STYLE_INNER_SHADOW;
propItems[ i18n._("Layer Styles: Outer Glow") ] = DuGR.Group.STYLE_OUTER_GLOW;
propItems[ i18n._("Layer Styles: Inner Glow") ] = DuGR.Group.STYLE_INNER_GLOW;
propItems[ i18n._("Layer Styles: Bevel and Emboss") ] = DuGR.Group.STYLE_BEVEL;
propItems[ i18n._("Layer Styles: Satin") ] = DuGR.Group.STYLE_SATIN;
propItems[ i18n._("Layer Styles: Color Overlay") ] = DuGR.Group.STYLE_COLOR;
propItems[ i18n._("Layer Styles: Gradient Overlay") ] = DuGR.Group.STYLE_GRADIENT;
propItems[ i18n._("Layer Styles: Stroke") ] = DuGR.Group.STYLE_STROKE;

propList.resetItems = function (filter) {
    filter = def(filter , propList.currentFilter);
    propList.currentFilter = filter;

    // Keep selection
    var currentSelection = saveListSelection(propList);

    propList.removeAll();
    var text;
    for (text in propItems) {
        if (!propItems.hasOwnProperty(text)) continue;
        if (filter == "" || text.indexOf(filter) >= 0) {
            propList.add('item',text).groupName = propItems[text];
        }
    }

    // Reselect
    restoreListSelection(propList, currentSelection);
}
propList.currentFilter = "";
propList.currentSearch = "";

propList.searchItems = function (search) {
    search = def(search , "");
    if (search == propList.currentSearch) return;
    propList.currentSearch = search;

    if (search == "") {
        propList.resetItems();
        return;
    }

    // Keep selection
    var currentSelection = saveListSelection(propList);

    for (var i = propList.items.length - 1; i >= 0; i--) {
        if ( propList.items[i].text.indexOf(search) < 0 ) {
            propList.remove(i);
        }
    }

    // Reselect
    restoreListSelection(propList, currentSelection);
}

propList.onChange = refreshIsolation;
propList.resetItems();