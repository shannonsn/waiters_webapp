module.exports = function(waiterSchemaModel) {
    var list = {};
    var daysArr = [];
    var daysObj = {};

    var index = function(req, res) {
        res.render('add');
    };

    var addOn = function(req, res, err) {
        if (err) {
            console.log(err);
        } else {
            res.render('add', {
                name: list
            });
        }
    };

    function manageDays(day) {
        return day;
    }


    var getName = function(req, res) {
      daysObj = {};
        var name = req.params.username;
        var day = req.body.day;
        var button = req.body.submit;

        if (list[name] === undefined && list[day] === undefined) {
            for (var i = 0; i < day.length; i++) {
                daysObj[day[i]] = true
            }
            list = {
                username: name,
                day: daysObj

            };

            waiterSchemaModel.create({
                username: name,
                day: daysObj
            });

            daysArr.push(day);
// console.log(daysArr);

            res.render('add', {
                name: name,
                day: manageDays(day),
                mes: "Was successfully selected"
            });
            console.log(list);
        }
    }

    return {
        index,
        getName,
        addOn
    };
};
