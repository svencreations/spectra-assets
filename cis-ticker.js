if(typeof window.Marquee3k === "undefined") {
  !function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.Marquee3k=e()}(this,function(){"use strict";let t=0;class e{constructor(t,e){this.element=t,this.selector=e.selector,this.speed=t.dataset.speed||.25,this.pausable=t.dataset.pausable,this.reverse=t.dataset.reverse,this.paused=!1,this.parent=t.parentElement,this.parentProps=this.parent.getBoundingClientRect(),this.content=t.children[0],this.innerContent=this.content.innerHTML,this.wrapStyles="",this.offset=0,this._setupWrapper(),this._setupContent(),this._setupEvents(),this.wrapper.appendChild(this.content),this.element.appendChild(this.wrapper)}_setupWrapper(){this.wrapper=document.createElement("div"),this.wrapper.classList.add("cismarquee__wrapper"),this.wrapper.style.whiteSpace="nowrap"}_setupContent(){this.content.classList.add(`${this.selector}__copy`),this.content.style.display="inline-block",this.contentWidth=this.content.offsetWidth,this.requiredReps=this.contentWidth>this.parentProps.width?2:Math.ceil((this.parentProps.width-this.contentWidth)/this.contentWidth)+1;for(let t=0;t<this.requiredReps;t++)this._createClone();this.reverse&&(this.offset=-1*this.contentWidth),this.element.classList.add("is-init")}_setupEvents(){this.element.addEventListener("mouseenter",()=>{this.pausable&&(this.paused=!0)}),this.element.addEventListener("mouseleave",()=>{this.pausable&&(this.paused=!1)})}_createClone(){const t=this.content.cloneNode(!0);t.style.display="inline-block",t.classList.add(`${this.selector}__copy`),this.wrapper.appendChild(t)}animate(){if(!this.paused){const t=this.reverse?this.offset<0:this.offset>-1*this.contentWidth,e=this.reverse?-1:1,s=this.reverse?-1*this.contentWidth:0;t?this.offset-=this.speed*e:this.offset=s,this.wrapper.style.whiteSpace="nowrap",this.wrapper.style.transform=`translate(${this.offset}px, 0) translateZ(0)`}}_refresh(){this.contentWidth=this.content.offsetWidth}repopulate(t,e){if(this.contentWidth=this.content.offsetWidth,e){const e=Math.ceil(t/this.contentWidth)+1;for(let t=0;t<e;t++)this._createClone()}}static refresh(t){MARQUEES[t]._refresh()}static pause(t){MARQUEES[t].paused=!0}static play(t){MARQUEES[t].paused=!1}static toggle(t){MARQUEES[t].paused=!MARQUEES[t].paused}static refreshAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t]._refresh()}static pauseAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!0}static playAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!1}static toggleAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!MARQUEES[t].paused}static init(s={selector:"cismarquee"}){t&&window.cancelAnimationFrame(t),window.MARQUEES=[];const i=Array.from(document.querySelectorAll(`.${s.selector}`));let n,r=window.innerWidth;for(let t=0;t<i.length;t++){const n=i[t],r=new e(n,s);MARQUEES.push(r)}!function e(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].animate();t=window.requestAnimationFrame(e)}(),window.addEventListener("resize",()=>{clearTimeout(n),n=setTimeout(()=>{const t=r<window.innerWidth,e=window.innerWidth-r;for(let s=0;s<MARQUEES.length;s++)MARQUEES[s].repopulate(e,t);r=this.innerWidth},250)})}}return e});
}
document.addEventListener("loadVideos", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.cis-lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          // Check if the video has already been loaded
          if (video.target.dataset.loaded !== 'true') {
            for (var source in video.target.children) {
              var videoSource = video.target.children[source];
              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
              }
            }

            video.target.load();
            video.target.classList.remove("lazy");
            // Set the flag to indicate the video has been loaded
            video.target.dataset.loaded = 'true';
          }
          // Continue observing for new duplicates of the video
          // lazyVideoObserver.unobserve(video.target); // You might want to comment this out
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

// Dispatch the 'loadVideos' event whenever needed, such as when the ticker updates
// document.dispatchEvent(new Event("loadVideos"));


// Check if the event can be dispatched immediately
if (document.readyState === "complete") {
  document.dispatchEvent(new Event("loadVideos"));
}

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
