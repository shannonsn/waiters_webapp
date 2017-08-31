module.exports = function(waiterSchemaModel) {
    var list = {};
    var namesArr = [];
    var index = function(req, res) {
        res.render('add');
    }

    function manageDays(day) {
        return day
    }

    var getName = function(req, res) {
        var day = req.body.day
        var name = req.body.newName;
        var button = req.body.submit;

        if (list[name] == undefined && list[day] == undefined) {
            list[name] = 1;
            list[day] = 1
            namesArr.push(name);
            res.render('add', {
                names: namesArr,
                days: manageDays(day)
            });
        }
    };

    return {
        index,
        getName
    };
};
