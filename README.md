# Procedures to install bcrypt (windows)
1. npm install -g node-gym
2. Please make sure that you have install Python (recommended v2.7++). Make sure path is set in environment
3. npm install --msvs_version=2015 (Remarks: Depends on the Visual Studio that we install on machine)
4. npm install bcrypt

Once done with bcrypt, we can proceed to install the other packages (as mentioned in package.json).
5. npm install

# Database Config File
Create /config/config.js file. Content as follow
module.exports = {
    'connection': {
        'host': 'host_ip_address',
        'user': 'username',
        'password': 'password'
    },
    'database': 'issefportal2',
    'users_table': 'users'
};


# Configuration of database
Import the database schema (config/issefportal2.sql)

