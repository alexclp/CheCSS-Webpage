var fs = require('fs');
var css = require('css');
var util = require('util');
var directory = require('/data/directory.json');

var csscc = function (browsers) {

    var config = browsers;

    fs.readFile('./src/sample.css', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var cssData = css.parse(data, {});
        //console.log(util.inspect(cssData, {showHidden: false, depth: null}));
        var properties = [];
        var values = [];

        for (var i = 0; i < cssData.stylesheet.rules.length; i++) {
//			console.log(cssData.stylesheet.rules[i]);
            var rule = cssData.stylesheet.rules[i];
            if (rule.declarations) {
                for (var j = 0; j < rule.declarations.length; j++) {
                    if (rule.declarations[j].type === "declaration") {
//						console.log(rule.declarations[j].property);
//                        console.log(rule.declarations[j]);
                        properties.push(rule.declarations[j].property);
                        values.push(rule.declarations[j].value);
                    }
                }
            }
        }

        for (var i = 0; i < properties.length; i++) {
            for (var j = 0; j < directory.properties.length; j++) {
                if (properties[i] === directory.properties[j].name) {

                    var file = require('./data/' + directory.properties[j].file);
//                    console.log(properties[i]);
                    for (var key in config) {
                        var support = file.stats[key]
                        //console.log(config[key],file.stats[key]);
                        for (var version in file.stats[key]) {
                            //console.log(parseInt(version), parseInt(config[key]));
                            if (parseInt(version) > parseInt(config[key])) {
                                if(file.stats[key][version].indexOf('y') === -1) {
                                    console.log("Error, " + key + " " + version + " does not support the css property '" + properties[i] + "'");
                                }
                            }
                        }
                    }
                }
            }
        }

         for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < directory.values.length; j++) {
                if (values[i] === directory.values[j].name) {

                    var file = require('./data/' + directory.values[j].file);
//                    console.log(properties[i]);
                    for (var key in config) {
                        var support = file.stats[key]
                        //console.log(config[key],file.stats[key]);
                        for (var version in file.stats[key]) {
                            //console.log(parseInt(version), parseInt(config[key]));
                            if (parseInt(version) > parseInt(config[key])) {
                                if(file.stats[key][version].indexOf('y') === -1) {
                                    console.log("Error, " + key + " " + version + " does not support the css value '" + values[i] + "'");
                                }
                            }
                        }
                    }
                }
            }
        }

    });
}

csscc({
    ie: "7",
    edge: "12",
    firefox: "16",
    "chrome": "30",
    "safari": "8",
    "opera": "25"
});

module.exports = csscc;


//browsers
//
//"ie":{
//      "5.5":"n",
//      "6":"n",
//      "7":"n",
//      "8":"n",
//      "9":"a #2",
//      "10":"y",
//      "11":"y"
//    },
//    "edge":{
//      "12":"y",
//      "13":"y",
//      "14":"y"
//    },
//    "firefox":{
//      "2":"n",
//      "3":"n",
//      "3.5":"n",
//      "3.6":"n",
//      "4":"y x",
//      "5":"y x",
//      "6":"y x",
//      "7":"y x",
//      "8":"y x",
//      "9":"y x",
//      "10":"y x",
//      "11":"y x",
//      "12":"y x",
//      "13":"y x",
//      "14":"y x",
//      "15":"y x",
//      "16":"y",
//      "17":"y",
//      "18":"y",
//      "19":"y",
//      "20":"y",
//      "21":"y",
//      "22":"y",
//      "23":"y",
//      "24":"y",
//      "25":"y",
//      "26":"y",
//      "27":"y",
//      "28":"y",
//      "29":"y",
//      "30":"y",
//      "31":"y",
//      "32":"y",
//      "33":"y",
//      "34":"y",
//      "35":"y",
//      "36":"y",
//      "37":"y",
//      "38":"y",
//      "39":"y",
//      "40":"y",
//      "41":"y",
//      "42":"y",
//      "43":"y",
//      "44":"y",
//      "45":"y",
//      "46":"y",
//      "47":"y",
//      "48":"y"
//    },
//    "chrome":{
//      "4":"n",
//      "5":"n",
//      "6":"n",
//      "7":"n",
//      "8":"n",
//      "9":"n",
//      "10":"n",
//      "11":"n",
//      "12":"n",
//      "13":"n",
//      "14":"n",
//      "15":"n",
//      "16":"n",
//      "17":"n",
//      "18":"n",
//      "19":"y x",
//      "20":"y x",
//      "21":"y x",
//      "22":"y x",
//      "23":"y x",
//      "24":"y x",
//      "25":"y x",
//      "26":"y",
//      "27":"y",
//      "28":"y",
//      "29":"y",
//      "30":"y",
//      "31":"y",
//      "32":"y",
//      "33":"y",
//      "34":"y",
//      "35":"y",
//      "36":"y",
//      "37":"y",
//      "38":"y",
//      "39":"y",
//      "40":"y",
//      "41":"y",
//      "42":"y",
//      "43":"y",
//      "44":"y",
//      "45":"y",
//      "46":"y",
//      "47":"y",
//      "48":"y",
//      "49":"y",
//      "50":"y",
//      "51":"y",
//      "52":"y"
//    },
//    "safari":{
//      "3.1":"n",
//      "3.2":"n",
//      "4":"n",
//      "5":"n",
//      "5.1":"n",
//      "6":"y x",
//      "6.1":"y",
//      "7":"y",
//      "7.1":"y",
//      "8":"y",
//      "9":"y",
//      "9.1":"y"
//    },
//    "opera":{
//      "9":"n",
//      "9.5-9.6":"n",
//      "10.0-10.1":"n",
//      "10.5":"n",
//      "10.6":"n",
//      "11":"n",
//      "11.1":"n",
//      "11.5":"n",
//      "11.6":"n",
//      "12":"n",
//      "12.1":"n",
//      "15":"y",
//      "16":"y",
//      "17":"y",
//      "18":"y",
//      "19":"y",
//      "20":"y",
//      "21":"y",
//      "22":"y",
//      "23":"y",
//      "24":"y",
//      "25":"y",
//      "26":"y",
//      "27":"y",
//      "28":"y",
//      "29":"y",
//      "30":"y",
//      "31":"y",
//      "32":"y",
//      "33":"y",
//      "34":"y",
//      "35":"y",
//      "36":"y",
//      "37":"y"
//    },
//    "ios_saf":{
//      "3.2":"n",
//      "4.0-4.1":"n",
//      "4.2-4.3":"n",
//      "5.0-5.1":"n",
//      "6.0-6.1":"y x",
//      "7.0-7.1":"y",
//      "8":"y",
//      "8.1-8.4":"y",
//      "9.0-9.2":"y",
//      "9.3":"y"
//    },
//    "op_mini":{
//      "5.0-8.0":"n"
//    },
//    "android":{
//      "2.1":"n",
//      "2.2":"n",
//      "2.3":"n",
//      "3":"n",
//      "4":"n",
//      "4.1":"n",
//      "4.2-4.3":"n",
//      "4.4":"a #1",
//      "4.4.3-4.4.4":"a #1",
//      "47":"y"
//    },
//    "bb":{
//      "7":"n",
//      "10":"y"
//    },
//    "op_mob":{
//      "10":"n",
//      "11":"n",
//      "11.1":"n",
//      "11.5":"n",
//      "12":"n",
//      "12.1":"n",
//      "33":"y"
//    },
//    "and_chr":{
//      "49":"y"
//    },
//    "and_ff":{
//      "44":"y"
//    },
//    "ie_mob":{
//      "10":"y",
//      "11":"y"
//    },
//    "and_uc":{
//      "9.9":"n"
//    }
//  },
