(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{191:function(t,e,r){"use strict";function i(t){return(i=Object.getPrototypeOf||function(t){return t.__proto__})(t)}r.d(e,"a",function(){return i})},192:function(t,e,r){"use strict";r(207);var i=r(7),n=r(81),a=r(8),o=/./.toString,s=function(t){r(11)(RegExp.prototype,"toString",t,!0)};r(6)(function(){return"/a/b"!=o.call({source:"a",flags:"b"})})?s(function(){var t=i(this);return"/".concat(t.source,"/","flags"in t?t.flags:!a&&t instanceof RegExp?n.call(t):void 0)}):"toString"!=o.name&&s(function(){return o.call(this)})},193:function(t,e,r){var i=Date.prototype,n=i.toString,a=i.getTime;new Date(NaN)+""!="Invalid Date"&&r(11)(i,"toString",function(){var t=a.call(this);return t==t?n.call(this):"Invalid Date"})},194:function(t,e,r){r(198)("asyncIterator")},195:function(t,e,r){"use strict";var i=r(4),n=r(15),a=r(8),o=r(3),s=r(11),l=r(59).KEY,u=r(6),c=r(57),h=r(34),f=r(33),g=r(2),p=r(199),d=r(198),w=r(208),v=r(83),m=r(7),y=r(5),S=r(21),b=r(28),T=r(78),x=r(56),C=r(80),R=r(209),G=r(103),H=r(102),O=r(9),_=r(27),E=G.f,I=O.f,N=R.f,P=i.Symbol,A=i.JSON,j=A&&A.stringify,D=g("_hidden"),F=g("toPrimitive"),k={}.propertyIsEnumerable,M=c("symbol-registry"),B=c("symbols"),L=c("op-symbols"),X=Object.prototype,W="function"==typeof P&&!!H.f,Y=i.QObject,z=!Y||!Y.prototype||!Y.prototype.findChild,J=a&&u(function(){return 7!=C(I({},"a",{get:function(){return I(this,"a",{value:7}).a}})).a})?function(t,e,r){var i=E(X,e);i&&delete X[e],I(t,e,r),i&&t!==X&&I(X,e,i)}:I,U=function(t){var e=B[t]=C(P.prototype);return e._k=t,e},V=W&&"symbol"==typeof P.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof P},Z=function(t,e,r){return t===X&&Z(L,e,r),m(t),e=T(e,!0),m(r),n(B,e)?(r.enumerable?(n(t,D)&&t[D][e]&&(t[D][e]=!1),r=C(r,{enumerable:x(0,!1)})):(n(t,D)||I(t,D,x(1,{})),t[D][e]=!0),J(t,e,r)):I(t,e,r)},K=function(t,e){m(t);for(var r,i=w(e=b(e)),n=0,a=i.length;a>n;)Z(t,r=i[n++],e[r]);return t},Q=function(t){var e=k.call(this,t=T(t,!0));return!(this===X&&n(B,t)&&!n(L,t))&&(!(e||!n(this,t)||!n(B,t)||n(this,D)&&this[D][t])||e)},$=function(t,e){if(t=b(t),e=T(e,!0),t!==X||!n(B,e)||n(L,e)){var r=E(t,e);return!r||!n(B,e)||n(t,D)&&t[D][e]||(r.enumerable=!0),r}},q=function(t){for(var e,r=N(b(t)),i=[],a=0;r.length>a;)n(B,e=r[a++])||e==D||e==l||i.push(e);return i},tt=function(t){for(var e,r=t===X,i=N(r?L:b(t)),a=[],o=0;i.length>o;)!n(B,e=i[o++])||r&&!n(X,e)||a.push(B[e]);return a};W||(s((P=function(){if(this instanceof P)throw TypeError("Symbol is not a constructor!");var t=f(arguments.length>0?arguments[0]:void 0),e=function(r){this===X&&e.call(L,r),n(this,D)&&n(this[D],t)&&(this[D][t]=!1),J(this,t,x(1,r))};return a&&z&&J(X,t,{configurable:!0,set:e}),U(t)}).prototype,"toString",function(){return this._k}),G.f=$,O.f=Z,r(101).f=R.f=q,r(79).f=Q,H.f=tt,a&&!r(55)&&s(X,"propertyIsEnumerable",Q,!0),p.f=function(t){return U(g(t))}),o(o.G+o.W+o.F*!W,{Symbol:P});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),rt=0;et.length>rt;)g(et[rt++]);for(var it=_(g.store),nt=0;it.length>nt;)d(it[nt++]);o(o.S+o.F*!W,"Symbol",{for:function(t){return n(M,t+="")?M[t]:M[t]=P(t)},keyFor:function(t){if(!V(t))throw TypeError(t+" is not a symbol!");for(var e in M)if(M[e]===t)return e},useSetter:function(){z=!0},useSimple:function(){z=!1}}),o(o.S+o.F*!W,"Object",{create:function(t,e){return void 0===e?C(t):K(C(t),e)},defineProperty:Z,defineProperties:K,getOwnPropertyDescriptor:$,getOwnPropertyNames:q,getOwnPropertySymbols:tt});var at=u(function(){H.f(1)});o(o.S+o.F*at,"Object",{getOwnPropertySymbols:function(t){return H.f(S(t))}}),A&&o(o.S+o.F*(!W||u(function(){var t=P();return"[null]"!=j([t])||"{}"!=j({a:t})||"{}"!=j(Object(t))})),"JSON",{stringify:function(t){for(var e,r,i=[t],n=1;arguments.length>n;)i.push(arguments[n++]);if(r=e=i[1],(y(e)||void 0!==t)&&!V(t))return v(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!V(e))return e}),i[1]=e,j.apply(A,i)}}),P.prototype[F]||r(13)(P.prototype,F,P.prototype.valueOf),h(P,"Symbol"),h(Math,"Math",!0),h(i.JSON,"JSON",!0)},196:function(t,e,r){"use strict";var i=r(86);function n(t,e){return!e||"object"!==Object(i.a)(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}r.d(e,"a",function(){return n})},197:function(t,e,r){"use strict";function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");i(t.prototype,e&&e.prototype),e&&i(t,e)}r.d(e,"a",function(){return n})},198:function(t,e,r){var i=r(4),n=r(18),a=r(55),o=r(199),s=r(9).f;t.exports=function(t){var e=n.Symbol||(n.Symbol=a?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:o.f(t)})}},199:function(t,e,r){e.f=r(2)},202:function(t,e,r){"use strict";var i=r(3),n=r(31)(5),a=!0;"find"in[]&&Array(1).find(function(){a=!1}),i(i.P+i.F*a,"Array",{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),r(104)("find")},205:function(t,e,r){"use strict";var i=r(191);function n(t,e,r){return(n="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=Object(i.a)(t)););return t}(t,e);if(n){var a=Object.getOwnPropertyDescriptor(n,e);return a.get?a.get.call(r):a.value}})(t,e,r||t)}r.d(e,"a",function(){return n})},206:function(t,e,r){var i=r(32),n=r(21),a=r(58),o=r(16);t.exports=function(t,e,r,s,l){i(e);var u=n(t),c=a(u),h=o(u.length),f=l?h-1:0,g=l?-1:1;if(r<2)for(;;){if(f in c){s=c[f],f+=g;break}if(f+=g,l?f<0:h<=f)throw TypeError("Reduce of empty array with no initial value")}for(;l?f>=0:h>f;f+=g)f in c&&(s=e(s,c[f],f,u));return s}},207:function(t,e,r){r(8)&&"g"!=/./g.flags&&r(9).f(RegExp.prototype,"flags",{configurable:!0,get:r(81)})},208:function(t,e,r){var i=r(27),n=r(102),a=r(79);t.exports=function(t){var e=i(t),r=n.f;if(r)for(var o,s=r(t),l=a.f,u=0;s.length>u;)l.call(t,o=s[u++])&&e.push(o);return e}},209:function(t,e,r){var i=r(28),n=r(101).f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return o&&"[object Window]"==a.call(t)?function(t){try{return n(t)}catch(t){return o.slice()}}(t):n(i(t))}},210:function(t,e,r){"use strict";var i=r(4),n=r(15),a=r(17),o=r(84),s=r(78),l=r(6),u=r(101).f,c=r(103).f,h=r(9).f,f=r(108).trim,g=i.Number,p=g,d=g.prototype,w="Number"==a(r(80)(d)),v="trim"in String.prototype,m=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){var r,i,n,a=(e=v?e.trim():f(e,3)).charCodeAt(0);if(43===a||45===a){if(88===(r=e.charCodeAt(2))||120===r)return NaN}else if(48===a){switch(e.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+e}for(var o,l=e.slice(2),u=0,c=l.length;u<c;u++)if((o=l.charCodeAt(u))<48||o>n)return NaN;return parseInt(l,i)}}return+e};if(!g(" 0o1")||!g("0b1")||g("+0x1")){g=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof g&&(w?l(function(){d.valueOf.call(r)}):"Number"!=a(r))?o(new p(m(e)),r,g):m(e)};for(var y,S=r(8)?u(p):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),b=0;S.length>b;b++)n(p,y=S[b])&&!n(g,y)&&h(g,y,c(p,y));g.prototype=d,d.constructor=g,r(11)(i,"Number",g)}},211:function(t,e,r){"use strict";var i=r(9),n=r(56);t.exports=function(t,e,r){e in t?i.f(t,e,n(0,r)):t[e]=r}},212:function(t,e,r){},213:function(t,e,r){"use strict";function i(t){return{name:"v-"+t,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,r){var i=r.props,n=r.data,a=r.children;n.staticClass=(t+" "+(n.staticClass||"")).trim();var o=n.attrs;if(o){n.attrs={};var s=Object.keys(o).filter(function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"==typeof e});s.length&&(n.staticClass+=" "+s.join(" "))}return i.id&&(n.domProps=n.domProps||{},n.domProps.id=i.id),e(i.tag,n,a)}}}r.d(e,"a",function(){return i})},215:function(t,e,r){"use strict";var i=r(3),n=r(206);i(i.P+i.F*!r(23)([].reduce,!0),"Array",{reduce:function(t){return n(this,t,arguments.length,arguments[1],!1)}})},216:function(t,e,r){"use strict";var i=r(12),n=r(3),a=r(21),o=r(105),s=r(106),l=r(16),u=r(211),c=r(107);n(n.S+n.F*!r(82)(function(t){Array.from(t)}),"Array",{from:function(t){var e,r,n,h,f=a(t),g="function"==typeof this?this:Array,p=arguments.length,d=p>1?arguments[1]:void 0,w=void 0!==d,v=0,m=c(f);if(w&&(d=i(d,p>2?arguments[2]:void 0,2)),null==m||g==Array&&s(m))for(r=new g(e=l(f.length));e>v;v++)u(r,v,w?d(f[v],v):f[v]);else for(h=m.call(f),r=new g;!(n=h.next()).done;v++)u(r,v,w?o(h,d,[n.value,v],!0):n.value);return r.length=v,r}})},217:function(t,e,r){"use strict";var i=r(109),n=r(85);t.exports=r(110)("Map",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var e=i.getEntry(n(this,"Map"),t);return e&&e.v},set:function(t,e){return i.def(n(this,"Map"),0===t?0:t,e)}},i,!0)},223:function(t,e,r){"use strict";e.a={group:"Grids",features:[{title:[["Hexagonal","grid"],["Hexagonal","shape"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!1,e.Hexagonal,3),showCircles:!0,showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Hexagonal","shape"],["Point","top"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!0,e.Hexagonal,3),showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Triangular","shape"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!1,e.Triangular,4),showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Triangular","shape"],["Point","top"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!0,e.Triangular,4),showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Even","shape"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!1,e.Even,4,4),showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Even","shape"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!0,e.Even,4,4),showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Odd","shape"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!1,e.Odd,4,4),showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Odd","shape"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!0,e.Odd,4,4),showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Rhombus","shape"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(60,!1,e.Rhombus,4,4),showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Rhombus","shape"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.rotate,n=t.normalize,a=new r(60,!0,e.Rhombus,4,4);return i(a),n(a),{grid:a,showAxes:!0,interactive:!0}}},{title:[["Hexagonal","grid"],["Rhombus","shape"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.rotate,n=t.normalize,a=new r(60,!0,e.Rhombus,4,4);return i(a),a.toPoint=r.CUBE_TO_TWO_AXIS_XY,a.toTile=r.TWO_AXIS_TO_CUBE_XY,n(a),{grid:a,showAxes:!0,interactive:!0}}},{title:[["Hexagonal","grid"],["Rhombus","shape"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.rotate,n=t.normalize,a=new r(60,!1,e.Rhombus,4,4);return i(a,-1),a.toPoint=r.CUBE_TO_TWO_AXIS_YZ,a.toTile=r.TWO_AXIS_TO_CUBE_YZ,n(a),{grid:a,showAxes:!0,interactive:!0}}},{title:[["Hexagonal","grid"],["Rhombus","shape"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.rotate,n=t.normalize,a=new r(60,!1,e.Rhombus,4,4);return i(a,-1),n(a),{grid:a,showCoordinates:!0,showTiles:!0}}},{title:[["Hexagonal","grid"],["Rhombus","shape"],["Point","top"]],script:function(t){var e=t.Shape;return{grid:new(0,t.HexagonalGrid)(70,!0,e.Rhombus,3,3),showCoordinates:!0,showTiles:!0}}},{title:[["Brick","grid"],["Hexagonal","shape"]],script:function(t){var e=t.Shape;return{grid:new(0,t.BrickGrid)(50,!1,e.Hexagonal,4),showCoordinates:!0,showTiles:!0}}},{title:[["Rectangular","grid"]],script:function(t){var e=t.Shape;return{grid:new(0,t.RectangularGrid)(60,!1,e.Rhombus,4,4),showCircles:!0,showTiles:!0}}},{title:[["Rectangular","grid"],["Point","top"]],script:function(t){var e=t.Shape;return{grid:new(0,t.RectangularGrid)(60,!0,e.Rhombus,4,3),showTiles:!0}}},{title:[["Triangular","grid"]],script:function(t){var e=t.Shape;return{grid:new(0,t.TriangularGrid)(60,!1,e.Triangular,5),showTiles:!0,showCenters:!0,showCoordinates:!0}}},{title:[["Triangular","grid"]],script:function(t){var e=t.Shape,r=t.TriangularGrid,i=t.axes,n=new r(30,!1,e.Hexagonal,5);return{grid:n,showTiles:!0,showCenters:!0,highlight:i(n.tiles,1)}}},{title:[["Triangular","grid",["Rhombus","shape"]]],script:function(t){var e=t.Shape;return{grid:new(0,t.TriangularGrid)(60,!1,e.Rhombus,3,5),showTiles:!0,showCircle:!0,showCoordinates:!0}}},{title:[["Radial","grid"]],script:function(t){var e=t.Shape;return{grid:new(0,t.RadialGrid)(40,!1,e.Even,12,4),showTiles:!0,showCircle:!0}}}]}},224:function(t,e,r){"use strict";e.a={group:"Paths",features:[{title:[["Circle","path"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.circle,n=t.HexagonalTile,a=new r(70,!0,e.Rhombus,4,4),o=i(new n(1,-2,1),2);return{grid:a,showTiles:!0,showCoordinates:!0,highlight:o,path:o}}},{title:[["Spiral","path"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.spiral,n=t.HexagonalTile,a=new r(70,!0,e.Rhombus,4,4),o=i(new n(1,-2,1),2);return{grid:a,showTiles:!0,showCoordinates:!0,highlight:o,path:o}}},{title:[["Spiral","path"]],script:function(t){var e=t.Shape,r=t.BrickGrid,i=t.spiral,n=t.HexagonalTile,a=new r(40,!0,e.Triangular,9),o=i(new n(1,-2,1),2);return{grid:a,showTiles:!0,highlight:o,path:o}}},{title:[["Spiral","path"]],script:function(t){var e=t.Shape,r=t.RectangularGrid,i=t.spiral,n=t.RectangularTile,a=new r(40,!1,e.Rhombus,7,7),o=i(new n(3,3),2);return{grid:a,showTiles:!0,highlight:o,path:o,showCoordinates:!0}}},{title:[["Cropped spiral","path"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.spiral,n=t.HexagonalTile,a=t.intersect,o=new r(70,!0,e.Rhombus,4,4),s=a(i(new n(1,-2,1),2),o.tiles);return{grid:o,showTiles:!0,highlight:s,path:s,showCoordinates:!0}}},{title:[["Line","path"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.Integer3,n=t.Float3,a=new r(70,!0,e.Rhombus,4,4),o=n.LINE(new i,new i(3,-6,3));return{grid:a,showTiles:!0,highlight:o,path:o,showCoordinates:!0}}},{title:[["Line","path"]],script:function(t){var e=t.Shape,r=t.RectangularGrid,i=t.Position,n=t.Float2,a=new r(35,!1,e.Rhombus,6,6),o=n.LINE(new i,new i(5,5));return{grid:a,showTiles:!0,highlight:o,path:o,showCoordinates:!0}}}]}},225:function(t,e,r){"use strict";r(60),r(29),r(14),r(30),r(202),r(26);e.a={group:"Search",features:[{title:[["Search","path"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.HexagonalTile,n=t.Search,a=new r(70,!0,e.Rhombus,4,4),o=new n(new i,1/0,8,void 0,a.tiles).path(a.tile(3,3));return{grid:a,showTiles:!0,path:o,showCoordinates:!0}}},{title:[["Obstacles","path"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.HexagonalTile,n=t.Search,a=new r(70,!0,e.Rhombus,4,4),o=[a.tile(1,0),a.tile(2,1),a.tile(1,3),a.tile(2,2)],s=new n(new i,1/0,8,o,a.tiles).path(a.tile(3,3));return{grid:a,showTiles:!0,path:s,showCoordinates:!0,highlight:o}}},{title:[["Obstacles","path"]],script:function(t){var e=t.Shape,r=t.RectangularGrid,i=t.RectangularTile,n=t.Search,a=new r(40,!0,e.Rhombus,5,5),o=[a.tile(1,0),a.tile(2,1),a.tile(1,3),a.tile(2,2)],s=new n(new i,1/0,8,o,a.tiles).path(a.tile(4,0));return{grid:a,showTiles:!0,path:s,showCoordinates:!0,highlight:o}}},{title:[["Maze","demo"]],class:"wide",width:944,script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.HexagonalTile,n=t.Search,a=t.circle,o=new r(32,!0,e.Hexagonal,14),s=new i,l=[],u=[].concat(((l=a(s,1)).splice(5,1),l)).concat(((l=a(s,3)).splice(2,1),l)).concat(((l=a(s,5)).splice(18,1),l)).concat(((l=a(s,7)).splice(33,1),l)).concat(((l=a(s,9)).splice(7,1),l)).concat(((l=a(s,11)).splice(22,1),l)),c=new n(s,1/0,100,u,o.tiles).path(o.tile(-12,0));return{grid:o,highlight:u,showTiles:!0,path:c,width:912}}},{title:[["Search maze","demo"]],script:function(t){for(var e=t.Shape,r=t.RectangularGrid,i=t.RectangularTile,n=t.Search,a=new r(14,!1,e.Rhombus,24,24),o=[],s=0;s<288;s++)o.push(new i(Math.floor(24*Math.random()+1),Math.floor(23*Math.random())));var l=new n(new i,1/0,100,o,a.tiles),u=Math.max.apply(null,a.tiles.map(function(t){return l.cost[t.key]||-1})),c=a.tiles.find(function(t){return l.cost[t.key]===u}),h=l.path(c);return{grid:a,highlight:o,showTiles:!0,search:l,path:h,highlightDark:!0}}},{title:[["Connect path","demo"]],script:function(t){var e=t.Shape,r=t.RectangularGrid,i=t.RectangularTile,n=t.Search,a=t.Position,o=new r(28,!1,e.Rhombus,7,7),s=[];s.push(new a(0,0)),s.push(new a(6,6)),o.tiles.forEach(function(t,e){t.x&t.y%3||s.push(t)});var l=new n(new i,1/0,100,void 0,s),u=l.path(o.tile(6,6));return{grid:o,highlight:s,showTiles:!0,search:l,path:u}}},{title:[["Connect edges","demo"]],script:function(t){for(var e=t.Shape,r=t.HexagonalGrid,i=t.Search,n=new r(24,!0,e.Rhombus,11,11),a=[],o=[],s=0;s<11;s++)a.push(n.tile(0,s)),o.push(n.tile(10,s));var l=n.tiles.filter(function(t,e){return!((t.x-t.y)%3&&(e+t.x)%7)}),u=new i(a,1/0,100,l,n.tiles),c=u.path(o);return{grid:n,highlight:l,highlightDark:!0,showTiles:!0,search:u,values:u.cost,path:c}}},{title:[["Connections","demo"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.connections,n=new r(24,!0,e.Rhombus,11,11),a=n.tiles.filter(function(t,e){return(t.x-t.y)%3||!((e+t.x)%8)});return{grid:n,lines:i(a).filter(function(t){return 5===t.length}),highlight:a,showTiles:!0}}},{title:[["Connections","demo"]],script:function(t){var e=t.Shape,r=t.RectangularGrid,i=t.Rectangular8Tile,n=t.connections,a=new r(24,!1,e.Rhombus,11,11,i),o=a.tiles.filter(function(t,e){return(t.x-t.y)%3||!((e+t.x)%8)});return{grid:a,lines:n(o).filter(function(t){return 5===t.length}),highlight:o,showTiles:!0}}},{title:[["Connections","demo"]],script:function(t){var e=t.Shape,r=t.TriangularGrid,i=t.connections,n=new r(24,!1,e.Triangular,11,11),a=n.tiles.filter(function(t,e){return-1===[13,50,98].indexOf(e)});return{grid:n,lines:i(a).filter(function(t){return t.length<=7&&t.length>=3}),highlight:a,showTiles:!0}}},{title:[["Border","demo"]],script:function(t){var e=t.Shape,r=t.TriangularGrid,i=t.border,n=new r(24,!1,e.Triangular,11,11);return{grid:n,highlight:i(n.tiles),showTiles:!0}}},{title:[["Outline","demo"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid,i=t.outline,n=new r(48,!1,e.Hexagonal,3,3),a=i(n.tiles);return n.tiles=n.tiles.concat(a),{grid:n,highlight:a,showTiles:!0}}},{title:[["Outline","demo"]],script:function(t){var e=t.Shape,r=t.TriangularGrid,i=t.outline,n=new r(48,!1,e.Triangular,3,3),a=i(n.tiles);return n.tiles=n.tiles.concat(a),{grid:n,highlight:a,showTiles:!0}}}]}},226:function(t,e,r){"use strict";e.a={group:"Selection",features:[{title:[["Array","selection"]],script:function(t){var e=t.Shape,r=new(0,t.HexagonalGrid)(70,!0,e.Rhombus,4,4),i=[r.tile(0,0),r.tile(3,0),r.tile(3,1),r.tile(3,2),r.tile(3,3),r.tile(1,3),r.tile(1,2),r.tile(1,1)];return{grid:r,showTiles:!0,showCoordinates:!0,highlight:i}}},{title:[["Array","selection"]],script:function(t){var e=t.Shape,r=new(0,t.RectangularGrid)(60,!1,e.Rhombus,4,4),i=[r.tile(0,0),r.tile(3,0),r.tile(3,1),r.tile(1,1)];return{grid:r,showTiles:!0,showCoordinates:!0,highlight:i}}},{title:[["Region","selection"]],script:function(t){var e=t.Shape,r=t.HexagonalGrid;return{grid:new r(70,!0,e.Rhombus,4,4),showTiles:!0,showCoordinates:!0,highlight:r.REGION(0,2,-5,0,0,3)}}}]}},227:function(t,e,r){"use strict";e.a={group:"Interactive",features:[]}},229:function(t,e,r){"use strict";function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],i=!0,n=!1,a=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done)&&(r.push(o.value),!e||r.length!==e);i=!0);}catch(t){n=!0,a=t}finally{try{i||null==s.return||s.return()}finally{if(n)throw a}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.d(e,"a",function(){return i})},249:function(t,e,r){"use strict";r(212);var i=r(213);e.a=Object(i.a)("flex")},252:function(t,e,r){"use strict";r(212);var i=r(213);e.a=Object(i.a)("layout")},267:function(t,e,r){"use strict";r.r(e);var i=r(214),n=r(252),a=r(249),o=r(223),s=r(224),l=r(225),u=r(226),c=r(227),h={components:{VLayout:n.a,VFlex:a.a},data:function(){return{Gridy:i,grids:o.a,selection:u.a,paths:s.a,search:l.a,interactive:c.a}}},f=r(1),g=Object(f.a)(h,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[r("Sandbox"),t._v(" "),r("v-layout",{staticClass:"mt-3"},[r("v-flex",[r("a",{attrs:{href:"./grids/"}},[r("div",{staticClass:"title my-3"},[t._v("Grids")]),r("Diagram",t._b({staticClass:"diagram",attrs:{width:240,height:240}},"Diagram",t.grids.features[0].script(t.Gridy),!1))],1)]),t._v(" "),r("v-flex",[r("a",{attrs:{href:"./selections/"}},[r("div",{staticClass:"title my-3"},[t._v("Selection")]),r("Diagram",t._b({staticClass:"diagram",attrs:{width:240,height:240}},"Diagram",t.selection.features[0].script(t.Gridy),!1))],1)]),t._v(" "),r("v-flex",[r("a",{attrs:{href:"./paths/"}},[r("div",{staticClass:"title my-3"},[t._v("Paths")]),r("Diagram",t._b({staticClass:"diagram",attrs:{width:240,height:240}},"Diagram",t.paths.features[0].script(t.Gridy),!1))],1)]),t._v(" "),r("v-flex",[r("a",{attrs:{href:"./search/"}},[r("div",{staticClass:"title my-3"},[t._v("Search")]),r("Diagram",t._b({staticClass:"diagram",attrs:{width:240,height:240}},"Diagram",t.search.features[0].script(t.Gridy),!1))],1)]),t._v(" "),r("v-flex",[r("a",{attrs:{href:"./interactive/"}},[r("div",{staticClass:"title my-3"},[t._v("Interactive")]),r("Diagram",t._b({staticClass:"diagram",attrs:{width:240,height:240}},"Diagram",t.search.features[0].script(t.Gridy),!1))],1)])],1)],1)},[],!1,null,null,null);e.default=g.exports}}]);