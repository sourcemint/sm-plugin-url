
const PATH = require("path");


exports.for = function(API, plugin) {

    plugin.resolveLocator = function(locator, options, callback) {
        var self = this;

        if (!locator.url) {
            locator.url = locator.descriptor.pointer;
        }

        locator.getLocation = function(type) {
            var locations = {
                "pointer": locator.url
            };
            locations.url = locator.url;
            return (type)?locations[type]:locations;
        }

        return callback(null, locator);
    }

    plugin.extract = function(fromPath, toPath, locator, options) {

        toPath = PATH.join(toPath, "response-body");

        if (!API.FS.existsSync(PATH.dirname(toPath))) {
            API.FS.mkdirsSync(PATH.dirname(toPath));
        }

        var deferred = API.Q.defer();
        API.FS.copy(fromPath, toPath, function(err) {
            if (err) return deferred.reject(err);
            if (locator.url) {
                return API.FS.symlink(PATH.basename(toPath), PATH.join(toPath, "..", PATH.basename(locator.url)), function(err) {
                    if (err) return deferred.reject(err);

                    return deferred.resolve();
                });
            } else {
                return deferred.resolve();
            }
        });
        return deferred.promise;
    }

}
