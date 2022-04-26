@echo off

REM The first arg must be the path to ScriptUI Panels
IF "%~1"=="" (
    echo Usage:
    echo dev-install.bat "path/to/Support Files/Scripts/ScriptUI Panels"
    pause
    exit /B
)

REM Optional second argyment: the repo. If omitted, will use the current directory
IF "%~2"=="" (
    SET repoPath=%~dp0..
) else (
    SET repoPath=%~2
)

echo Installing "%repoPath%" in "%~1"...

REM (Trying to) remove older files
del %1\DuGR.jsx
del %1\inc
del %1\DuAEF

REM link the main files
mklink %1\DuGR.jsx %repoPath%\DuGR.jsx
echo Linked DuGR.jsx

mklink /D %1\inc %repoPath%\inc
echo Linked included files in 'inc\'

REM link dependencies
mklink /D %1\DuAEF %repoPath%\DuAEF
echo Linked DuAEF

pause