@echo off

:: Edit these variables with the correct paths on your system
SET aeVersion=2023
SET "aePath=C:\Program Files\Adobe\Adobe After Effects %aeVersion%\Support Files\Scripts\ScriptUI Panels"
:: The repo is the current dir by default
SET repoPath=%~dp0..\..

:: Need admin to create symlinks
@echo off
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
:: Get back to original dir
pushd "%CD%"
CD /D "%~dp0"

echo Installing "%repoPath%" in "%aeDir%"...

:: (Trying to) remove older files
del "%aePath%\DuGR.jsx"
rd /s /q "%aePath%\inc"

:: link the main files
mklink "%aePath%\DuGR.jsx" "%repoPath%\src\DuGR.jsx"
echo Linked main files

mklink /D "%aePath%\inc" "%repoPath%\src\inc"
echo Linked included files in 'inc\'

pause
