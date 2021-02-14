import { getAdvertsNearBy } from './data.js';
import { getCards } from './generate-template.js';
//Константа для задания количества схожих объявлений при их генерации
const NEARBY_ADVERTS_QTY = 1;

const adverts = getAdvertsNearBy(NEARBY_ADVERTS_QTY);

const map = document.querySelector('#map-canvas');
map.appendChild(getCards(adverts));
