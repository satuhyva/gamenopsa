(this.webpackJsonpgamenopsa=this.webpackJsonpgamenopsa||[]).push([[0],{76:function(e,t,n){e.exports=n(96)},96:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(21),l=n.n(o),c=n(18),i=n(24),u={isOn:!1},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_GAME_SETTINGS":return t.data;default:return e}},m=Object(i.b)({game:s}),d=n(4),f=n(73),g=Object(c.b)((function(e){return{game:e.game}}),{})((function(e){return r.a.createElement(d.a,null,r.a.createElement(f.a,null,"GAME"))})),E=n(30),b=n(38),y=n(5),h=n(98),p=n(99),C=function(e){return y.a.create({contents:{alignItems:"center",marginTop:e/2},titleView:{alignItems:"center"},titleText:{fontSize:e/1.5,fontWeigth:"bold",color:"#B9CC3F",fontFamily:"Arial Black"},infoText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial"},spacer:{height:e/2},buttonView:{backgroundColor:"#B9CC3F",padding:e/5,borderRadius:8,marginTop:e/5},buttonText:{color:"green",fontFamily:"Arial",fontSize:e/2.5}})},w=function(e){var t=e.startSetting,n=e.scaleUnit,a=C(n),o=new h.a.Value(1),l={opacity:o};return r.a.createElement(d.a,null,r.a.createElement(h.a.View,{style:l},r.a.createElement(d.a,{style:a.contents},r.a.createElement(f.a,{style:a.titleText},"nopsa"),r.a.createElement(f.a,{style:a.infoText},"a card game for those with"),r.a.createElement(f.a,{style:a.infoText}," skill, speed and luck"),r.a.createElement(d.a,{style:a.spacer}),r.a.createElement(f.a,{style:a.infoText},"feel like playing?"),r.a.createElement(p.a,{onPress:function(){h.a.timing(o,{toValue:0,duration:1e3}).start(),setTimeout((function(){t()}),1e3)},style:a.buttonView},r.a.createElement(f.a,{style:a.buttonText},"setup a new game")))))},S=function(e){var t=e.value,n=e.dotViewWidth,a={width:n,height:1.4*n,justifyContent:"center",alignItems:"center"},o={width:4,height:4,opacity:t>=e.dotNumber?1:.2,backgroundColor:"#B9CC3F",borderRadius:3};return r.a.createElement(d.a,{style:a},r.a.createElement(d.a,{style:o}))},v=function(e){var t=e.value,n=e.dotNumber,a=e.dotViewWidth,o=e.handleSelectionChanged,l={width:a,height:1.4*a,justifyContent:"center",alignItems:"center",borderWidth:1.5,opacity:t>=n?1:.2,borderColor:"#B9CC3F",borderRadius:a};return r.a.createElement(p.a,{onPress:function(){return o(n)}},r.a.createElement(d.a,{style:l},r.a.createElement(d.a,{style:{width:4,height:4,backgroundColor:"#B9CC3F",borderRadius:2}})))},T=r.a.forwardRef((function(e,t){var n=e.scaleUnit,o=e.optionCount-1,l=Object(a.useState)(1),c=Object(E.a)(l,2),i=c[0],u=c[1],s=6*n/30,m=function(e){var t,n=i,a=Math.max(e-i,i-e);function r(t){return setInterval((function(){"up"===t&&n<e?(n++,u(n)):"down"===t&&e<n&&(n--,u(n))}),180/a)}i<e?t=r("up"):i>e&&(t=r("down")),setTimeout((function(){clearInterval(t)}),180*a)},f=function(){return(i-1)/6+1};Object(a.useImperativeHandle)(t,(function(){return{getSelectedValue:f}}));return r.a.createElement(d.a,{style:k.container},r.a.createElement(d.a,{style:k.dotSliderView},function(){for(var e=[],t=1;t<=6*o+1;t++)(t-1)%6!==0?e.push(r.a.createElement(S,{key:t,value:i,dotViewWidth:s,dotNumber:t})):e.push(r.a.createElement(v,{key:t,value:i,dotViewWidth:s,handleSelectionChanged:m,dotNumber:t}));return e}()))})),k=y.a.create({container:{alignItems:"center",marginBottom:50},instructionText:{color:"#B9CC3F",fontFamily:"Arial",fontWeight:"bold",marginBottom:15},dotSliderView:{flexDirection:"row",alignItems:"center"}}),x=function(e){var t=e.scaleUnit,n={justifyContent:"center",alignItems:"center",backgroundColor:"#B9CC3F",width:t,height:1.7*t,borderRadius:6};return r.a.createElement(d.a,{style:n},function(){for(var e=[],n=0;n<9;n++)e.push(r.a.createElement(f.a,{key:n,style:{color:"green",fontSize:t/7}},"\xa9\xa9\xa9\xa9\xa9\xa9\xa9"));return e}())},F=function(e){var t=e.displayColor,n=e.number,a=e.selectStack,o=e.scaleUnit,l={width:1.5*o,height:1.7*o*1.3,borderRadius:9.1,borderWidth:1.3,justifyContent:"center",alignItems:"center"};return r.a.createElement(p.a,{onPress:function(){return a(n)}},r.a.createElement(d.a,{style:[l,t]},r.a.createElement(x,{scaleUnit:o})))},B=r.a.forwardRef((function(e,t){var n=e.scaleUnit,o=I(),l=Object(a.useState)(0),c=Object(E.a)(l,2),i=c[0],u=c[1],s=function(e){u(e)},m=function(){return 0===i?{player:0,computer:1}:{player:1,computer:0}};Object(a.useImperativeHandle)(t,(function(){return{getSelectedStack:m}}));var f=0===i?{borderColor:"#B9CC3F"}:{borderColor:"green"},g=1===i?{borderColor:"#B9CC3F"}:{borderColor:"green"};return r.a.createElement(d.a,{style:o.container},r.a.createElement(d.a,{style:{flexDirection:"row"}},r.a.createElement(F,{displayColor:f,number:0,selectStack:s,scaleUnit:n}),r.a.createElement(d.a,{style:{width:30}}),r.a.createElement(F,{displayColor:g,number:1,selectStack:s,scaleUnit:n})))})),I=function(e){return y.a.create({container:{alignItems:"center"},instructionText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial",marginBottom:e/3}})},j={setGameSettings:function(e){return{type:"SET_GAME_SETTINGS",data:e}}},V=Object(c.b)((function(e){return{game:e.game}}),j)((function(e){var t=e.scaleUnit,n=O(t),a=r.a.createRef(),o=r.a.createRef(),l=r.a.createRef();return r.a.createElement(d.a,{style:n.container},r.a.createElement(f.a,{style:n.instructionText},"select opponent skill level"),r.a.createElement(T,{scaleUnit:t,optionCount:3,ref:a}),r.a.createElement(f.a,{style:n.instructionText},"select opponent speed"),r.a.createElement(T,{scaleUnit:t,optionCount:5,ref:o}),r.a.createElement(f.a,{style:n.instructionText},"select your stack"),r.a.createElement(B,{scaleUnit:t,ref:l}),r.a.createElement(d.a,{style:n.spacer}),r.a.createElement(p.a,{onPress:function(){console.log("referenceSkill",a.current.getSelectedValue()),console.log("referenceSpeed",o.current.getSelectedValue()),console.log("referenceStack",l.current.getSelectedStack())},style:n.buttonView},r.a.createElement(f.a,{style:n.buttonText},"save settings")))})),O=function(e){return y.a.create({container:{alignItems:"center",marginTop:50},instructionText:{fontSize:e/2.5,color:"#B9CC3F",fontFamily:"Arial",marginBottom:e/3},spacer:{height:e/2},buttonView:{backgroundColor:"#B9CC3F",padding:e/5,borderRadius:8,marginTop:e/5},buttonText:{color:"green",fontFamily:"Arial",fontSize:e/2.5}})},U=function(){var e=b.a.get("window").width,t=b.a.get("window").height,n=Math.min(e/6,t/10.2),o=R(e,t),l=Object(a.useState)(!1),c=Object(E.a)(l,2),i=c[0],u=c[1];return r.a.createElement(d.a,{style:o.screen},i?r.a.createElement(V,{scaleUnit:n}):r.a.createElement(w,{startSetting:function(){u(!0)},scaleUnit:n}))},R=function(e,t){return y.a.create({screen:{alignItems:"center",width:e,height:t,backgroundColor:"green"}})},A=Object(c.b)((function(e){return{game:e.game}}),{})((function(e){var t=e.game.isOn;return console.log("GameOfNopsa"),r.a.createElement(d.a,null,t?r.a.createElement(g,null):r.a.createElement(U,null))})),W=Object(i.c)(m),z=function(){return r.a.createElement(c.a,{store:W},r.a.createElement(A,null))};l.a.render(r.a.createElement(z,null),document.getElementById("root"))}},[[76,1,2]]]);
//# sourceMappingURL=main.ed7413d1.chunk.js.map