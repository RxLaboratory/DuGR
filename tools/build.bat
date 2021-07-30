cd ..
del /s /q docs
rmdir /s /q docs
mkdir docs
cd tools
mkdir output
DuBuilder ..\Dugr.jsx output\DuGR.jsxinc
DuBuilder ..\inc\api.jsxinc output\DuGR_api.jsxinc
DuBuilder ..\inc\api_all.jsxinc -d jsdoc_conf.json output\DuAEF_DuGR_api.jsxinc
cd output
xcopy /Y api.jsxinc Dugr_api.jsxinc
cd ..
xcopy /S /I /Y ..\docs output\docs
cd output\docs
xcopy /Y DuGR.html index.html
cd ..
cd ..
cd ..
cd docs
xcopy /Y DuGR.html index.html
echo dugr.rxlab.io > "CNAME"
pause