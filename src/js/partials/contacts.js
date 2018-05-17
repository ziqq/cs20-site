if($('.js-contacts').length > 0 && $(window).width() <= 768 && $(window).width() > 480){
  var contactsOwner = $('.js-contacts').find('.contacts-owner');
  var contactsRightBlock = $('.js-contacts').find('.contacts__right');

  contactsOwner.appendTo(contactsRightBlock);
} else if($('.js-contacts').length > 0 && $(window).width() <= 480){
  var contactsItemFirst = $('.js-contacts').find('.contacts-item').first();
  var contactsMap = $('.js-contacts').find('.contacts__map').first();

  contactsMap.appendTo(contactsItemFirst);
}

// if($('#contacts-map').length > 0){
//   function initMap() {
//     var uluru = {lat: 51.9958, lng: 47.8191};
//     var map = new google.maps.Map(document.getElementById('contacts-map'), {
//       zoom: 17,
//       center: uluru
//     });
//     var marker = new google.maps.Marker({
//       position: uluru,
//       map: map
//     });
//   }initMap();
// }