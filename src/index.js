import h_cx from './helpers/do-class.js';
import * as h_empty from './helpers/empty.js';
import h_forceArray from './helpers/force-array.js';
import h_head from './helpers/head.js';
import * as h_inputClean from './helpers/input.js';
import * as h_selectors from './helpers/selectors.js';
import h_setTime from './helpers/set-time.js';
import h_tokenGenerate from './helpers/token-generate.js';
import * as h_updatePackages from './helpers/get-latest-version.js';

export const { isEmpty, notEmpty } = h_empty;
export const { s, sAll, sEl, sElAll } = h_selectors;
export const { striptags, entities, xss } = h_inputClean;
export const { getLatestVersion, updatePackages } = h_updatePackages;

export const cx = h_cx;
export const forceArray = h_forceArray;
export const head = h_head;
export const setTime = h_setTime;
export const tokenGenerate = h_tokenGenerate;
