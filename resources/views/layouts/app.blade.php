<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>Music</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="shortcut icon" href="/favicon-icon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="/favicon-32x32.png" type="image/png">

    <!-- Styles -->
    <link href="{{ mix('webpack/vendors.css') }}" rel="stylesheet">
    <link href="{{ mix('webpack/app.css') }}" rel="stylesheet">
</head>

<body>
<div class="wrapper">
    <main class="main">
        @yield('content')
    </main>
</div>

<script src="{{ mix('webpack/manifest.js') }}" defer></script>
<script src="{{ mix('webpack/vendors.js') }}" defer></script>
<script src="{{ mix('webpack/app.js') }}" defer></script>
</body>
</html>
