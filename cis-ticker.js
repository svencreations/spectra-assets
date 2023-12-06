!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports):"function"==typeof define&&define.amd?define(["exports"],o):o((e||self).yallJs={})}(this,function(e){function o(e,o){for(const t in o){const n=o[t];e.addEventListener(t,n.listener||n,n.options||void 0)}}const t="IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype,n=/baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent),s=["src","poster"];function r(e,o){for(const t of s)t in e.dataset&&(e.setAttribute(t,e.dataset[t]),e.classList.contains(o)&&e.classList.remove(o))}function i(e,o,t,n){if("VIDEO"==e.nodeName){const t=Array.from(e.querySelectorAll("source"));for(const e of t)r(e,o);e.load()}r(e,o);const s=e.classList;s.contains(t)&&(s.remove(t),s.add(n))}e.yall=function(e){const s=e?.lazyClass||"lazy",r=e?.lazyBackgroundClass||"lazy-bg",c=e?.lazyBackgroundLoaded||"lazy-bg-loaded",a=e?.threshold||200,l=e?.events||{},d=e?.observeChanges||!1,f=e?.observeRootSelector||"body",u=e?.mutationObserverOptions||{childList:!0,subtree:!0},b=`video.${s},.${r}`;let y=Array.from(document.querySelectorAll(b));for(const e of y)o(e,l);if(!0===t&&!1===n){var v=new IntersectionObserver(e=>{for(const o of e)if(o.isIntersecting||o.intersectionRatio){const{target:e}=o;i(e,s,r,c),v.unobserve(e),y=y.filter(o=>o!=e),0===y.length&&!1===d&&v.disconnect()}},{rootMargin:`${a}px 0%`});for(const e of y)v.observe(e);d&&new MutationObserver(()=>{const e=document.querySelectorAll(b);for(const s of e)!1===y.includes(s)&&(y.push(s),o(s,l),!0===t&&!1===n&&v.observe(s))}).observe(document.querySelector(f),u)}else if(n)for(const e of y)i(e,s,r,c)}});

document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.cis-lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

var marquees = document.querySelectorAll(".cismarquee");
for (var i = 0; i < marquees.length; i++) {
  marquees[i].setAttribute("data-marquee-index", i);
}
Marquee3k.init();

// Functions to toggle changeover Tickers Play and Pause
function pauseChangeoverTickers(dataIndexes) {
  dataIndexes.forEach((dataIndex) => {
    Marquee3k.pause(dataIndex);
  });
}

function playChangeoverTickers(dataIndexes) {
  dataIndexes.forEach((dataIndex) => {
    Marquee3k.play(dataIndex);
  });
}

const pausableChangeoverTickers = document.querySelectorAll('.cis-widget__ticker__wrapper[data-pausable="true"]');
if (pausableChangeoverTickers.length > 0) {
  pausableChangeoverTickers.forEach((pausableChangeoverTicker) => {
    const baTickers = pausableChangeoverTicker.querySelectorAll(".cismarquee");
    const dataIndexes = Array.from(baTickers)
      .map((baTicker) => {
        const dataIndexStr = baTicker.getAttribute("data-marquee-index");
        return parseInt(dataIndexStr, 10);
      })
      .filter((dataIndex) => !isNaN(dataIndex));
    pausableChangeoverTicker.addEventListener("mouseenter", (event) => {
      pauseChangeoverTickers(dataIndexes);
    });
    pausableChangeoverTicker.addEventListener("mouseleave", (event) => {
      playChangeoverTickers(dataIndexes);
    });
  });
}
