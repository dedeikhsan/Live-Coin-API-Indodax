var reloadData = 30; // dalam detik

var timer;

function updateDataAPI() {

    $.ajax({
      url: 'https://indodax.com/api/summaries',
      success: function(data) {

        var no=1;
        var row;

        //Fungsi autocomplete
        $('#tag').keyup(function(){

          var tag = $(this).val();
          var no_key=1;
          var error = "Data not found.."

          $('#coins').html('<tr><th>No</th><th>Nama</th><th>Harga</th> <th>Beli</th> <th>jual</th> <th>Harga Tertinggi</th><th>Harga Terendah</th><th>Waktu Server</th></tr>')
          for (var key in data.tickers) {

            if (data.tickers[key].name.toLowerCase().startsWith(tag.toLowerCase()))
            {
              row = `<tr>
                  <td>` + no_key++ + `</td>
                  <td>` + data.tickers[key].name.toUpperCase() + `</td>
                  <td>` + formatNumber(data.tickers[key].last) + `</td>
                  <td>` + formatNumber(data.tickers[key].buy) + `</td>
                  <td>` + formatNumber(data.tickers[key].sell) + `</td>
                  <td>` + formatNumber(data.tickers[key].high) + `</td>
                  <td>` + formatNumber(data.tickers[key].low) + `</td>
                  <td>` + Date(data.tickers[key].server_time) + `</td>
                </tr>`
    
            $('#coins tr:last').after(row);
            }

          }

        });
        //End Fungsi Autocomplete  
  
        $('#coins').html('<tr><th>No</th><th>Nama</th><th>Harga</th> <th>Beli</th> <th>jual</th> <th>Harga Tertinggi</th><th>Harga Terendah</th><th>Waktu Server</th></tr>')
        for (var key in data.tickers) {

          row = `<tr>
                <td>` + no++ + `</td>
                <td>` + data.tickers[key].name.toUpperCase() + `</td>
                <td>` + formatNumber(data.tickers[key].last) + `</td>
                <td>` + formatNumber(data.tickers[key].buy) + `</td>
                <td>` + formatNumber(data.tickers[key].sell) + `</td>
                <td>` + formatNumber(data.tickers[key].high) + `</td>
                <td>` + formatNumber(data.tickers[key].low) + `</td>
                <td>` + Date(data.tickers[key].server_time) + `</td>
              </tr>`
  
          $('#coins tr:last').after(row);
          
        }
  
        clearTimeout(timer)
        $('#timer').html(reloadData)
        setTimeout(updateDataAPI, reloadData * 1000)
        updateTimer()
  
      },
      error: function(err) {
        alert("Tidak bisa mengambil data API")
      }
  
    })

  
}

function formatNumber(n) {
  if (n.indexOf('.') > -1)
    return parseFloat(n).toFixed(8);
  else
    return parseInt(n).toLocaleString("id-ID")
}

function updateTimer() {
  a = parseInt($('#timer').html())
  $('#timer').html(a - 1)
  if (a > 0)
    timer = setTimeout(updateTimer, 1000)
}
updateDataAPI()

//Animasi Tabel
$(window).on('load', function(){
	$('.pKiri').addClass('pMuncul');
	$('.pKanan').addClass('pMuncul');
});



