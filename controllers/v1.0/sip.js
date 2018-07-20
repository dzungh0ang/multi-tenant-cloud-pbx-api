/*********** Controller *************/
var mysql = require('mysql');
var errorCodes = require('../../enums/error-code');
var jsonHelper = require('../../helpers/json-helper');
import configs from '../../configs'
var request = require('request');

function getFilters(queryList) {
    let filters = {};
    for (var query in queryList) {
        if (queryList.hasOwnProperty(query)) {
            var value = queryList[query];

            switch (query) {
                case "size":
                case "page": {

                    break;
                }
                default: {
                    if ((query.startsWith("from") || query.startsWith("to")) && query.indexOf("-") > 0) {
                        let arr = query.split("-");
                        let propertyName = arr[1];
                        if (propertyName) {
                            if (arr === "from") {
                                filters[propertyName] = {
                                    $gt: parseInt(value)
                                }
                            } else {
                                filters[propertyName] = {
                                    $lt: parseInt(value)
                                }
                            }

                        }
                    } else {
                        filters[query] = value;
                    }

                    break;
                }
            }
        }
    }

    return filters;
}

module.exports = {
    list: function (req, res, next) {
        let filters = getFilters(req.query);
        let sort = {};
        let limit = parseInt(req.query.size) || 10;
        let skip = parseInt(req.query.page) || 0;

        var connection = mysql.createConnection(configs.mysql);
        connection.connect(function (err) {
            if (err) {
                res.json({
                    success: false,
                    code: errorCodes.default.mysql.connection_failed.code,
                    message: errorCodes.default.mysql.connection_failed.message,
                    data: err
                });
            } else {

                let query = `SELECT * FROM sip`;
                connection.query(query, function (err, results, fields) {
                    if (err) {
                        res.json({
                            success: false,
                            code: errorCodes.default.mysql.connection_failed.code,
                            message: errorCodes.default.mysql.connection_failed.message,
                            data: err
                        });
                    } else {
                        /*
                        request.get("http://103.63.108.12:8088/ari/endpoints/SIP?api_key=pbx-api:azx12Po0",{},function(error, response, body){
                            if(err){
                                res.json({
                                    success: true,
                                    code: errorCodes.other.success.code,
                                    message: errorCodes.other.success.message,
                                    data:results
                                });
                            }else{
                                */
                        //  let foundSips = JSON.parse(body);
                        let sips = [];
                        results.forEach(item => {
                            let sip = {
                                username: item.username,
                                secret: item.secret,
                                callerid: item.callerid,
                                context: item.context,
                                customer: item.customer
                            };
                            /*
                            foundSips.forEach(s => {
                                
                                if(s.resource === item.name){
                                    if(s.state === "online"){
                                        sip.ipaddr = '123456789';
                                    }
                                }
                            });
                            */
                            sips.push(sip);
                        });

                        res.json({
                            success: true,
                            status: 200,
                            /*
                            code: errorCodes.other.success.code,
                            message: errorCodes.other.success.message,
                            */
                            data: sips
                        });



                    }
                    connection.destroy();
                });
            }
        });
    },
    count: function (req, res, next) {
        res.json({
            success: true,
            code: errorCodes.other.success.code,
            message: errorCodes.other.success.message,
            data: 20
        });
    },
    getOne: function (req, res, next) {
        let username = req.params.username || "";

        var connection = mysql.createConnection(configs.mysql);

        connection.connect(function (err) {
            if (err) {
                res.json({
                    success: false,
                    code: errorCodes.default.mysql.connection_failed.code,
                    message: errorCodes.default.mysql.connection_failed.message,
                    data: err
                });
            } else {
                let query = `SELECT * FROM sip WHERE username='${username}'`;
                connection.query(query, function (err, results, fields) {
                    if (err) {
                        res.json({
                            success: false,
                            code: errorCodes.default.mysql.connection_failed.code,
                            message: errorCodes.default.mysql.connection_failed.message,
                            data: err
                        });
                    } else {
                        if (results.length === 1) {
                            res.json({
                                success: true,
                                status: 200,
                                /*code: errorCodes.other.success.code,
                                message: errorCodes.other.success.message,
                                */
                                data: results[0]
                            });
                        } else {
                            res.json({
                                success: false,
                                code: errorCodes.default.mysql.not_found.code,
                                message: errorCodes.default.mysql.not_found.message,
                                data: undefined
                            });
                        }

                    }
                    connection.destroy();
                });
            }
        });
    },
    create: function (req, res, next) {
        let username = req.body.username || "";
        let secret = req.body.secret || "";
        let context = req.body.context || "";
        let callerid = req.body.callerid || "";
        let customer = req.body.customer || "";


        if (username.length >= 3) {
            var connection = mysql.createConnection(configs.mysql);

            connection.connect(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        code: errorCodes.default.mysql.connection_failed.code,
                        message: errorCodes.default.mysql.connection_failed.message,
                        data: err
                    });
                } else {

                    let query = `INSERT INTO
                    sip(username, secret, callerid, context, customer)
                    VALUES('${req.body.username}', '${req.body.secret}', '${req.body.callerid}', '${req.body.context}' ,'${req.body.customer}')`;
                    connection.query(query, function (err, results, fields) {
                        if (err) {
                            res.json({
                                success: false,
                                code: errorCodes.default.mysql.connection_failed.code,
                                message: errorCodes.default.mysql.connection_failed.message,
                                data: err
                            });
                        } else {
                            res.json({
                                success: true,
                                code: errorCodes.default.mysql.success.code,
                                message: errorCodes.default.mysql.success.message,
                                data: results
                            });
                        }
                        connection.destroy();
                    });
                }
            });
        } else {
            res.json({
                success: false,
                code: errorCodes.default.mysql.create_failed.code,
                message: errorCodes.default.mysql.create_failed.message,
                data: undefined
            });
        }
    },
    update: function (req, res, next) {
        let username = req.params.username || "";
        let secret = req.body.secret || "";
        let callerid = req.body.callerid || "";
        let context = req.body.context || "";
        let customer = req.body.customer || "";

        if (username.length >= 0) {
            var connection = mysql.createConnection(configs.mysql);

            connection.connect(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        code: errorCodes.default.mysql.connection_failed.code,
                        message: errorCodes.default.mysql.connection_failed.message,
                        data: err
                    });
                } else {
                    let query = `UPDATE sip SET secret='${secret}', callerid='${callerid}', context='${context}', customer='${customer}'
                    WHERE username='${username}'`;
                    connection.query(query, function (err, results, fields) {
                        if (err) {
                            res.json({
                                success: false,
                                code: errorCodes.default.mysql.connection_failed.code,
                                message: errorCodes.default.mysql.connection_failed.message,
                                data: err
                            });
                        } else {
                            if (results.changedRows === 0) {
                                res.json({
                                    success: false,
                                    code: errorCodes.default.mysql.update_failed.code,
                                    message: errorCodes.default.mysql.update_failed.message
                                })
                            }
                            else {
                                res.json({
                                    success: true,
                                    code: errorCodes.default.mysql.success.code,
                                    message: errorCodes.default.mysql.success.message,
                                    data: {
                                        username: username,
                                        secret: secret,
                                        callerid: callerid,
                                        context: context,
                                        customer: customer
                                    }
                                });
                            }

                            /*
                            let ami = new require('asterisk-manager')('5038', '183.91.1.101', 'crmi', 'K3yAMI@crmi227', true);
                            ami.action({
                                'action':'sip reload'
                              }, function(err, res) {
                                  console.log(err,res);
                              });
                              */

                        }
                        connection.destroy();
                    });
                }
            });
        } else {
            res.json({
                success: false,
                code: errorCodes.default.mysql.create_failed.code,
                message: errorCodes.default.mysql.create_failed.message,
                data: undefined
            });
        }
    },
    delete: function (req, res, next) {
        let username = req.params.username || "";

        if (username.length >= 0) {
            var connection = mysql.createConnection(configs.mysql);

            connection.connect(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        code: errorCodes.default.mysql.connection_failed.code,
                        message: errorCodes.default.mysql.connection_failed.message,
                        data: err
                    });
                } else {

                    let query = `DELETE FROM sip WHERE username='${username}';`;
                    connection.query(query, function (err, results, fields) {
                        if (err) {
                            res.json({
                                success: false,
                                code: errorCodes.default.mysql.connection_failed.code,
                                message: errorCodes.default.mysql.connection_failed.message,
                                data: err
                            });
                        } else {
                            if (results.affectedRows === 0) {
                                res.json({
                                    success: false,
                                    code: errorCodes.default.mysql.delete_failed.code,
                                    message: errorCodes.default.mysql.delete_failed.message
                                })
                            }
                            else {
                                res.json({
                                    success: true,
                                    code: errorCodes.default.mysql.success.code,
                                    message: errorCodes.default.mysql.success.message,
                                    data: results
                                });
                            }

                        }
                        connection.destroy();
                    });
                }
            });
        } else {
            res.json({
                success: false,
                code: errorCodes.default.mysql.delete_failed.code,
                message: errorCodes.default.mysql.delete_failed.message,
                data: undefined
            });
        }
    }
}