# CEDCD

Cancer Epidemiology Descriptive Cohort Database

# CEDCD Dev Startup

Run the following commands in Terminal. Copy and paste with Ctrl + C and Ctrl + Shift + V.

1.  Clone the git repository
    1.1. Navigate terminal to where you want to save the project and run the following command (If you are using Windows, git bash works fine)

    ```console
    git clone https://github.com/CBIIT/nci-webtools-dccps-cedcd.git
    ```

2.  Go to the root directory

    ```console
    cd nci-webtools-dccps-cedcd/
    ```

3.  Install the packages needed for the project

    ```console
    npm install
    ```

4.  Go to the client directory

    ```console
    cd client
    ```

5.  Install the packages needed for the client

    ```console
    npm install
    ```

6.  Now we need to do some setup in the backend side!
    If you don't have mysql installed, then perform the following steps
    First, return to the directory where you cloned the project

    ```console
    cd ..
    cd ..
    ```

7.  Clone the portable-wamp from the following git repository

    ```console
    git clone https://github.com/park-brian/portable-wamp
    ```

8.  Enter the folder

    ```console
    cd portable-wamp
    ```

9.  run the setup scripts

    ```console
    ./setup.sh
    ```

10. Open a new terminal (or Git Bash) and navigate to your current location

11. In this terminal, run the sql server script

    ```console
    ./start_mysqld.sh
    ```

12. Go back to the first terminal and first copy some files that we will need later on into this folder
    So, go back to the directory with the two cloned repositories in it

    ```console
    cd ..
    ```

    Copy some sql files over

    ```console
    cp nci-webtools-dccps-cedcd/database/Schema/cedcd_Tables.sql portable-wamp/cedcd-dev-20190627.sql
    cp nci-webtools-dccps-cedcd/database/Schema/cedcd_StoredProcedures.sql portable-wamp/cedcd_StoredProcedures.sql
    ```

13. Now navigate back into the portable-wamp folder

    ```console
    cd portable-wamp
    ```

    And run the mysql script

    ```console
    ./start_mysql.sh
    ```

    This should lead to a prompt that looks like the following

    ```console
    mysql>
    ```

14. We need to create a new user by typing in the following

    ```console
    CREATE USER 'username'@'%' IDENTIFIED BY 'password';
    ```

    Replace username and password with the username and password given to you by someone with access to the servers
    We give this user rights by doing the following

    ```console
    GRANT ALL PRIVILEGES ON *.* TO 'username'@'%';
    ```

15. Awesome! Now we need to create the database that we will be using
    We will create a new database using the following command

    ```console
    CREATE DATABASE cedcd;
    ```

    Now enter the database by using the following command

    ```console
    USE cedcd;
    ```

    We need to import the tables and procedures from the two files we copied over into the database

    ```console
    SOURCE cedcd-dev-20190627.sql;
    SOURCE cedcd_StoredProccedures.sql;
    ```

    Congratulations! The sql server is ready to go!
    Exit the mysql prompt with the following command

    ```console
    \q
    ```

16. Now, we need to create the configuration file.
    Go back into nci-webtools-dccps-cedcd folder

    ```console
    cd ..
    cd nci-webtools-dccps-cedcd
    ```

    We need to go into the config folder and add a configuration file

    ```console
    cd config
    nano cedcd.settings
    ```

    Copy and paste the following into the file

        ```console
        'use strict';

        module.exports = {

        mysql:{
            connectionLimit: 100,
            host: 'localhost',
            port: 3306,
            user: 'username',
            password: 'password',
            db: 'cedcd'
        },

        logDir: 'Logs',
        file_path: 'Uploads',

        mail:{

            host:'',
            port:8000,
            from:'',
            to:''
        },

        env: 'dev'
        };
        ```

    Make sure that the username and password are replaced by the username and password you used earlier
    Use the following commands to save and exit if you are using nano

    ```console
    Ctrl-x
    y
    Enter
    ```

17. You're almost there!
    Now we have to build the client. First, we go to client folder.

    ```console
    cd ..
    cd client
    ```

    To build, run the following command.

    ```console
    npm start-script build
    ```

    We need to copy the build files into a www folder, so do this by using the following commands

    ```console
    mkdir www
    cp -r build/* www/
    ```

18. Now, we can run the client.
    Use the following commands to go to the webtool's root folder and run index.js.

    ```console
    cd ..
    cd ..
    node index.js
    ```

    The terminal should display something along the lines of the following

    ```console
    $ cd ..

    $ cd ..

    $ node index.js
    Project CEDCD listening on port:9221
    ```

19. Everything should be working now, and you can just open up your browser of choice and go to the following link

    http://localhost:9221/
