@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "LOG_FILE=%TEMP%\markdown-nice-typora-export.log"

echo [%DATE% %TIME%] start >> "%LOG_FILE%"
echo cwd=%CD% >> "%LOG_FILE%"
echo args=%* >> "%LOG_FILE%"

set "NODE_EXE="
if exist "C:\nvm4w\nodejs\node.exe" set "NODE_EXE=C:\nvm4w\nodejs\node.exe"
if not defined NODE_EXE if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_EXE=%ProgramFiles%\nodejs\node.exe"
if not defined NODE_EXE if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE_EXE=%ProgramFiles(x86)%\nodejs\node.exe"
if not defined NODE_EXE for /f "delims=" %%N in ('where node 2^>nul') do if not defined NODE_EXE set "NODE_EXE=%%N"

if not defined NODE_EXE (
  echo ERROR: node.exe was not found. >> "%LOG_FILE%"
  echo ERROR: node.exe was not found. Install Node.js or edit scripts\copy-full-stack-blue.cmd.
  exit /b 1
)

echo node=%NODE_EXE% >> "%LOG_FILE%"
"%NODE_EXE%" "%SCRIPT_DIR%copy-full-stack-blue.js" %* >> "%LOG_FILE%" 2>&1
set "EXIT_CODE=%ERRORLEVEL%"
echo exit=%EXIT_CODE% >> "%LOG_FILE%"
exit /b %EXIT_CODE%
