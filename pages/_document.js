import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="AI-powered resume builder and ATS tracker for landing your dream job." />
        <meta property="og:title" content="AI Resume Builder" />
        <meta property="og:description" content="Optimize your resume with AI to beat ATS and get hired faster." />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}