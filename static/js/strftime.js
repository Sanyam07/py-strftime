$(function () {
    $('#fmt-input').keyup(function (e) {
        clearTimeout($.data(this, 'timer'));
        if (e.keyCode == 13)
            strftime(true);
        else
            $(this).data('timer', setTimeout(strftime, 500));

        e.preventDefault();
        return false;
    });

    function strftime(force) {
        var str = $("#fmt-input").val();
        var current = $('#label').text();

        if (str.length < 3) {
            var msg = "Enter a date above";
            if (current != msg) {
                $('#label').hide().text(msg).fadeIn('fast');
                $('#copyButton').hide().fadeOut('fast');
            }

        } else {
            $.ajax({
                type: 'POST',
                url: '/format',
                data: {
                    dateFormat: str
                },
                error: function () {
                    var msg = "Enter a valid date";
                    $('#copyButton').hide().fadeOut('fast');
                    if (current != msg) {
                        $('#label').hide().text("Enter a valid date").fadeIn('fast');
                    }
                },
                success: function (data) {
                    if (current != data.message) {
                        $('#label').hide().html(data.message).fadeIn('fast');
                        $('#copyButton').show().fadeIn('fast');
                    }
                },
                dataType: 'json'
            });
        }
    }
});

function copyToClipboard() {
    var text = document.getElementById("label");
    var $temp = $("<input>");

    $("body").append($temp);
    $temp.val($(text).text()).select();
    document.execCommand("copy");

    $temp.remove();
}