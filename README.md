# Poolifier benchmark versus other worker pools

## Table of contents

- [Description](#description)
- [Usage](#usage)
- [Results](#results)

## Description

To compare poolifier pools performance vs other pools performance we chose to use [hyperfine](https://github.com/sharkdp/hyperfine).  
We chose to use this tool because it allows to run isolated Node.js processes so each pool does not impact each other.

- External pools with which we compare the poolifier results:

  - [piscina](https://github.com/piscinajs/piscina)
  - [tinypool](https://github.com/tinylibs/tinypool)
  - [workerpool](https://github.com/josdejong/workerpool)
  - [worker-nodes](https://github.com/allegro/node-worker-nodes)
  - [concurrent.js](https://github.com/bitair-org/concurrent.js)
  - [nanothreads](https://github.com/snuffyDev/nanothreads)

- External pools with which we used to compare the poolifier results:

  - [node-worker-threads-pool](https://github.com/SUCHMOKUO/node-worker-threads-pool): removed because it does not support dynamic modules import or import outside the task function. The task function is expected to be self-contained, which makes it difficult to use in real world application without ugly hacks.
  - [worker-threads-pool](https://github.com/watson/worker-threads-pool): removed because unmaintained since more than 4 years.
  - [threadwork](https://github.com/kevlened/threadwork): removed because unmaintained since more than 3 years.
  - [microjob](https://github.com/wilk/microjob): removed because unmaintained since more than 5 years.
  - [threads.js](https://github.com/andywer/threads.js): removed because not a threads pool.

> :warning: **We would need funds to run our benchmark more often and on Cloud VMs, please consider to sponsor the poolifier project**

## Usage

To run the benchmark versus other worker pools you will need to:

- [Install hyperfine](https://github.com/sharkdp/hyperfine#installation)
- Clone the [benchmark repository](https://github.com/poolifier/benchmark)
- Run `pnpm install` in the benchmark cloned repository
- Run the `./bench.sh` script

> :warning: **Please be sure to use a quiet PC when you run the benchmark**

## [Results](https://bencher.dev/perf/poolifier-benchmark)

CPU Intensive task with 1k `factorial(50000)` operations submitted to each pool: [https://bencher.dev/perf/poolifier-benchmark](https://bencher.dev/perf/poolifier-benchmark).
