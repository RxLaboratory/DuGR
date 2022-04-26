# DuGR Build tools

This folder contains some useful tools to quickly build (and release) DuGR and the DuGR API Documentation.

## Windows

Run `build.bat` to build DuGR in an `output` subfolder. Everything will be built there, and the API doc will be generated and also updated on the repo.

**Important note**: for this batch file to work and to be able to build DuGR, you need to have DuBuilder available and in the PATH environment variable of Windows. You also need to add the folder containing DuAEF in the settings of DuBuilder. [See the page about DuBuilder on rainboxlab.org](https://rxlaboratory.org/tools/dubuilder/).

To run JSDoc (needed  to build the doc for the API) in PowerShell, you'll also need to change the Execution policy. Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

## Mac OS

We still need to build a command file for Mac. Contributions are welcome!
