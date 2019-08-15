'use strict';

// console.log('js loading');

Store.storeList = [];
var times = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm'];
var salesTable = document.getElementById('sales-table');
var salesHeader = document.getElementById('sales-table-header');
var salesBody = document.getElementById('sales-table-body');
var salesFooter = document.getElementById('sales-table-footer');

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

        //turn rowArray into a table and stick it on salesTable's tbody
        var tbody = document.getElementById('sales-table-body');
        var row = document.createElement('tr');

        for (var x = 0; x < rowArray.length; x++) {
            var td = document.createElement('td');
            td.innerHTML = rowArray[x];
            row.appendChild(td);
        };
        tbody.appendChild(row);
    };

    this.projectSales();
    this.totalSales();
    this.renderRow();

};

var hourlyTotals = [];

function getHourlyTotals() {

    hourlyTotals = []; //zeroing this out so we can run this to update as well as render initially
    for (var i = 0; i < times.length; i++) {
        var sum = 0;
        for (var x = 0; x < Store.storeList.length; x++) {
            sum += Store.storeList[x].hourlySales[i];
        };
        hourlyTotals.push(sum);
    };

};



function renderHeader() {

    var headerRow = document.createElement('tr');
    //empty one
    var headerCell = document.createElement('th');
    headerRow.appendChild(headerCell);

    for (var i = 0; i <= times.length; i++) {
        var headerCell = document.createElement('th');
        headerCell.innerText = times[i];
        headerRow.appendChild(headerCell);
    };

    var lastHeaderCell = document.createElement('th');
    headerCell.innerText = 'Daily Total';
    headerRow.appendChild(headerCell);

    salesHeader.appendChild(headerRow);

};


var firstPike = new Store('1st and Pike', 23, 65, 2.3);
var SeaTac = new Store('SeaTac Airport', 3, 24, 2.3);
var seattleCenter = new Store('SeattleCenter', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var Alki = new Store('Alki', 2, 16, 4.6);


// var totalsRow;
function renderFooter() {

    var totalsRow = document.createElement('tr');
    var dailyTotalLabel = document.createElement('td');
    dailyTotalLabel.innerText = 'Hourly Total';
    totalsRow.appendChild(dailyTotalLabel);

    for (var x = 0; x < hourlyTotals.length; x++) {
        var totalCell = document.createElement('td');
        totalCell.innerHTML = hourlyTotals[x];
        totalsRow.appendChild(totalCell);
    };
    salesFooter.appendChild(totalsRow);
};

// initial render
renderHeader();
getHourlyTotals();
renderFooter();


// ---------- form for new store ---------- 
var form = document.getElementById("add-store");
var table = document.getElementById("test");
var button = document.getElementById("submit-btn")


var formData = function (event) {

    event.preventDefault();
    var name = event.target.name.value;
    var minCust = event.target.mincust.value;
    var maxCust = event.target.maxcust.value;
    var cookiesPerCust = event.target.cookiesper.value;

    var tempStore = new Store(name, minCust, maxCust, cookiesPerCust);
    updateFooter();
};

function updateFooter() {

    salesFooter.innerHTML = "";
    getHourlyTotals();
    renderFooter();

};

form.addEventListener('submit', formData);