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

function projHourly(store) {

    var min = store.minCust;
    var max = store.maxCust;
    var avg = store.cookiesPerCust;
    var hourlySales = []; 

    function customers(min, max) {
        return Math.floor(Math.random() * (max-min) + min);
    };

    for (var i = 600; i <= 2000; i += 100) {
        var sales = Math.floor(customers(min,max) * avg);  
        hourlySales.push(sales);   
    }     

    store.hourlySales = hourlySales;
}



// separate these functions out into a global function and not an object method.

// generate random number customers per hour betwen these then
// calculate projected cookees sold each hour between 6am and 8pm

// edge cases: (stretch goal) allows for array containing key/value pairs for holidays? Nah, that should be thing where it takes date as input and has an object that's teh table of dates with their averages in them. Doesn't matter when it's a holidy, it should eventually learn what every day's average is.  


// generate a header with store name etc.

// generate li for each hourly total between 6am and 8pm
// for each store
// generate a ul named that storename
// iterate through the sales figures
// for each hour generate an li
// contains: hour, projected sales number (tricky to go up to 12 then swap am pm) (Do this with 24hour format?)
// append that li to the ul 