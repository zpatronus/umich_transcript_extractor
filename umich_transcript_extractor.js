// ==UserScript==
// @name         UMich Transcript Extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extract and merge lecture transcripts from UMich's lecture recording website.
// @author       zpatronus
// @match        https://leccap.engin.umich.edu/leccap/player/r/*
// @grant        GM_xmlhttpRequest
// @downloadURL  https://github.com/zpatronus/umich_transcript_extractor/raw/main/umich_transcript_extractor.user.js
// @updateURL    https://github.com/zpatronus/umich_transcript_extractor/raw/main/umich_transcript_extractor.user.js
// ==/UserScript==

(function () {
  'use strict';

  function parseAndMergeWEBVTT (responseText) {
    const lines = responseText.split('\n');
    let mergedText = '';
    let isCaptionLine = false;

    lines.forEach(line => {
      if (line.includes('-->')) {
        isCaptionLine = true;
      } else if (line.trim() === '') {
        isCaptionLine = false;
      } else if (isCaptionLine) {
        mergedText += line.trim() + ' ';
      }
    });

    return mergedText.trim();
  }

  function createCopyButton (mergedText) {
    const button = document.createElement('button');
    button.textContent = 'Copy Transcript';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = 1000;
    button.style.padding = '5px 10px';
    button.style.fontSize = '12px';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '3px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';

    button.addEventListener('click', () => {
      navigator.clipboard.writeText(mergedText).then(() => {
        alert('Transcript copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });

    document.body.appendChild(button);
  }

  function extractVideoId () {
    const url = window.location.href;
    const match = url.match(/\/r\/([^\/]+)/);
    return match ? match[1] : null;
  }

  function fetchWEBVTT (videoId) {
    const webvttUrl = `https://leccap.engin.umich.edu/leccap/player/api/webvtt/?rk=${videoId}`;

    GM_xmlhttpRequest({
      method: 'GET',
      url: webvttUrl,
      onload: function (response) {
        if (response.status === 200) {
          const mergedText = parseAndMergeWEBVTT(response.responseText);
          createCopyButton(mergedText);
        } else {
          console.error('Failed to fetch WEBVTT content:', response.statusText);
        }
      },
      onerror: function (error) {
        console.error('Error fetching WEBVTT content:', error);
      }
    });
  }

  const videoId = extractVideoId();
  if (videoId) {
    fetchWEBVTT(videoId);
  } else {
    console.error('Video ID not found in the URL.');
  }
})();
