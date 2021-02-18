import { getAdvertsNearBy } from './data.js';
import './form.js';
import './inactive-page.js';
//Константа для задания количества схожих объявлений при их генерации
const NEARBY_ADVERTS_QTY = 10;

const adverts = getAdvertsNearBy(NEARBY_ADVERTS_QTY);

adverts;
