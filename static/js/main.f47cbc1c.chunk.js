(this.webpackJsonpgamenopsa=this.webpackJsonpgamenopsa||[]).push([[0],{101:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(24),o=n.n(i),c=n(17),u=n(27),l={isOn:!1},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_GAME_SETTINGS":return t.data;default:return e}},d=Object(u.b)({game:s}),f=n(2),m=n(41),g=n(5),p=n(6),b=n(21),v=n(103),h=n(77),y=function(e){var t=e.card,n="black",a="";switch(t.suit){case 2:a="\u2665",n="red";break;case 3:a="\u2663";break;case 4:a="\u2666",n="red";break;default:a="\u2660"}var i=1===t.value?"A":t.value;return r.a.createElement(g.a,{style:{justifyContent:"center",alignItems:"center"}},r.a.createElement(h.a,{style:{color:n,fontSize:30}},a),r.a.createElement(h.a,{style:{color:n,fontSize:30}},i))},S=function(e){var t=e.scaleUnit,n={justifyContent:"center",alignItems:"center",backgroundColor:"#B9CC3F",width:t,height:1.7*t,borderRadius:6};return r.a.createElement(g.a,{style:n},function(){for(var e=[],n=0;n<9;n++)e.push(r.a.createElement(h.a,{key:n,style:{color:"green",fontSize:t/7}},"\xa9\xa9\xa9\xa9\xa9\xa9\xa9"));return e}())},C=r.a.forwardRef((function(e,t){var n=O(e.unitsAndLocations.unit),i=new v.a.Value(0),o={transform:[{rotateX:i.interpolate({inputRange:[0,180],outputRange:["180deg","360deg"]})}]},c=new v.a.Value(90),u={transform:[{rotateX:c.interpolate({inputRange:[0,180],outputRange:["180deg","360deg"]})}]},l=function(e){j(i,c,e)};return Object(a.useImperativeHandle)(t,(function(){return{flip:l}})),r.a.createElement(g.a,null,r.a.createElement(v.a.View,{style:[n,{position:"absolute",left:0},o]},r.a.createElement(S,{scaleUnit:e.unitsAndLocations.unit})),r.a.createElement(v.a.View,{style:[n,u]},r.a.createElement(y,{card:e.card})))})),O=function(e){return{width:e,height:1.7*e,borderRadius:7,backgroundColor:"papayawhip"}},j=function(e,t,n){v.a.sequence([v.a.timing(e,{toValue:90,tension:10,friction:10,duration:n/2}),v.a.timing(t,{toValue:180,tension:10,friction:10,duration:n/2})]).start()},x=r.a.forwardRef((function(e,t){var n=Object(a.useState)(new v.a.ValueXY),i=Object(f.a)(n,1)[0],o={transform:[{translateX:i.x},{translateY:i.y}]},c=Object(a.useState)(e.startLocation),u=Object(f.a)(c,1)[0],l=r.a.createRef(),s=function(e){l.current.flip(e)},d=function(t,n){var a=e.index>14?0:500*e.index;E(i,u,a,e.endLocation,t),e.flip&&setTimeout((function(){s(n)}),a+t)},m=function(e){E(i,u,0,e,1e3)};return Object(a.useImperativeHandle)(t,(function(){return{moveAndPossiblyFlipWithDelay:d,flipOnly:s,moveCardToLocation:m}})),r.a.createElement(v.a.View,{style:[o,{position:"absolute",left:u.x,top:u.y}]},r.a.createElement(C,{ref:l,index:e.index,card:e.card,convertCardState:e.convertCardState,unitsAndLocations:e.unitsAndLocations}))})),E=function(e,t,n,a,r){v.a.sequence([v.a.delay(n),v.a.timing(e,{toValue:{x:a.x-t.x,y:a.y-t.y},duration:r})]).start()},w=n(105),A=n(104),k=function(e,t){var n=!1;switch(e){case 0:case 5:case 9:case 12:case 14:n=!0;break;case 1:case 2:case 3:case 4:e+4>t&&(n=!0);break;case 6:case 7:case 8:e+4>t&&(n=!0);break;case 10:case 11:case 13:e+4>t&&(n=!0)}return e>14&&(n=!0),n},L=function(e,t,n){var a=n-15>0?n-15:0,r=52-n,i=r-15>0?r-15:0;return t<15+Math.min(a,i)||r%2===0&&t%2===0?e:"right"===e?"left":"right"},D=function(e,t,n){var a,r,i=1.7*t,o=4.5*i;switch(e){case 0:a=n+1/6*t;break;case 1:case 5:a=n+(2/6+1)*t;break;case 2:case 6:case 9:a=n+2.5*t;break;case 3:case 7:case 10:case 12:a=n+(4/6+3)*t;break;default:a=n+(5/6+4)*t}switch(e){case 14:r=o+.5*i;break;case 12:case 13:r=o+.375*i;break;case 9:case 10:case 11:r=o+.25*i;break;case 5:case 6:case 7:case 8:r=o+.125*i;break;default:r=o}return{x:a,y:r}},T=function(e,t,n,a){var r=a+(1/6+1+4/6+1+2/6)*n,i=2.75*n*1.7;return e>r&&e<r+n&&(t>i&&t<i+1.7*n)},I=function(e,t,n,a){var r=a+(1/6+1+4/6)*n,i=2.75*n*1.7;return e>r&&e<r+n&&(t>i&&t<i+1.7*n)},R=function(e,t,n,a){var r="left"===e?t.value:n.value,i=a.value;if(1===r){if(2===i||13===i)return!0}else{if(13!==r)return i===r+1||i===r-1;if(12===i||1===i)return!0}},V=function(e){var t=new Map([[14,13],[13,11],[12,10],[11,8],[10,7],[9,6],[8,4],[7,3],[6,2],[5,1],["default",-1]]);return t.get(e)||t.get("default")},F=function(e,t,n,a){if(e<15)return G(e,t,n);var r=4.675*t;return"right"===L("left",e,a)?{x:n+(1/6+1+4/6+1+2/6)*t,y:r}:{x:n+(1/6+1+4/6)*t,y:r}},G=function(e,t,n){var a=1.7*t,r=.5*a,i=n;switch(e){case 14:case 13:case 11:case 8:case 4:i+=1/6*t;break;case 12:case 10:case 7:case 3:i+=(2/6+1)*t;break;case 9:case 6:case 2:i+=2.5*t;break;case 5:case 1:i+=(4/6+3)*t;break;default:i+=(5/6+4)*t}var o=0;switch(e){case 4:case 3:case 2:case 1:case 0:o=r+.5*a;break;case 8:case 7:case 6:case 5:o=r+.375*a;break;case 11:case 10:case 9:o=r+.25*a;break;case 13:case 12:o=r+.125*a;break;default:o=r}return{x:i,y:o}},B=function(e){for(var t=[],n=0;n<e;n++)t.push("movable");return t},P=function(e){for(var t=[],n=Math.min(15,e),a=0;a<n;a++)t.push(a);return t},M=function(e,t,n){for(var a=Object(b.a)(t),r=0;r<e.length;r++)a[e[r].index]=e[r].newState;n(a)},U=function(e,t,n,a,r){for(var i,o=Object(b.a)(a),c=0;c<o.length;c++)o[c]===e&&(i=c);o[i]=-1,"occupy"===t&&(o[n]=e),r(o)},z=function(e,t){for(var n,a=0;a<t.length;a++)t[a]===e&&(n=a);return n},W=function(e,t,n){"left"===e?t.changeLeft(n):t.changeRight(n)},X=r.a.forwardRef((function(e,t){var n=Y(e.unitsAndLocations.unit),i=Object(a.useState)(e.startLocation),o=Object(f.a)(i,1)[0],c=Object(a.useState)(new v.a.ValueXY),u=Object(f.a)(c,1)[0],l={transform:[{translateX:u.x},{translateY:u.y}]},s=Object(a.useState)({x:0,y:0}),d=Object(f.a)(s,2),m=d[0],g=d[1],p=Object(a.useState)(e.unitsAndLocations.timing),b=Object(f.a)(p,1)[0],h=w.a.create({onStartShouldSetPanResponder:function(e,t){return!0},onPanResponderMove:function(e,t){H(t.dx,t.dy,u,m)},onPanResponderRelease:function(t,n){var a,r;a=n.moveX,r=n.moveY,q(a,r,e.unitsAndLocations,e.topmostStuff,e.card,o,u,e.handleChangesAfterPlayingACard,e.index,b)||J(a,r,e.unitsAndLocations,e.occupancyData,u,o,g,e.handleMovedCardToEmptyPosition,e.index,b)||N(u,m,b)}});return r.a.createElement(A.a,{disabled:!1},r.a.createElement(v.a.View,Object.assign({style:[n,l,{position:"absolute",left:o.x,top:o.y}]},h.panHandlers),r.a.createElement(y,{card:e.card})))})),Y=function(e){return{width:e,height:1.7*e,borderRadius:7,backgroundColor:"papayawhip"}},N=function(e,t,n){var a=n.moveDurationComputerCardGaming;v.a.timing(e,{toValue:{x:0-t.x,y:0-t.y},duration:a}).start()},H=function(e,t,n,a){v.a.timing(n,{toValue:{x:e-a.x,y:t-a.y},duration:0}).start()},_=function(e,t,n,a){v.a.timing(e,{toValue:{x:t.x-n.x,y:t.y-n.y},duration:a}).start()},q=function(e,t,n,a,r,i,o,c,u,l){var s=n.unit,d=n.spacing,f=a.valueLeft,m=a.valueRight,g=function(e,t,n,a){var r=I(e,t,n,a),i=T(e,t,n,a);return r?"left":i?"right":"none"}(e,t,s,d),p=l.movementFinalization;if("none"!==g)return!!R(g,f,m,r)&&(function(e,t,n,a,r,i){_(e,{x:"left"===t?a+(1/6+1+4/6)*n:a+(1/6+1+4/6+1+2/6)*n,y:4.675*n},r,i)}(o,g,s,d,i,p),setTimeout((function(){c(u,g)}),p),!0)},J=function(e,t,n,a,r,i,o,c,u,l){var s=n.unit,d=n.spacing,f=function(e,t,n,a,r){for(var i=[],o=0;o<5;o++)i.push(a+(1/6+o*(1+1/6))*n);for(var c=4.5*1.7*n,u="none",l=0;l<5;l++){-1===r[l]&&e>i[l]&&e<i[l]+n&&t>c&&t<c+1.7*n&&(u=l)}return u}(e,t,s,d,a),m=l.movementFinalization;return"none"!==f&&(function(e,t,n,a,r,i){_(e,{x:a+(1/6+t*(1+1/6))*n,y:4.5*1.7*n},r,i)}(r,f,s,d,i,m),setTimeout((function(){o({x:i.x-(d+(1/6+f*(1+1/6))*s),y:i.y-4.5*1.7*s}),c(u,f)}),m),!0)},K=r.a.forwardRef((function(e,t){var n,i=Object(a.useState)((n=e.unitsAndLocations.unit,{x:e.unitsAndLocations.spacing+4.833333333333334*n,y:4.675*n})),o=Object(f.a)(i,1)[0],c=Object(a.useState)(function(e,t,n,a){if(e<15)return D(e,t,n);var r=4.675*t;return"right"===L("right",e,a)?{x:n+(1/6+1+4/6+1+2/6)*t,y:r}:{x:n+(1/6+1+4/6)*t,y:r}}(e.index,e.unitsAndLocations.unit,e.unitsAndLocations.spacing,e.cardCount)),u=Object(f.a)(c,1)[0],l=Object(a.useState)(k(e.index,e.cardCount)),s=Object(f.a)(l,1)[0];return"null"===e.cardState?null:"draggable"===e.cardState?r.a.createElement(X,{card:e.card,ref:t,index:e.index,startLocation:u,unitsAndLocations:e.unitsAndLocations,topmostStuff:e.topmostStuff,handleChangesAfterPlayingACard:e.handleChangesAfterPlayingACard,handleMovedCardToEmptyPosition:e.handleMovedCardToEmptyPosition,occupancyData:e.occupancyData}):r.a.createElement(x,{ref:t,index:e.index,startLocation:o,card:e.card,endLocation:u,flip:s,unitsAndLocations:e.unitsAndLocations})})),Q=r.a.forwardRef((function(e,t){var n=Object(a.useState)(e.playerCards),i=Object(f.a)(n,1)[0],o=Object(a.useState)(i.map((function(e){return r.a.createRef()}))),c=Object(f.a)(o,1)[0],u=Object(a.useState)(e.playerCards.length>15?15:100),l=Object(f.a)(u,2),s=l[0],d=l[1],m=Object(a.useState)(B(e.playerCards.length)),p=Object(f.a)(m,2),b=p[0],v=p[1],h=Object(a.useState)(P(e.playerCards.length)),y=Object(f.a)(h,2),S=y[0],C=y[1],O=e.unitsAndLocations.timing,j=function(){for(var e=Math.min(i.length,15),t=0;t<e;t++)c[t].current.moveAndPossiblyFlipWithDelay(O.moveDurationDealing,O.flipDurationDealing);setTimeout((function(){Z(b,v)}),O.moveDurationDealing+O.flipDurationDealing+500*e)},x=function(){s<e.playerCards.length&&(c[s].current.moveAndPossiblyFlipWithDelay(O.moveDurationDealing,O.flipDurationDealing),setTimeout((function(){var t=L(s,i.length);W(t,e.topmostStuff,i[s]),M([{index:s,newState:"null"}],b,v),d(s+1)}),O.moveDurationDealing+O.flipDurationDealing))},E=function(t,n){var a=z(t,S);W(n,e.topmostStuff,i[t]),M([{index:t,newState:"null"}],b,v),U(t,"vacate","none",S,C);var r=V(t);a>4&&-1!==r&&(c[r].current.flipOnly(O.flipDurationGaming),setTimeout((function(){M([{index:t,newState:"null"},{index:r,newState:"draggable"}],b,v)}),O.flipDurationGaming))},w=function(e,t){if(U(e,"occupy",t,S,C),function(e,t){for(var n,a=0;a<t.length;a++)t[a]===e&&(n=a);return!(n<5)}(e,S)){var n=V(e);-1!==n&&(c[n].current.flipOnly(O.flipDurationGaming),setTimeout((function(){M([{index:e,newState:"draggable"},{index:n,newState:"draggable"}],b,v)}),O.flipDurationGaming))}},A=function(){return S},k=function(){return{left:e.topmostStuff.valueLeft.value,right:e.topmostStuff.valueRight.value}};return Object(a.useImperativeHandle)(t,(function(){return{dealSolitaireCards:j,dealSingleCard:x,returnState:A,returnTopmostValues:k}})),r.a.createElement(g.a,null,i.map((function(t,n){return r.a.createElement(K,{key:n,index:n,card:t,ref:c[n],cardCount:i.length,unitsAndLocations:e.unitsAndLocations,topmostStuff:e.topmostStuff,cardState:b[n],handleChangesAfterPlayingACard:E,handleMovedCardToEmptyPosition:w,occupancyData:S})})))})),Z=function(e,t){for(var n=Object(b.a)(e),a=Math.min(e.length,15),r=0;r<a;r++){k(r,e.length)&&(n[r]="draggable")}t(n)},$=n(42),ee=function(e,t){var n={position:"absolute",width:t.unit,height:1.7*t.unit,borderRadius:7,zIndex:0};return"left"===e?Object($.a)(Object($.a)({},n),{},{left:t.leftGamingStackXY.x,top:t.leftGamingStackXY.y}):Object($.a)(Object($.a)({},n),{},{left:t.rightGamingStackXY.x,top:t.rightGamingStackXY.y})},te=function(e){var t=e.viewStyle,n=e.topmost,a=""===n?"green":"papayawhip";return r.a.createElement(g.a,{style:[t,{backgroundColor:a}]},""!==n?r.a.createElement(y,{card:n}):null)},ne=function(e){var t=e.topmostLeft,n=e.topmostRight,a=e.unitsAndLocations,i=ee("left",a),o=ee("right",a);return r.a.createElement(g.a,null,r.a.createElement(te,{viewStyle:i,topmost:t}),r.a.createElement(te,{viewStyle:o,topmost:n}))},ae=r.a.forwardRef((function(e,t){var n,i=Object(a.useState)((n=e.unitsAndLocations.unit,{x:e.unitsAndLocations.spacing+1/6*n,y:4.675*n})),o=Object(f.a)(i,1)[0],c=Object(a.useState)(F(e.index,e.unitsAndLocations.unit,e.unitsAndLocations.spacing,e.cardCount)),u=Object(f.a)(c,1)[0],l=Object(a.useState)(k(e.index,e.cardCount)),s=Object(f.a)(l,1)[0];return"null"===e.cardState?null:r.a.createElement(x,{ref:t,index:e.index,startLocation:o,card:e.card,endLocation:u,flip:s,unitsAndLocations:e.unitsAndLocations})})),re=r.a.forwardRef((function(e,t){var n=Object(a.useState)(e.computerCards),i=Object(f.a)(n,1)[0],o=Object(a.useState)(i.map((function(e){return r.a.createRef()}))),c=Object(f.a)(o,1)[0],u=Object(a.useState)(e.computerCards.length>15?15:100),l=Object(f.a)(u,2),s=l[0],d=l[1],m=Object(a.useState)(B(e.computerCards.length)),p=Object(f.a)(m,2),b=p[0],v=p[1],h=Object(a.useState)(P(e.computerCards.length)),y=Object(f.a)(h,2),S=y[0],C=y[1],O=e.unitsAndLocations.timing,j=function(){for(var e=Math.min(i.length,15),t=0;t<e;t++)c[t].current.moveAndPossiblyFlipWithDelay(O.moveDurationDealing,O.flipDurationDealing)},x=function(){s<e.computerCards.length&&(c[s].current.moveAndPossiblyFlipWithDelay(O.moveDurationDealing,O.flipDurationDealing),setTimeout((function(){var t=L("left",s,i.length);W(t,e.topmostStuff,i[s]),M([{index:s,newState:"null"}],b,v),d(s+1)}),O.moveDurationDealing+O.flipDurationDealing))},E=function(){var t,n,a,r=function(e,t,n,a){for(var r=[],i=[[0],[5,1],[9,6,2],[12,10,7,3],[14,13,11,8,4]],o=0;o<5;){for(var c=0,u=!0;u&&c<i[o].length;){if(i[o][c]<e.length){var l=t[i[o][c]];-1!==l&&(r.push(l),u=!1)}c++}o++}for(var s={cardIndex:-1,stack:"none"},d=0;d<r.length;){var f=e[r[d]],m=R("left",n,a,f),g=R("right",n,a,f);m?(s={cardIndex:r[d],target:"left"},d=100):g&&(s={cardIndex:r[d],target:"right"},d=100),d++}return s}(i,S,e.topmostStuff.valueLeft,e.topmostStuff.valueRight);if(-1!==r.cardIndex){var o=(t=r.target,n=e.unitsAndLocations.unit,a=e.unitsAndLocations.spacing,new Map([["left",{x:a+(1/6+1+4/6)*n,y:4.675*n}],["right",{x:a+(1/6+1+4/6+1+2/6)*n,y:4.675*n}]]).get(t));c[r.cardIndex].current.moveCardToLocation(o,O.moveDurationComputerCardGaming),w(r)}},w=function(t){setTimeout((function(){var n,a,r;if(n=i[t.cardIndex],a=t.target,r=e.topmostStuff,R("left"===a?"left":"right",r.valueLeft,r.valueRight,n)){var o=z(t.cardIndex,S);W(t.target,e.topmostStuff,i[t.cardIndex]),M([{index:t.cardIndex,newState:"null"}],b,v),U(t.cardIndex,"vacate","none",S,C);var u=V(t.cardIndex);o>4&&-1!==u&&(c[u].current.flipOnly(O.flipDurationGaming),setTimeout((function(){M([{index:t.cardIndex,newState:"null"},{index:u,newState:"movable"}],b,v)}),O.flipDurationGaming))}else{var l=F(t.cardIndex,e.unitsAndLocations.unit,e.unitsAndLocations.spacing,e.computerCards.length);c[t.cardIndex].current.moveCardToLocation(l)}}),O.moveDurationComputerCardGaming)},A=function(){return S};Object(a.useImperativeHandle)(t,(function(){return{dealSolitaireCards:j,dealSingleCard:x,startComputerCardMoveIfPossible:E,returnState:A}}));var k=function(e){var t=V(e);-1!==t&&c[t].current.flipOnly(O.flipDurationGaming)};return r.a.createElement(g.a,null,i.map((function(t,n){return r.a.createElement(ae,{key:n,index:n,card:t,ref:c[n],spacing:e.spacing,cardCount:i.length,flipPossibleCardBelow:k,unitsAndLocations:e.unitsAndLocations,cardState:b[n]})})))})),ie=function(e){var t=e.unitsAndLocations,n=e.dealSolitaireCards,i=e.dealSingleCards,o=e.gameIsActive,c=e.changeGameIsActiveState,u=Object(a.useState)(!1),l=Object(f.a)(u,2),s=l[0],d=l[1],m=Object(a.useState)("deal solitaire cards"),p=Object(f.a)(m,2),b=p[0],v=p[1],y=oe(t.unit);return""===b||o?null:r.a.createElement(g.a,{style:{position:"absolute",top:0,alignSelf:"center"}},r.a.createElement(A.a,{onPress:function(){s?(v(""),i(),setTimeout((function(){c(),v("continue")}),2e3)):(v(""),n(),setTimeout((function(){d(!0),v("continue")}),1e4))},style:y.buttonView},r.a.createElement(h.a,{style:y.buttonText},b)))},oe=function(e){return p.a.create({contents:{alignItems:"center",marginTop:e/2},titleText:{fontSize:e/1.5,fontWeigth:"bold",color:"#B9CC3F",fontFamily:"Arial Black"},infoText:{fontSize:e/2.75,color:"#B9CC3F",fontFamily:"Arial"},spacer:{height:e/2},buttonView:{backgroundColor:"#B9CC3F",padding:e/10,borderRadius:8,marginTop:e/10},buttonText:{color:"green",fontFamily:"Arial",fontSize:e/3}})},ce=Object(c.b)((function(e){return{game:e.game}}),{})((function(e){var t=Object(a.useState)(""),n=Object(f.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(""),u=Object(f.a)(c,2),l=u[0],s=u[1],d=Object(a.useState)(e.game.playerStack),m=Object(f.a)(d,1)[0],p=Object(a.useState)(e.game.computerStack),v=Object(f.a)(p,1)[0],h=Object(a.useState)(r.a.createRef()),y=Object(f.a)(h,1)[0],S=Object(a.useState)(r.a.createRef()),C=Object(f.a)(S,1)[0],O=Object(a.useState)(e.unitsAndLocations),j=Object(f.a)(O,1)[0],x=Object(a.useState)([]),E=Object(f.a)(x,2),w=E[0],A=E[1],k=Object(a.useState)([]),L=Object(f.a)(k,2),D=L[0],T=L[1],I=Object(a.useState)(!1),R=Object(f.a)(I,2),V=R[0],F=R[1],G=Object(a.useState)(""),B=Object(f.a)(G,2),P=B[0],M=B[1],U=Object(a.useState)(""),z=Object(f.a)(U,2),W=z[0],X=z[1],Y=function(t){setTimeout((function(){e.gameRoundOver(t)}),2e3)},N={valueLeft:i,valueRight:l,changeLeft:function(e){o(e);var t=Object(b.a)(w);t.push(e),A(t)},changeRight:function(e){s(e);var t=Object(b.a)(D);t.push(e),T(t)}};return r.a.createElement(g.a,null,r.a.createElement(ne,{topmostLeft:i,topmostRight:l,unitsAndLocations:j}),r.a.createElement(Q,{playerCards:m,ref:y,gameOverEndRound:Y,unitsAndLocations:j,topmostStuff:N,gameIsActive:V}),r.a.createElement(re,{computerCards:v,ref:C,gameOverEndRound:Y,unitsAndLocations:j,topmostStuff:N,gameIsActive:V}),r.a.createElement(ie,{unitsAndLocations:j,dealSolitaireCards:function(){y.current.dealSolitaireCards(),C.current.dealSolitaireCards()},dealSingleCards:function(){y.current.dealSingleCard(),C.current.dealSingleCard()},gameIsActive:V,changeGameIsActiveState:function(){V?(clearInterval(P),clearInterval(W)):(M(setInterval((function(){C.current.startComputerCardMoveIfPossible()}),4e3)),X(setInterval((function(){var e=y.current.returnState(),t=C.current.returnState(),n=y.current.returnTopmostValues(),a=ue(e,t,n.left,n.right,m,v);console.log("dealingOfNewCardsIsNeeded",a),a&&F()}),4e3))),F(!V)}}))})),ue=function(e,t,n,a,r,i){var o=se(e,r),c=se(t,i);return!!le(o,n,a)&&!!le(c,n,a)},le=function(e,t,n){for(var a=0;a<e.length;a++){var r=de(e[a],t);if(console.log("card",e[a],"top",t),r)return!1;var i=de(e[a],n);if(console.log("card",e[a],"top",n),i)return!1}return!0},se=function(e,t){for(var n=[],a=[[0],[5,1],[9,6,2],[12,10,7,3],[14,13,11,8,4]],r=0;r<5;){for(var i=0,o=!0;o&&i<a[r].length;){if(a[r][i]<t.length){var c=e[a[r][i]];-1!==c&&(n.push(t[c].value),o=!1)}i++}r++}return n},de=function(e,t){if(1===t){if(2===e||13===e)return!0}else{if(13!==t)return e===t+1||e===t-1;if(12===e||1===e)return!0}},fe=function(e){return p.a.create({contents:{alignItems:"center",marginTop:e/2},titleText:{fontSize:e/1.5,fontWeigth:"bold",color:"#B9CC3F",fontFamily:"Arial Black"},infoText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial"},spacer:{height:e/2},buttonView:{backgroundColor:"#B9CC3F",padding:e/5,borderRadius:8,marginTop:e/5},buttonText:{color:"green",fontFamily:"Arial",fontSize:e/2.5}})},me=function(e){var t=e.startSetting,n=e.scaleUnit,a=fe(n),i=new v.a.Value(1),o={opacity:i};return r.a.createElement(g.a,null,r.a.createElement(v.a.View,{style:o},r.a.createElement(g.a,{style:a.contents},r.a.createElement(h.a,{style:a.titleText},"nopsa"),r.a.createElement(h.a,{style:a.infoText},"a card game for those with"),r.a.createElement(h.a,{style:a.infoText}," skill, speed and luck"),r.a.createElement(g.a,{style:a.spacer}),r.a.createElement(h.a,{style:a.infoText},"feel like playing?"),r.a.createElement(A.a,{onPress:function(){v.a.timing(i,{toValue:0,duration:1e3}).start(),setTimeout((function(){t()}),1e3)},style:a.buttonView},r.a.createElement(h.a,{style:a.buttonText},"setup a new game")))))},ge=function(e){var t=e.value,n=e.dotViewWidth,a={width:n,height:1.4*n,justifyContent:"center",alignItems:"center"},i={width:4,height:4,opacity:t>=e.dotNumber?1:.2,backgroundColor:"#B9CC3F",borderRadius:3};return r.a.createElement(g.a,{style:a},r.a.createElement(g.a,{style:i}))},pe=function(e){var t=e.value,n=e.dotNumber,a=e.dotViewWidth,i=e.handleSelectionChanged,o={width:a,height:1.4*a,justifyContent:"center",alignItems:"center",borderWidth:1.5,opacity:t>=n?1:.2,borderColor:"#B9CC3F",borderRadius:a};return r.a.createElement(A.a,{onPress:function(){return i(n)}},r.a.createElement(g.a,{style:o},r.a.createElement(g.a,{style:{width:4,height:4,backgroundColor:"#B9CC3F",borderRadius:2}})))},be=r.a.forwardRef((function(e,t){var n=e.scaleUnit,i=e.optionCount-1,o=Object(a.useState)(1),c=Object(f.a)(o,2),u=c[0],l=c[1],s=6*n/30,d=function(e){var t,n=u,a=Math.max(e-u,u-e);function r(t){return setInterval((function(){"up"===t&&n<e?(n++,l(n)):"down"===t&&e<n&&(n--,l(n))}),180/a)}u<e?t=r("up"):u>e&&(t=r("down")),setTimeout((function(){clearInterval(t)}),180*a)},m=function(){return(u-1)/6+1};Object(a.useImperativeHandle)(t,(function(){return{getSelectedValue:m}}));return r.a.createElement(g.a,{style:ve.container},r.a.createElement(g.a,{style:ve.dotSliderView},function(){for(var e=[],t=1;t<=6*i+1;t++)(t-1)%6!==0?e.push(r.a.createElement(ge,{key:t,value:u,dotViewWidth:s,dotNumber:t})):e.push(r.a.createElement(pe,{key:t,value:u,dotViewWidth:s,handleSelectionChanged:d,dotNumber:t}));return e}()))})),ve=p.a.create({container:{alignItems:"center",marginBottom:50},instructionText:{color:"#B9CC3F",fontFamily:"Arial",fontWeight:"bold",marginBottom:15},dotSliderView:{flexDirection:"row",alignItems:"center"}}),he=function(e){var t=e.displayColor,n=e.number,a=e.selectStack,i=e.scaleUnit,o={width:1.5*i,height:1.7*i*1.3,borderRadius:9.1,borderWidth:1.3,justifyContent:"center",alignItems:"center"};return r.a.createElement(A.a,{onPress:function(){return a(n)}},r.a.createElement(g.a,{style:[o,t]},r.a.createElement(S,{scaleUnit:i})))},ye=r.a.forwardRef((function(e,t){var n=e.scaleUnit,i=Se(),o=Object(a.useState)(0),c=Object(f.a)(o,2),u=c[0],l=c[1],s=function(e){l(e)},d=function(){return 0===u?{player:0,computer:1}:{player:1,computer:0}};Object(a.useImperativeHandle)(t,(function(){return{getSelectedStack:d}}));var m=0===u?{borderColor:"#B9CC3F"}:{borderColor:"green"},p=1===u?{borderColor:"#B9CC3F"}:{borderColor:"green"};return r.a.createElement(g.a,{style:i.container},r.a.createElement(g.a,{style:{flexDirection:"row"}},r.a.createElement(he,{displayColor:m,number:0,selectStack:s,scaleUnit:n}),r.a.createElement(g.a,{style:{width:30}}),r.a.createElement(he,{displayColor:p,number:1,selectStack:s,scaleUnit:n})))})),Se=function(e){return p.a.create({container:{alignItems:"center"},instructionText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial",marginBottom:e/3}})},Ce=n(80),Oe=n.n(Ce),je={setGameSettings:function(e){return{type:"SET_GAME_SETTINGS",data:e}}},xe=Object(c.b)((function(e){return{game:e.game}}),je)((function(e){var t=e.scaleUnit,n=Ee(t),a=r.a.createRef(),i=r.a.createRef(),o=r.a.createRef(),c=new v.a.Value(1),u={opacity:c};return r.a.createElement(v.a.View,{style:[n.container,u]},r.a.createElement(h.a,{style:n.instructionText},"select opponent skill level"),r.a.createElement(be,{scaleUnit:t,optionCount:3,ref:a}),r.a.createElement(h.a,{style:n.instructionText},"select opponent speed"),r.a.createElement(be,{scaleUnit:t,optionCount:5,ref:i}),r.a.createElement(h.a,{style:n.instructionText},"select your stack"),r.a.createElement(ye,{scaleUnit:t,ref:o}),r.a.createElement(g.a,{style:n.spacer}),r.a.createElement(A.a,{onPress:function(){v.a.timing(c,{toValue:0,duration:1e3}).start();var t=function(){for(var e=[],t=1;t<5;t++)for(var n=1;n<14;n++)e.push({suit:t,value:n});var a=Oe()(e);return[a.slice(0,26),a.slice(26)]}();setTimeout((function(){e.setGameSettings({skill:a.current.getSelectedValue(),speed:i.current.getSelectedValue(),playerStack:t[o.current.getSelectedStack().player],computerStack:t[o.current.getSelectedStack().computer],isOn:!0})}),1e3)},style:n.buttonView},r.a.createElement(h.a,{style:n.buttonText},"save settings")))})),Ee=function(e){return p.a.create({container:{alignItems:"center",marginTop:50},instructionText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial",marginBottom:e/3},spacer:{height:e/2},buttonView:{backgroundColor:"#B9CC3F",padding:e/5,borderRadius:8,marginTop:e/5},buttonText:{color:"green",fontFamily:"Arial",fontSize:e/2.5}})},we=function(e){var t=e.scaleUnit,n=Object(a.useState)(!1),i=Object(f.a)(n,2),o=i[0],c=i[1];return r.a.createElement(g.a,null,o?r.a.createElement(xe,{scaleUnit:t}):r.a.createElement(me,{startSetting:function(){c(!0)},scaleUnit:t}))},Ae=Object(c.b)((function(e){return{game:e.game}}),{})((function(e){return r.a.createElement(g.a,null,r.a.createElement(h.a,null,"Winner of the round:"),r.a.createElement(h.a,null,e.winner))})),ke=Object(c.b)((function(e){return{game:e.game}}),{})((function(e){var t=m.a.get("window").width,n=m.a.get("window").height,i=Math.min(t/6,n/10.2),o=Le(t,n),c=(t-6*i)/2,u=De(i,c),l=e.game.isOn,s=Object(a.useState)("none"),d=Object(f.a)(s,2),p=d[0],b=d[1],v=function(e){b(e)},h=function(){return"none"===p?r.a.createElement(ce,{scaleUnit:i,spacing:c,gameRoundOver:v,unitsAndLocations:u}):r.a.createElement(Ae,{winner:p})};return r.a.createElement(g.a,{style:o.screen},l?r.a.createElement(h,null):r.a.createElement(we,{scaleUnit:i}))})),Le=function(e,t){return p.a.create({screen:{width:e,height:t,backgroundColor:"green"}})},De=function(e,t){return{unit:e,spacing:t,leftDealingStackXY:{x:t+1/6*e,y:4.675*e},leftGamingStackXY:{x:t+(1/6+1+4/6)*e,y:4.675*e},rightGamingStackXY:{x:t+(1/6+1+4/6+1+2/6)*e,y:4.675*e},rightDealingStackXY:{x:t+4.833333333333334*e,y:4.675*e},timing:{moveDurationDealing:1e3,flipDurationDealing:600,moveDurationComputerCardGaming:1e3,flipDurationGaming:200,movementFinalization:100}}},Te=Object(u.c)(d),Ie=function(){return r.a.createElement(c.a,{store:Te},r.a.createElement(ke,null))};o.a.render(r.a.createElement(Ie,null),document.getElementById("root"))},81:function(e,t,n){e.exports=n(101)}},[[81,1,2]]]);
//# sourceMappingURL=main.f47cbc1c.chunk.js.map