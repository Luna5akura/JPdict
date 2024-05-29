REM ./start.bat

@echo off

start npm run start

:waitloop
timeout /t 1 >nul
netstat -an | find "LISTENING" | find ":3000" >nul
set port3000=%errorlevel%
netstat -an | find "LISTENING" | find ":4200" >nul
set port4200=%errorlevel%
if %port3000% equ 0 (
  if %port4200% equ 0 (
    goto next
  )
)
goto waitloop

:next
start http://localhost:4200
