@echo off
@set xxx=%1
@cd /d %~dp0
@for /f "delims=" %%i in ("%cd%") do set folder=%%~ni
@set folder=%folder%
@cd ../
@set self_path=%~dp0

@set release=%self_path%

@set bin=%cd%\first_client\first_main\src\%folder%
if not exist %bin% ( mkdir %bin% )
if exist %bin% ( @rd /s /Q %bin% )
@cd %self_path%
if not exist %release% ( @echo "%release% not exist" ) else ( @mklink /J %bin% %release% )
if not exist %release%  ( @rd /s /Q %bin% )
::if not %xxx% ( pause )

