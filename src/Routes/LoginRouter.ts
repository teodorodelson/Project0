import { Router } from "express";
import { pool } from "../config/index";
export const loginRouter = Router();
import fs from "fs";

loginRouter.post("/login", async (req, res) => {
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
    //add if user log in
    const username = req.body.username;
    const password = req.body.password;
    const result_user = await client.query(
      `SELECT user_accounts.username from user_accounts Where username = '${username}';`
    );
    const role_user = await client.query(`SELECT role_type
        FROM role INNER JOIN user_accounts ON (role.username = user_accounts.username) Where role.username = '${username}';`);
    const result_password = await client.query(
      `SELECT user_accounts.password from user_accounts Where password = '${password}';`
    );
    const extracted_user = result_user.rows;
    const extracted_role = role_user.rows;
    const extract_password = result_password.rows;

    const role_convert = extracted_role.map(function (item) {
      return item["role_type"];
    });
    const user_role = role_convert.toString();

    // note to self: this will convert my row query into array
    const pass = extract_password.map(function (item) {
      return item["password"];
    });

    //
    const parsed_pass = pass.toString();

    // note to self: this will convert my row query into array
    const names = extracted_user.map(function (item) {
      return item["username"];
    });
    //
    const parsed_user = names.toString();

    if (username === "") {
      res.send("please enter username");
    } else if (parsed_user === username) {
      //add validation password is empty
      if (password === parsed_pass) {
        if (req.session) {
          //usually you would set the data of the user to the session
          req.session.user = username;
          req.session.role = user_role;
          console.log("Successfully logged-in");
          if (req.session.role === "Admin") {
            res.redirect("/getAllaccounts");
          } else {
            res.redirect("/studDashboard");
          }
        }
      } else {
        res.send("You have entered a wrong password");
      }
    } else {
      res.send("Wrong Password or username");
    }
  } catch (err) {
    console.log(err);
    res.send("Please check on your query");
  } finally {
    client && client.release();
    res.end();
  }
});

loginRouter.get("/logout", (req, res, err) => {
  fs.appendFile(
    "logs.txt",
    `\nA request has been made to ${req.url} with the method of + ${req.method} ` +
      Date.now().toString(),
    function (err) {
      if (err) throw err;
    }
  );
  if (req.session && req.session.user !== undefined) {
    // when you "logout" you are really just removing the data set by loggin in
    delete req.session.user;
    req.session.reset;
    delete req.session.cookies;
    delete req.session.role;
    console.log(req.session);
    res.send("Logged out successfully");
    res.end("logged out!");
  } else {
    res.end("No session active");
  }
});

// what i can do to make this more reliable is to query username with password using username as where.
// then compare values of that pass that is = username
