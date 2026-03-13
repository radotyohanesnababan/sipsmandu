#!/bin/bash

# Kill background processes on exit
trap 'kill $(jobs -p) 2>/dev/null' EXIT

echo "Starting Laravel + Vite dev server..."

php artisan serve &
npm run dev &

wait