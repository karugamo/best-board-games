import React from 'react'
import Helmet from 'react-helmet'

export default function Head() {
  return (
    <Helmet>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-48B8E17WMR"
      ></script>
      <script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-48B8E17WMR');
    `}</script>
      <title>Best Board Games</title>
      <style>{`
        html,
        body {
        background-color: #fff1d8;
        margin: 0;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        body {
        overflow-y: scroll;
        }
    `}</style>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="static/favicon-16x16.png"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <meta
        name="description"
        content="Browse and filter the top rated board games. Find strategy games, family games, party games and cooperative games. Filter by complexity."
      />
      <script defer type="text/javascript">{`
        window.sc_project = 12453360;
        window.sc_invisible = 1;
        window.sc_security = "3cec6d4d";
      `}</script>
      <script
        type="text/javascript"
        src="https://www.statcounter.com/counter/counter.js"
        async
        defer
      ></script>
    </Helmet>
  )
}
