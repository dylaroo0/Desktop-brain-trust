$ErrorActionPreference = 'Stop'
try { Stop-Process -Name node -Force -ErrorAction SilentlyContinue } catch {}
try { Stop-Process -Name electron -Force -ErrorAction SilentlyContinue } catch {}
$env:PORT = 5588
npm run start:5588
