if($('.js-contacts').length > 0 && $(window).width() <= 768 && $(window).width() > 480) {
    var contactsOwner = $('.js-contacts').find('.contacts-owner');
    var contactsRightBlock = $('.js-contacts').find('.contacts__right');

    contactsOwner.appendTo(contactsRightBlock);
} else if($('.js-contacts').length > 0 && $(window).width() <= 480) {
    var contactsItemFirst = $('.js-contacts').find('.contacts-item').first();
    var contactsMap = $('.js-contacts').find('.contacts__map').first();

    contactsMap.appendTo(contactsItemFirst);
}
