// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}


/////////////////////////////////////
//
// fn.ImageSwap
// -----------------------------
// Use HTML5 srcset attributes to show and hide images based on 
// your browser viewport plus device pixel density. 
// 
// image-swap.js uses the HTML5 srcset attribute, plus javascript 
// breakpoints to load and swap image sources. When using CSS 
// 'display:none;' to hide an image on a page, an http request is
// still sent to the browser menaing the image is still loaded and
// hurting performance. 
// -----------------------------
//
// Copyright 2012 Kaleb White
// http://cujo.jp/
//
// Licensed under the MIT license:
// http://www.opensource.org/licenses/mit-license.php
//
/////////////////////////////////////
!(function(f,h,i,d){var a,c=f(h),e,g,b;e={imageContainer:".swap-img",createNewImage:true,removeImage:true,loadBestAvailable:true,monitorPixelDensity:false,interval:250,breakpoints:[480,768,1024]};a=function(k,j){var j;this.options=j?f.extend({},e,j):e;j=this.options;this.$swapImage=f("img"+j.imageContainer);this.$windowInterval=j.interval;this.$createEmptyImage=j.createNewImage;this.$removeImage=j.removeImage;this.$bestAvailable=j.loadBestAvailable;this.$breakpoints=j.breakpoints;this.$urlRegex="[-a-zA-Z0-9@:%_+.~#?&//=]*";this.$imageFragmentRegex="\\s*("+this.$urlRegex+")\\s*([0-9xwh.\\s]*)";this.INT_REGEXP=/^[0-9]+$/;this.$srcsetRegex="("+this.$imageFragmentRegex+",?)+";this.IMAGE_FRAGMENT_REGEXP=new RegExp(this.$imageFragmentRegex);this.setImage=false;this.currBreakpoint=0;this.triggerDensityChange=j.monitorPixelDensity;this.init()};a.prototype={swapImage:function(k,p,m,o){var l=k,n=p,j=m.w;this.currBreakpoint=o;if(f(l).is(":hidden")&&this.$createEmptyImage){f(l).show()}f(l).addClass(o).attr("src",n);this.setImage=false},imageDescriptions:function(l){var q=l.split(/\s/),j={};for(var k=0;k<q.length;k++){var m=q[k];if(m.length>0){var r=m.charAt(m.length-1),p=m.substring(0,m.length-1),n=parseInt(p,10),o=parseFloat(p);if(p.match(this.INT_REGEXP)&&r==="w"){j[r]=n}else{if(p.match(this.INT_REGEXP)&&r=="h"){j[r]=n}else{if(!isNaN(o)&&r=="x"){j[r]=o}else{this.error='Invalid srcset descriptor found in "'+m+'".';this.isValid=false}}}}}return j},getImageData:function(k,s){var u=null,x=this,m=[],w=s,o=f(w).attr("srcset").split(","),y=function(j){this.src=j.src;this.w=j.w||Infinity;this.h=j.h||Infinity;this.x=j.x||1};this.currBreakpoint=k;for(var r=0;r<o.length;r++){var v=h.devicePixelRatio,t=o[r].match(x.IMAGE_FRAGMENT_REGEXP),l=t[1],n=x.imageDescriptions(t[2]),q=new y({src:l,x:n.x,w:n.w});if(this.currBreakpoint<=q.w){if(n.w===this.currBreakpoint){m.push(q)}}}if(m.length===0){f(w).attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==").hide();return}for(var p=0;p<m.length;p++){if(v>=1.5&&this.currBreakpoint<=m[p].w&&m[p].x>=v){x.swapImage(w,m[p].src,n,this.currBreakpoint);return}if(v<=1.5&&this.currBreakpoint<=m[p].w&&m[p].x<=v){x.swapImage(w,m[p].src,n,this.currBreakpoint);return}if(m.length===1){if(this.$bestAvailable){x.swapImage(w,m[p].src,n,this.currBreakpoint);return}if(this.$removeImage){f(w).attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==").hide()}}}},checkPixelDensity:function(){var j=this,k=h.matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)").matches;k?j.currentMediaQuery="highDensity":j.currentMediaQuery="lowDensity";if(j.currentMediaQuery!=j.lastMediaQuery){j.lastMediaQuery=this.currentMediaQuery;j.setupBreakpoints()}},initializePixelDensityCheck:function(){setInterval(f.proxy(this.checkPixelDensity,this),this.$windowInterval)},setupBreakpoints:function(){var k=c.width(),m=c.devicePixelRatio,l=this,j=false,p=this.$swapImage;for(var o in this.$breakpoints.sort(function(q,r){return(r-q)})){if(!j&&k<=this.$breakpoints[this.$breakpoints.length-1]){for(var n in this.$breakpoints.sort(function(q,r){return(r-q)})){var o=this.$breakpoints[this.$breakpoints.length-1];if(p[n]){l.getImageData(o,p[n])}}j=true}if(!j&&k>=this.$breakpoints[o]){for(var n in this.$breakpoints.sort(function(q,r){return(r-q)})){if(this.$breakpoints[o]&&p[n]){l.getImageData(this.$breakpoints[o],p[n])}}j=true}}},throttle:function(l,m){var n,k,j;return function(){k=arguments;j=true;if(!n){(function(){if(j){l.apply(k);j=false;n=setTimeout(arguments.callee,m)}else{n=null}})()}}},init:function(){var k=this;f(l);function l(){k.$swapImage.attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==").hide();j();k.setupBreakpoints()}function j(){if(k.triggerDensityChange){k.initializePixelDensityCheck()}c.bind("resize",k.throttle(f.proxy(k.setupBreakpoints,k),k.$windowInterval))}}};f.fn.imageSwap=function(j){new a(this,j)}})(jQuery,window,document);

