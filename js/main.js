import { getAdvertsNearBy } from './data.js';
//Константа для задания количества схожих объявлений при их генерации
const NEARBY_ADVERTS_QTY = 10;

const adverts = getAdvertsNearBy(NEARBY_ADVERTS_QTY);
adverts;
