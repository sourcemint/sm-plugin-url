
exports.for = function(API, plugin) {

    plugin.resolveLocator = function(locator, options) {
        var self = this;

		locator.url = locator.descriptor.pointer;

        locator.getLocation = function(type) {
            var locations = {
                "pointer": locator.url
            };
            return (type)?locations[type]:locations;
        }

        return self.API.Q.resolve(locator);
    }

    plugin.extract = function(fromPath, toPath, locator, options) {

console.log("EXTRACT", fromPath, toPath, locator);

        return API.Q.reject(new Error("NYI"));
    }

}
