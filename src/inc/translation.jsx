#include "config/translations.jsx"

DuESF.preInitMethods.push(function ()
{
    // Extract translations
    var outputFolder = DuESF.scriptSettings.file.parent.absoluteURI + '/';

    DuGR_de.toFile( outputFolder + 'DuGR_de.json', false );
    DuGR_eo.toFile( outputFolder + 'DuGR_eo.json', false );
    DuGR_es.toFile( outputFolder + 'DuGR_es.json', false );
    DuGR_fr.toFile( outputFolder + 'DuGR_fr.json', false );
    DuGR_ja.toFile( outputFolder + 'DuGR_ja.json', false );
    DuGR_pd.toFile( outputFolder + 'DuGR_pd.json', false );
    DuGR_ru.toFile( outputFolder + 'DuGR_ru.json', false );
    DuGR_zh.toFile( outputFolder + 'DuGR_zh.json', false );
} );