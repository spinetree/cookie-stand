'use strict';

// console.log('js loading');

// the stores 
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

// hard code times for now
// do this programattically later if time
var times = ['6 a.m.', '7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.', '7 p.m.', '8 p.m.'];

// hard code store list for now
var stores = [store1, store2, store3, store4, store5];

// generate the hourly projections and insert them in each store object as an array

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

function initialize() {

    for (var i = 0; i < stores.length; i++) {
        projHourly(stores[i]);
        console.log('initialized');
    }
};


// spit out list items from what's in the store's hourlySales array

function listHourly(store) {
    for (var i = 0; i < times.length; i++) {
        var listItem = (times[i] + ' : ' + store.hourlySales[i]);
        return listItem;
    }
};

// make the store h3 and ul

function renderStores() {

    var salestable = document.getElementById('test');
    
    for (var i = 0; i < stores.length; i++) {

        var storeDiv = document.createElement('div');
        storeDiv.setAttribute('id', 'store-' + stores[i].storeId);
        salestable.appendChild(storeDiv);
        
        var storeClass = 'store-' + stores[i].storeId;
        // console.log(storeClass);
        
        var storeDiv = document.getElementById(storeClass);
        // console.log(storeDiv);
        
        var storeh3 = document.createElement('h3');
        storeh3.textContent = stores[i].storeName;
        storeDiv.appendChild(storeh3);

        var storeUl = document.createElement('ul');
        storeUl.appendChild(document.createTextNode('testdata'));
        storeDiv.appendChild(storeUl);

        var ul = document.getElementById(storeClass);
        var li = document.createElement('li');
        li.appendChild(document.createTextNode('some placeholder data'));
        ul.appendChild(li);

        // console.log(stores.length);
        // console.log(stores[index].projHourly.length);

        // for (var x = 0; x < stores[index].projHourly.length; x++) {
        //     console.log('firing');
        //     // console.log(store[i].projHourly[i]);
        // }

    }

}


// populate the store ul with the list data

function addToList(storeId) {

}


// function render() {

//     for (var i = 0; i < stores.length; i++) {
//         projHourly(stores[i]);
//         // console.log(i, stores[i].storeId, stores[i].storeName);
//         renderStore(i, stores[i].storeId, stores[i].storeName);
//     }
// };

// will need to do a for loop in another for loop to make this work - loop through locations then loop through again, grabbing an hour from the hours glonal array and the sales number from the store object's projected sales array


// for each (store in list) {x
// spit out an h3
// spit out an empty ul
// for each (item in projHourly)
//    { spit out an li
//      append to the ul
//      }
// }


// for each store 
// run project (populate stores with projection arrays) 
// list store name
// create a ul
// loop through hourly projections  
// make a list item for each
// append that list item to the ul





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