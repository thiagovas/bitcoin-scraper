var getJSON = require('get-json')
  , fs = require('fs')
  ;

var fetch = {
  market: 'bitstampUSD',
  from: { year:2012, month:1, day:9 },
  to: { year:2016, month:12, day:20 },
  dataSourceURL: 'http://bitcoincharts.com/charts/chart.json?'+'m='+'bitstampUSD'+'&r=1&i=15-min&e'
}

function url(baseurl, date){
  return baseurl + date;
}

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(currentDate)
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

var start = new Date(fetch.from.year, fetch.from.month-1, fetch.from.day)
  , end = new Date(fetch.to.year, fetch.to.month-1, fetch.to.day)
  , dates = getDates(start, end)
  ;

dates.forEach(function(date){
  var prettyDate = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getUTCDate()
  , dataPath = fetch.dataSourceURL + prettyDate
  ;
  // console.log(dataPath);

  getJSON(dataPath, function(error, response){
    fs.writeFile('data/'+fetch.market+'-'+prettyDate+'.json', JSON.stringify(response), 'utf8', function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log(prettyDate + ' was saved!');
      }
    }); 
  });
});
