#include "config/translations.jsx"

DuESF.preInitMethods.push(function ()
{
    // Extract translations
    var outputFolder = DuESF.scriptSettings.file.parent.absoluteURI + '/';

    DuGR_de_DE.toFile( outputFolder + 'DuGR_de.json', false );
    DuGR_eo_UY.toFile( outputFolder + 'DuGR_eo.json', false );
    DuGR_es_ES.toFile( outputFolder + 'DuGR_es.json', false );
    DuGR_fr_FR.toFile( outputFolder + 'DuGR_fr.json', false );
    //DuGR_ja.toFile( outputFolder + 'DuGR_ja.json', false );
    DuGR_pd_FR.toFile( outputFolder + 'DuGR_pd.json', false );
    DuGR_ru_RU.toFile( outputFolder + 'DuGR_ru.json', false );
    DuGR_zh_CN.toFile( outputFolder + 'DuGR_zh.json', false );
    DuGR_zh_TW.toFile( outputFolder + 'DuGR_zh_TW.json', false );
} );