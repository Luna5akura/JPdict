REM stop.bat

@echo off
setlocal

for /f "tokens=5" %%a in ('tasklist /fi "imagename eq node.exe" /v ^| findstr /i "npm run start"') do (
    echo Stopping npm run start process with PID %%a
    taskkill /PID %%a /F
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Stopping process on port 3000 with PID %%a
    taskkill /PID %%a /F
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4200') do (
    echo Stopping process on port 4200 with PID %%a
    taskkill /PID %%a /F
)

endlocal
