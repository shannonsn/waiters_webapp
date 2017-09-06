module.exports = function(waiterSchemaModel) {
    var list = {};
    var daysArr = [];
    var daysObj = {};

    var Monday = [];
    var Tuesday = [];
    var Wednesday = [];
    var Thursday = [];
    var Friday = [];
    var Saturday = [];
    var Sunday = [];

    var admin = function(req, res, err) {
        waiterSchemaModel.find({}, function(err, result) {
            Monday = [];
            Tuesday = [];
            Wednesday = [];
            Thursday = [];
            Friday = [];
            Saturday = [];
            Sunday = [];

            if (err) {
                console.log(err);
            } else {
                var waiters = result;

                for (var i = 0; i < waiters.length; i++) {
                    var curWaiter = waiters[i].day;
                    for (var day in curWaiter) {
                        if (day == 'Monday') {
                            Monday.push(waiters[i].username);
                        } else if (day == 'Tuesday') {
                            Tuesday.push(waiters[i].username);
                        } else if (day == 'Wednesday') {
                            Wednesday.push(waiters[i].username);
                        } else if (day == 'Thursday') {
                            Thursday.push(waiters[i].username);
                        } else if (day == 'Friday') {
                            Friday.push(waiters[i].username);
                        } else if (day == 'Saturday') {
                            Saturday.push(waiters[i].username);
                        } else if (day == 'Sunday') {
                            Sunday.push(waiters[i].username);
                        }
                    }
                }

                res.render('index', {
                    Monday: Monday,
                    Tuesday: Tuesday,
                    Wednesday: Wednesday,
                    Thursday: Thursday,
                    Friday: Friday,
                    Saturday: Saturday,
                    Sunday: Sunday
                });
            }
        });
    };

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

    var getName = function(req, res) {
        daysObj = {};
        var name = req.params.username;
        var day = req.body.day;
        var button = req.body.submit;

        if (list[name] === undefined && list[day] === undefined) {
            for (var i = 0; i < day.length; i++) {
                daysObj[day[i]] = true;
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

            res.render('add', {
                name: name,
                day: day,
                mes: "Was successfully selected"
            });
        }
    };

    return {
        index,
        getName,
        addOn,
        admin
    };
};
