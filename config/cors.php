<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register', '*'],

    'allowed_methods' => ['*'],

    // Bagian paling penting: Masukkan domain utama kamu di sini
    'allowed_origins' => ['https://SIMPAS.my.id',
    'https://www.SIMPAS.my.id',
    'https://server2.SIMPAS.my.id'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['X-Inertia', 'X-Inertia-Location'],

    'max_age' => 0,

    'supports_credentials' => true,

];