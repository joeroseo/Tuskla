Install GIT for windows

1.  Go to https://gitforwindows.org/
2.  Click download
3.  Go to downloads and install Git-2.42.0.2-64-bit
4.  Install with all defaults

Clone repository

1.  Open GIT for windows
2.  Chose clone rep[ository
3.  In source Location enter https://github.com/joeroseo/Tuskla
4.  In detination pick a directory and enter it with /Tuskla at the end 
    (i.e. c:\john\Tuskla)

Load 2019 Microsoft Visual C++ Redistributable packages for Visual Studio

1.  Go to https://aka.ms/vs/17/release/vc_redist.x86.exe
2.  Execute the file once downloaded and install

Load MYSQL

1.  Go to https://dev.mysql.com/downloads/mysql/
2.  Select Windows (x86, 64-bit), MSI Installer 
    When prompted to sign in select (No thanks, just start my download.)
3.  Go to downloads and execute mysql-8.1.0-winx64
4.  Install using typical (you only need to set the root password during configuration)

Load MYSQL Workbench

1.  Go to https://dev.mysql.com/downloads/windows/installer/8.0.html
2.  Select Windows (x86, 32-bit), MSI Installer and download
    When prompted to sign in select (No thanks, just start my download.)
3.  Go to downloads and execute mysql-installer-web-community-8.0.34.0
    Select client only and execute
4.  After install start MYSQL Workbench 
5.  Select schemas at the bottom os the Navigator window
6.  If a query window is not open then open one.
7.  Enter -  Create database CartDb; and then execute using the lightnig bolt icon
8.  Right click in the schema window and select refresh
9.  Click on the CartDb then On Server in the menu bar and then Data Import
10. Browse to the DataDump directory from where you did the git clone and select it 
11. Then click start impoet.
12. All the tables and data needed will be loaded in the database.

Load Node
 
1.  Go to https://nodejs.org/en/download and download the windows installer for node
2.  Execute the file after downloading

Load Node dependencies

1.  open another command window
2.  cd to the TUSKLA Project directory
3.  npm install -g cors express multer muter mysql2 sequelize
4.  npm install
5.  start node - node server.js (leave window open)

Load Vue dependencies

1.  Open a command window
2.  cd to the TUSKLA project directory
3.  npm install -g @vue/cli
4.  npm install bootstrap@4.6.0 jquery popper.js
5.  npm install vue-router@4 npm install axios@0.19.0 
6.  npm install -g fortawesome fontawesome-free bootstrap-icons core-js
6.  npm install -g firebase mitt popper.js video.js vue3-toastify vuex file-loader

To run type npm run serve
You should see
  App running at:
  - Local:   http://localhost:8081/

Connecting to that in chrome should start the web site


