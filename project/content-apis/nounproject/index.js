var NounProject = require('the-noun-project')

module.exports = {
    connect: function(opts) {
        this.nounApi = new NounProject({
            key: opts.apiKey,
            secret: opts.apiSecret
        });
    },
    search: function(opts) {
        this.nounApi.getIconsByTerm(opts.tags, {limit: opts.limit}, function (err, data) {
            if (!err) {
                console.log(data.icons);
                return data.icons
            }
        });
    }
}
