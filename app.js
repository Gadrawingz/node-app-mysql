// Imports
import bcrypt from 'bcrypt';
// import express from 'express';

const password = '@Pass5';
const theSalt = bcrypt.genSaltSync(10);
const hashed = await bcrypt.hash(password, theSalt);

console.log({
    password,
    theSalt,
    hashed
});