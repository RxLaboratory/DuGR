cd ..
cd ..
del /s /q docs
rmdir /s /q docs
mkdir docs
cd DuGR_Docs
cd src
mkdocs build
cd ..
cd ..
cd tools
cd build
mkdir output
mkdir "output\DuGR"
mkdir "output\DuGR\ScriptUI Panels"
mkdir "output\DuGR\Help"
mkdir "output\DuGR_API"
DuBuilder ..\..\inc\api.jsxinc --no-banner output\DuGR_API\DuGR_api.jsxinc
DuBuilder ..\..\inc\api_all.jsxinc --no-banner -d jsdoc_conf.json output\DuGR_API\DuAEF_DuGR_api.jsxinc
DuBuilder ..\..\Dugr.jsx --no-banner "output\DuGR\ScriptUI Panels\DuGR.jsx"
echo " " > "output\DuGR\LICENSE.md"
echo " " > "output\DuGR\LICENSE.txt"
echo " " > "output\DuGR\README.txt"
echo " " > "output\DuGR_API\LICENSE.md"
echo " " > "output\DuGR_API\LICENSE.txt"
xcopy /Y items\LICENSE.md "output\DuGR\LICENSE.md"
xcopy /Y items\LICENSE.txt "output\DuGR\LICENSE.txt"
xcopy /Y items\README.txt "output\DuGR\README.txt"
xcopy /Y items\LICENSE.md "output\DuGR_API\LICENSE.md"
xcopy /Y items\LICENSE.txt "output\DuGR_API\LICENSE.txt"
xcopy /S /I /Y ..\..\docs output\DuGR_API\docs
xcopy /S /I /Y ..\..\DuGR_Docs\docs output\DuGR\Help
cd output\DuGR\Help
del CNAME
cd ..
cd ..
cd ..
cd output\DuGR_API\docs
xcopy /Y DuGR.html index.html
cd ..
cd ..
cd ..
cd ..
cd ..
cd docs
xcopy /Y DuGR.html index.html
echo dugr.rxlab.io > "CNAME"
pause