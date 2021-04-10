exports.validate = (route, routes) => {
    const array = Object.values(routes);

    const valid = array.map(item => {
        var regexp = new RegExp(item.route);
        return regexp.test(route);
    });

    if (valid.indexOf(true) != -1) {
        return true;
    }

    return false;
}