'use strict';

// console.log('js loading');

var store1 = {
    storeId: 1,
    storeName: '1st and Pike',
    minCust: 23,
    maxCust: 65,
    cookiesPerCust: 6.3,
    hourlySales: []
};

var store2 = {
    storeId: 2,
    storeName: 'SeaTac Airport',
    minCust: 3,
    maxCust: 24,
    cookiesPerCust: 1.2,
    hourlySales: []
};

var store3 = {
    storeId: 3,
    storeName: 'Seattle Center',
    minCust: 11,
    maxCust: 38,
    cookiesPerCust: 3.7,
    hourlySales: []
};

var store4 = {
    storeId: 4,
    storeName: 'Capitol Hill',
    minCust: 20,
    maxCust: 38,
    cookiesPerCust: 2.3,
    hourlySales: []
};

var store5 = {
    storeId: 5,
    storeName: 'Alki',
    minCust: 2,
    maxCust: 16,
    cookiesPerCust: 4.6,
    hourlySales: []
};

// do this programattically later if time
// function niceTime() {
    // for (var i=0; i < times.length; i++;) {

    // }
// }

var times = ['6 a.m.','7 a.m.','8 a.m.','9 a.m.','10 a.m.','11 a.m.','12 p.m.', '1 p.m.','2 p.m.','3 p.m.','4 p.m.','5 p.m.','6 p.m.','7 p.m.','8 p.m.'];

function projHourly(store) {

    var min = store.minCust;
    var max = store.maxCust;
    var avg = store.cookiesPerCust;
    var hourlySales = [];

    function customers(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };

    for (var i = 0; i < times.length; i++) {
        var sales = Math.floor(customers(min, max) * avg);
        hourlySales.push(sales);
    }

    store.hourlySales = hourlySales;
}


function listHourly(store) {

    for (var i = 0; i < times.length; i++) {
        var listItem = (times[i] + ' : ' + store.hourlySales[i]);
        console.log(listItem);
    }
};



// separate these functions out into a global function and not an object method.

// generate random number customers per hour betwen these then
// calculate projected cookees sold each hour between 6a.m. and 8pm

// edge cases: (stretch goal) allows for array containing key/value pairs for holidays? Nah, that should be thing where it takes date as input and has an object that's teh table of dates with their averages in them. Doesn't matter when it's a holidy, it should eventually learn what every day's average is.  


// generate a header with store name etc.

// generate li for each hourly total between 6am and 8pm
// for each store
// generate a ul named that storename
// iterate through the sales figures
// for each hour generate an li
// contains: hour, projected sales number (tricky to go up to 12 then swap am pm) (Do this with 24hour format?)
// append that li to the ul 