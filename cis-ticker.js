if(typeof window.Marquee3k === "undefined") {
  !function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.Marquee3k=e()}(this,function(){"use strict";let t=0;class e{constructor(t,e){this.element=t,this.selector=e.selector,this.speed=t.dataset.speed||.25,this.pausable=t.dataset.pausable,this.reverse=t.dataset.reverse,this.paused=!1,this.parent=t.parentElement,this.parentProps=this.parent.getBoundingClientRect(),this.content=t.children[0],this.innerContent=this.content.innerHTML,this.wrapStyles="",this.offset=0,this._setupWrapper(),this._setupContent(),this._setupEvents(),this.wrapper.appendChild(this.content),this.element.appendChild(this.wrapper)}_setupWrapper(){this.wrapper=document.createElement("div"),this.wrapper.classList.add("cismarquee__wrapper"),this.wrapper.style.whiteSpace="nowrap"}_setupContent(){this.content.classList.add(`${this.selector}__copy`),this.content.style.display="inline-block",this.contentWidth=this.content.offsetWidth,this.requiredReps=this.contentWidth>this.parentProps.width?2:Math.ceil((this.parentProps.width-this.contentWidth)/this.contentWidth)+1;for(let t=0;t<this.requiredReps;t++)this._createClone();this.reverse&&(this.offset=-1*this.contentWidth),this.element.classList.add("is-init")}_setupEvents(){this.element.addEventListener("mouseenter",()=>{this.pausable&&(this.paused=!0)}),this.element.addEventListener("mouseleave",()=>{this.pausable&&(this.paused=!1)})}_createClone(){const t=this.content.cloneNode(!0);t.style.display="inline-block",t.classList.add(`${this.selector}__copy`),this.wrapper.appendChild(t)}animate(){if(!this.paused){const t=this.reverse?this.offset<0:this.offset>-1*this.contentWidth,e=this.reverse?-1:1,s=this.reverse?-1*this.contentWidth:0;t?this.offset-=this.speed*e:this.offset=s,this.wrapper.style.whiteSpace="nowrap",this.wrapper.style.transform=`translate(${this.offset}px, 0) translateZ(0)`}}_refresh(){this.contentWidth=this.content.offsetWidth}repopulate(t,e){if(this.contentWidth=this.content.offsetWidth,e){const e=Math.ceil(t/this.contentWidth)+1;for(let t=0;t<e;t++)this._createClone()}}static refresh(t){MARQUEES[t]._refresh()}static pause(t){MARQUEES[t].paused=!0}static play(t){MARQUEES[t].paused=!1}static toggle(t){MARQUEES[t].paused=!MARQUEES[t].paused}static refreshAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t]._refresh()}static pauseAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!0}static playAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!1}static toggleAll(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].paused=!MARQUEES[t].paused}static init(s={selector:"cismarquee"}){t&&window.cancelAnimationFrame(t),window.MARQUEES=[];const i=Array.from(document.querySelectorAll(`.${s.selector}`));let n,r=window.innerWidth;for(let t=0;t<i.length;t++){const n=i[t],r=new e(n,s);MARQUEES.push(r)}!function e(){for(let t=0;t<MARQUEES.length;t++)MARQUEES[t].animate();t=window.requestAnimationFrame(e)}(),window.addEventListener("resize",()=>{clearTimeout(n),n=setTimeout(()=>{const t=r<window.innerWidth,e=window.innerWidth-r;for(let s=0;s<MARQUEES.length;s++)MARQUEES[s].repopulate(e,t);r=this.innerWidth},250)})}}return e});
}

if (typeof window.yall === "undefined") {
  ("use strict");
  function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(t, e) {
    for (var r = 0; r < e.length; r++) {
      var o = e[r];
      (o.enumerable = o.enumerable || !1), (o.configurable = !0), "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
    }
  }
  function _createClass(t, e, r) {
    return e && _defineProperties(t.prototype, e), r && _defineProperties(t, r), t;
  }
  var yall = (function () {
    function t() {
      var e = this,
        r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      _classCallCheck(this, t),
        (this.target = r.target || "yall_lazy"),
        (this.classToLoad = r.classToLoad || "yall_loaded"),
        (this.threshold = r.threshold || 0),
        (this.root = document.querySelector(r.root)),
        (this.rootMargin = r.rootMargin || "0px 0px 100px 0px"),
        (this.callback = r.callback || null),
        (this.useLoading = r.useLoading || !1),
        (this.options = { threshold: this.threshold, root: this.root, rootMargin: this.rootMargin }),
        ("IntersectionObserver" in window &&
          "IntersectionObserverEntry" in window &&
          "intersectionRatio" in window.IntersectionObserverEntry.prototype &&
          "isIntersecting" in window.IntersectionObserverEntry.prototype &&
          ("loading" in HTMLImageElement.prototype || !this.useLoading)) ||
          ((this.fsafari = !0),
          Array.from(document.querySelectorAll("." + this.target + ":not(." + this.classToLoad + ")")).forEach(function (t) {
            e.loadElem(t);
          }));
    }
    return (
      _createClass(t, [
        {
          key: "loadElem",
          value: function (t) {
            var e = t.dataset.src,
              r = t.dataset.srcset;
            e && (t.src = e), r && (t.srcset = r), t.classList.add(this.classToLoad), this.callback && window[this.callback](t);
          },
        },
        {
          key: "run",
          value: function () {
            var t = this;
            if (!this.safari) {
              var e = new IntersectionObserver(function (e, r) {
                e.forEach(function (e) {
                  e.isIntersecting && (t.loadElem(e.target), r.unobserve(e.target));
                });
              }, this.options);
              Array.from(document.querySelectorAll("." + this.target + ":not(." + this.classToLoad + ")")).forEach(function (t) {
                e.observe(t);
              });
            }
          },
        },
      ]),
      t
    );
  })();
}

var lazyload = new yall({
    target: "cis-lazy"
  });

if (document.readyState === "loading") {
  console.log("loading readystate");
    // The document is still loading, you can attach your event listener
    document.addEventListener("DOMContentLoaded", (e) => {
      runMarquee();
    });
} else {
  console.log("ready state" + document.readyState);
    // The `DOMContentLoaded` event has already fired, run your code directly
    runMarquee();
}

function runMarquee() {
  lazyload.run();

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
}
