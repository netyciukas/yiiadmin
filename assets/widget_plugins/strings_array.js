(function($) {
})(jQuery);

$(document).ready(function() {
    $('.stringsArray').each(function() {
        container = $('<div class="stringsArrayContainer"></div>');
        $(container).attr('value-input-id', $(this).attr('id'));
        $(container).attr('id', 'stringsArrayContainer_' + jQuery.uuid);

        $(this).after(container);
        $(this).hide();

        $(containerId(container) + 'input').live('keyup', function(event) {
            switch (event.which) {
                case 13:
                    addInput(containerId(container));
                    break;
                case 8:
                    if ($(this).val() == "" && $(containerId(container) + 'input:visible').length > 1) {
                        $(this).hide();
                        $(containerId(container) + 'input:visible:last').focus();
                    }
                    updateValue(container);
                    break;
                case 220:
                    value = $(this).val().replace("|", "");
                    $(this).val(value);
                    break;
                default:
                    updateValue(container);
            }
        }).live('keydown', function(event) {
            if (event.which == 13) {
                event.preventDefault();
            }
        });

        addInput(container);
    });

    function updateValue(container) {
        value_input = $("#" + $(containerId(container)).attr('value-input-id'));
        $(value_input).val("");

        $(containerId(container) + 'input:visible').each(function() {
            value = $(this).val();

            if (value != "") {
                $(value_input).val($(value_input).val() + value + "|");
            }
        });
    }

    function containerId(container) {
        return "#" + $(container).attr('id') + " ";
    }

    function addInput(container) {
        input = $('<input class="vTextField separate" type="text" />');
        $(container).append(input);
        $(input).focus();
    }
});
