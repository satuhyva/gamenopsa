(this.webpackJsonpgamenopsa=this.webpackJsonpgamenopsa||[]).push([[0],{100:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(23),o=a.n(c),i=a(17),s=a(26),l={isOn:!1},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_GAME_SETTINGS":return t.data;default:return e}},d=Object(s.b)({game:u}),f=a(2),m=a(40),g=a(5),p=a(6),b=a(76),h=a(103),y=a(41),v=a(102),C=function(e){var t=e.card,a="black",n="";switch(t.suit){case 2:n="\u2665",a="red";break;case 3:n="\u2663";break;case 4:n="\u2666",a="red";break;default:n="\u2660"}var c=1===t.value?"A":t.value;return r.a.createElement(g.a,{style:{justifyContent:"center",alignItems:"center"}},r.a.createElement(b.a,{style:{color:a,fontSize:30}},n),r.a.createElement(b.a,{style:{color:a,fontSize:30}},c))},E=function(e){var t=e.scaleUnit,a={justifyContent:"center",alignItems:"center",backgroundColor:"#B9CC3F",width:t,height:1.7*t,borderRadius:6};return r.a.createElement(g.a,{style:a},function(){for(var e=[],a=0;a<9;a++)e.push(r.a.createElement(b.a,{key:a,style:{color:"green",fontSize:t/7}},"\xa9\xa9\xa9\xa9\xa9\xa9\xa9"));return e}())},O=r.a.forwardRef((function(e,t){var a,c={width:a=e.size,height:1.7*a,borderRadius:7,backgroundColor:"papayawhip"},o=new v.a.Value(0),i={transform:[{rotateX:o.interpolate({inputRange:[0,180],outputRange:["180deg","360deg"]})}]},s=new v.a.Value(90),l={transform:[{rotateX:s.interpolate({inputRange:[0,180],outputRange:["180deg","360deg"]})}]},u=function(){var t=e.index>14?"null":"draggable";!function(e,t){v.a.sequence([v.a.timing(e,{toValue:90,tension:10,friction:10,duration:300}),v.a.timing(t,{toValue:180,tension:10,friction:10,duration:300})]).start()}(o,s),setTimeout((function(){e.convertCardState(t)}),600)};return Object(n.useImperativeHandle)(t,(function(){return{flip:u}})),r.a.createElement(g.a,null,r.a.createElement(v.a.View,{style:[c,{position:"absolute",left:0},i]},r.a.createElement(E,{scaleUnit:e.size})),r.a.createElement(v.a.View,{style:[c,l]},r.a.createElement(C,{card:e.card})))})),S=function(e,t,a,n){v.a.sequence([v.a.delay(a),v.a.timing(e,{toValue:{x:n.x-t.x,y:n.y-t.y},duration:1e3})]).start()},j=r.a.forwardRef((function(e,t){var a=Object(n.useState)(new v.a.ValueXY),c=Object(f.a)(a,1)[0],o={transform:[{translateX:c.x},{translateY:c.y}]},i=Object(n.useState)(e.startLocation),s=Object(f.a)(i,1)[0],l=r.a.createRef(),u=function(){l.current.flip()},d=function(){var t=e.index>14?0:500*e.index;S(c,s,t,e.endLocation),e.flip&&setTimeout((function(){u()}),t+1e3)},m=function(t,a){S(c,s,0,t),a&&setTimeout((function(){e.convertCardState("null"),e.setComputerCardToPlayed(e.index)}),1e3)},g=function(){S(c,s,0,{x:0,y:0}),setTimeout((function(){e.convertCardState("movable")}),1e3)};return Object(n.useImperativeHandle)(t,(function(){return{moveAndPossiblyFlip:d,flip:u,moveAndNull:m,returnToOriginal:g}})),r.a.createElement(v.a.View,{style:[o,{position:"absolute",left:s.x,top:s.y}]},r.a.createElement(O,{ref:l,index:e.index,card:e.card,size:e.scaleUnit,convertCardState:e.convertCardState}))})),x=a(104),w=function(e,t){var a=!1;switch(e){case 0:case 5:case 9:case 12:case 14:a=!0;break;case 1:case 2:case 3:case 4:e+4>t&&(a=!0);break;case 6:case 7:case 8:e+4>t&&(a=!0);break;case 10:case 11:case 13:e+4>t&&(a=!0)}return e>14&&(a=!0),a},T=function(e,t,a){var n=a-15>0?a-15:0,r=52-a,c=r-15>0?r-15:0;return t<15+Math.min(n,c)||r%2===0&&t%2===0?e:"right"===e?"left":"right"},R=function(e,t,a){var n,r,c=1.7*t,o=4.5*c;switch(e){case 0:n=a+1/6*t;break;case 1:case 5:n=a+(2/6+1)*t;break;case 2:case 6:case 9:n=a+2.5*t;break;case 3:case 7:case 10:case 12:n=a+(4/6+3)*t;break;default:n=a+(5/6+4)*t}switch(e){case 14:r=o+.5*c;break;case 12:case 13:r=o+.375*c;break;case 9:case 10:case 11:r=o+.25*c;break;case 5:case 6:case 7:case 8:r=o+.125*c;break;default:r=o}return{x:n,y:r}},k=function(e,t,a,n){var r=n+(1/6+1+4/6+1+2/6)*a,c=2.75*a*1.7;return e>r&&e<r+a&&(t>c&&t<c+1.7*a)},P=function(e,t,a,n){var r=n+(1/6+1+4/6)*a,c=2.75*a*1.7;return e>r&&e<r+a&&(t>c&&t<c+1.7*a)},U=function(e,t,a,n){var r="left"===e?t.value:a.value,c=n.value;if(1===r){if(2===c||13===c)return!0}else{if(13!==r)return c===r+1||c===r-1;if(12===c||1===c)return!0}},I=function(e){var t=new Map([[14,13],[13,11],[12,10],[11,8],[10,7],[9,6],[8,4],[7,3],[6,2],[5,1],["default",-1]]);return t.get(e)||t.get("default")},V=function(e,t,a){var n=1.7*t,r=a;switch(e){case 14:case 13:case 11:case 8:case 4:r+=1/6*t;break;case 12:case 10:case 7:case 3:r+=(2/6+1)*t;break;case 9:case 6:case 2:r+=2.5*t;break;case 5:case 1:r+=(4/6+3)*t;break;default:r+=(5/6+4)*t}var c=0;switch(e){case 4:case 3:case 2:case 1:case 0:c=0+.5*n;break;case 8:case 7:case 6:case 5:c=0+.375*n;break;case 11:case 10:case 9:c=0+.25*n;break;case 13:case 12:c=0+.125*n;break;default:c=0}return{x:r,y:c}},L=function(e,t,a){v.a.timing(e,{toValue:{x:t.x-a.x,y:t.y-a.y},duration:500}).start()},B=r.a.forwardRef((function(e,t){var a,c={width:a=e.size,height:1.7*a,borderRadius:7,backgroundColor:"papayawhip"},o=Object(n.useState)(e.startLocation),i=Object(f.a)(o,1)[0],s=Object(n.useState)(new v.a.ValueXY),l=Object(f.a)(s,2),u=l[0],d=(l[1],{transform:[{translateX:u.x},{translateY:u.y}]}),m=Object(n.useState)({x:0,y:0}),g=Object(f.a)(m,2),p=g[0],b=g[1],y=Object(n.useState)(!1),E=Object(f.a)(y,2),O=E[0],S=E[1],j=Object(n.useState)(e.index),w=Object(f.a)(j,2),T=w[0],R=w[1],I=function(t,a){var n=!0,r=function(e,t,a,n){var r=P(e,t,a,n),c=k(e,t,a,n);return r?"left":c?"right":"none"}(t,a,e.size,e.spacing);"none"!==r&&(U(r,e.topmostLeft,e.topmostRight,e.card)&&(n=!1,function(e,t,a,n,r){L(e,{x:"left"===t?n+(1/6+1+4/6)*a:n+(1/6+1+4/6+1+2/6)*a,y:4.675*a},r)}(u,r,e.size,e.spacing,e.startLocation),setTimeout((function(){var t,a,n,c;t=r,a=e.changeTopmostLeft,n=e.changeTopmostRight,c=e.card,"left"===t?a(c):n(c),e.convertCardState("null"),e.setPlayerCardToPlayed(e.index),(e.index<5||O)&&e.handleEmptyPositionStateChanged("vacate",T),O||e.flipPossibleCardBelow(e.index)}),500)));var c=function(e,t,a,n,r){for(var c=[],o=0;o<5;o++)c.push(n+(1/6+o*(1+1/6))*a);for(var i=4.5*1.7*a,s="none",l=0;l<5;l++)r[l]&&e>c[l]&&e<c[l]+a&&t>i&&t<i+1.7*a&&(s=l);return s}(t,a,e.size,e.spacing,e.emptyPositions);if("none"!==c&&!O&&e.index>4)return function(e,t,a,n,r){L(e,{x:n+(1/6+t*(1+1/6))*a,y:4.5*1.7*a},r)}(u,c,e.size,e.spacing,e.startLocation),setTimeout((function(){e.flipPossibleCardBelow(e.index)}),500),void setTimeout((function(){n=!1,S(!0),b({x:i.x-(e.spacing+(1/6+c*(1+1/6))*e.size),y:i.y-4.5*1.7*e.size}),e.handleEmptyPositionStateChanged("occupy",c),R(c)}),1e3);n&&function(e,t){v.a.timing(e,{toValue:{x:0-t.x,y:0-t.y},duration:500}).start()}(u,p)},V=x.a.create({onStartShouldSetPanResponder:function(e,t){return!0},onPanResponderMove:function(e,t){!function(e,t,a,n){v.a.timing(a,{toValue:{x:e-n.x,y:t-n.y},duration:0}).start()}(t.dx,t.dy,u,p)},onPanResponderRelease:function(e,t){I(t.moveX,t.moveY)}});return r.a.createElement(h.a,{disabled:!1},r.a.createElement(v.a.View,Object.assign({style:[c,d,{position:"absolute",left:i.x,top:i.y}]},V.panHandlers),r.a.createElement(C,{card:e.card})))})),F=r.a.forwardRef((function(e,t){var a,c=Object(n.useState)("movable"),o=Object(f.a)(c,2),i=o[0],s=o[1],l=Object(n.useState)((a=e.scaleUnit,{x:e.spacing+4.833333333333334*a,y:4.675*a})),u=Object(f.a)(l,1)[0],d=Object(n.useState)(function(e,t,a,n){if(e<15)return R(e,t,a);var r=4.675*t;return"right"===T("right",e,n)?{x:a+(1/6+1+4/6+1+2/6)*t,y:r}:{x:a+(1/6+1+4/6)*t,y:r}}(e.index,e.scaleUnit,e.spacing,e.cardCount)),m=Object(f.a)(d,1)[0],g=Object(n.useState)(w(e.index,e.cardCount)),p=Object(f.a)(g,1)[0],b=function(e){s(e)};return"null"===i?null:"draggable"===i?r.a.createElement(B,{card:e.card,ref:t,index:e.index,size:e.scaleUnit,startLocation:m,topmostLeft:e.topmostLeft,topmostRight:e.topmostRight,changeTopmostRight:e.changeTopmostRight,changeTopmostLeft:e.changeTopmostLeft,spacing:e.spacing,convertCardState:b,flipPossibleCardBelow:e.flipPossibleCardBelow,setPlayerCardToPlayed:e.setPlayerCardToPlayed,emptyPositions:e.emptyPositions,handleEmptyPositionStateChanged:e.handleEmptyPositionStateChanged}):r.a.createElement(j,{ref:t,index:e.index,scaleUnit:e.scaleUnit,startLocation:u,card:e.card,endLocation:m,flip:p,convertCardState:b})})),z=r.a.forwardRef((function(e,t){var a=Object(n.useState)(e.playerCards),c=Object(f.a)(a,1)[0],o=Object(n.useState)(c.map((function(e){return r.a.createRef()}))),i=Object(f.a)(o,1)[0],s=Object(n.useState)(e.playerCards.length>15?15:100),l=Object(f.a)(s,2),u=l[0],d=l[1],m=Object(n.useState)(function(e){for(var t=[],a=0;a<e;a++)t.push(!1);return t}(e.playerCards.length)),p=Object(f.a)(m,2),b=p[0],h=p[1],v=Object(n.useState)([!1,!1,!1,!1,!1]),C=Object(f.a)(v,2),E=C[0],O=C[1];Object(n.useEffect)((function(){for(var t=!0,a=Math.min(15,c.length),n=0;n<a;n++)!1===b[n]&&(t=!1);t&&e.gameOverEndRound("player")}),[b,c.length,e]);var S=function(e){var t=Object(y.a)(b);t[e]=!0,h(t)},j=function(){for(var e=Math.min(c.length,15),t=0;t<e;t++)i[t].current.moveAndPossiblyFlip()},x=function(){u<e.playerCards.length&&(i[u].current.moveAndPossiblyFlip(),setTimeout((function(){"right"===T(u,c.length)?e.changeTopmostRight(c[u]):e.changeTopmostLeft(c[u]),d(u+1)}),1600))},w=function(e){var t=I(e);-1!==t&&i[t].current.flip()},R=function(e,t){var a=Object(y.a)(E);a[t]="occupy"!==e,O(a)};return Object(n.useImperativeHandle)(t,(function(){return{dealSolitaireCards:j,dealSingleCard:x}})),r.a.createElement(g.a,null,c.map((function(t,a){return r.a.createElement(F,{key:a,index:a,card:t,ref:i[a],scaleUnit:e.scaleUnit,spacing:e.spacing,cardCount:c.length,topmostLeft:e.topmostLeft,topmostRight:e.topmostRight,changeTopmostRight:e.changeTopmostRight,changeTopmostLeft:e.changeTopmostLeft,flipPossibleCardBelow:w,setPlayerCardToPlayed:S,emptyPositions:E,handleEmptyPositionStateChanged:R})})))})),A=function(e){var t=e.viewStyle,a=e.topmost,n=""===a?"green":"papayawhip";return r.a.createElement(g.a,{style:[t,{backgroundColor:n}]},""!==a?r.a.createElement(C,{card:a}):null)},M=function(e){var t=e.topmostLeft,a=e.topmostRight,n=e.scaleUnit,c=e.spacing,o=function(e,t){return{position:"absolute",left:t+(1/6+1+4/6)*e,top:4.675*e,width:e,height:1.7*e,borderRadius:7,zIndex:0}}(n,c),i=function(e,t){return{position:"absolute",left:t+(1/6+1+4/6+1+2/6)*e,top:4.675*e,width:e,height:1.7*e,borderRadius:7,zIndex:0}}(n,c);return r.a.createElement(g.a,null,r.a.createElement(A,{viewStyle:o,topmost:t}),r.a.createElement(A,{viewStyle:i,topmost:a}))},N=r.a.forwardRef((function(e,t){var a,c=Object(n.useState)("movable"),o=Object(f.a)(c,2),i=o[0],s=o[1],l=Object(n.useState)((a=e.scaleUnit,{x:e.spacing+1/6*a,y:4.675*a})),u=Object(f.a)(l,1)[0],d=Object(n.useState)(function(e,t,a,n){if(e<15)return V(e,t,a);var r=4.675*t;return"right"===T("left",e,n)?{x:a+(1/6+1+4/6+1+2/6)*t,y:r}:{x:a+(1/6+1+4/6)*t,y:r}}(e.index,e.scaleUnit,e.spacing,e.cardCount)),m=Object(f.a)(d,1)[0],g=Object(n.useState)(w(e.index,e.cardCount)),p=Object(f.a)(g,1)[0];return"null"===i?null:r.a.createElement(j,{ref:t,index:e.index,scaleUnit:e.scaleUnit,startLocation:u,card:e.card,endLocation:m,flip:p,convertCardState:function(e){s(e)},setComputerCardToPlayed:e.setComputerCardToPlayed})})),W=r.a.forwardRef((function(e,t){var a=Object(n.useState)(e.computerCards),c=Object(f.a)(a,1)[0],o=Object(n.useState)(c.map((function(e){return r.a.createRef()}))),i=Object(f.a)(o,1)[0],s=Object(n.useState)(e.computerCards.length>15?15:100),l=Object(f.a)(s,2),u=l[0],d=l[1],m=Object(n.useState)(function(e){for(var t=Math.min(15,e),a=[],n=0;n<t;n++){w(n,e)&&a.push(n)}return a}(c.length)),p=Object(f.a)(m,2),b=p[0],h=p[1],v=Object(n.useState)(function(e){for(var t=[],a=0;a<e;a++)t.push(!1);return t}(e.computerCards.length)),C=Object(f.a)(v,2),E=C[0],O=C[1];Object(n.useEffect)((function(){for(var t=!0,a=Math.min(15,c.length),n=0;n<a;n++)!1===E[n]&&(t=!1);t&&e.gameOverEndRound("computer")}),[E,c.length,e]);var S=function(e){var t=Object(y.a)(E);t[e]=!0,O(t)},j=function(){for(var e=Math.min(c.length,15),t=0;t<e;t++)i[t].current.moveAndPossiblyFlip()},x=function(){u<e.computerCards.length&&(i[u].current.moveAndPossiblyFlip(),setTimeout((function(){"right"===T("left",u,c.length)?e.changeTopmostRight(c[u]):e.changeTopmostLeft(c[u]),d(u+1)}),1600))},R=function(){var t,a,n,r=function(e,t,a,n){for(var r={cardIndex:-1,stack:"none"},c=0;c<t.length;){var o=e[t[c]],i=U("left",a,n,o),s=U("right",a,n,o);i?(r={cardIndex:t[c],target:"left"},c=100):s&&(r={cardIndex:t[c],target:"right"},c=100),c++}return r}(c,b,e.topmostLeft,e.topmostRight);if(-1!==r.cardIndex){var o=(t=r.target,a=e.scaleUnit,n=e.spacing,new Map([["left",{x:n+(1/6+1+4/6)*a,y:4.675*a}],["right",{x:n+(1/6+1+4/6+1+2/6)*a,y:4.675*a}]]).get(t));i[r.cardIndex].current.moveAndNull(o,!0),setTimeout((function(){"right"===r.target?e.changeTopmostRight(c[r.cardIndex]):e.changeTopmostLeft(c[r.cardIndex]);var t=b.filter((function(e){return e!==r.cardIndex})),a=I(r.cardIndex);-1!==a&&t.push(a),h(t)}),1e3),setTimeout((function(){k(r.cardIndex)}),1500)}};Object(n.useImperativeHandle)(t,(function(){return{dealSolitaireCards:j,dealSingleCard:x,performComputerCardMoveIfPossible:R}}));var k=function(e){var t=I(e);-1!==t&&i[t].current.flip()};return r.a.createElement(g.a,null,c.map((function(t,a){return r.a.createElement(N,{key:a,index:a,card:t,ref:i[a],scaleUnit:e.scaleUnit,spacing:e.spacing,cardCount:c.length,flipPossibleCardBelow:k,setComputerCardToPlayed:S})})))})),H=Object(i.b)((function(e){return{game:e.game}}),{})((function(e){var t=Object(n.useState)(""),a=Object(f.a)(t,2),c=a[0],o=a[1],i=Object(n.useState)(""),s=Object(f.a)(i,2),l=s[0],u=s[1],d=Object(n.useState)(e.game.playerStack),m=Object(f.a)(d,1)[0],p=Object(n.useState)(e.game.computerStack),y=Object(f.a)(p,1)[0],v=Object(n.useState)(r.a.createRef()),C=Object(f.a)(v,1)[0],E=Object(n.useState)(r.a.createRef()),O=Object(f.a)(E,1)[0],S=function(e){u(e)},j=function(e){o(e)},x=function(t){console.log("winner",t),setTimeout((function(){e.gameRoundOver(t)}),2e3)};return r.a.createElement(g.a,null,r.a.createElement(M,{topmostLeft:c,topmostRight:l,scaleUnit:e.scaleUnit,spacing:e.spacing}),r.a.createElement(z,{playerCards:m,ref:C,scaleUnit:e.scaleUnit,spacing:e.spacing,changeTopmostRight:S,changeTopmostLeft:j,topmostLeft:c,topmostRight:l,gameOverEndRound:x}),r.a.createElement(W,{computerCards:y,ref:O,scaleUnit:e.scaleUnit,spacing:e.spacing,changeTopmostRight:S,changeTopmostLeft:j,topmostLeft:c,topmostRight:l,gameOverEndRound:x}),r.a.createElement(b.a,{style:{backgroundColor:"powderblue"}},"PROTOTYPE, UNDER DEVELOPMENT!!!"),r.a.createElement(h.a,{onPress:function(){C.current.dealSolitaireCards(),O.current.dealSolitaireCards()}},r.a.createElement(b.a,{style:{backgroundColor:"rosybrown"}},"BUTTON deal player solitaire (press only ONCE)")),r.a.createElement(h.a,{onPress:function(){C.current.dealSingleCard(),O.current.dealSingleCard()}},r.a.createElement(b.a,{style:{backgroundColor:"powderblue"}},"BUTTON deal single card (press after solitaire animations)")),r.a.createElement(h.a,{onPress:function(){setInterval((function(){O.current.performComputerCardMoveIfPossible()}),4e3)}},r.a.createElement(b.a,{style:{backgroundColor:"red"}},"BUTTON computer play")))})),X=function(e){return p.a.create({contents:{alignItems:"center",marginTop:e/2},titleText:{fontSize:e/1.5,fontWeigth:"bold",color:"#B9CC3F",fontFamily:"Arial Black"},infoText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial"},spacer:{height:e/2},buttonView:{backgroundColor:"#B9CC3F",padding:e/5,borderRadius:8,marginTop:e/5},buttonText:{color:"green",fontFamily:"Arial",fontSize:e/2.5}})},G=function(e){var t=e.startSetting,a=e.scaleUnit,n=X(a),c=new v.a.Value(1),o={opacity:c};return r.a.createElement(g.a,null,r.a.createElement(v.a.View,{style:o},r.a.createElement(g.a,{style:n.contents},r.a.createElement(b.a,{style:n.titleText},"nopsa"),r.a.createElement(b.a,{style:n.infoText},"a card game for those with"),r.a.createElement(b.a,{style:n.infoText}," skill, speed and luck"),r.a.createElement(g.a,{style:n.spacer}),r.a.createElement(b.a,{style:n.infoText},"feel like playing?"),r.a.createElement(h.a,{onPress:function(){v.a.timing(c,{toValue:0,duration:1e3}).start(),setTimeout((function(){t()}),1e3)},style:n.buttonView},r.a.createElement(b.a,{style:n.buttonText},"setup a new game")))))},Y=function(e){var t=e.value,a=e.dotViewWidth,n={width:a,height:1.4*a,justifyContent:"center",alignItems:"center"},c={width:4,height:4,opacity:t>=e.dotNumber?1:.2,backgroundColor:"#B9CC3F",borderRadius:3};return r.a.createElement(g.a,{style:n},r.a.createElement(g.a,{style:c}))},D=function(e){var t=e.value,a=e.dotNumber,n=e.dotViewWidth,c=e.handleSelectionChanged,o={width:n,height:1.4*n,justifyContent:"center",alignItems:"center",borderWidth:1.5,opacity:t>=a?1:.2,borderColor:"#B9CC3F",borderRadius:n};return r.a.createElement(h.a,{onPress:function(){return c(a)}},r.a.createElement(g.a,{style:o},r.a.createElement(g.a,{style:{width:4,height:4,backgroundColor:"#B9CC3F",borderRadius:2}})))},_=r.a.forwardRef((function(e,t){var a=e.scaleUnit,c=e.optionCount-1,o=Object(n.useState)(1),i=Object(f.a)(o,2),s=i[0],l=i[1],u=6*a/30,d=function(e){var t,a=s,n=Math.max(e-s,s-e);function r(t){return setInterval((function(){"up"===t&&a<e?(a++,l(a)):"down"===t&&e<a&&(a--,l(a))}),180/n)}s<e?t=r("up"):s>e&&(t=r("down")),setTimeout((function(){clearInterval(t)}),180*n)},m=function(){return(s-1)/6+1};Object(n.useImperativeHandle)(t,(function(){return{getSelectedValue:m}}));return r.a.createElement(g.a,{style:q.container},r.a.createElement(g.a,{style:q.dotSliderView},function(){for(var e=[],t=1;t<=6*c+1;t++)(t-1)%6!==0?e.push(r.a.createElement(Y,{key:t,value:s,dotViewWidth:u,dotNumber:t})):e.push(r.a.createElement(D,{key:t,value:s,dotViewWidth:u,handleSelectionChanged:d,dotNumber:t}));return e}()))})),q=p.a.create({container:{alignItems:"center",marginBottom:50},instructionText:{color:"#B9CC3F",fontFamily:"Arial",fontWeight:"bold",marginBottom:15},dotSliderView:{flexDirection:"row",alignItems:"center"}}),J=function(e){var t=e.displayColor,a=e.number,n=e.selectStack,c=e.scaleUnit,o={width:1.5*c,height:1.7*c*1.3,borderRadius:9.1,borderWidth:1.3,justifyContent:"center",alignItems:"center"};return r.a.createElement(h.a,{onPress:function(){return n(a)}},r.a.createElement(g.a,{style:[o,t]},r.a.createElement(E,{scaleUnit:c})))},K=r.a.forwardRef((function(e,t){var a=e.scaleUnit,c=Q(),o=Object(n.useState)(0),i=Object(f.a)(o,2),s=i[0],l=i[1],u=function(e){l(e)},d=function(){return 0===s?{player:0,computer:1}:{player:1,computer:0}};Object(n.useImperativeHandle)(t,(function(){return{getSelectedStack:d}}));var m=0===s?{borderColor:"#B9CC3F"}:{borderColor:"green"},p=1===s?{borderColor:"#B9CC3F"}:{borderColor:"green"};return r.a.createElement(g.a,{style:c.container},r.a.createElement(g.a,{style:{flexDirection:"row"}},r.a.createElement(J,{displayColor:m,number:0,selectStack:u,scaleUnit:a}),r.a.createElement(g.a,{style:{width:30}}),r.a.createElement(J,{displayColor:p,number:1,selectStack:u,scaleUnit:a})))})),Q=function(e){return p.a.create({container:{alignItems:"center"},instructionText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial",marginBottom:e/3}})},Z=a(79),$=a.n(Z),ee={setGameSettings:function(e){return{type:"SET_GAME_SETTINGS",data:e}}},te=Object(i.b)((function(e){return{game:e.game}}),ee)((function(e){var t=e.scaleUnit,a=ae(t),n=r.a.createRef(),c=r.a.createRef(),o=r.a.createRef(),i=new v.a.Value(1),s={opacity:i};return r.a.createElement(v.a.View,{style:[a.container,s]},r.a.createElement(b.a,{style:a.instructionText},"select opponent skill level"),r.a.createElement(_,{scaleUnit:t,optionCount:3,ref:n}),r.a.createElement(b.a,{style:a.instructionText},"select opponent speed"),r.a.createElement(_,{scaleUnit:t,optionCount:5,ref:c}),r.a.createElement(b.a,{style:a.instructionText},"select your stack"),r.a.createElement(K,{scaleUnit:t,ref:o}),r.a.createElement(g.a,{style:a.spacer}),r.a.createElement(h.a,{onPress:function(){v.a.timing(i,{toValue:0,duration:1e3}).start();var t=function(){for(var e=[],t=1;t<5;t++)for(var a=1;a<14;a++)e.push({suit:t,value:a});var n=$()(e);return[n.slice(0,26),n.slice(26)]}();setTimeout((function(){e.setGameSettings({skill:n.current.getSelectedValue(),speed:c.current.getSelectedValue(),playerStack:t[o.current.getSelectedStack().player],computerStack:t[o.current.getSelectedStack().computer],isOn:!0})}),1e3)},style:a.buttonView},r.a.createElement(b.a,{style:a.buttonText},"save settings")))})),ae=function(e){return p.a.create({container:{alignItems:"center",marginTop:50},instructionText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial",marginBottom:e/3},spacer:{height:e/2},buttonView:{backgroundColor:"#B9CC3F",padding:e/5,borderRadius:8,marginTop:e/5},buttonText:{color:"green",fontFamily:"Arial",fontSize:e/2.5}})},ne=function(e){var t=e.scaleUnit,a=Object(n.useState)(!1),c=Object(f.a)(a,2),o=c[0],i=c[1];return r.a.createElement(g.a,null,o?r.a.createElement(te,{scaleUnit:t}):r.a.createElement(G,{startSetting:function(){i(!0)},scaleUnit:t}))},re=Object(i.b)((function(e){return{game:e.game}}),{})((function(e){return r.a.createElement(g.a,null,r.a.createElement(b.a,null,"Winner of the round:"),r.a.createElement(b.a,null,e.winner))})),ce=Object(i.b)((function(e){return{game:e.game}}),{})((function(e){var t=m.a.get("window").width,a=m.a.get("window").height,c=Math.min(t/6,a/10.2),o=oe(t,a),i=(t-6*c)/2,s=e.game.isOn,l=Object(n.useState)("none"),u=Object(f.a)(l,2),d=u[0],p=u[1],b=function(e){p(e)},h=function(){return"none"===d?r.a.createElement(H,{scaleUnit:c,spacing:i,gameRoundOver:b}):r.a.createElement(re,{winner:d})};return r.a.createElement(g.a,{style:o.screen},s?r.a.createElement(h,null):r.a.createElement(ne,{scaleUnit:c}))})),oe=function(e,t){return p.a.create({screen:{width:e,height:t,backgroundColor:"green"}})},ie=Object(s.c)(d),se=function(){return r.a.createElement(i.a,{store:ie},r.a.createElement(ce,null))};o.a.render(r.a.createElement(se,null),document.getElementById("root"))},80:function(e,t,a){e.exports=a(100)}},[[80,1,2]]]);
//# sourceMappingURL=main.ff7696f6.chunk.js.map