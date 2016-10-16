#!/bin/sh
g++ -o server server.cpp storage/pool.cpp storage/node.cpp
./server
