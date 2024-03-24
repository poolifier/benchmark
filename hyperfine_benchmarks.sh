#!/usr/bin/env bash

hyperfine --export-markdown BENCH-100000.md --export-json BENCH-100000.json --min-runs 20 --prepare 'sleep 5' --warmup 3 --show-output \
  'node dynamic-poolifier.mjs' \
  'node fixed-poolifier.mjs' \
  'node dynamic-piscina.mjs' \
  'node fixed-piscina.mjs' \
  'node dynamic-tinypool.mjs' \
  'node fixed-tinypool.mjs' \
  'node dynamic-workerpool.mjs' \
  'node fixed-workerpool.mjs' \
  'node dynamic-worker-nodes.cjs' \
  'node fixed-worker-nodes.cjs' \
  'node dynamic-concurrent.js.mjs' \
  'node fixed-concurrent.js.mjs' \
  'node fixed-nanothreads.mjs'
