::@echo off

:: The version
IF "%~1"=="" (
    SET version=5.1.0
) ELSE (
    SET version=%~1
)

:: The repo (current dir)
SET repoPath=%~dp0..\..
:: The build path
SET build_path=%~dp0build

echo Building DuGR in "%build_path%"...

:: Clean
rd /s /q "%build_path%"
md "%build_path%"

:: Build folders
md "%build_path%\DuGR"
md "%build_path%\DuGR\Scripts"
md "%build_path%\DuGR\Scripts\ScriptUI Panels"
md "%build_path%\DuGR\Tools"
md "%build_path%\DuGR_API"

:: Build API
DuBuilder "%repoPath%\src\inc\api.jsx" --no-banner -r "{dugrVersion}:%version%" "%build_path%\DuGR_API\DuGR_api.jsxinc"
DuBuilder "%repoPath%\src\inc\api_all.jsx" --no-banner -r "{dugrVersion}:%version%" "%build_path%\DuGR_API\DuAEF_DuGR_api.jsxinc"

:: Build DuGR
DuBuilder "%repoPath%\src\DuGR.jsx" --no-banner -r "{dugrVersion}:%version%" "%build_path%\DuGR\Scripts\ScriptUI Panels\DuGR.jsx"

:: API for scriptlets
xcopy "%build_path%\DuGR_API\DuAEF_DuGR_api.jsxinc" "%repoPath%\scriptlets\DuGR_api.jsxinc" /y

:: Copy scriptlets
xcopy "%repoPath%\scriptlets" "%build_path%\DuGR\Scripts\" /E /y

:: copy to dist
echo " " > "%repoPath%\dist\DuGR_api.jsxinc"
echo " " > "%repoPath%\dist\DuAEF_DuGR_api.jsxinc"
xcopy /Y "%build_path%\DuGR_API\DuGR_api.jsxinc" "%repoPath%\dist\DuGR_api.jsxinc"
xcopy /Y "%build_path%\DuGR_API\DuAEF_DuGR_api.jsxinc" "%repoPath%\dist\DuAEF_DuGR_api.jsxinc"

:: Build Guide
cd "%repoPath%\src-docs"
mkdocs build
cd "%repoPath%\tools\build"

:: Build API reference
:: clean first
md "%repoPath%\docs\api"
cmd /c jsdoc -c jsdoc_conf.json
echo " " > "%repoPath%\docs\api\jsdoc.css"
xcopy "%repoPath%\tools\build\jsdoc.css" "%repoPath%\docs\api\jsdoc.css" /y
xcopy "%repoPath%\docs\api\DuGR.html" "%repoPath%\docs\api\index.html" /y
xcopy /S /I /Y "%repoPath%\docs\api" "%build_path%\DuGR_API\docs"

:: Generate type defs ::
echo __Generating type defs

md "%build_path%\DuGR_API\types"
cmd /c jsdoc -c jsdoc_ts_conf.json
:: copy types to output
xcopy "%repoPath%\types\dugr" "%build_path%\DuGR_API\types" /E /y

:: Copy items
echo " " > "%build_path%\DuGR\LICENSE.md"
echo " " > "%build_path%\DuGR\LICENSE.txt"
echo " " > "%build_path%\DuGR\README.txt"
echo " " > "%build_path%\DuGR_API\LICENSE.md"
echo " " > "%build_path%\DuGR_API\LICENSE.txt"
echo " " > "%build_path%\DuGR\Tools\DuSI.jsx"
xcopy /Y "%repoPath%\tools\build\items\LICENSE.md" "%build_path%\DuGR\LICENSE.md"
xcopy /Y "%repoPath%\tools\build\items\LICENSE.txt" "%build_path%\DuGR\LICENSE.txt"
xcopy /Y "%repoPath%\tools\build\items\README.txt" "%build_path%\DuGR\README.txt"
xcopy /Y "%repoPath%\tools\build\items\LICENSE.md" "%build_path%\DuGR_API\LICENSE.md"
xcopy /Y "%repoPath%\tools\build\items\LICENSE.txt" "%build_path%\DuGR_API\LICENSE.txt"
xcopy /Y "%repoPath%\tools\build\items\DuSI.jsx" "%build_path%\DuGR\Tools\DuSI.jsx"

:: Copy the API doc
xcopy "%repoPath%\docs" "%build_path%\DuGR_API\docs" /E /y

:: Copy the guide
xcopy /S /I /Y "%repoPath%\DuGR_Docs\docs" "%build_path%\DuGR\Help"

echo Done !
