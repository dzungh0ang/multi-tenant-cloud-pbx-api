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

                let query = `SELECT * FROM queue`;
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
                            status: 200,
                            data: results
                        });

                    }
                    connection.destroy();
                });
            }
        });
    },
    count: function (req, res, next) {
        let filters = getFilters(req.query);

        res.json({
            success: true,
            code: errorCodes.default.other.success.code,
            message: errorCodes.default.other.success.message,
            data: undefined
        });
    },
    getOne: function (req, res, next) {
        let name = req.params.name || "";

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
                let query = `SELECT * FROM queue WHERE name='${name}'`;
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
        let name = req.body.name || "";
        let rule = req.body.rule || "";
        let customer = req.body.customer || "";


        if (name.length >= 3) {
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
                    queue(name, rule, customer)
                    VALUES('${req.body.name}', '${req.body.rule}','${req.body.customer}')`;
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
        let name = req.params.name || "";
        let rule = req.body.rule || "";
        let customer = req.body.customer || "";

        if (name.length >= 0) {
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
                    let query = `UPDATE queue SET rule='${rule}', customer='${customer}'
                    WHERE name='${name}'`;
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
                                        name: name,
                                        rule: rule,
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
        let name = req.params.name || "";

        if (name.length >= 0) {
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

                    let query = `DELETE FROM queue WHERE name='${name}';`;
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