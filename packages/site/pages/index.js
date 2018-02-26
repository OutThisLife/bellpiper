import Head from 'next/head'

export default () => (
  <main>
    <Head>
      <style>{`
      :root {
        --border: #fff;
      }

      body, html {
        margin: 0;
        padding: 0;
      }

      * {
        box-sizing: border-box;
      }

      html {
        font-family: "SF Pro Display", serif;
      }

      body {
        min-height: 200vh;
      }

      body:after {
        content: '';
        pointer-events: none;
        z-index: 100;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 30px solid var(--border);
      }
      `}</style>
    </Head>

    <style jsx>{`
    main {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      width: 100vw;
      height: 100vh;
      align-items: center;
      justify-content: center;
      outline: 2px solid var(--border);
      outline-offset: -100px;
    }

    @keyframes fuckit {
      0%, 100% {
        filter: grayscale(0.3) hue-rotate(0deg);
      }

      50% {
        filter: grayscale(0.3) hue-rotate(-180deg);
      }
    }

    .bg {
      z-index: -1;
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: fixed #292a54 url(/static/bg.jpg) center / cover no-repeat;
      background-blend-mode: difference;
      animation: fuckit 5s infinite;
    }

    .bg + .bg {
      left: 25%;
      background-position: center 40%;
    }

    .bg + .bg + .bg {
      left: 90%;
      background-position: center 65%;
    }

    hgroup {
      display: block;
      width: calc(100% - 110px);
      color: #121212;
      font-size: calc(25px + (75 - 25) * (100vw - 400px) / (2000 - 400));
      padding: 30px;
      line-height: 1.3;
    } hgroup span {
      padding: 0 13px;
    }

    h1 {
      display: block;
      font-weight: 400;
      font-size: inherit;
      margin: 0;
    } h1 span {
      background: #fff;
    }

    h2 {
      color: #FFF;
      font-weight: 100;
      font-size: inherit;
      margin: 0;
    }  h2 span {
      background: #000;
    }
    `}</style>

    <div className='bg' />
    <div className='bg' />
    <div className='bg' />

    <hgroup>
      <h1><span>Bellpiper.</span><br /><span>Bring out your inner shark.</span></h1>
      <h2><span>An honest trading journal.</span></h2>
    </hgroup>
  </main>
)
