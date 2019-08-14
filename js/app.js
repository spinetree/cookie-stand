'use strict';

// console.log('js loading');

var times = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm'];
Store.storeList = [];

function Store(name, minCust, maxCust, cookiesPerCust) {
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.cookiesPerCust = cookiesPerCust;
    this.hourlySales = [];
    Store.storeList.push(this);

    this.projectSales = function () {

        var min = this.minCust;
        var max = this.maxCust;
        var avg = this.cookiesPerCust;

        function customers(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        };

        for (var i = 0; i < times.length; i++) {
            var sales = Math.floor(customers(min, max) * avg);
            this.hourlySales.push(sales);
        };
    };

    this.totalSales = function () {

        var dailyTotal = 0;
        for (var x = 0; x < this.hourlySales.length; x++) {
            dailyTotal += this.hourlySales[x];
        };
        this.dailyTotal = dailyTotal;

    };

    this.projectSales();
    this.totalSales();

    this.renderRow = function () {

        var rowArray = [];
        var name = this.name;
        var hourlySales = this.hourlySales;
        var dailyTotal = this.dailyTotal;

        rowArray.unshift(name);
        for (var i = 0; i < hourlySales.length; i++) {
            rowArray.push(hourlySales[i]);
        };
        rowArray.push(dailyTotal);

        return rowArray;
    };
};

var hourlyTotals = [];

function getHourlyTotals() {
    for (var i = 0; i < times.length; i++) {
        var sum = 0;
        for (var x = 0; x < Store.storeList.length; x++) {
            sum += Store.storeList[x].hourlySales[i];
        };
        hourlyTotals.push(sum);
    };
}

var firstPike = new Store('1st and Pike', 23, 65, 2.3);
var SeaTac = new Store('SeaTac Airport', 3, 24, 2.3);
var seattleCenter = new Store('SeattleCenter', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var Alki = new Store('Alki', 2, 16, 4.6);

function renderStores() {
    var salesTable = document.getElementById('sales-table');

    for (var i = 0; i < Store.storeList.length; i++) {
        var rowContent = Store.storeList[i].renderRow();
        var row = document.createElement('tr');
        for (var x = 0; x < rowContent.length; x++) {
            var td = document.createElement('td');
            td.innerHTML = rowContent[x];
            row.appendChild(td);
        };
        salesTable.appendChild(row);
    };

    //render the totals
    var totalsRow = document.createElement('tr');
    //one blank td for the store names
    var dailyTotalLabel = document.createElement('td');
    dailyTotalLabel.innerHTML = 'Hourly Total';
    totalsRow.appendChild(dailyTotalLabel);


    for (var x = 0; x < hourlyTotals.length; x++) {
        var totalCell = document.createElement('td');
        totalCell.innerHTML = hourlyTotals[x];
        totalsRow.appendChild(totalCell);
    };
    console.log(totalsRow);
    salesTable.appendChild(totalsRow);
};

getHourlyTotals();
renderStores();

// function create Header
// make a table > thead > tr > 16 th 
// skip one th and fill with times
// for each store
// go to the table row based on the index of that store in the storeList
// move to the second td in that table
// fill that with the first entry from hourlySales and move to the next td
// when you hit (number) spit out total 

// overall process
// constructor function makes a store
//replace stores objects with a bunch built via constructor
// store predicts its daily sales 
// store predicts its total
// store adds itself to the list of stores
// function calls list of stores in the proto and each  