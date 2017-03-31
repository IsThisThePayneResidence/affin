/**
 * Created by ivan on 3/31/17.
 */

$("#a").change(function() {
    checkAndEvaluate();
});
$("#n").change(function() {
    checkAndEvaluate();
});

setInterval(checkAndEvaluate, 500);

var q  = "0";
var x1 = "1";
var x2 = "2";
var x3 = "3";
var y1 = "4";
var y2 = "5";
var y3 = "6";

function checkAndEvaluate() {
    var a = +$('#a').val();
    var n = +$('#n').val();
    console.log([a, n]);
    if (a && n) {
        evaluateAndPrint(a, n)
    }
}
function printToTable(data) {
    $("table tr").remove();
    var tableOmset = $('table.table-data-omset');
    var tbodyTableOmset = tableOmset.find('tbody');
    var trTableOmset = '';
    for (var a = 0; a < data.ver.length; a++) {
        trTableOmset += '<tr>';
        for (var b = 0; b < 7; b++) {
            if (data.ver[a][b] === null) {
                data.ver[a][b] = '';
            }
            trTableOmset += '<td>' + data.ver[a][b] + '</td>';
        }
        trTableOmset += '</tr>';
    }
    $('#res').val(data.ver[data.ver.length - 1][y2])
    tbodyTableOmset.append(trTableOmset);
}

function evaluateAndPrint(a, n) {
    var data = [
        {
            "0": "q",
            "1": "X1",
            "2": "X2",
            "3": "X3",
            "4": "Y1",
            "5": "Y2",
            "6": "Y3"
        },
        {
            "0": null,
            "1": 1,
            "2": 0,
            "3": n,
            "4": 0,
            "5": 1,
            "6": a
        }
    ];

    for (i = 2;;++i) {
        console.log(data);
        data[i] = {"0": null, "1": null, "2": null, "3": null,  "4": null, "5": null, "6": null};
        data[i][q] = Math.floor(data[i - 1][x3] / data[i - 1][y3]);

        data[i][x1] = data[i - 1][y1];
        data[i][x2] = data[i - 1][y2];
        data[i][x3] = data[i - 1][y3];

        data[i][y1] = data[i - 1][x1] - data[i][q] * data[i - 1][y1];
        data[i][y2] = data[i - 1][x2] - data[i][q] * data[i - 1][y2];
        data[i][y3] = data[i - 1][x3] - data[i][q] * data[i - 1][y3];

        if (data[i][y3] == 0.0 || i > 15) {
            break
        }
    }

    printToTable({"ver": data})
}