'use strict';

// console.log('js loading');

// write a constructor function to do these programattically
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

function Store(name, minCust, maxCust, cookiesPerCust){
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.cookiesPerCust = cookiesPerCust;
    this.hourlySales = [];
    Store.storeList.push(this.name);
    this.projectSales();  
  }
  
  Store.storeList = []; 
  
  Store.prototype.projectSales = function(){
    this.message = 'this is a message';
    console.log('projecting sales');
  };
  
  var newStore = new Store('newStore', 20, 40, 3.4);
  

var times = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm'];

//gonna wipe this out
var stores = [store1, store2, store3, store4, store5];

//refactor this so each store calls this and projects its own damn sales and totals it out
function projSales(store) {

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
    };

    store.hourlySales = hourlySales;
        
    function dailySales(hourlySales) {
        var dailySales = 0;
        for (var x = 0; x < hourlySales.length; x++) {
             dailySales += hourlySales[x];  
        };
        return dailySales;
    };

    store.dailySales = dailySales(hourlySales);

}

// git rid of this altogether
function initialize() {

    for (var i = 0; i < stores.length; i++) {
        projSales(stores[i]);
    }
};

// function create Header

// function create footer

//simplify this so it runs on a per-store basis and renders one store at a time then gets called by the store ()
function renderStores() {

    var salestable = document.getElementById('sales-table');

    for (var i = 0; i < stores.length; i++) {
        
        var hourlySales = stores[i].hourlySales;
        
        var storeUl = document.createElement('ul');

        for (var x = 0; x < hourlySales.length; x++) {    
            var li = document.createElement('li');
            li.textContent = (times[x] + ': ' + hourlySales[x]);
            storeUl.appendChild(li);
        };

        var totalLi = document.createElement('li');
        totalLi.textContent = ('Total: ' + stores[i].dailySales); 
        totalLi.setAttribute('class','total');
        storeUl.appendChild(totalLi);

        var storeh3 = document.createElement('h3');
        storeh3.textContent = stores[i].storeName;

        var storeDiv = document.createElement('div');
        storeDiv.setAttribute('id', 'store-' + stores[i].storeId);

        //let's append things together while they're still easy variables instead of after they've become DOM objects ffs
        storeDiv.appendChild(storeh3);
        storeDiv.appendChild(storeUl);
        salestable.appendChild(storeDiv);

    }

}

initialize();
renderStores();

// overall process
// constructor function makes a store
//replace stores objects with a bunch built via constructor
// store predicts its daily sales 
// store predicts its total
// store adds itself to the list of stores
// function calls list of stores in the proto and each  
