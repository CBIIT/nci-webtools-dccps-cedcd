#!/usr/bin/env node

/**
 * Database Update Script for CEDCD
 * 
 * Executes SQL scripts against the MySQL database.
 * Accepts an optional script path as a command-line argument.
 * Always executes stored procedures and views after any specific script.
 * 
 * Usage:
 *   node import.js                                    # Run stored procedures and views only
 *   node import.js deploy_scripts/3.4.1_Update.sql   # Run specific script, then stored procedures and views
 */

import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';

// Configuration from environment variables
const config = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    multipleStatements: true,
    connectTimeout: 30000
};

/**
 * Log message with timestamp
 */
function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
}

/**
 * Execute a SQL file
 */
async function executeSqlFile(connection, filePath) {
    try {
        const fullPath = path.resolve(__dirname, filePath);
        log(`Reading SQL file: ${filePath}`);
        
        const sqlContent = await fs.readFile(fullPath, 'utf8');
        
        if (!sqlContent.trim()) {
            log(`Warning: SQL file is empty: ${filePath}`, 'WARN');
            return;
        }
        
        log(`Executing SQL file: ${filePath}`);
        await connection.query(sqlContent);
        log(`Successfully executed: ${filePath}`, 'SUCCESS');
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            log(`Error: SQL file not found: ${filePath}`, 'ERROR');
        } else {
            log(`Error executing ${filePath}: ${error.message}`, 'ERROR');
            if (error.sql) {
                log(`Failed SQL: ${error.sql.substring(0, 200)}...`, 'ERROR');
            }
        }
        throw error;
    }
}

/**
 * Main execution function
 */
async function main() {
    let connection;
    
    try {
        // Validate required environment variables
        const requiredVars = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DB'];
        const missingVars = requiredVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            log(`Missing required environment variables: ${missingVars.join(', ')}`, 'ERROR');
            process.exit(1);
        }
        
        log('Starting database update process');
        log(`Connecting to database: ${config.host}:${config.port}/${config.database}`);
        
        // Create database connection
        connection = await mysql.createConnection(config);
        log('Database connection established', 'SUCCESS');
        
        // Get optional script path from command-line argument
        const specificScriptPath = process.argv[2];
        
        // Execute specific script if provided
        if (specificScriptPath) {
            log(`Custom script provided: ${specificScriptPath}`);
            await executeSqlFile(connection, specificScriptPath);
        } else {
            log('No custom script provided, will execute stored procedures and views only');
        }
        
        // Always execute stored procedures and views
        log('Executing stored procedures...');
        await executeSqlFile(connection, 'Schema/cedcd_StoredProcedures.sql');
        
        log('Executing views...');
        await executeSqlFile(connection, 'Schema/cedcd_Views.sql');
        
        log('Database update completed successfully!', 'SUCCESS');
        process.exit(0);
        
    } catch (error) {
        log(`Database update failed: ${error.message}`, 'ERROR');
        if (error.stack) {
            log(error.stack, 'ERROR');
        }
        process.exit(1);
        
    } finally {
        if (connection) {
            try {
                await connection.end();
                log('Database connection closed');
            } catch (error) {
                log(`Error closing connection: ${error.message}`, 'WARN');
            }
        }
    }
}

// Run the main function
main();
