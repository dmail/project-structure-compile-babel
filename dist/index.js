'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var availablePlugins = _interopDefault(require('@babel/preset-env/lib/available-plugins.js'));
var path = _interopDefault(require('path'));

// copied from @babel/preset-env/data/plugins.json.
// Because this is an hidden implementation detail of @babel/preset-env
// it could be deprecated or moved anytime.
// For that reason it makes more sens to have it inlined here
// than importing it from an undocumented location.
// Ideally it would be documented or a separate module
const compatMap = {
  "transform-template-literals": {
    chrome: "41",
    edge: "13",
    firefox: "34",
    safari: "9",
    node: "4",
    ios: "9",
    opera: "28",
    electron: "0.24"
  },
  "transform-literals": {
    chrome: "44",
    edge: "12",
    firefox: "53",
    safari: "9",
    node: "4",
    ios: "9",
    opera: "31",
    electron: "0.31"
  },
  "transform-function-name": {
    chrome: "51",
    firefox: "53",
    safari: "10",
    node: "6.5",
    ios: "10",
    opera: "38",
    electron: "1.2"
  },
  "transform-arrow-functions": {
    chrome: "47",
    edge: "13",
    firefox: "45",
    safari: "10",
    node: "6",
    ios: "10",
    opera: "34",
    electron: "0.36"
  },
  "transform-block-scoped-functions": {
    chrome: "41",
    edge: "12",
    firefox: "46",
    safari: "10",
    node: "4",
    ie: "11",
    ios: "10",
    opera: "28",
    electron: "0.24"
  },
  "transform-classes": {
    chrome: "46",
    edge: "13",
    firefox: "45",
    safari: "10",
    node: "5",
    ios: "10",
    opera: "33",
    electron: "0.36"
  },
  "transform-object-super": {
    chrome: "46",
    edge: "13",
    firefox: "45",
    safari: "10",
    node: "5",
    ios: "10",
    opera: "33",
    electron: "0.36"
  },
  "transform-shorthand-properties": {
    chrome: "43",
    edge: "12",
    firefox: "33",
    safari: "9",
    node: "4",
    ios: "9",
    opera: "30",
    electron: "0.29"
  },
  "transform-duplicate-keys": {
    chrome: "42",
    edge: "12",
    firefox: "34",
    safari: "9",
    node: "4",
    ios: "9",
    opera: "29",
    electron: "0.27"
  },
  "transform-computed-properties": {
    chrome: "44",
    edge: "12",
    firefox: "34",
    safari: "7.1",
    node: "4",
    ios: "8",
    opera: "31",
    electron: "0.31"
  },
  "transform-for-of": {
    chrome: "51",
    edge: "15",
    firefox: "53",
    safari: "10",
    node: "6.5",
    ios: "10",
    opera: "38",
    electron: "1.2"
  },
  "transform-sticky-regex": {
    chrome: "49",
    edge: "13",
    firefox: "3",
    safari: "10",
    node: "6",
    ios: "10",
    opera: "36",
    electron: "1"
  },
  "transform-dotall-regex": {
    chrome: "62",
    safari: "11.1",
    node: "8.10",
    ios: "11.3",
    opera: "49",
    electron: "3"
  },
  "transform-unicode-regex": {
    chrome: "50",
    edge: "13",
    firefox: "46",
    safari: "10",
    node: "6",
    ios: "10",
    opera: "37",
    electron: "1.1"
  },
  "transform-spread": {
    chrome: "46",
    edge: "13",
    firefox: "36",
    safari: "10",
    node: "5",
    ios: "10",
    opera: "33",
    electron: "0.36"
  },
  "transform-parameters": {
    chrome: "49",
    edge: "14",
    firefox: "53",
    safari: "10",
    node: "6",
    ios: "10",
    opera: "36",
    electron: "1"
  },
  "transform-destructuring": {
    chrome: "51",
    firefox: "53",
    safari: "10",
    node: "6.5",
    ios: "10",
    opera: "38",
    electron: "1.2"
  },
  "transform-block-scoping": {
    chrome: "49",
    edge: "14",
    firefox: "51",
    safari: "10",
    node: "6",
    ios: "10",
    opera: "36",
    electron: "1"
  },
  "transform-typeof-symbol": {
    chrome: "38",
    edge: "12",
    firefox: "36",
    safari: "9",
    node: "0.12",
    ios: "9",
    opera: "25",
    electron: "0.2"
  },
  "transform-new-target": {
    chrome: "46",
    edge: "14",
    firefox: "41",
    safari: "10",
    node: "5",
    ios: "10",
    opera: "33",
    electron: "0.36"
  },
  "transform-regenerator": {
    chrome: "50",
    edge: "13",
    firefox: "53",
    safari: "10",
    node: "6",
    ios: "10",
    opera: "37",
    electron: "1.1"
  },
  "transform-exponentiation-operator": {
    chrome: "52",
    edge: "14",
    firefox: "52",
    safari: "10.1",
    node: "7",
    ios: "10.3",
    opera: "39",
    electron: "1.3"
  },
  "transform-async-to-generator": {
    chrome: "55",
    edge: "15",
    firefox: "52",
    safari: "10.1",
    node: "7.6",
    ios: "10.3",
    opera: "42",
    electron: "1.6"
  },
  "proposal-async-generator-functions": {
    chrome: "63",
    firefox: "57",
    safari: "12",
    opera: "50",
    electron: "3"
  },
  "proposal-object-rest-spread": {
    chrome: "60",
    firefox: "55",
    safari: "11.1",
    node: "8.3",
    ios: "11.3",
    opera: "47",
    electron: "2"
  },
  "proposal-unicode-property-regex": {
    chrome: "64",
    safari: "11.1",
    ios: "11.3",
    opera: "51",
    electron: "3"
  },
  "proposal-json-strings": {},
  "proposal-optional-catch-binding": {
    chrome: "66",
    firefox: "58",
    safari: "11.1",
    ios: "11.3",
    opera: "53",
    electron: "3"
  }
};

const fileReadAsString = location => new Promise((resolve, reject) => {
  fs.readFile(location, (error, buffer) => {
    if (error) {
      reject(error);
    } else {
      resolve(buffer.toString());
    }
  });
});

const {
  transformAsync
} = require("@babel/core"); // rollup fails if using import here


const compileFile = async (name, {
  localRoot,
  plugins
}) => {
  const absoluteName = `${localRoot}/${name}`;
  const source = await fileReadAsString(absoluteName);
  const {
    code,
    map
  } = await transformAsync(source, {
    plugins,
    filenameRelative: name,
    filename: absoluteName,
    sourceMaps: true,
    sourceFileName: name
  });
  return {
    code,
    map
  };
};

const isPluginNameCore = pluginName => pluginName in availablePlugins;
const pluginNameToPlugin = pluginName => {
  if (isPluginNameCore(pluginName) === false) {
    throw new Error(`unknown plugin ${pluginName}`);
  }

  return availablePlugins[pluginName];
};
const pluginOptionMapToPluginMap = (pluginOptionsMap = {}) => {
  const pluginMap = {};
  Object.keys(pluginOptionsMap).forEach(pluginName => {
    pluginMap[pluginName] = [pluginNameToPlugin(pluginName), pluginOptionsMap[pluginName]];
  });
  return pluginMap;
};

const sequence = require("promise-sequential"); // rollup fails if using import here


const getFileLStat = path$$1 => {
  return new Promise((resolve, reject) => {
    fs.lstat(path$$1, (error, lstat) => {
      if (error) {
        reject({
          status: 500,
          reason: error.code
        });
      } else {
        resolve(lstat);
      }
    });
  });
};

const createFolder = ({
  location
}) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(location, error => {
      if (error) {
        // au cas ou deux script essayent de crée un dossier peu importe qui y arrive c'est ok
        if (error.code === "EEXIST") {
          getFileLStat(location).then(stat => {
            if (stat.isDirectory()) {
              resolve();
            } else {
              reject({
                status: 500,
                reason: "expect a directory"
              });
            }
          });
        } else {
          reject({
            status: 500,
            reason: error.code
          });
        }
      } else {
        resolve();
      }
    });
  });
};

const normalizeSeparation = filename => filename.replace(/\\/g, "/");

const createFolderUntil = ({
  location
}) => {
  let path$$1 = normalizeSeparation(location); // remove first / in case path starts with / (linux)
  // because it would create a "" entry in folders array below
  // tryig to create a folder at ""

  const pathStartsWithSlash = path$$1[0] === "/";

  if (pathStartsWithSlash) {
    path$$1 = path$$1.slice(1);
  }

  const folders = path$$1.split("/");
  folders.pop();
  return sequence(folders.map((_, index) => {
    return () => {
      const folderLocation = folders.slice(0, index + 1).join("/");
      return createFolder({
        location: `${pathStartsWithSlash ? "/" : ""}${folderLocation}`
      });
    };
  }));
};

const fileWriteFromString = (location, content) => {
  return createFolderUntil({
    location
  }).then(() => {
    return new Promise((resolve, reject) => {
      fs.writeFile(location, content, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
};

// copied from @babel/preset-env/data/built-in-modules.json.
// Because this is an hidden implementation detail of @babel/preset-env
// it could be deprecated or moved anytime.
// For that reason it makes more sens to have it inlined here
// than importing it from an undocumented location.
// Ideally it would be documented or a separate module
const moduleCompatMap = {
  edge: "16",
  firefox: "60",
  chrome: "61",
  safari: "10.1",
  opera: "48",
  ios_saf: "10.3",
  // eslint-disable-line camelcase
  and_ff: "60" // eslint-disable-line camelcase

};

const objectValues = object => {
  return Object.keys(object).map(key => object[key]);
};
const objectFilter = (object, callback) => {
  const filtered = {};
  Object.keys(object).forEach(key => {
    const value = object[key];

    if (callback(key, value, object)) {
      filtered[key] = value;
    }
  });
  return filtered;
};

const semver = version => {
  if (typeof version === "number") {
    return {
      major: version,
      minor: 0,
      patch: 0
    };
  }

  if (typeof version === "string") {
    if (version.indexOf(".") > -1) {
      const parts = version.split(".");
      return {
        major: Number(parts[0]),
        minor: parts[1] ? Number(parts[1]) : 0,
        patch: parts[2] ? Number(parts[2]) : 0
      };
    }

    if (isNaN(version)) {
      return {
        major: 0,
        minor: 0,
        patch: 0
      };
    }

    return {
      major: Number(version),
      minor: 0,
      patch: 0
    };
  }

  throw new TypeError(`version must be a number or a string, got: ${typeof version}`);
};

const versionCompare = (versionA, versionB) => {
  const semanticVersionA = semver(versionA);
  const semanticVersionB = semver(versionB);
  const majorDiff = semanticVersionA.major - semanticVersionB.major;

  if (majorDiff > 0) {
    return majorDiff;
  }

  if (majorDiff < 0) {
    return majorDiff;
  }

  const minorDiff = semanticVersionA.minor - semanticVersionB.minor;

  if (minorDiff > 0) {
    return minorDiff;
  }

  if (minorDiff < 0) {
    return minorDiff;
  }

  const patchDiff = semanticVersionA.patch - semanticVersionB.patch;

  if (patchDiff > 0) {
    return patchDiff;
  }

  if (patchDiff < 0) {
    return patchDiff;
  }

  return 0;
};
const versionEqual = (versionA, versionB) => {
  return String(versionA) === String(versionB);
};
const versionIsAbove = (versionSupposedAbove, versionSupposedBelow) => {
  return versionCompare(versionSupposedAbove, versionSupposedBelow) > 0;
};
const versionIsBelow = (versionSupposedBelow, versionSupposedAbove) => {
  return versionCompare(versionSupposedBelow, versionSupposedAbove) < 0;
};
const versionIsBelowOrEqual = (versionSupposedBelow, versionSupposedAbove) => {
  return versionEqual(versionSupposedBelow, versionSupposedAbove) || versionIsBelow(versionSupposedBelow, versionSupposedAbove);
};
const versionHighest = (versionA, versionB) => {
  return versionIsAbove(versionA, versionB) ? versionA : versionB;
};
const versionLowest = (versionA, versionB) => {
  return versionIsBelow(versionA, versionB) ? versionA : versionB;
};

const pluginCompatMapToPlatformVersion = (pluginCompatMap, platformName) => {
  return platformName in pluginCompatMap ? pluginCompatMap[platformName] : "Infinity";
};

const isPlatformCompatible = (pluginCompatMap, platformName, platformVersion) => {
  const compatibleVersion = pluginCompatMapToPlatformVersion(pluginCompatMap, platformName);
  return versionIsBelow(platformVersion, compatibleVersion);
};

const pluginMapForPlatform = (pluginMap, platformName, platformVersion, compatMap$$1) => {
  return objectFilter(pluginMap, pluginName => {
    return isPlatformCompatible(pluginName in compatMap$$1 ? compatMap$$1[pluginName] : {}, platformName, platformVersion);
  });
};

const pluginMapToPluginsForPlatform = (pluginMap, platformName, platformVersion, compatMap$$1 = compatMap) => {
  const platformPluginMap = pluginMapForPlatform(pluginMap, platformName, platformVersion, compatMap$$1);
  const plugins = objectValues(platformPluginMap);
  return plugins;
};

const writeCompileResultInto = async (name, {
  code,
  map
}, {
  localRoot,
  into
}) => {
  const compiledName = `${into}/${name}`;
  const compiledAbsoluteName = `${localRoot}/${compiledName}`;

  if (map) {
    const sourceMapName = `${path.basename(name)}.map`;
    const sourceMapLocationForSource = `${sourceMapName}`;
    const folder = path.dirname(name);
    const sourceMapAbsoluteName = `${localRoot}/${into}/${folder ? `${folder}/` : "/"}${sourceMapName}`;
    return Promise.all([fileWriteFromString(compiledAbsoluteName, `${code}
//# sourceMappingURL=${sourceMapLocationForSource}`), fileWriteFromString(sourceMapAbsoluteName, JSON.stringify(map, null, "  "))]);
  }

  return fileWriteFromString(compiledAbsoluteName, code);
};

exports.compatMap = compatMap;
exports.compileFile = compileFile;
exports.pluginNameToPlugin = pluginNameToPlugin;
exports.isPluginNameCore = isPluginNameCore;
exports.pluginOptionMapToPluginMap = pluginOptionMapToPluginMap;
exports.fileWriteFromString = fileWriteFromString;
exports.moduleCompatMap = moduleCompatMap;
exports.pluginMapToPluginsForPlatform = pluginMapToPluginsForPlatform;
exports.versionIsAbove = versionIsAbove;
exports.versionIsBelow = versionIsBelow;
exports.versionIsBelowOrEqual = versionIsBelowOrEqual;
exports.versionHighest = versionHighest;
exports.versionLowest = versionLowest;
exports.versionCompare = versionCompare;
exports.writeCompileResultInto = writeCompileResultInto;
//# sourceMappingURL=index.js.map
