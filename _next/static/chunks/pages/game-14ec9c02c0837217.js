(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[203],{171:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/game",function(){return n(1555)}])},1555:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return E}});var r=n(5893),i=n(185),a=n.n(i),l=n(1163),s=n(7294),o=n(2237);let u=(e,t)=>{let n=(t-e.createdAt)/1e3,r=300*n*e.direction.x,i=300*n*e.direction.y,a=e.createdPosition.x+r,l=e.createdPosition.y+i;return[a,l]},c=e=>{let{bullet:t,currentTime:n}=e,[i,a]=u(t,n);return(0,r.jsx)(o.Cd,{x:i,y:a,radius:5,fill:"red"})};var d=n(1733),h=n(4420),f=n.n(h);let x=e=>{let{enemies:t}=e,n=(0,s.useRef)([]),[i]=f()(d.D.images.ufo_jpg),[l]=f()(d.D.images.ufo_2_PNG),[u]=f()(d.D.images.ufo_3_PNG);return(0,s.useEffect)(()=>{var e,t;let r=new(a()).Animation(e=>{n.current.forEach(t=>{if(t.current){var n;let r=Math.floor(((null!==(n=null==e?void 0:e.time)&&void 0!==n?n:0)/10+t.current.x())*Math.PI)/100;t.current.offset({x:5*Math.cos(r),y:5*Math.sin(r)})}})},null===(e=n.current[0])||void 0===e?void 0:null===(t=e.current)||void 0===t?void 0:t.getLayer());return r.start(),()=>{r.stop()}},[]),(0,r.jsx)(r.Fragment,{children:t.map((e,t)=>(n.current[t]=(0,s.createRef)(),(0,r.jsx)(o.Ee,{image:[i,l,u][e.type-1],width:80,height:80,x:e.createdPosition.x-40,y:e.createdPosition.y-40,ref:n.current[t]},e.id)))})};var y=n(1290),m=n(6850),p=n.n(m);let _=()=>{let e=(0,l.useRouter)(),[t,n]=(0,s.useState)(0);return(0,s.useEffect)(()=>{let t=async()=>{let t=await y.x.game.config.$get();null!==t&&n(t),0===t&&e.push("/game/config")};t()},[e]),(0,r.jsxs)("div",{className:p().container,children:[(0,r.jsxs)("div",{className:p().title,children:[(0,r.jsx)("h1",{children:"Gradius"}),(0,r.jsx)("h2",{children:"Config"})]}),(0,r.jsx)("div",{className:p().buttons,children:[...Array(t)].map((t,n)=>(0,r.jsx)("button",{className:p().button,onClick:()=>e.push({query:{display:n}}),children:n},n))}),(0,r.jsx)("p",{className:p().text,children:"画面を選択してください"})]})},v=e=>{let{player:t}=e,[n]=f()(d.D.images.spaceship_png);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Ee,{image:n,width:100,height:100,rotation:"red"===t.team?90:-90,x:t.position.x+50,y:t.position.y-50},t.id),(0,r.jsx)(o.xv,{text:t.name,x:t.position.x-10,y:t.position.y+60,fontSize:24,fill:"black",align:"center"})]})},b=(e,t,n)=>t.filter(t=>{let r=u(t,n),i=Math.pow(e.x-r[0],2)+Math.pow(e.y-r[1],2);return i<2500});var w=n(201),g=n.n(w);let j=()=>{let e=(0,l.useRouter)(),t=void 0===e.query.display?null:Number(e.query.display);if(null===t)return(0,r.jsx)(_,{});let n=()=>{let[e,n]=(0,s.useState)([]),[i,l]=(0,s.useState)([]),[u,d]=(0,s.useState)([]),[h,f]=(0,s.useState)([]),[m,p]=(0,s.useState)(Date.now()),_=(0,s.useRef)([]),[w,j]=(0,s.useState)(0),[E,P]=(0,s.useState)(0),M=async e=>{let t=await y.x.player.$get({query:{display:e}});null!==t&&n(t)},N=async e=>{let t=await y.x.enemy.$get({query:{display:e}});null!==t&&l(t)},I=async e=>{let t=await y.x.bullet.$get({query:{display:e}});null!==t&&(d(t.players),f(t.enemies))},L=(0,s.useCallback)(async()=>{let e=[];for(let t of i){let n=b(t.createdPosition,u,m)[0];if(void 0!==n&&n.playerId){let e={enemyId:t.id,playerId:n.playerId};await y.x.enemy.$delete({body:e}),await y.x.bullet.$delete({body:{bulletId:n.id}})}else e.push(t)}},[m,i,u]),S=(0,s.useCallback)(async()=>{Promise.all(e.map(e=>{let n=b(e.position,h,m);return n.map(n=>y.x.player.delete({body:{player:e,bulletId:n.id,display:t}}))}).flat()).then(e=>e.forEach(e=>{}))},[m,e,h]),k=(0,s.useCallback)(async()=>{let n=[];for(let r of i){let i=e.find(e=>{let t=Math.pow(r.createdPosition.x-e.position.x,2)+Math.pow(r.createdPosition.y-e.position.y,2);return t<1e4});void 0!==i?await y.x.game.$post({body:{player:i,enemy:r,display:t}}):n.push(r)}},[i,e]);return(0,s.useEffect)(()=>{let e=requestAnimationFrame(()=>{M(t),N(t),I(t),L(),k(),S(),p(Date.now())});return()=>cancelAnimationFrame(e)},[S,k,L]),(0,s.useEffect)(()=>{var e,t;let n=new(a()).Animation(e=>{_.current.forEach(t=>{if(t.current){var n,r;t.current.offset({x:5*Math.cos(Math.floor(((null!==(n=null==e?void 0:e.time)&&void 0!==n?n:0)/10+t.current.x())*Math.PI)/100),y:5*Math.sin(Math.floor((null!==(r=null==e?void 0:e.time)&&void 0!==r?r:0)/10*Math.PI+t.current.y())/100)})}})},null===(e=_.current[0])||void 0===e?void 0:null===(t=e.current)||void 0===t?void 0:t.getLayer());return n.start(),()=>{n.stop()}},[]),(0,s.useEffect)(()=>{let e=()=>{j(window.innerWidth),P(window.innerHeight)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),(0,r.jsx)("div",{className:g()["canvas-container"],children:(0,r.jsxs)(o.Hf,{width:1920,height:1080,style:{transform:"\n            scale( ".concat(w/1920,", ").concat(E/1080," )\n            translate(").concat((w-1920)/2,"px, ").concat((E-1080)/2,"px)")},children:[(0,r.jsx)(o.mh,{children:u.map(e=>(0,r.jsx)(c,{bullet:e,currentTime:m},e.id))}),(0,r.jsx)(o.mh,{children:h.map(e=>(0,r.jsx)(c,{bullet:e,currentTime:m},e.id))}),(0,r.jsx)(o.mh,{children:e.map(e=>(0,r.jsx)(v,{player:e},e.id))}),(0,r.jsx)(o.mh,{children:(0,r.jsx)(x,{enemies:i})})]})})};return(0,r.jsx)(n,{})};var E=j},6850:function(e){e.exports={container:"Lobby_container__Z__4u",button:"Lobby_button__HHfXL",buttons:"Lobby_buttons__F_DSz",title:"Lobby_title__Twjsl",text:"Lobby_text__csIbQ"}},201:function(e){e.exports={"canvas-container":"game_canvas-container__wJcyG"}}},function(e){e.O(0,[289,774,888,179],function(){return e(e.s=171)}),_N_E=e.O()}]);