if (!window.Selectize.prototype.positionDropdownOriginal) {
    window.Selectize.prototype.positionDropdownOriginal = window.Selectize.prototype.positionDropdown;
    window.Selectize.prototype.positionDropdown = function () {
        if (this.settings.dropdownDirection === 'up') {
            let $control = this.$control;
            let offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();

            this.$dropdown.css({
                width: $control.outerWidth(),
                top: offset.top - this.$dropdown.outerHeight(),
                left: offset.left
            });
            this.$dropdown.addClass('direction-' + this.settings.dropdownDirection);
            this.$control.addClass('direction-' + this.settings.dropdownDirection);
            this.$wrapper.addClass('direction-' + this.settings.dropdownDirection);
        } else {
            window.Selectize.prototype.positionDropdownOriginal.apply(this, arguments);
        }
    };
}