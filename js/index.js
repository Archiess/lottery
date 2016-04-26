function testPhone(phoneNumb){
  return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phoneNumb);
}

function testEmail(email){
  return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
}

function loadRow(){
  var temp = `
      <tr>
          <td>${$('#name').val()}</td>
          <td>${$('#surename').val()}</td>
          <td>${$('#email').val()}</td>
          <td>${$('#phone').val()}</td>
      </tr>
  `;

  if($('input').val() == ''){
    alert('Заполни все поля');
  }
  else if(!testPhone($('#phone').val())){
     alert('Введите правильный номер');
  }
  else if(!testEmail($('#email').val())){
    alert('Введите корректный email');
  }
  else{
    $('#table').append(temp);
  }
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

$.fn.inlineEdit = function(replaceWith, connectWith) {

    $('body').delegate('td','hover',function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    $('body').delegate('td','click',function() {

        var elem = $(this);

        elem.hide();
        elem.after(replaceWith);
        replaceWith.focus();

        replaceWith.blur(function() {

            if ($(this).val() != "") {
                connectWith.val($(this).val()).change();
                elem.text($(this).val());
            }

            $(this).remove();
            elem.show();
        });
    });
};


$(document).ready(function(){

$('body').delegate('#winner-button','click', function(){
  // alert($('tr').size());
  var winner = randomInteger(1, ($('tr').size() - 1) );
  var name =    $('tr:eq('+winner+')').find('td:eq(0)').html();
  var surname = $('tr:eq('+winner+')').find('td:eq(1)').html();

  $('.winner-res').html('№'+ winner + ' ' + name + ' ' + surname);

});

$('#save-button').on('click', function(){
  loadRow();
});

var replaceWith = $('<input name="temp" type="text" />'),
    connectWith = $('input[name="hiddenField"]');

$('td').inlineEdit(replaceWith, connectWith);

})
