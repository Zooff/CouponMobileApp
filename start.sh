#!/bin/bash

mongod

cd server
npm install
npm start

cd ../couponApp
npm install
ionic serve --lab