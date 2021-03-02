(()=>{"use strict";const e={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},t=({author:e,location:t,offer:r})=>{const o=t.lat.toFixed(5),n=t.lng.toFixed(5);return{author:{avatar:e.avatar},offer:{title:r.title,address:r.address,price:r.price,type:r.type,rooms:r.rooms,guests:r.guests,checkin:r.checkin,checkout:r.checkout,features:r.features,description:r.description,photos:r.photos},location:{x:o,y:n}}},r=t=>e[t],o=(e,t,r,o)=>{let n=Math.abs(e);return n%=100,n>=5&&n<=20?o:(n%=10,1===n?t:n>=2&&n<=4?r:o)},n=e=>{const t=document.createElement("div");t.style.zIndex=100,t.style.position="absolute",t.style.left=0,t.style.top=0,t.style.right=0,t.style.padding="10px 3px",t.style.fontSize="30px",t.style.textAlign="center",t.style.backgroundColor="red",t.textContent=e,document.body.append(t),setTimeout((()=>{t.remove()}),3e3)},a=document.querySelector("main"),s=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),c=s.querySelector(".error__button"),i=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),l=e=>{"Escape"!==e.key&&"Esc"!==e.key||(e.preventDefault(),d())},d=()=>{a.contains(s)&&a.removeChild(s),a.contains(i)&&a.removeChild(i),document.removeEventListener("keydown",l)};c.addEventListener("click",(()=>{d()})),s.addEventListener("click",(()=>{d()})),i.addEventListener("click",(()=>{d()}));const u=["gif","jpg","jpeg","png"],p=document.querySelector(".ad-form-header__input"),y=document.querySelector(".ad-form__input"),m=document.querySelector(".ad-form-header__preview"),h=document.querySelector(".ad-form__photo"),f=m.cloneNode(!0),v=h.cloneNode(!0),g=(e,t)=>{e.innerHTML=t.innerHTML,e.removeAttribute("style")},S=(e,t)=>{const r=e.files[0],o=r.name.toLowerCase();if(n=o,u.some((e=>n.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.minWidth=t.offsetWidth+"px",t.style.padding="0",t.innerHTML="";const r=document.createElement("img");r.src=e.result,r.style.maxWidth=t.offsetWidth+"px",r.style.maxHeight=t.offsetHeight+"px",t.appendChild(r)})),e.readAsDataURL(r)}var n};p.addEventListener("change",(()=>{S(p,m)})),y.addEventListener("change",(()=>{S(y,h)}));const _={palace:1e4,flat:1e3,house:5e3,bungalow:0},q={1:{1:"для 1 гостя"},2:{2:"для 2 гостей",1:"для 1 гостя"},3:{3:"для 3 гостей",2:"для 2 гостей",1:"для 1 гостя"},100:{0:"не для гостей"}},k=e=>{e.validity.valid?e.classList.remove("error-border"):e.classList.add("error-border")},b=document.querySelector(".ad-form"),E=document.querySelector(".map__filters"),x=b.querySelector("#title"),C=b.querySelector("#type"),w=b.querySelector("#price"),$=b.querySelector("#timein"),T=b.querySelector("#timeout"),V=b.querySelector(".ad-form__submit"),A=b.querySelector(".ad-form__reset"),j=b.querySelector("#room_number"),F=b.querySelector("#capacity"),D=b.elements,H=Array.from(D).filter((e=>["select","textarea","input"].includes(e.tagName.toLowerCase()))),M=(e,t)=>{e.classList.add(t);const r=e.children;for(let e=0;e<r.length;e++)r[e].disabled=!0},N=(e,t)=>{e.classList.remove(t);const r=e.children;for(let e=0;e<r.length;e++)r[e].disabled=!1},z=(e,t)=>{const r=t.lat.toFixed(5),o=t.lng.toFixed(5);e.value=`${r}, ${o}`},W=()=>{F.setCustomValidity(""),Object.keys(q[j.value]).includes(F.value)||F.setCustomValidity(`При выборе ${j.value} ${o(j.value,"комнаты","комнат","комнат")} доступны места:\n    ${Object.values(q[j.value]).join(", ")}.`),k(F),F.reportValidity()},O=e=>{const t=new Event("change");b.reset(),Array.from(b.querySelectorAll(".error-border")).forEach((e=>{e.validity.valid||e.classList.remove("error-border")})),g(m,f),g(h,v),E.reset(),E.dispatchEvent(t),me(),e&&(a.appendChild(i),document.addEventListener("keydown",l))};var P;x.addEventListener("input",(()=>{const e=x.value.length;x.setCustomValidity(""),e<30&&x.setCustomValidity(`Заголовок объявления должен содержать не менее 30. Добавьте ещё ${30-e} симв.`),e>100&&x.setCustomValidity(`Заголовок объявления должен быть короче 30 символов. Удалите лишние ${e-100} симв.`),k(x),x.reportValidity()})),w.addEventListener("input",(()=>{const e=w.value;w.setCustomValidity(""),e<_[C.value]&&w.setCustomValidity(`Цена не может быть менее ${_[C.value]}`),k(w),w.reportValidity()})),C.addEventListener("change",(()=>{w.placeholder=_[C.value],w.min=_[C.value]})),$.addEventListener("change",(()=>{T.value=$.value})),T.addEventListener("change",(()=>{$.value=T.value})),V.addEventListener("click",(()=>{H.forEach((e=>{k(e)}))})),j.addEventListener("change",W),F.addEventListener("change",W),A.addEventListener("click",(e=>{e.preventDefault(),O(!1)})),P=O,b.addEventListener("submit",(e=>{e.preventDefault(),((e,t,r)=>{fetch("https://22.javascript.pages.academy/keksobooking",{method:"POST",body:r}).then((r=>{r.ok?e():t()})).catch((()=>{t()}))})((()=>P(!0)),(()=>(a.appendChild(s),void document.addEventListener("keydown",l))),new FormData(e.target))}));const U=document.querySelector("#card").content,I=e=>!e,R=e=>0===e.length,G=e=>e.classList.add("visually-hidden"),B={low:1e4,high:5e4,any:0},J=document.querySelector(".map__filters"),K=J.querySelector("#housing-type"),Q=J.querySelector("#housing-price"),X=J.querySelector("#housing-rooms"),Y=J.querySelector("#housing-guests"),Z=J.querySelector("#housing-features"),ee=()=>{return{price:Q.value,type:K.value,rooms:X.value,guests:Y.value,features:(e=Z,Array.from(e.querySelectorAll("input:checked")).map((e=>e.value)))};var e};let te=ee();const re=e=>"any"!==e,oe=e=>{let t=[];if(0!==te.features.length&&t.push(te.features.every((t=>e.offer.features.includes(t)))),re(te.price))switch(te.price){case"low":t.push(e.offer.price<B[te.price]);break;case"high":t.push(e.offer.price>B[te.price]);break;case"middle":t.push(e.offer.price>=B.low&&e.offer.price<=B.high)}return re(te.type)&&t.push(te.type===e.offer.type),re(te.rooms)&&t.push(te.rooms===e.offer.rooms.toString()),re(te.guests)&&t.push(te.guests===e.offer.guests.toString()),!t.includes(!1)},ne={lat:35.652832,lng:139.839478},ae={iconUrl:"./img/pin.svg",iconSize:[26,26],iconAnchor:[13,26]},se=document.querySelector("#map-canvas"),ce=document.querySelector(".ad-form"),ie=document.querySelector(".map__filters"),le=ce.querySelector("#address");M(ce,"ad-form--disabled"),M(ie,"map__filters--disabled");const de=L.map(se).on("load",(()=>{var e;N(ce,"ad-form--disabled"),z(le,ne),e=n,fetch("https://22.javascript.pages.academy/keksobooking/data").then((t=>{if(t.ok)return t.json();e("Не удалось получить данные с сервера. Попробуйте ещё раз")})).then((e=>{(e=>{const r=e.map(t);var o;N(ie,"map__filters--disabled"),he(r),o=((e,t)=>{let r;return()=>{clearTimeout(r),r=setTimeout((()=>{r=null,e.apply(void 0)}),t),r||e.apply(void 0)}})((()=>he(r)),500),J.addEventListener("change",(()=>{te=ee(),o()}))})(e)})).catch((()=>{e("Не удалось получить данные с сервера. Попробуйте ещё раз")}))})).setView(ne,8.4);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(de);const ue=L.icon({iconUrl:"./img/main-pin.svg",iconSize:[52,52],iconAnchor:[26,52]}),pe=L.marker(ne,{draggable:!0,icon:ue}),ye=L.layerGroup().addTo(de);pe.addTo(de),pe.on("moveend",(e=>{z(le,e.target.getLatLng())}));const me=()=>{de.setView(ne,8.4),de.closePopup(),pe.setLatLng(ne),z(le,ne)},he=e=>{de.closePopup(),ye.clearLayers(),(e=>e.slice().filter(oe))(e).slice(0,10).forEach((e=>{const t=L.icon(ae);L.marker({lat:e.location.x,lng:e.location.y},{icon:t}).addTo(ye).bindPopup((({author:e,offer:t})=>{const n=U.querySelector(".popup").cloneNode(!0),a=n.querySelector(".popup__title"),s=n.querySelector(".popup__text--address"),c=n.querySelector(".popup__text--price"),i=n.querySelector(".popup__type"),l=n.querySelector(".popup__text--capacity"),d=n.querySelector(".popup__text--time"),u=n.querySelector(".popup__features"),p=n.querySelector(".popup__description"),y=n.querySelector(".popup__photos"),m=y.querySelector(".popup__photo"),h=n.querySelector(".popup__avatar");var f,v;if(I(t.title)?G(a):a.textContent=t.title,I(t.address)?G(s):s.textContent=t.address,I(t.price)?G(c):c.textContent=`${t.price} ₽/ночь`,I(r(t.type))?G(i):i.textContent=r(t.type),I(t.rooms)||I(t.guests)?G(l):l.textContent=(f=t.rooms,v=t.guests,`${f} ${o(f,"комната","комнаты","комнат")} для ${v} ${o(v,"гостя","гостей","гостей")}`),I(t.checkin)||I(t.checkout)?G(d):d.textContent=`Заезд после ${t.checkin}, выезд до ${t.checkout}`,I(t.description)?G(p):p.textContent=t.description,I(e.avatar)?G(h):h.src=e.avatar,R(t.features)?G(u):(u.innerHTML="",u.appendChild((e=>{const t=document.createDocumentFragment();return e.forEach((e=>{const r=document.createElement("li");r.classList.add("popup__feature"),r.classList.add(`popup__feature--${e}`),t.appendChild(r)})),t})(t.features))),R(t.photos))G(y);else{const e=((e,t)=>{const r=document.createDocumentFragment();return e.forEach((e=>{const o=t.cloneNode(!0);o.src=e,o.alt="Фотография жилья",r.appendChild(o)})),r})(t.photos,m);y.innerHTML="",y.appendChild(e)}return n})(e))}))}})();
//# sourceMappingURL=main.bundle.js.map