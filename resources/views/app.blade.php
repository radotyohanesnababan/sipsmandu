<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <link rel="manifest" href="/manifest.json">
    <head>
                <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4TH7YCTPJW"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-4TH7YCTPJW');
        </script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="canonical" href="https://SIMPAS.my.id" />

        <meta name="description" content="SIMPAS - Sistem Perpustakaan SMA N 2 Siborongborong. Koleksi buku lengkap, kemudahan akses, dan layanan terbaik untuk mendukung pembelajaran Anda.">
        <meta name="keywords" content="Perpustakaan, SMA N 2 Siborongborong, Buku, Koleksi Buku, Layanan Perpustakaan, Pendidikan, Sumber Belajar, SIMPAS, Buku Online, Sekolah, Tarutung">
        <meta name="author" content="SMA N 2 Siborongborong">

        <link rel="icon" type="image/png" href="{{ asset('storage/logo/favicon.png') }}" sizes="48x48">
        <link rel="sitemap" type="application/xml" href="https://SIMPAS.my.id/sitemap.xml">

       

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="preload" href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" as="style" />
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
        <noscript>
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        </noscript>
        

        <!-- Title -->
        <title inertia>
    @if(request()->is('/'))
         SIMPAS | Sistem Perpustakaan SMA N 2 Siborongborong
    @else
        SIMPAS | Sistem Perpustakaan SMA N 2 Siborongborong
    @endif
    </title>
        <meta property="og:title" content="Perpustakaan SIMPAS - SMA N 2 Siborongborong">
        <meta property="og:description" content="Koleksi buku lengkap dan e-book pendidikan di SIMPAS, perpustakaan digital SMA N 2 Siborongborong.">
        <meta property="og:image" content="https://SIMPAS.my.id/storage/logo/logo.webp">
        <meta property="og:url" content="https://SIMPAS.my.id">
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
            @verbatim
            <script type="application/ld+json">
            {
            "@context": "https://schema.org",
            "@type": ["EducationalOrganization", "Library"],
            "name": "SMA N 2 Siborongborong - Perpustakaan SIMPAS",
            "url": "https://SIMPAS.my.id",
            "logo": "https://SIMPAS.my.id/storage/logo/logo.webp",
            "sameAs": ["https://www.smpnegeri1tarutung.sch.id"],
            "description": "Perpustakaan digital SMA N 2 Siborongborong dengan koleksi buku dan e-book pendidikan.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Nahum Situmorang No. 1, Hutatoruan V",
                "addressLocality": "Tarutung",
                "addressRegion": "Sumatera Utara",
                "postalCode": "22413",
                "addressCountry": "ID"
            }
            }
            </script>
            @endverbatim

            @verbatim
            <script type="application/ld+json">
            {
            "@context": "https://schema.org",
            "@type": "Library",
            "name": "Perpustakaan SIMPAS SMA N 2 Siborongborong",
            "image": "https://SIMPAS.my.id/storage/logo/logo.webp",
            "url": "https://SIMPAS.my.id",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Nahum Situmorang No. 1, Hutatoruan V",
                "addressLocality": "Tarutung",
                "addressRegion": "Sumatera Utara",
                "postalCode": "22413",
                "addressCountry": "ID"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 2.0161576,
                "longitude": 98.9594118
            },
            "openingHours": "Mo-Fr 07:30-15:00",
            "sameAs": [
                "https://www.smpnegeri1tarutung.sch.id",
                "https://maps.google.com/?cid=XXXXXXXXXXXX"
            ]
            }
            </script>
            @endverbatim

        <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => reg)
                .catch();
        }
        </script>

        <script src="/storage/js/theme.js" defer></script>
        
    </head>
    <body class="font-sans antialiased max-h-screen">
        @inertia
    </body>
</html>
