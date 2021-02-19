import { selectForm, disableForm, enableForm, updateAddress } from './form.js';
import { getAdvertsNearBy } from './data.js';
import { generateCard } from './generate-template.js';

const LEAFLET_MAP = window.L;
//Константа для задания количества схожих объявлений при их генерации
const NEARBY_ADVERTS_QTY = 10;

const TOKYO_CITY_CENTER_COORD = {
  lat: 35.652832,
  lng: 139.839478,
}
const ZOOM = 10;
const mapLayer = document.querySelector('#map-canvas');

const adForm = selectForm('.ad-form');
const filterForm = selectForm('.map__filters');

//Отключение формы при инициализации страницы до загрузки карты
disableForm(adForm, 'ad-form--disabled');
disableForm(filterForm, 'map__filters--disabled');

const map = LEAFLET_MAP.map(mapLayer)
  .on('load', () => {
    enableForm(adForm, 'ad-form--disabled');
    enableForm(filterForm, 'map__filters--disabled');
    updateAddress(adForm, TOKYO_CITY_CENTER_COORD);
  })
  .setView(TOKYO_CITY_CENTER_COORD, ZOOM);

LEAFLET_MAP.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = LEAFLET_MAP.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = LEAFLET_MAP.marker(
  TOKYO_CITY_CENTER_COORD,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  updateAddress(adForm, evt.target.getLatLng());
});

const adverts = getAdvertsNearBy(NEARBY_ADVERTS_QTY);

adverts.forEach((advert) => {
  const adPinIcon = LEAFLET_MAP.icon({
    iconUrl: './img/pin.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  });
  const adMarker = LEAFLET_MAP.marker(
    {
      lat: advert.location.x,
      lng: advert.location.y,
    },
    {
      icon: adPinIcon,
    },
  );

  adMarker.addTo(map)
    .bindPopup(generateCard(advert));
});
