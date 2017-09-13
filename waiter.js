module.exports = function(waiterSchemaModel) {
    var list = {};
    var daysObj = {};

    function color(days) {
        if (days === 3) {
            return "highlight1";
        } else if (days < 3) {
            return "highlight2";
        } else if (days > 3) {
            return "highlight3";
        }
    }

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
                    MondayColor: color(Monday.length),
                    Tuesday: Tuesday,
                    TuesdayColor: color(Tuesday.length),
                    Wednesday: Wednesday,
                    WednesdayColor: color(Wednesday.length),
                    Thursday: Thursday,
                    ThursdayColor: color(Thursday.length),
                    Friday: Friday,
                    FridayColor: color(Friday.length),
                    Saturday: Saturday,
                    SaturdayColor: color(Saturday.length),
                    Sunday: Sunday,
                    SundayColor: color(Sunday.length)
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

        if (list[name] === undefined) {
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

            res.render('add', {
                name: name,
                day: day,
                mes: "Was successfully selected"
            });
        }
          //   waiterSchemaModel.findOne({
          //     username:name
          //   },function(result){
          //   if (result){
          //     waiterSchemaModel.save({
          //       day: daysObj
          //     } else if (!result) {
          //       waiterSchemaModel.create({
          //         username: name,
          //         day: daysObj
          //       })
          //     })
          //   }
          // })

};

return {
    index,
    getName,
    addOn,
    admin
};
};
