import { Router } from "express";
import { pool } from "../config/index";
export const GetUsers = Router();
import fs from "fs";

GetUsers.get("/getallAccounts", async (req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `\nA request has been made to ${req.url} with the method of + ${req.method} ` +
      Date.now().toString(),
    function (err) {
      if (err) throw err;
    }
  );
  let client;
  try {
    if (req.session && req.session.user !== undefined) {
      if (req.session.role === "Admin") {
        console.log(req.session);
        console.log("Welcome admin ");
        client = await pool.connect();
        const result = await client.query(
          "SELECT id, username, email, lname, fname, join_date, contact FROM user_accounts;"
        );
        res.send(result.rows);
        res.end();
      } else {
        res.status(403);
        res.send("Unauthorized Access");
      }
    } else {
      res.status(403);
      res.send("Unauthorized Access");
    }
  } catch (err) {
    console.log(err);
    res.end("Failed to retrieve information from the database");
  } finally {
    client && client.release();
    res.end();
  }
});

GetUsers.get("/getAccountById/:id", async (req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `\nA request has been made to ${req.url} with the method of + ${req.method} ` +
      Date.now().toString(),
    function (err) {
      if (err) throw err;
    }
  );
  let client;
  try {
    if (req.session && req.session.user !== undefined) {
      if (req.session.role === "Admin") {
        console.log(req.session);
        console.log("Welcome admin");
        const holder = req.params.id;
        console.log("The input of the user : " + holder);
        client = await pool.connect();
        const result = await client.query(`SELECT id, username, email, lname, fname, join_date, contact FROM user_accounts WHERE
             user_accounts.id = '${holder}';`);
        if (result.rows[0] === undefined) {
          res.send("No Account found");
        } else {
          res.send(result.rows);
        }

        res.end();
      } else {
        res.status(403);
        res.send("Unauthorized Access");
      }
    } else {
      res.status(403);
      res.send("Unauthorized Access");
    }
  } catch (err) {
    console.log(err);
    res.end("Failed to retrieve information from the database");
  } finally {
    client && client.release();
    res.end();
  }
});

GetUsers.get("/getAccountByEmail/:id", async (req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `\nA request has been made to ${req.url} with the method of + ${req.method} ` +
      Date.now().toString(),
    function (err) {
      if (err) throw err;
    }
  );
  let client = await pool.connect();
  try {
    if (req.session && req.session.user !== undefined) {
      if (req.session.role === "Admin") {
        console.log(req.session);
        console.log("Welcome admin ");
        const holder = req.params.id;
        console.log("The input of the user: " + holder);
        const result = await client.query(`SELECT id, username, email, lname, fname, join_date, contact FROM user_accounts WHERE
             user_accounts.email = '${holder}';`);
        if (result.rows[0] === undefined) {
          res.send("No data found");
        } else {
          res.send(result.rows);
        }

        res.end();
      } else {
        res.status(403);
        res.send("Unauthorized Access");
      }
    } else {
      res.status(403);
      res.send("Unauthorized Access");
    }
  } catch (err) {
    console.log(err);
    res.end("Failed to retrieve information from the database");
  } finally {
    client && client.release();
    res.end();
  }
});

GetUsers.post("/register", async (req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `\nA request has been made to ${req.url} with the method of + ${req.method} ` +
      Date.now().toString(),
    function (err) {
      if (err) throw err;
    }
  );
  let client = await pool.connect();
  try {
    if (req.session && req.session.user !== undefined) {
      if (req.session.role === "Admin") {
        console.log(req.session);
        const user_id = req.body.user_id;
        const user_name = req.body.user_name;
        const password = req.body.password;
        const user_email = req.body.user_email;
        const lname = req.body.lname;
        const fname = req.body.fname;
        const join_date = req.body.join_date;
        const contact_num = req.body.contact_num;

        const result = client.query(
          `INSERT INTO user_accounts(
                id, username, password, email, lname, fname, join_date, contact)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ID`,
          [
            user_id,
            user_name,
            password,
            user_email,
            lname,
            fname,
            join_date,
            contact_num,
          ]
        );
        res.send("User succesffuly created");
        res.end();
      } else {
        res.status(403);
        res.send("Unauthorized Access");
      }
    } else {
      res.status(403);
      res.send("Unauthorized Access");
    }
  } catch (err) {
    console.log(err);
    res.end("Failed to push infromation to data base");
  } finally {
    client && client.release();
    res.end();
  }
});
