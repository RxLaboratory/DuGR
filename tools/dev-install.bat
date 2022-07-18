@echo off

:: The path to ScriptUI Panels
SET "scriptui_panels=C:\Program Files\Adobe\Adobe After Effects 2022\Support Files\Scripts\ScriptUI Panels"

:: The repo (current dir)
SET repoPath=%~dp0..

echo Installing "%repoPath%" in "%scriptui_panels%"...

:: Need admin to create symlinks
@echo off
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
:: Get back to original dir
pushd "%CD%"
CD /D "%~dp0"

:: (Trying to) remove older files
del "%scriptui_panels%\DuGR.jsx"
rd /s /q "%scriptui_panels%\inc"
rd /s /q "%scriptui_panels%\DuAEF"

:: link the main files
mklink "%scriptui_panels%\DuGR.jsx" "%repoPath%\DuGR.jsx"
echo Linked DuGR.jsx

mklink /D "%scriptui_panels%\inc" "%repoPath%\inc"
echo Linked included files in 'inc\'

REM link dependencies
mklink /D "%scriptui_panels%\DuAEF" "%repoPath%\DuAEF"
echo Linked DuAEF

pause