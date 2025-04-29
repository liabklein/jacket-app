import React, { useEffect } from 'react';
import './App.css';
import JacketRecommendation from './JacketRecommendation';
import Header from './Header';

const TRACKING_ID = "G-7LB6NCP94J";

function App() {
  useEffect(() => {
    // Initialize GA4
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    gtagScript.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', TRACKING_ID, {
        page_path: window.location.pathname + window.location.search,
      });
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <JacketRecommendation />
      </header>
    </div>
  );
}

export default App;