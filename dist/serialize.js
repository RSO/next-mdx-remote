import { compile } from '@mdx-js/mdx'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import require$$0 from 'os'

var lib$2 = {}

var lib$1 = {}

var jsTokens = {}

// Copyright 2014, 2015, 2016, 2017, 2018 Simon Lydell
// License: MIT. (See LICENSE.)

Object.defineProperty(jsTokens, '__esModule', {
  value: true,
})

// This regex comes from regex.coffee, and is inserted here by generate-index.js
// (run `npm run build`).
jsTokens.default =
  /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g

jsTokens.matchToToken = function (match) {
  var token = { type: 'invalid', value: match[0], closed: undefined }
  if (match[1])
    (token.type = 'string'), (token.closed = !!(match[3] || match[4]))
  else if (match[5]) token.type = 'comment'
  else if (match[6]) (token.type = 'comment'), (token.closed = !!match[7])
  else if (match[8]) token.type = 'regex'
  else if (match[9]) token.type = 'number'
  else if (match[10]) token.type = 'name'
  else if (match[11]) token.type = 'punctuator'
  else if (match[12]) token.type = 'whitespace'
  return token
}

var lib = {}

var identifier = {}

Object.defineProperty(identifier, '__esModule', {
  value: true,
})
identifier.isIdentifierStart = isIdentifierStart
identifier.isIdentifierChar = isIdentifierChar
identifier.isIdentifierName = isIdentifierName
let nonASCIIidentifierStartChars =
  '\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ca\ua7d0\ua7d1\ua7d3\ua7d5-\ua7d9\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc'
let nonASCIIidentifierChars =
  '\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f'
const nonASCIIidentifierStart = new RegExp(
  '[' + nonASCIIidentifierStartChars + ']'
)
const nonASCIIidentifier = new RegExp(
  '[' + nonASCIIidentifierStartChars + nonASCIIidentifierChars + ']'
)
nonASCIIidentifierStartChars = nonASCIIidentifierChars = null
const astralIdentifierStartCodes = [
  0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48,
  31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39,
  9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21,
  11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10,
  30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43,
  28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14,
  50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13,
  52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15,
  3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7,
  3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31,
  47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6,
  186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38,
  17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36,
  18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18,
  190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568,
  8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0,
  67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290,
  46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3,
  0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4,
  2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2,
  30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2,
  3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9,
  2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0,
  2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4,
  2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507,
  4938,
]
const astralIdentifierCodes = [
  509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574,
  3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10,
  8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83,
  11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4,
  4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9,
  82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1,
  13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7,
  2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1,
  2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8,
  3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3,
  149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16,
  3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759,
  9, 787719, 239,
]

function isInAstralSet(code, set) {
  let pos = 0x10000

  for (let i = 0, length = set.length; i < length; i += 2) {
    pos += set[i]
    if (pos > code) return false
    pos += set[i + 1]
    if (pos >= code) return true
  }

  return false
}

function isIdentifierStart(code) {
  if (code < 65) return code === 36
  if (code <= 90) return true
  if (code < 97) return code === 95
  if (code <= 122) return true

  if (code <= 0xffff) {
    return (
      code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code))
    )
  }

  return isInAstralSet(code, astralIdentifierStartCodes)
}

function isIdentifierChar(code) {
  if (code < 48) return code === 36
  if (code < 58) return true
  if (code < 65) return false
  if (code <= 90) return true
  if (code < 97) return code === 95
  if (code <= 122) return true

  if (code <= 0xffff) {
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code))
  }

  return (
    isInAstralSet(code, astralIdentifierStartCodes) ||
    isInAstralSet(code, astralIdentifierCodes)
  )
}

function isIdentifierName(name) {
  let isFirst = true

  for (let i = 0; i < name.length; i++) {
    let cp = name.charCodeAt(i)

    if ((cp & 0xfc00) === 0xd800 && i + 1 < name.length) {
      const trail = name.charCodeAt(++i)

      if ((trail & 0xfc00) === 0xdc00) {
        cp = 0x10000 + ((cp & 0x3ff) << 10) + (trail & 0x3ff)
      }
    }

    if (isFirst) {
      isFirst = false

      if (!isIdentifierStart(cp)) {
        return false
      }
    } else if (!isIdentifierChar(cp)) {
      return false
    }
  }

  return !isFirst
}

var keyword = {}

Object.defineProperty(keyword, '__esModule', {
  value: true,
})
keyword.isReservedWord = isReservedWord
keyword.isStrictReservedWord = isStrictReservedWord
keyword.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord
keyword.isStrictBindReservedWord = isStrictBindReservedWord
keyword.isKeyword = isKeyword
const reservedWords = {
  keyword: [
    'break',
    'case',
    'catch',
    'continue',
    'debugger',
    'default',
    'do',
    'else',
    'finally',
    'for',
    'function',
    'if',
    'return',
    'switch',
    'throw',
    'try',
    'var',
    'const',
    'while',
    'with',
    'new',
    'this',
    'super',
    'class',
    'extends',
    'export',
    'import',
    'null',
    'true',
    'false',
    'in',
    'instanceof',
    'typeof',
    'void',
    'delete',
  ],
  strict: [
    'implements',
    'interface',
    'let',
    'package',
    'private',
    'protected',
    'public',
    'static',
    'yield',
  ],
  strictBind: ['eval', 'arguments'],
}
const keywords = new Set(reservedWords.keyword)
const reservedWordsStrictSet = new Set(reservedWords.strict)
const reservedWordsStrictBindSet = new Set(reservedWords.strictBind)

function isReservedWord(word, inModule) {
  return (inModule && word === 'await') || word === 'enum'
}

function isStrictReservedWord(word, inModule) {
  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word)
}

function isStrictBindOnlyReservedWord(word) {
  return reservedWordsStrictBindSet.has(word)
}

function isStrictBindReservedWord(word, inModule) {
  return (
    isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word)
  )
}

function isKeyword(word) {
  return keywords.has(word)
}

;(function (exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  })
  Object.defineProperty(exports, 'isIdentifierName', {
    enumerable: true,
    get: function () {
      return _identifier.isIdentifierName
    },
  })
  Object.defineProperty(exports, 'isIdentifierChar', {
    enumerable: true,
    get: function () {
      return _identifier.isIdentifierChar
    },
  })
  Object.defineProperty(exports, 'isIdentifierStart', {
    enumerable: true,
    get: function () {
      return _identifier.isIdentifierStart
    },
  })
  Object.defineProperty(exports, 'isReservedWord', {
    enumerable: true,
    get: function () {
      return _keyword.isReservedWord
    },
  })
  Object.defineProperty(exports, 'isStrictBindOnlyReservedWord', {
    enumerable: true,
    get: function () {
      return _keyword.isStrictBindOnlyReservedWord
    },
  })
  Object.defineProperty(exports, 'isStrictBindReservedWord', {
    enumerable: true,
    get: function () {
      return _keyword.isStrictBindReservedWord
    },
  })
  Object.defineProperty(exports, 'isStrictReservedWord', {
    enumerable: true,
    get: function () {
      return _keyword.isStrictReservedWord
    },
  })
  Object.defineProperty(exports, 'isKeyword', {
    enumerable: true,
    get: function () {
      return _keyword.isKeyword
    },
  })

  var _identifier = identifier

  var _keyword = keyword
})(lib)

var chalk = { exports: {} }

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g

var escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string')
  }

  return str.replace(matchOperatorsRe, '\\$&')
}

var ansiStyles = { exports: {} }

var conversions$2 = { exports: {} }

var colorName = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50],
}

/* MIT license */

var cssKeywords = colorName

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {}
for (var key in cssKeywords) {
  if (cssKeywords.hasOwnProperty(key)) {
    reverseKeywords[cssKeywords[key]] = key
  }
}

var convert$2 = (conversions$2.exports = {
  rgb: { channels: 3, labels: 'rgb' },
  hsl: { channels: 3, labels: 'hsl' },
  hsv: { channels: 3, labels: 'hsv' },
  hwb: { channels: 3, labels: 'hwb' },
  cmyk: { channels: 4, labels: 'cmyk' },
  xyz: { channels: 3, labels: 'xyz' },
  lab: { channels: 3, labels: 'lab' },
  lch: { channels: 3, labels: 'lch' },
  hex: { channels: 1, labels: ['hex'] },
  keyword: { channels: 1, labels: ['keyword'] },
  ansi16: { channels: 1, labels: ['ansi16'] },
  ansi256: { channels: 1, labels: ['ansi256'] },
  hcg: { channels: 3, labels: ['h', 'c', 'g'] },
  apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
  gray: { channels: 1, labels: ['gray'] },
})

// hide .channels and .labels properties
for (var model in convert$2) {
  if (convert$2.hasOwnProperty(model)) {
    if (!('channels' in convert$2[model])) {
      throw new Error('missing channels property: ' + model)
    }

    if (!('labels' in convert$2[model])) {
      throw new Error('missing channel labels property: ' + model)
    }

    if (convert$2[model].labels.length !== convert$2[model].channels) {
      throw new Error('channel and label counts mismatch: ' + model)
    }

    var channels = convert$2[model].channels
    var labels = convert$2[model].labels
    delete convert$2[model].channels
    delete convert$2[model].labels
    Object.defineProperty(convert$2[model], 'channels', { value: channels })
    Object.defineProperty(convert$2[model], 'labels', { value: labels })
  }
}

convert$2.rgb.hsl = function (rgb) {
  var r = rgb[0] / 255
  var g = rgb[1] / 255
  var b = rgb[2] / 255
  var min = Math.min(r, g, b)
  var max = Math.max(r, g, b)
  var delta = max - min
  var h
  var s
  var l

  if (max === min) {
    h = 0
  } else if (r === max) {
    h = (g - b) / delta
  } else if (g === max) {
    h = 2 + (b - r) / delta
  } else if (b === max) {
    h = 4 + (r - g) / delta
  }

  h = Math.min(h * 60, 360)

  if (h < 0) {
    h += 360
  }

  l = (min + max) / 2

  if (max === min) {
    s = 0
  } else if (l <= 0.5) {
    s = delta / (max + min)
  } else {
    s = delta / (2 - max - min)
  }

  return [h, s * 100, l * 100]
}

convert$2.rgb.hsv = function (rgb) {
  var rdif
  var gdif
  var bdif
  var h
  var s

  var r = rgb[0] / 255
  var g = rgb[1] / 255
  var b = rgb[2] / 255
  var v = Math.max(r, g, b)
  var diff = v - Math.min(r, g, b)
  var diffc = function (c) {
    return (v - c) / 6 / diff + 1 / 2
  }

  if (diff === 0) {
    h = s = 0
  } else {
    s = diff / v
    rdif = diffc(r)
    gdif = diffc(g)
    bdif = diffc(b)

    if (r === v) {
      h = bdif - gdif
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif
    }
    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }

  return [h * 360, s * 100, v * 100]
}

convert$2.rgb.hwb = function (rgb) {
  var r = rgb[0]
  var g = rgb[1]
  var b = rgb[2]
  var h = convert$2.rgb.hsl(rgb)[0]
  var w = (1 / 255) * Math.min(r, Math.min(g, b))

  b = 1 - (1 / 255) * Math.max(r, Math.max(g, b))

  return [h, w * 100, b * 100]
}

convert$2.rgb.cmyk = function (rgb) {
  var r = rgb[0] / 255
  var g = rgb[1] / 255
  var b = rgb[2] / 255
  var c
  var m
  var y
  var k

  k = Math.min(1 - r, 1 - g, 1 - b)
  c = (1 - r - k) / (1 - k) || 0
  m = (1 - g - k) / (1 - k) || 0
  y = (1 - b - k) / (1 - k) || 0

  return [c * 100, m * 100, y * 100, k * 100]
}

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
  return (
    Math.pow(x[0] - y[0], 2) +
    Math.pow(x[1] - y[1], 2) +
    Math.pow(x[2] - y[2], 2)
  )
}

convert$2.rgb.keyword = function (rgb) {
  var reversed = reverseKeywords[rgb]
  if (reversed) {
    return reversed
  }

  var currentClosestDistance = Infinity
  var currentClosestKeyword

  for (var keyword in cssKeywords) {
    if (cssKeywords.hasOwnProperty(keyword)) {
      var value = cssKeywords[keyword]

      // Compute comparative distance
      var distance = comparativeDistance(rgb, value)

      // Check if its less, if so set as closest
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance
        currentClosestKeyword = keyword
      }
    }
  }

  return currentClosestKeyword
}

convert$2.keyword.rgb = function (keyword) {
  return cssKeywords[keyword]
}

convert$2.rgb.xyz = function (rgb) {
  var r = rgb[0] / 255
  var g = rgb[1] / 255
  var b = rgb[2] / 255

  // assume sRGB
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

  var x = r * 0.4124 + g * 0.3576 + b * 0.1805
  var y = r * 0.2126 + g * 0.7152 + b * 0.0722
  var z = r * 0.0193 + g * 0.1192 + b * 0.9505

  return [x * 100, y * 100, z * 100]
}

convert$2.rgb.lab = function (rgb) {
  var xyz = convert$2.rgb.xyz(rgb)
  var x = xyz[0]
  var y = xyz[1]
  var z = xyz[2]
  var l
  var a
  var b

  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116

  l = 116 * y - 16
  a = 500 * (x - y)
  b = 200 * (y - z)

  return [l, a, b]
}

convert$2.hsl.rgb = function (hsl) {
  var h = hsl[0] / 360
  var s = hsl[1] / 100
  var l = hsl[2] / 100
  var t1
  var t2
  var t3
  var rgb
  var val

  if (s === 0) {
    val = l * 255
    return [val, val, val]
  }

  if (l < 0.5) {
    t2 = l * (1 + s)
  } else {
    t2 = l + s - l * s
  }

  t1 = 2 * l - t2

  rgb = [0, 0, 0]
  for (var i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1)
    if (t3 < 0) {
      t3++
    }
    if (t3 > 1) {
      t3--
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3
    } else if (2 * t3 < 1) {
      val = t2
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
    } else {
      val = t1
    }

    rgb[i] = val * 255
  }

  return rgb
}

convert$2.hsl.hsv = function (hsl) {
  var h = hsl[0]
  var s = hsl[1] / 100
  var l = hsl[2] / 100
  var smin = s
  var lmin = Math.max(l, 0.01)
  var sv
  var v

  l *= 2
  s *= l <= 1 ? l : 2 - l
  smin *= lmin <= 1 ? lmin : 2 - lmin
  v = (l + s) / 2
  sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

  return [h, sv * 100, v * 100]
}

convert$2.hsv.rgb = function (hsv) {
  var h = hsv[0] / 60
  var s = hsv[1] / 100
  var v = hsv[2] / 100
  var hi = Math.floor(h) % 6

  var f = h - Math.floor(h)
  var p = 255 * v * (1 - s)
  var q = 255 * v * (1 - s * f)
  var t = 255 * v * (1 - s * (1 - f))
  v *= 255

  switch (hi) {
    case 0:
      return [v, t, p]
    case 1:
      return [q, v, p]
    case 2:
      return [p, v, t]
    case 3:
      return [p, q, v]
    case 4:
      return [t, p, v]
    case 5:
      return [v, p, q]
  }
}

convert$2.hsv.hsl = function (hsv) {
  var h = hsv[0]
  var s = hsv[1] / 100
  var v = hsv[2] / 100
  var vmin = Math.max(v, 0.01)
  var lmin
  var sl
  var l

  l = (2 - s) * v
  lmin = (2 - s) * vmin
  sl = s * vmin
  sl /= lmin <= 1 ? lmin : 2 - lmin
  sl = sl || 0
  l /= 2

  return [h, sl * 100, l * 100]
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert$2.hwb.rgb = function (hwb) {
  var h = hwb[0] / 360
  var wh = hwb[1] / 100
  var bl = hwb[2] / 100
  var ratio = wh + bl
  var i
  var v
  var f
  var n

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio
    bl /= ratio
  }

  i = Math.floor(6 * h)
  v = 1 - bl
  f = 6 * h - i

  if ((i & 0x01) !== 0) {
    f = 1 - f
  }

  n = wh + f * (v - wh) // linear interpolation

  var r
  var g
  var b
  switch (i) {
    default:
    case 6:
    case 0:
      r = v
      g = n
      b = wh
      break
    case 1:
      r = n
      g = v
      b = wh
      break
    case 2:
      r = wh
      g = v
      b = n
      break
    case 3:
      r = wh
      g = n
      b = v
      break
    case 4:
      r = n
      g = wh
      b = v
      break
    case 5:
      r = v
      g = wh
      b = n
      break
  }

  return [r * 255, g * 255, b * 255]
}

convert$2.cmyk.rgb = function (cmyk) {
  var c = cmyk[0] / 100
  var m = cmyk[1] / 100
  var y = cmyk[2] / 100
  var k = cmyk[3] / 100
  var r
  var g
  var b

  r = 1 - Math.min(1, c * (1 - k) + k)
  g = 1 - Math.min(1, m * (1 - k) + k)
  b = 1 - Math.min(1, y * (1 - k) + k)

  return [r * 255, g * 255, b * 255]
}

convert$2.xyz.rgb = function (xyz) {
  var x = xyz[0] / 100
  var y = xyz[1] / 100
  var z = xyz[2] / 100
  var r
  var g
  var b

  r = x * 3.2406 + y * -1.5372 + z * -0.4986
  g = x * -0.9689 + y * 1.8758 + z * 0.0415
  b = x * 0.0557 + y * -0.204 + z * 1.057

  // assume sRGB
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92

  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92

  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92

  r = Math.min(Math.max(0, r), 1)
  g = Math.min(Math.max(0, g), 1)
  b = Math.min(Math.max(0, b), 1)

  return [r * 255, g * 255, b * 255]
}

convert$2.xyz.lab = function (xyz) {
  var x = xyz[0]
  var y = xyz[1]
  var z = xyz[2]
  var l
  var a
  var b

  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116

  l = 116 * y - 16
  a = 500 * (x - y)
  b = 200 * (y - z)

  return [l, a, b]
}

convert$2.lab.xyz = function (lab) {
  var l = lab[0]
  var a = lab[1]
  var b = lab[2]
  var x
  var y
  var z

  y = (l + 16) / 116
  x = a / 500 + y
  z = y - b / 200

  var y2 = Math.pow(y, 3)
  var x2 = Math.pow(x, 3)
  var z2 = Math.pow(z, 3)
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787

  x *= 95.047
  y *= 100
  z *= 108.883

  return [x, y, z]
}

convert$2.lab.lch = function (lab) {
  var l = lab[0]
  var a = lab[1]
  var b = lab[2]
  var hr
  var h
  var c

  hr = Math.atan2(b, a)
  h = (hr * 360) / 2 / Math.PI

  if (h < 0) {
    h += 360
  }

  c = Math.sqrt(a * a + b * b)

  return [l, c, h]
}

convert$2.lch.lab = function (lch) {
  var l = lch[0]
  var c = lch[1]
  var h = lch[2]
  var a
  var b
  var hr

  hr = (h / 360) * 2 * Math.PI
  a = c * Math.cos(hr)
  b = c * Math.sin(hr)

  return [l, a, b]
}

convert$2.rgb.ansi16 = function (args) {
  var r = args[0]
  var g = args[1]
  var b = args[2]
  var value = 1 in arguments ? arguments[1] : convert$2.rgb.hsv(args)[2] // hsv -> ansi16 optimization

  value = Math.round(value / 50)

  if (value === 0) {
    return 30
  }

  var ansi =
    30 +
    ((Math.round(b / 255) << 2) |
      (Math.round(g / 255) << 1) |
      Math.round(r / 255))

  if (value === 2) {
    ansi += 60
  }

  return ansi
}

convert$2.hsv.ansi16 = function (args) {
  // optimization here; we already know the value and don't need to get
  // it converted for us.
  return convert$2.rgb.ansi16(convert$2.hsv.rgb(args), args[2])
}

convert$2.rgb.ansi256 = function (args) {
  var r = args[0]
  var g = args[1]
  var b = args[2]

  // we use the extended greyscale palette here, with the exception of
  // black and white. normal palette only has 4 greyscale shades.
  if (r === g && g === b) {
    if (r < 8) {
      return 16
    }

    if (r > 248) {
      return 231
    }

    return Math.round(((r - 8) / 247) * 24) + 232
  }

  var ansi =
    16 +
    36 * Math.round((r / 255) * 5) +
    6 * Math.round((g / 255) * 5) +
    Math.round((b / 255) * 5)

  return ansi
}

convert$2.ansi16.rgb = function (args) {
  var color = args % 10

  // handle greyscale
  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5
    }

    color = (color / 10.5) * 255

    return [color, color, color]
  }

  var mult = (~~(args > 50) + 1) * 0.5
  var r = (color & 1) * mult * 255
  var g = ((color >> 1) & 1) * mult * 255
  var b = ((color >> 2) & 1) * mult * 255

  return [r, g, b]
}

convert$2.ansi256.rgb = function (args) {
  // handle greyscale
  if (args >= 232) {
    var c = (args - 232) * 10 + 8
    return [c, c, c]
  }

  args -= 16

  var rem
  var r = (Math.floor(args / 36) / 5) * 255
  var g = (Math.floor((rem = args % 36) / 6) / 5) * 255
  var b = ((rem % 6) / 5) * 255

  return [r, g, b]
}

convert$2.rgb.hex = function (args) {
  var integer =
    ((Math.round(args[0]) & 0xff) << 16) +
    ((Math.round(args[1]) & 0xff) << 8) +
    (Math.round(args[2]) & 0xff)

  var string = integer.toString(16).toUpperCase()
  return '000000'.substring(string.length) + string
}

convert$2.hex.rgb = function (args) {
  var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i)
  if (!match) {
    return [0, 0, 0]
  }

  var colorString = match[0]

  if (match[0].length === 3) {
    colorString = colorString
      .split('')
      .map(function (char) {
        return char + char
      })
      .join('')
  }

  var integer = parseInt(colorString, 16)
  var r = (integer >> 16) & 0xff
  var g = (integer >> 8) & 0xff
  var b = integer & 0xff

  return [r, g, b]
}

convert$2.rgb.hcg = function (rgb) {
  var r = rgb[0] / 255
  var g = rgb[1] / 255
  var b = rgb[2] / 255
  var max = Math.max(Math.max(r, g), b)
  var min = Math.min(Math.min(r, g), b)
  var chroma = max - min
  var grayscale
  var hue

  if (chroma < 1) {
    grayscale = min / (1 - chroma)
  } else {
    grayscale = 0
  }

  if (chroma <= 0) {
    hue = 0
  } else if (max === r) {
    hue = ((g - b) / chroma) % 6
  } else if (max === g) {
    hue = 2 + (b - r) / chroma
  } else {
    hue = 4 + (r - g) / chroma + 4
  }

  hue /= 6
  hue %= 1

  return [hue * 360, chroma * 100, grayscale * 100]
}

convert$2.hsl.hcg = function (hsl) {
  var s = hsl[1] / 100
  var l = hsl[2] / 100
  var c = 1
  var f = 0

  if (l < 0.5) {
    c = 2.0 * s * l
  } else {
    c = 2.0 * s * (1.0 - l)
  }

  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c)
  }

  return [hsl[0], c * 100, f * 100]
}

convert$2.hsv.hcg = function (hsv) {
  var s = hsv[1] / 100
  var v = hsv[2] / 100

  var c = s * v
  var f = 0

  if (c < 1.0) {
    f = (v - c) / (1 - c)
  }

  return [hsv[0], c * 100, f * 100]
}

convert$2.hcg.rgb = function (hcg) {
  var h = hcg[0] / 360
  var c = hcg[1] / 100
  var g = hcg[2] / 100

  if (c === 0.0) {
    return [g * 255, g * 255, g * 255]
  }

  var pure = [0, 0, 0]
  var hi = (h % 1) * 6
  var v = hi % 1
  var w = 1 - v
  var mg = 0

  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1
      pure[1] = v
      pure[2] = 0
      break
    case 1:
      pure[0] = w
      pure[1] = 1
      pure[2] = 0
      break
    case 2:
      pure[0] = 0
      pure[1] = 1
      pure[2] = v
      break
    case 3:
      pure[0] = 0
      pure[1] = w
      pure[2] = 1
      break
    case 4:
      pure[0] = v
      pure[1] = 0
      pure[2] = 1
      break
    default:
      pure[0] = 1
      pure[1] = 0
      pure[2] = w
  }

  mg = (1.0 - c) * g

  return [
    (c * pure[0] + mg) * 255,
    (c * pure[1] + mg) * 255,
    (c * pure[2] + mg) * 255,
  ]
}

convert$2.hcg.hsv = function (hcg) {
  var c = hcg[1] / 100
  var g = hcg[2] / 100

  var v = c + g * (1.0 - c)
  var f = 0

  if (v > 0.0) {
    f = c / v
  }

  return [hcg[0], f * 100, v * 100]
}

convert$2.hcg.hsl = function (hcg) {
  var c = hcg[1] / 100
  var g = hcg[2] / 100

  var l = g * (1.0 - c) + 0.5 * c
  var s = 0

  if (l > 0.0 && l < 0.5) {
    s = c / (2 * l)
  } else if (l >= 0.5 && l < 1.0) {
    s = c / (2 * (1 - l))
  }

  return [hcg[0], s * 100, l * 100]
}

convert$2.hcg.hwb = function (hcg) {
  var c = hcg[1] / 100
  var g = hcg[2] / 100
  var v = c + g * (1.0 - c)
  return [hcg[0], (v - c) * 100, (1 - v) * 100]
}

convert$2.hwb.hcg = function (hwb) {
  var w = hwb[1] / 100
  var b = hwb[2] / 100
  var v = 1 - b
  var c = v - w
  var g = 0

  if (c < 1) {
    g = (v - c) / (1 - c)
  }

  return [hwb[0], c * 100, g * 100]
}

convert$2.apple.rgb = function (apple) {
  return [
    (apple[0] / 65535) * 255,
    (apple[1] / 65535) * 255,
    (apple[2] / 65535) * 255,
  ]
}

convert$2.rgb.apple = function (rgb) {
  return [
    (rgb[0] / 255) * 65535,
    (rgb[1] / 255) * 65535,
    (rgb[2] / 255) * 65535,
  ]
}

convert$2.gray.rgb = function (args) {
  return [(args[0] / 100) * 255, (args[0] / 100) * 255, (args[0] / 100) * 255]
}

convert$2.gray.hsl = convert$2.gray.hsv = function (args) {
  return [0, 0, args[0]]
}

convert$2.gray.hwb = function (gray) {
  return [0, 100, gray[0]]
}

convert$2.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]]
}

convert$2.gray.lab = function (gray) {
  return [gray[0], 0, 0]
}

convert$2.gray.hex = function (gray) {
  var val = Math.round((gray[0] / 100) * 255) & 0xff
  var integer = (val << 16) + (val << 8) + val

  var string = integer.toString(16).toUpperCase()
  return '000000'.substring(string.length) + string
}

convert$2.rgb.gray = function (rgb) {
  var val = (rgb[0] + rgb[1] + rgb[2]) / 3
  return [(val / 255) * 100]
}

var conversions$1 = conversions$2.exports

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
  var graph = {}
  // https://jsperf.com/object-keys-vs-for-in-with-closure/3
  var models = Object.keys(conversions$1)

  for (var len = models.length, i = 0; i < len; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null,
    }
  }

  return graph
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
  var graph = buildGraph()
  var queue = [fromModel] // unshift -> queue -> pop

  graph[fromModel].distance = 0

  while (queue.length) {
    var current = queue.pop()
    var adjacents = Object.keys(conversions$1[current])

    for (var len = adjacents.length, i = 0; i < len; i++) {
      var adjacent = adjacents[i]
      var node = graph[adjacent]

      if (node.distance === -1) {
        node.distance = graph[current].distance + 1
        node.parent = current
        queue.unshift(adjacent)
      }
    }
  }

  return graph
}

function link(from, to) {
  return function (args) {
    return to(from(args))
  }
}

function wrapConversion(toModel, graph) {
  var path = [graph[toModel].parent, toModel]
  var fn = conversions$1[graph[toModel].parent][toModel]

  var cur = graph[toModel].parent
  while (graph[cur].parent) {
    path.unshift(graph[cur].parent)
    fn = link(conversions$1[graph[cur].parent][cur], fn)
    cur = graph[cur].parent
  }

  fn.conversion = path
  return fn
}

var route$1 = function (fromModel) {
  var graph = deriveBFS(fromModel)
  var conversion = {}

  var models = Object.keys(graph)
  for (var len = models.length, i = 0; i < len; i++) {
    var toModel = models[i]
    var node = graph[toModel]

    if (node.parent === null) {
      // no possible conversion, or this node is the source model.
      continue
    }

    conversion[toModel] = wrapConversion(toModel, graph)
  }

  return conversion
}

var conversions = conversions$2.exports
var route = route$1

var convert$1 = {}

var models = Object.keys(conversions)

function wrapRaw(fn) {
  var wrappedFn = function (args) {
    if (args === undefined || args === null) {
      return args
    }

    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments)
    }

    return fn(args)
  }

  // preserve .conversion property if there is one
  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion
  }

  return wrappedFn
}

function wrapRounded(fn) {
  var wrappedFn = function (args) {
    if (args === undefined || args === null) {
      return args
    }

    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments)
    }

    var result = fn(args)

    // we're assuming the result is an array here.
    // see notice in conversions.js; don't use box types
    // in conversion functions.
    if (typeof result === 'object') {
      for (var len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i])
      }
    }

    return result
  }

  // preserve .conversion property if there is one
  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion
  }

  return wrappedFn
}

models.forEach(function (fromModel) {
  convert$1[fromModel] = {}

  Object.defineProperty(convert$1[fromModel], 'channels', {
    value: conversions[fromModel].channels,
  })
  Object.defineProperty(convert$1[fromModel], 'labels', {
    value: conversions[fromModel].labels,
  })

  var routes = route(fromModel)
  var routeModels = Object.keys(routes)

  routeModels.forEach(function (toModel) {
    var fn = routes[toModel]

    convert$1[fromModel][toModel] = wrapRounded(fn)
    convert$1[fromModel][toModel].raw = wrapRaw(fn)
  })
})

var colorConvert = convert$1

;(function (module) {
  const colorConvert$1 = colorConvert

  const wrapAnsi16 = (fn, offset) =>
    function () {
      const code = fn.apply(colorConvert$1, arguments)
      return `\u001B[${code + offset}m`
    }

  const wrapAnsi256 = (fn, offset) =>
    function () {
      const code = fn.apply(colorConvert$1, arguments)
      return `\u001B[${38 + offset};5;${code}m`
    }

  const wrapAnsi16m = (fn, offset) =>
    function () {
      const rgb = fn.apply(colorConvert$1, arguments)
      return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`
    }

  function assembleStyles() {
    const codes = new Map()
    const styles = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29],
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        gray: [90, 39],

        // Bright color
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39],
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],

        // Bright color
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49],
      },
    }

    // Fix humans
    styles.color.grey = styles.color.gray

    for (const groupName of Object.keys(styles)) {
      const group = styles[groupName]

      for (const styleName of Object.keys(group)) {
        const style = group[styleName]

        styles[styleName] = {
          open: `\u001B[${style[0]}m`,
          close: `\u001B[${style[1]}m`,
        }

        group[styleName] = styles[styleName]

        codes.set(style[0], style[1])
      }

      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false,
      })

      Object.defineProperty(styles, 'codes', {
        value: codes,
        enumerable: false,
      })
    }

    const ansi2ansi = (n) => n
    const rgb2rgb = (r, g, b) => [r, g, b]

    styles.color.close = '\u001B[39m'
    styles.bgColor.close = '\u001B[49m'

    styles.color.ansi = {
      ansi: wrapAnsi16(ansi2ansi, 0),
    }
    styles.color.ansi256 = {
      ansi256: wrapAnsi256(ansi2ansi, 0),
    }
    styles.color.ansi16m = {
      rgb: wrapAnsi16m(rgb2rgb, 0),
    }

    styles.bgColor.ansi = {
      ansi: wrapAnsi16(ansi2ansi, 10),
    }
    styles.bgColor.ansi256 = {
      ansi256: wrapAnsi256(ansi2ansi, 10),
    }
    styles.bgColor.ansi16m = {
      rgb: wrapAnsi16m(rgb2rgb, 10),
    }

    for (let key of Object.keys(colorConvert$1)) {
      if (typeof colorConvert$1[key] !== 'object') {
        continue
      }

      const suite = colorConvert$1[key]

      if (key === 'ansi16') {
        key = 'ansi'
      }

      if ('ansi16' in suite) {
        styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0)
        styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10)
      }

      if ('ansi256' in suite) {
        styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0)
        styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10)
      }

      if ('rgb' in suite) {
        styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0)
        styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10)
      }
    }

    return styles
  }

  // Make the export immutable
  Object.defineProperty(module, 'exports', {
    enumerable: true,
    get: assembleStyles,
  })
})(ansiStyles)

var hasFlag$1 = (flag, argv) => {
  argv = argv || process.argv
  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--'
  const pos = argv.indexOf(prefix + flag)
  const terminatorPos = argv.indexOf('--')
  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos)
}

const os = require$$0
const hasFlag = hasFlag$1

const env = process.env

let forceColor
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
  forceColor = false
} else if (
  hasFlag('color') ||
  hasFlag('colors') ||
  hasFlag('color=true') ||
  hasFlag('color=always')
) {
  forceColor = true
}
if ('FORCE_COLOR' in env) {
  forceColor =
    env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0
}

function translateLevel(level) {
  if (level === 0) {
    return false
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3,
  }
}

function supportsColor(stream) {
  if (forceColor === false) {
    return 0
  }

  if (
    hasFlag('color=16m') ||
    hasFlag('color=full') ||
    hasFlag('color=truecolor')
  ) {
    return 3
  }

  if (hasFlag('color=256')) {
    return 2
  }

  if (stream && !stream.isTTY && forceColor !== true) {
    return 0
  }

  const min = forceColor ? 1 : 0

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
    // release that supports 256 colors. Windows 10 build 14931 is the first release
    // that supports 16m/TrueColor.
    const osRelease = os.release().split('.')
    if (
      Number(process.versions.node.split('.')[0]) >= 8 &&
      Number(osRelease[0]) >= 10 &&
      Number(osRelease[2]) >= 10586
    ) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2
    }

    return 1
  }

  if ('CI' in env) {
    if (
      ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(
        (sign) => sign in env
      ) ||
      env.CI_NAME === 'codeship'
    ) {
      return 1
    }

    return min
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
  }

  if (env.COLORTERM === 'truecolor') {
    return 3
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10)

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2
      case 'Apple_Terminal':
        return 2
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2
  }

  if (
    /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)
  ) {
    return 1
  }

  if ('COLORTERM' in env) {
    return 1
  }

  if (env.TERM === 'dumb') {
    return min
  }

  return min
}

function getSupportLevel(stream) {
  const level = supportsColor(stream)
  return translateLevel(level)
}

var supportsColor_1 = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr),
}

const TEMPLATE_REGEX =
  /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi

const ESCAPES = new Map([
  ['n', '\n'],
  ['r', '\r'],
  ['t', '\t'],
  ['b', '\b'],
  ['f', '\f'],
  ['v', '\v'],
  ['0', '\0'],
  ['\\', '\\'],
  ['e', '\u001B'],
  ['a', '\u0007'],
])

function unescape(c) {
  if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
    return String.fromCharCode(parseInt(c.slice(1), 16))
  }

  return ESCAPES.get(c) || c
}

function parseArguments(name, args) {
  const results = []
  const chunks = args.trim().split(/\s*,\s*/g)
  let matches

  for (const chunk of chunks) {
    if (!isNaN(chunk)) {
      results.push(Number(chunk))
    } else if ((matches = chunk.match(STRING_REGEX))) {
      results.push(
        matches[2].replace(ESCAPE_REGEX, (m, escape, chr) =>
          escape ? unescape(escape) : chr
        )
      )
    } else {
      throw new Error(
        `Invalid Chalk template style argument: ${chunk} (in style '${name}')`
      )
    }
  }

  return results
}

function parseStyle(style) {
  STYLE_REGEX.lastIndex = 0

  const results = []
  let matches

  while ((matches = STYLE_REGEX.exec(style)) !== null) {
    const name = matches[1]

    if (matches[2]) {
      const args = parseArguments(name, matches[2])
      results.push([name].concat(args))
    } else {
      results.push([name])
    }
  }

  return results
}

function buildStyle(chalk, styles) {
  const enabled = {}

  for (const layer of styles) {
    for (const style of layer.styles) {
      enabled[style[0]] = layer.inverse ? null : style.slice(1)
    }
  }

  let current = chalk
  for (const styleName of Object.keys(enabled)) {
    if (Array.isArray(enabled[styleName])) {
      if (!(styleName in current)) {
        throw new Error(`Unknown Chalk style: ${styleName}`)
      }

      if (enabled[styleName].length > 0) {
        current = current[styleName].apply(current, enabled[styleName])
      } else {
        current = current[styleName]
      }
    }
  }

  return current
}

var templates = (chalk, tmp) => {
  const styles = []
  const chunks = []
  let chunk = []

  // eslint-disable-next-line max-params
  tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
    if (escapeChar) {
      chunk.push(unescape(escapeChar))
    } else if (style) {
      const str = chunk.join('')
      chunk = []
      chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str))
      styles.push({ inverse, styles: parseStyle(style) })
    } else if (close) {
      if (styles.length === 0) {
        throw new Error('Found extraneous } in Chalk template literal')
      }

      chunks.push(buildStyle(chalk, styles)(chunk.join('')))
      chunk = []
      styles.pop()
    } else {
      chunk.push(chr)
    }
  })

  chunks.push(chunk.join(''))

  if (styles.length > 0) {
    const errMsg = `Chalk template literal is missing ${
      styles.length
    } closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`
    throw new Error(errMsg)
  }

  return chunks.join('')
}

;(function (module) {
  const escapeStringRegexp$1 = escapeStringRegexp
  const ansiStyles$1 = ansiStyles.exports
  const stdoutColor = supportsColor_1.stdout

  const template = templates

  const isSimpleWindowsTerm =
    process.platform === 'win32' &&
    !(process.env.TERM || '').toLowerCase().startsWith('xterm')

  // `supportsColor.level` → `ansiStyles.color[name]` mapping
  const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m']

  // `color-convert` models to exclude from the Chalk API due to conflicts and such
  const skipModels = new Set(['gray'])

  const styles = Object.create(null)

  function applyOptions(obj, options) {
    options = options || {}

    // Detect level if not set manually
    const scLevel = stdoutColor ? stdoutColor.level : 0
    obj.level = options.level === undefined ? scLevel : options.level
    obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0
  }

  function Chalk(options) {
    // We check for this.template here since calling `chalk.constructor()`
    // by itself will have a `this` of a previously constructed chalk object
    if (!this || !(this instanceof Chalk) || this.template) {
      const chalk = {}
      applyOptions(chalk, options)

      chalk.template = function () {
        const args = [].slice.call(arguments)
        return chalkTag.apply(null, [chalk.template].concat(args))
      }

      Object.setPrototypeOf(chalk, Chalk.prototype)
      Object.setPrototypeOf(chalk.template, chalk)

      chalk.template.constructor = Chalk

      return chalk.template
    }

    applyOptions(this, options)
  }

  // Use bright blue on Windows as the normal blue color is illegible
  if (isSimpleWindowsTerm) {
    ansiStyles$1.blue.open = '\u001B[94m'
  }

  for (const key of Object.keys(ansiStyles$1)) {
    ansiStyles$1[key].closeRe = new RegExp(
      escapeStringRegexp$1(ansiStyles$1[key].close),
      'g'
    )

    styles[key] = {
      get() {
        const codes = ansiStyles$1[key]
        return build.call(
          this,
          this._styles ? this._styles.concat(codes) : [codes],
          this._empty,
          key
        )
      },
    }
  }

  styles.visible = {
    get() {
      return build.call(this, this._styles || [], true, 'visible')
    },
  }

  ansiStyles$1.color.closeRe = new RegExp(
    escapeStringRegexp$1(ansiStyles$1.color.close),
    'g'
  )
  for (const model of Object.keys(ansiStyles$1.color.ansi)) {
    if (skipModels.has(model)) {
      continue
    }

    styles[model] = {
      get() {
        const level = this.level
        return function () {
          const open = ansiStyles$1.color[levelMapping[level]][model].apply(
            null,
            arguments
          )
          const codes = {
            open,
            close: ansiStyles$1.color.close,
            closeRe: ansiStyles$1.color.closeRe,
          }
          return build.call(
            this,
            this._styles ? this._styles.concat(codes) : [codes],
            this._empty,
            model
          )
        }
      },
    }
  }

  ansiStyles$1.bgColor.closeRe = new RegExp(
    escapeStringRegexp$1(ansiStyles$1.bgColor.close),
    'g'
  )
  for (const model of Object.keys(ansiStyles$1.bgColor.ansi)) {
    if (skipModels.has(model)) {
      continue
    }

    const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1)
    styles[bgModel] = {
      get() {
        const level = this.level
        return function () {
          const open = ansiStyles$1.bgColor[levelMapping[level]][model].apply(
            null,
            arguments
          )
          const codes = {
            open,
            close: ansiStyles$1.bgColor.close,
            closeRe: ansiStyles$1.bgColor.closeRe,
          }
          return build.call(
            this,
            this._styles ? this._styles.concat(codes) : [codes],
            this._empty,
            model
          )
        }
      },
    }
  }

  const proto = Object.defineProperties(() => {}, styles)

  function build(_styles, _empty, key) {
    const builder = function () {
      return applyStyle.apply(builder, arguments)
    }

    builder._styles = _styles
    builder._empty = _empty

    const self = this

    Object.defineProperty(builder, 'level', {
      enumerable: true,
      get() {
        return self.level
      },
      set(level) {
        self.level = level
      },
    })

    Object.defineProperty(builder, 'enabled', {
      enumerable: true,
      get() {
        return self.enabled
      },
      set(enabled) {
        self.enabled = enabled
      },
    })

    // See below for fix regarding invisible grey/dim combination on Windows
    builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey'

    // `__proto__` is used because we must return a function, but there is
    // no way to create a function with a different prototype
    builder.__proto__ = proto // eslint-disable-line no-proto

    return builder
  }

  function applyStyle() {
    // Support varags, but simply cast to string in case there's only one arg
    const args = arguments
    const argsLen = args.length
    let str = String(arguments[0])

    if (argsLen === 0) {
      return ''
    }

    if (argsLen > 1) {
      // Don't slice `arguments`, it prevents V8 optimizations
      for (let a = 1; a < argsLen; a++) {
        str += ' ' + args[a]
      }
    }

    if (!this.enabled || this.level <= 0 || !str) {
      return this._empty ? '' : str
    }

    // Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
    // see https://github.com/chalk/chalk/issues/58
    // If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
    const originalDim = ansiStyles$1.dim.open
    if (isSimpleWindowsTerm && this.hasGrey) {
      ansiStyles$1.dim.open = ''
    }

    for (const code of this._styles.slice().reverse()) {
      // Replace any instances already present with a re-opening code
      // otherwise only the part of the string until said closing code
      // will be colored, and the rest will simply be 'plain'.
      str = code.open + str.replace(code.closeRe, code.open) + code.close

      // Close the styling before a linebreak and reopen
      // after next line to fix a bleed issue on macOS
      // https://github.com/chalk/chalk/pull/92
      str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`)
    }

    // Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
    ansiStyles$1.dim.open = originalDim

    return str
  }

  function chalkTag(chalk, strings) {
    if (!Array.isArray(strings)) {
      // If chalk() was called by itself or with a string,
      // return the string itself as a string.
      return [].slice.call(arguments, 1).join(' ')
    }

    const args = [].slice.call(arguments, 2)
    const parts = [strings.raw[0]]

    for (let i = 1; i < strings.length; i++) {
      parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'))
      parts.push(String(strings.raw[i]))
    }

    return template(chalk, parts.join(''))
  }

  Object.defineProperties(Chalk.prototype, styles)

  module.exports = Chalk() // eslint-disable-line new-cap
  module.exports.supportsColor = stdoutColor
  module.exports.default = module.exports // For TypeScript
})(chalk)

Object.defineProperty(lib$1, '__esModule', {
  value: true,
})
lib$1.default = highlight
lib$1.getChalk = getChalk
lib$1.shouldHighlight = shouldHighlight

var _jsTokens = jsTokens

var _helperValidatorIdentifier = lib

var _chalk = chalk.exports

const sometimesKeywords = new Set(['as', 'async', 'from', 'get', 'of', 'set'])

function getDefs$1(chalk) {
  return {
    keyword: chalk.cyan,
    capitalized: chalk.yellow,
    jsxIdentifier: chalk.yellow,
    punctuator: chalk.yellow,
    number: chalk.magenta,
    string: chalk.green,
    regex: chalk.magenta,
    comment: chalk.grey,
    invalid: chalk.white.bgRed.bold,
  }
}

const NEWLINE$1 = /\r\n|[\n\r\u2028\u2029]/
const BRACKET = /^[()[\]{}]$/
let tokenize
{
  const JSX_TAG = /^[a-z][\w-]*$/i

  const getTokenType = function (token, offset, text) {
    if (token.type === 'name') {
      if (
        (0, _helperValidatorIdentifier.isKeyword)(token.value) ||
        (0, _helperValidatorIdentifier.isStrictReservedWord)(
          token.value,
          true
        ) ||
        sometimesKeywords.has(token.value)
      ) {
        return 'keyword'
      }

      if (
        JSX_TAG.test(token.value) &&
        (text[offset - 1] === '<' || text.substr(offset - 2, 2) == '</')
      ) {
        return 'jsxIdentifier'
      }

      if (token.value[0] !== token.value[0].toLowerCase()) {
        return 'capitalized'
      }
    }

    if (token.type === 'punctuator' && BRACKET.test(token.value)) {
      return 'bracket'
    }

    if (
      token.type === 'invalid' &&
      (token.value === '@' || token.value === '#')
    ) {
      return 'punctuator'
    }

    return token.type
  }

  tokenize = function* (text) {
    let match

    while ((match = _jsTokens.default.exec(text))) {
      const token = _jsTokens.matchToToken(match)

      yield {
        type: getTokenType(token, match.index, text),
        value: token.value,
      }
    }
  }
}

function highlightTokens(defs, text) {
  let highlighted = ''

  for (const { type, value } of tokenize(text)) {
    const colorize = defs[type]

    if (colorize) {
      highlighted += value
        .split(NEWLINE$1)
        .map((str) => colorize(str))
        .join('\n')
    } else {
      highlighted += value
    }
  }

  return highlighted
}

function shouldHighlight(options) {
  return !!_chalk.supportsColor || options.forceColor
}

function getChalk(options) {
  return options.forceColor
    ? new _chalk.constructor({
        enabled: true,
        level: 1,
      })
    : _chalk
}

function highlight(code, options = {}) {
  if (shouldHighlight(options)) {
    const chalk = getChalk(options)
    const defs = getDefs$1(chalk)
    return highlightTokens(defs, code)
  } else {
    return code
  }
}

Object.defineProperty(lib$2, '__esModule', {
  value: true,
})
var codeFrameColumns_1 = (lib$2.codeFrameColumns = codeFrameColumns)
lib$2.default = _default

var _highlight = lib$1

let deprecationWarningShown = false

function getDefs(chalk) {
  return {
    gutter: chalk.grey,
    marker: chalk.red.bold,
    message: chalk.red.bold,
  }
}

const NEWLINE = /\r\n|[\n\r\u2028\u2029]/

function getMarkerLines(loc, source, opts) {
  const startLoc = Object.assign(
    {
      column: 0,
      line: -1,
    },
    loc.start
  )
  const endLoc = Object.assign({}, startLoc, loc.end)
  const { linesAbove = 2, linesBelow = 3 } = opts || {}
  const startLine = startLoc.line
  const startColumn = startLoc.column
  const endLine = endLoc.line
  const endColumn = endLoc.column
  let start = Math.max(startLine - (linesAbove + 1), 0)
  let end = Math.min(source.length, endLine + linesBelow)

  if (startLine === -1) {
    start = 0
  }

  if (endLine === -1) {
    end = source.length
  }

  const lineDiff = endLine - startLine
  const markerLines = {}

  if (lineDiff) {
    for (let i = 0; i <= lineDiff; i++) {
      const lineNumber = i + startLine

      if (!startColumn) {
        markerLines[lineNumber] = true
      } else if (i === 0) {
        const sourceLength = source[lineNumber - 1].length
        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1]
      } else if (i === lineDiff) {
        markerLines[lineNumber] = [0, endColumn]
      } else {
        const sourceLength = source[lineNumber - i].length
        markerLines[lineNumber] = [0, sourceLength]
      }
    }
  } else {
    if (startColumn === endColumn) {
      if (startColumn) {
        markerLines[startLine] = [startColumn, 0]
      } else {
        markerLines[startLine] = true
      }
    } else {
      markerLines[startLine] = [startColumn, endColumn - startColumn]
    }
  }

  return {
    start,
    end,
    markerLines,
  }
}

function codeFrameColumns(rawLines, loc, opts = {}) {
  const highlighted =
    (opts.highlightCode || opts.forceColor) &&
    (0, _highlight.shouldHighlight)(opts)
  const chalk = (0, _highlight.getChalk)(opts)
  const defs = getDefs(chalk)

  const maybeHighlight = (chalkFn, string) => {
    return highlighted ? chalkFn(string) : string
  }

  const lines = rawLines.split(NEWLINE)
  const { start, end, markerLines } = getMarkerLines(loc, lines, opts)
  const hasColumns = loc.start && typeof loc.start.column === 'number'
  const numberMaxWidth = String(end).length
  const highlightedLines = highlighted
    ? (0, _highlight.default)(rawLines, opts)
    : rawLines
  let frame = highlightedLines
    .split(NEWLINE, end)
    .slice(start, end)
    .map((line, index) => {
      const number = start + 1 + index
      const paddedNumber = ` ${number}`.slice(-numberMaxWidth)
      const gutter = ` ${paddedNumber} |`
      const hasMarker = markerLines[number]
      const lastMarkerLine = !markerLines[number + 1]

      if (hasMarker) {
        let markerLine = ''

        if (Array.isArray(hasMarker)) {
          const markerSpacing = line
            .slice(0, Math.max(hasMarker[0] - 1, 0))
            .replace(/[^\t]/g, ' ')
          const numberOfMarkers = hasMarker[1] || 1
          markerLine = [
            '\n ',
            maybeHighlight(defs.gutter, gutter.replace(/\d/g, ' ')),
            ' ',
            markerSpacing,
            maybeHighlight(defs.marker, '^').repeat(numberOfMarkers),
          ].join('')

          if (lastMarkerLine && opts.message) {
            markerLine += ' ' + maybeHighlight(defs.message, opts.message)
          }
        }

        return [
          maybeHighlight(defs.marker, '>'),
          maybeHighlight(defs.gutter, gutter),
          line.length > 0 ? ` ${line}` : '',
          markerLine,
        ].join('')
      } else {
        return ` ${maybeHighlight(defs.gutter, gutter)}${
          line.length > 0 ? ` ${line}` : ''
        }`
      }
    })
    .join('\n')

  if (opts.message && !hasColumns) {
    frame = `${' '.repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`
  }

  if (highlighted) {
    return chalk.reset(frame)
  } else {
    return frame
  }
}

function _default(rawLines, lineNumber, colNumber, opts = {}) {
  if (!deprecationWarningShown) {
    deprecationWarningShown = true
    const message =
      'Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.'

    if (process.emitWarning) {
      process.emitWarning(message, 'DeprecationWarning')
    } else {
      const deprecationError = new Error(message)
      deprecationError.name = 'DeprecationWarning'
      console.warn(new Error(message))
    }
  }

  colNumber = Math.max(colNumber, 0)
  const location = {
    start: {
      column: colNumber,
      line: lineNumber,
    },
  }
  return codeFrameColumns(rawLines, location, opts)
}

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/**
 * Attempt to parse position information from an error message originating from the MDX compiler.
 * Only used if the error object doesn't contain
 */
function parsePositionInformationFromErrorMessage(message) {
  const positionInfoPattern = /\d+:\d+(-\d+:\d+)/g
  const match = message.match(positionInfoPattern)
  if (match) {
    // take the last match, that seems to be the most reliable source of the error.
    const lastMatch = match.slice(-1)[0]
    const [line, column] = lastMatch.split('-')[0].split(':')
    return {
      start: {
        line: Number.parseInt(line, 10),
        column: Number.parseInt(column, 10),
      },
    }
  }
}
/**
 * Prints a nicely formatted error message from an error caught during MDX compilation.
 *
 * @param error - Error caught from the mdx compiler
 * @param source - Raw MDX string
 * @returns Error
 */
function createFormattedMDXError(error, source) {
  const position =
    error?.position ?? parsePositionInformationFromErrorMessage(error?.message)
  const codeFrames = position
    ? codeFrameColumns_1(
        source,
        {
          start: {
            line: position.start.line,
            column: position.start.column ?? 0,
          },
        },
        { linesAbove: 2, linesBelow: 2 }
      )
    : ''
  const formattedError = new Error(`[next-mdx-remote] error compiling MDX:
${error?.message}
${codeFrames ? '\n' + codeFrames + '\n' : ''}
More information: https://mdxjs.com/docs/troubleshooting-mdx`)
  formattedError.stack = ''
  return formattedError
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {string} Type
 * @typedef {Object<string, unknown>} Props
 */

var convert =
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return ok
      }

      if (typeof test === 'string') {
        return typeFactory(test)
      }

      if (typeof test === 'object') {
        // @ts-ignore looks like a list of tests / partial test object.
        return 'length' in test ? anyFactory(test) : propsFactory(test)
      }

      if (typeof test === 'function') {
        return castFactory(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  )
/**
 * @param {Array.<Type|Props|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory(tests) {
  /** @type {Array.<AssertAnything>} */
  var checks = []
  var index = -1

  while (++index < tests.length) {
    checks[index] = convert(tests[index])
  }

  return castFactory(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    var index = -1

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) return true
    }
  }
}

/**
 * Utility to assert each property in `test` is represented in `node`, and each
 * values are strictly equal.
 *
 * @param {Props} check
 * @returns {AssertAnything}
 */
function propsFactory(check) {
  return castFactory(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    /** @type {string} */
    var key

    for (key in check) {
      if (node[key] !== check[key]) return
    }

    return true
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 *
 * @param {Type} check
 * @returns {AssertAnything}
 */
function typeFactory(check) {
  return castFactory(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(...parameters) {
    return Boolean(check.call(this, ...parameters))
  }
}

// Utility to return true.
function ok() {
  return true
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {import('unist-util-is').Type} Type
 * @typedef {import('unist-util-is').Props} Props
 */

/** @type {Array.<Node>} */
const empty = []

const remove =
  /**
   * @type {(
   *  (<Tree extends Node>(node: Tree, options: RemoveOptions, test: Type|Props|TestFunction<import('unist-util-visit-parents/complex-types').InclusiveDescendant<Tree>>|Array<Type|Props|TestFunction<import('unist-util-visit-parents/complex-types').InclusiveDescendant<Tree>>>) => Tree|null) &
   *  (<Tree extends Node>(node: Tree, test: Type|Props|TestFunction<import('unist-util-visit-parents/complex-types').InclusiveDescendant<Tree>>|Array<Type|Props|TestFunction<import('unist-util-visit-parents/complex-types').InclusiveDescendant<Tree>>>) => Tree|null)
   * )}
   */
  (
    /**
     * Mutate the given tree by removing all nodes that pass `test`.
     * The tree is walked in preorder (NLR), visiting the node itself, then its head, etc.
     *
     * @param {Node} tree Tree to filter
     * @param {RemoveOptions} options Whether to drop parent nodes if they had children, but all their children were filtered out. Default is `{cascade: true}`
     * @param {Type|Props|TestFunction<Node>|Array<Type|Props|TestFunction<Node>>} test is-compatible test (such as a type)
     * @returns {Node|null}
     */
    function (tree, options, test) {
      const is = convert(test || options)
      const cascade =
        options.cascade === undefined || options.cascade === null
          ? true
          : options.cascade

      return preorder(tree)

      /**
       * Check and remove nodes recursively in preorder.
       * For each composite node, modify its children array in-place.
       *
       * @param {Node} node
       * @param {number|undefined} [index]
       * @param {Parent|undefined} [parent]
       * @returns {Node|null}
       */
      function preorder(node, index, parent) {
        /** @type {Array.<Node>} */
        // @ts-expect-error looks like a parent.
        const children = node.children || empty
        let childIndex = -1
        let position = 0

        if (is(node, index, parent)) {
          return null
        }

        if (children.length > 0) {
          // Move all living children to the beginning of the children array.
          while (++childIndex < children.length) {
            // @ts-expect-error looks like a parent.
            if (preorder(children[childIndex], childIndex, node)) {
              children[position++] = children[childIndex]
            }
          }

          // Cascade delete.
          if (cascade && !position) {
            return null
          }

          // Drop other nodes.
          children.length = position
        }

        return node
      }
    }
  )

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/**
 * remark plugin which removes all import and export statements
 */
function removeImportsExportsPlugin() {
  return (tree) => remove(tree, 'mdxjsEsm')
}

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
function getCompileOptions(mdxOptions = {}, rsc = false) {
  const areImportsEnabled = mdxOptions?.useDynamicImport
  // don't modify the original object when adding our own plugin
  // this allows code to reuse the same options object
  const remarkPlugins = [
    ...(mdxOptions.remarkPlugins || []),
    ...(areImportsEnabled ? [] : [removeImportsExportsPlugin]),
  ]
  return {
    ...mdxOptions,
    remarkPlugins,
    outputFormat: 'function-body',
    // Disable the importSource option for RSC to ensure there's no `useMDXComponents` implemented.
    providerImportSource: rsc ? undefined : '@mdx-js/react',
  }
}
/**
 * Parses and compiles the provided MDX string. Returns a result which can be passed into <MDXRemote /> to be rendered.
 */
async function serialize(
  source,
  { scope = {}, mdxOptions = {}, parseFrontmatter = false } = {},
  rsc = false
) {
  const vfile = new VFile(source)
  // makes frontmatter available via vfile.data.matter
  if (parseFrontmatter) {
    matter(vfile, { strip: true })
  }
  let compiledMdx
  try {
    compiledMdx = await compile(vfile, getCompileOptions(mdxOptions, rsc))
  } catch (error) {
    throw createFormattedMDXError(error, String(vfile))
  }
  let compiledSource = String(compiledMdx)
  return {
    compiledSource,
    frontmatter: vfile.data.matter ?? {},
    scope: scope,
  }
}

export { serialize }
