'use strict';

var BinaryPack = require('binary-pack')
  , library = BinaryPack.BrowserSource;

/**
 * Message encoder.
 *
 * @param {Mixed} data The data that needs to be transformed.
 * @param {Function} fn Completion callback.
 * @api public
 */
exports.encoder = function encoder(data, fn) {
  var err;

  try { data = BinaryPack.pack(data); }
  catch (e) { err = e; }

  fn(err, data);
};

/**
 * Message decoder.
 *
 * @param {Mixed} data The data that needs to be transformed.
 * @param {Function} fn Completion callback.
 * @api public
 */
exports.decoder = function decoder(data, fn) {
  var err;

  try { data = BinaryPack.unpack(data); }
  catch (e) { err = e; }

  fn(err, data);
};

//
// Expose the library so it can be added in our Primus module.
//
exports.library = [
  'var BinaryPack = (function () {',
  '  try { return require("binary-pack"); }',
  '  catch (e) {}',
  '  return '+ library.slice(library.indexOf('return ') + 7, -4) +';',
  '})();',
  ''
].join('\n');
