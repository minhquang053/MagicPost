function getAccountBasicInformation(query) {
    const role = query.role;
    const loc = query.loc;

    return {
        role,
        loc,
    };
}

module.exports = {
    getAccountBasicInformation,
}