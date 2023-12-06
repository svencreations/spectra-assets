if (typeof yallJs === 'undefined' || typeof yallJs.yall !== 'function') {
  !function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports):"function"==typeof define&&define.amd?define(["exports"],o):o((e||self).yallJs={})}(this,function(e){function o(e,o){for(const t in o){const n=o[t];e.addEventListener(t,n.listener||n,n.options||void 0)}}const t="IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype,n=/baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent),s=["src","poster"];function r(e,o){for(const t of s)t in e.dataset&&(e.setAttribute(t,e.dataset[t]),e.classList.contains(o)&&e.classList.remove(o))}function i(e,o,t,n){if("VIDEO"==e.nodeName){const t=Array.from(e.querySelectorAll("source"));for(const e of t)r(e,o);e.load()}r(e,o);const s=e.classList;s.contains(t)&&(s.remove(t),s.add(n))}e.yall=function(e){const s=e?.lazyClass||"lazy",r=e?.lazyBackgroundClass||"lazy-bg",c=e?.lazyBackgroundLoaded||"lazy-bg-loaded",a=e?.threshold||200,l=e?.events||{},d=e?.observeChanges||!1,f=e?.observeRootSelector||"body",u=e?.mutationObserverOptions||{childList:!0,subtree:!0},b=`video.${s},.${r}`;let y=Array.from(document.querySelectorAll(b));for(const e of y)o(e,l);if(!0===t&&!1===n){var v=new IntersectionObserver(e=>{for(const o of e)if(o.isIntersecting||o.intersectionRatio){const{target:e}=o;i(e,s,r,c),v.unobserve(e),y=y.filter(o=>o!=e),0===y.length&&!1===d&&v.disconnect()}},{rootMargin:`${a}px 0%`});for(const e of y)v.observe(e);d&&new MutationObserver(()=>{const e=document.querySelectorAll(b);for(const s of e)!1===y.includes(s)&&(y.push(s),o(s,l),!0===t&&!1===n&&v.observe(s))}).observe(document.querySelector(f),u)}else if(n)for(const e of y)i(e,s,r,c)}});
}

if(typeof window.Marquee3k === "undefined") {
  !function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.Marquee3k=e()}(this,function(){"use strict";let t=0;class e{constructor(t,e){this.element=t,this.selector=e.selector,this.speed=t.dataset.speed||.25,this.pausable=t.dataset.pausable,this.reverse=t.dataset.reverse,this.paused=!1,this.parent=t.parentElement,this.parentProps=this.parent.getBoundingClientRect(),this.content=t.children[0],this.innerContent=this.content.innerHTML,this.wrapStyles="",this.offset=0,this._setupWrapper(),this._setupContent(),this._setupEvents(),this.wrapper.appendChild(this.content),this.element.appendChild(this.wrapper)}_setupWrapper(){this.wrapper=document.createElement("div"),this.wrapper.classList.add("cismarquee__wrapper"),this.wrapper.style.whiteSpace="nowrap"}_setupContent(){this.content.classList.add(`${this.selector}__copy`),this.content.style.display="inline-block",this.contentWidth=this.content.offsetWidth,this.requiredReps=this.contentWidth>this.parentProps.width?2:Math.ceil((this.parentProps.width-this.contentWidth)/this.contentWidth)+1;for(let t=0;t<this.requiredReps;t++)this._createClone();this.reverse&&(this.offset=-1*this.contentWidth),this.element.classList.add("is-init")}_setupEvents(){this.element.addEventListener("mouseenter",()=>{this.pausable&&(this.paused=!0)}),this.element.addEventListener("mouseleave",()=>{this.pausable&&(this.paused=!1)})}_createClone(){const t=this.content.cloneNode(!0);t.style.display="inline-block",t.classList.add(`${this.selector}__copy`),this.wrapper.appendChild(t)}animate(){if(!this.paused){const t=this.reverse?this.offset<0:this.offset>-1*this.contentWidth,e=this.reverse?-1:1,s=this.reverse?-1*this.contentWidth:0;t?this.offset-=this.speed*e:this.offset=s,this.wrapper.style.whiteSpace="nowrap",this.wrapper.style.transform=`translate(${this.offset}px, 0) translateZ(0)`}}_refresh(){this.contentWidth=this.content.offsetWidth}repopulate(t,e){if(this.contentWidth=this.content.offsetWidth,e){const e=Math.ceil(t/this.contentWidth)+1;for(let t=0;t<e;t++)this._createClone()}}static refresh(t){MARQUEES[t]._refresh()}static pause(t){MARQUEES[t].paused=!0}static play(t){MARQUEES[t].paused=!1}static toggle(t){MARQUEES[t].paused=!MARQUEES[t].paused}static refreshAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t]._refresh()}static pauseAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!0}static playAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!1}static toggleAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!MARQUEES[t].paused}static init(s={selector:"cismarquee"}){t&&window.cancelAnimationFrame(t),window.MARQUEES=[];const i=Array.from(document.querySelectorAll(`.${s.selector}`));let n,r=window.innerWidth;for(let t=0;t<i.length;t++){const n=i[t],r=new e(n,s);MARQUEES.push(r)}!function e(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].animate();t=window.requestAnimationFrame(e)}(),window.addEventListener("resize",()=>{clearTimeout(n),n=setTimeout(()=>{const t=r<window.innerWidth,e=window.innerWidth-r;for(let s=0;s<MARQUEES.length;s++)MARQUEES[s].repopulate(e,t);r=this.innerWidth},250)})}}return e});
}

document.addEventListener("triggerMarquee", function() {
  yallJs.yall({
    lazyClass: "cis-lazy"
  });
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

// Function to pause all marquees
function pauseAllMarquees() {
  var allMarquees = document.querySelectorAll(".cismarquee");
  var dataIndexes = Array.from(allMarquees).map((marquee) => {
    const dataIndexStr = marquee.getAttribute("data-marquee-index");
    return parseInt(dataIndexStr, 10);
  });
  pauseChangeoverTickers(dataIndexes);
}

// Function to play all marquees
function playAllMarquees() {
  var allMarquees = document.querySelectorAll(".cismarquee");
  var dataIndexes = Array.from(allMarquees).map((marquee) => {
    const dataIndexStr = marquee.getAttribute("data-marquee-index");
    return parseInt(dataIndexStr, 10);
  });
  playChangeoverTickers(dataIndexes);
}

// Event listener for visibility change
document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    pauseAllMarquees();
  } else {
    playAllMarquees();
  }
});

// Debounce function
function cisDebounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

// Function to refresh marquee if marquee3k has marquees
function refreshMarquee() {
    if (Marquee3k.length > 0) {
      console.log("refreshing");
        //Marquee3k.pauseAll();
        Marquee3k.refreshAll();
        //Marquee3k.playAll();
    }
}

// Debounce the refreshMarquee function, delay execution until 250 milliseconds of inactivity
const debouncedRefreshMarquee = cisDebounce(refreshMarquee, 250);

// Add the debounced function as the resize event listener
window.addEventListener('resize', debouncedRefreshMarquee);
