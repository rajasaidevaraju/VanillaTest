This app is written using fastify as a framework for node server. It is mainly created to explore vanila java script and it's development path compared to frameworks such as angular and react. I am starting to appreciate the various features in frameworks such as routing and data binding.

to run, open cmd at the folder and type,

cd backend
node server.js

files in utility/ScanUtility are used to scan and add items to database. It is used as a standalone script.

Scan.js takes path from config file and recusively scans for videos in folders and it's subfolders.

before scanning, in node_modules/node-ffprobe-installer/index.js:24
change const npm3Path = path.resolve(appFolder, '..', 'node_modules', packageName); to const npm3Path = path.resolve(appFolder, '../../', 'node_modules', packageName);

to scan folder windowsRootPath or linuxRootPath in config, open terminal in VanillaTest/backend/utility/ScanUtility and type: node index
