import { getAdvertsNearBy } from './data.js';
import { generateCard } from './generate-template.js';
import './form.js';
//Константа для задания количества схожих объявлений при их генерации
const NEARBY_ADVERTS_QTY = 10;

const adverts = getAdvertsNearBy(NEARBY_ADVERTS_QTY);

const map = document.querySelector('#map-canvas');
