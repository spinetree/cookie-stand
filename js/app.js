'use strict';

// console.log('js loading');

Store.storeList = [];
var times = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm'];
var salesTable = document.getElementById('sales-table');

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

        return rowArray; // modify this to instead return an object that's the table row
    };
};

// compute just the hourly total for the footer

var hourlyTotals = [];

function getHourlyTotals() {
    for (var i = 0; i < times.length; i++) {
        var sum = 0;
        for (var x = 0; x < Store.storeList.length; x++) {
            sum += Store.storeList[x].hourlySales[i];
        };
        hourlyTotals.push(sum);
    };
};

// generate stores 

var firstPike = new Store('1st and Pike', 23, 65, 2.3);
var SeaTac = new Store('SeaTac Airport', 3, 24, 2.3);
var seattleCenter = new Store('SeattleCenter', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var Alki = new Store('Alki', 2, 16, 4.6);

 // render fooken header from times list (up top)

function renderHeader() {
    var header = document.createElement('thead');
    var headerRow = document.createElement('tr');
    header.appendChild(headerRow);
    var headerCell = document.createElement('th');
    header.appendChild(headerCell);

    for (var i = 0; i <= times.length; i++) {
        var headerCell = document.createElement('th');
        headerCell.innerText = times[i];
        header.appendChild(headerCell);
    };

    var lastHeaderCell = document.createElement('th');
    headerCell.innerText = 'Daily Total';
    header.appendChild(headerCell);

    salesTable.appendChild(header);
};

function renderStores() {
    var tbody = document.createElement('tbody');

    for (var i = 0; i < Store.storeList.length; i++) {
        var rowContent = Store.storeList[i].renderRow();
        var row = document.createElement('tr');
        for (var x = 0; x < rowContent.length; x++) {
            var td = document.createElement('td');
            td.innerHTML = rowContent[x];
            row.appendChild(td);
        };
        tbody.appendChild(row);
    };
    salesTable.appendChild(tbody);
};


function renderFooter() {

    var footer = document.createElement('tfoot');
    var totalsRow = document.createElement('tr');
    //one blank td for the store names
    var dailyTotalLabel = document.createElement('td');
    dailyTotalLabel.innerText = 'Hourly Total';
    totalsRow.appendChild(dailyTotalLabel);

    for (var x = 0; x < hourlyTotals.length; x++) {
        var totalCell = document.createElement('td');
        totalCell.innerHTML = hourlyTotals[x];
        totalsRow.appendChild(totalCell);
    };
    footer.appendChild(totalsRow);
    salesTable.append(footer);

};

renderHeader();
getHourlyTotals();
renderStores();
renderFooter();

var form = document.getElementById("add-store");
var table = document.getElementById("test");
var button = document.getElementById("submit-btn")

// read input from the form into a js object
var formData = function(event) {
  
    event.preventDefault();
    // console.log('formData!');
    var name = event.target.name.value;
    var minCust = event.target.mincust.value;
    var maxCust = event.target.maxcust.value;
    var cookiesPerCust = event.target.cookiesper.value; 
    // console.log(name + minCust + maxCust + cookiesPerCust);

    var tempStore = new Store(name,minCust,maxCust,cookiesPerCust);
    console.log(Store.storeList[Store.storeList.length-1]);

};

// add an event listener to the button that triggers the function
form.addEventListener('submit', formData); 


// pass the input to the constructor function to make a new store 

// modify the renderRow so it spits out a full table row vs. an array

//  when form's submitted 

// run the last store's renderRow() and append to table

// (excessive ot make appendToTheTable a separate function?)

// run  render footer again
