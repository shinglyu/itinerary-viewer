#!/usr/bin/env bash


(sleep 2; firefox http://127.0.0.1:8080/?file="${1}") &
live-server . --no-browser
