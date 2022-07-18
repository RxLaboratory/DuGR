@echo off

:: The repo (current dir)
SET repoPath=%~dp0..\..

:: The build path
SET build_path=%~dp0build

echo Building "%repoPath%" in "%build_path%"...

:: Clean
rd /s /q "%build_path%"
md "%build_path%"

:: Build folders
md "%build_path%\DuGR"
md "%build_path%\DuGR\ScriptUI Panels"
md "%build_path%\DuGR\Help"
md "%build_path%\DuGR_API"

:: Build API
DuBuilder "%repoPath%\inc\api.jsxinc" --no-banner "%build_path%\DuGR_API\DuGR_api.jsxinc"
DuBuilder "%repoPath%\inc\api_all.jsxinc" --no-banner "%build_path%\DuGR_API\DuAEF_DuGR_api.jsxinc"

:: Build DuGR
DuBuilder "%repoPath%\DuGR.jsx" --no-banner "%build_path%\DuGR\ScriptUI Panels\DuGR.jsx"

:: Build API reference
:: clean first
rd /s /q "%repoPath%\docs"
md "%repoPath%\docs"
cmd /c jsdoc -c jsdoc_conf.json
echo " " > "%repoPath%\docs\jsdoc.css"
xcopy "%repoPath%\tools\build\jsdoc.css" "%repoPath%\docs\jsdoc.css"
xcopy "%repoPath%\docs\DuGR.html" "%repoPath%\docs\index.html"

:: Build Guide
cd "%repoPath%\DuGR_Docs\src"
mkdocs build
cd "%repoPath%\tools\build"

:: Copy items
echo " " > "%build_path%\DuGR\LICENSE.md"
echo " " > "%build_path%\DuGR\LICENSE.txt"
echo " " > "%build_path%\DuGR\README.txt"
echo " " > "%build_path%\DuGR_API\LICENSE.md"
echo " " > "%build_path%\DuGR_API\LICENSE.txt"
xcopy /Y "%repoPath%\tools\build\items\LICENSE.md" "%build_path%\DuGR\LICENSE.md"
xcopy /Y "%repoPath%\tools\build\items\LICENSE.txt" "%build_path%\DuGR\LICENSE.txt"
xcopy /Y "%repoPath%\tools\build\items\README.txt" "%build_path%\DuGR\README.txt"
xcopy /Y "%repoPath%\tools\build\items\LICENSE.md" "%build_path%\DuGR_API\LICENSE.md"
xcopy /Y "%repoPath%\tools\build\items\LICENSE.txt" "%build_path%\DuGR_API\LICENSE.txt"

:: Copy the API doc
xcopy /S /I /Y "%repoPath%\docs" "%build_path%\DuGR_API\docs"

:: Copy the guide
xcopy /S /I /Y "%repoPath%\DuGR_Docs\docs" "%build_path%\DuGR\Help"

echo Done !
pause