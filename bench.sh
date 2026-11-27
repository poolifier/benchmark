#!/usr/bin/env bash

set -euo pipefail

usage() {
    echo "Usage: $0 [-s <pool size> -i <number of iterations> -t <CPU_INTENSIVE|IO_INTENSIVE>] [-n <number of tasks>]" 1>&2
    exit 1
}

while getopts "s:i:t:n:h" option
do
  case "${option}" in
    s)
      poolSize=${OPTARG}
      ;;
    i)
      iterations=${OPTARG}
      ;;
    t)
      taskType=${OPTARG}
      ;;
    n)
      taskSize=${OPTARG}
      ;;
    :)
      echo "Error: Missing option argument for '-${OPTARG}'" >&2;
      usage
      ;;
    \?)
      # Invalid option
      echo "Error: Unknown or invalid option for '-${OPTARG}'" >&2;
      usage
      ;;
    *|h)
      usage
      ;;
  esac
done

taskType=${taskType:-'CPU_INTENSIVE'}
taskSize=${taskSize:-1000}
numIterations=${iterations:-100000}

case "${taskType}" in
  CPU_INTENSIVE|IO_INTENSIVE)
    ;;
  *)
    echo "Error: Invalid task type '${taskType}'. Expected CPU_INTENSIVE or IO_INTENSIVE." >&2
    usage
    ;;
esac

if [[ -z "${poolSize+x}" ]]; then
  if [[ "$OSTYPE" == darwin* ]]; then
    poolSize=$(sysctl -n hw.ncpu)
  elif command -v nproc >/dev/null 2>&1; then
    poolSize=$(nproc --all 2>/dev/null || nproc)
  else
    poolSize=4
    echo "Warning: cannot detect CPU count automatically; falling back to pool size ${poolSize}" >&2
  fi
fi

echo 'Running benchmarks with pool size:' ${poolSize}', number of iterations:' ${numIterations}', task type:' ${taskType} 'and task size:' ${taskSize}
export NODE_ENV=production
export TASK_TYPE=${taskType}
export TASK_SIZE=${taskSize}
export POOL_SIZE=${poolSize}
export NUM_ITERATIONS=${numIterations}

if [[ "$OSTYPE" == darwin* ]] && command -v caffeinate >/dev/null 2>&1; then
  caffeinate ./hyperfine_benchmarks.sh
elif [[ "$OSTYPE" == linux* ]] && command -v systemd-inhibit >/dev/null 2>&1; then
  systemd-inhibit --what=idle ./hyperfine_benchmarks.sh
else
  echo "Warning: no idle-prevention tool available for $OSTYPE; continuing without it" >&2
  ./hyperfine_benchmarks.sh
fi
