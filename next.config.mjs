async redirects() {
  return [
    // Редирект с 'птб-м.рф' на 'www.xn----9sb8ajp.xn--p1ai'
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: '(www\\.)?птб-м\\.рф',
        },
      ],
      destination: 'https://www.xn----9sb8ajp.xn--p1ai/:path*',
      permanent: true, // HTTP 301
      basePath: false,
    },
    {
      source: '/',
      has: [
        {
          type: 'host',
          value: '(www\\.)?птб-м\\.рф',
        },
      ],
      destination: 'https://www.xn----9sb8ajp.xn--p1ai/',
      permanent: true,
    },
    // Редирект с 'non-www' на 'www'
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: '^xn----9sb8ajp\\.xn--p1ai$',
        },
      ],
      destination: 'https://www.xn----9sb8ajp.xn--p1ai/:path*',
      permanent: true, // HTTP 301
      basePath: false,
    },
    {
      source: '/',
      has: [
        {
          type: 'host',
          value: '^xn----9sb8ajp\\.xn--p1ai$',
        },
      ],
      destination: 'https://www.xn----9sb8ajp.xn--p1ai/',
      permanent: true,
    },
  ];
},