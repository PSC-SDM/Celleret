#!/usr/bin/env bash
echo "before installing..."
npm install
echo "all dependencies installed"
echo $(pwd)
npm run dev
