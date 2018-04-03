$(document).ready(function () {
    //////////////////////////////////////////////////
    //  Variable declarations
    //////////////////////////////////////////////////
    let canvas = $('table');
    let color = $('.color-picker').val();
    let colorPicker = $('.color-picker');
    let colorPickerMask = $('.color-picker-bg');
    let form = $('.form');
    let formReset = $('.input__reset');

    //////////////////////////////////////////////////
    //  Setting height and width
    //////////////////////////////////////////////////
    // Initial values
    var height = $('.input__height').val();
    var width = $('.input__width').val();

    // If user changes values
    $('.input__height').change(function () {
        height = $(this).val();
    });
    $('.input__width').change(function () {
        width = $(this).val();
    });

    //////////////////////////////////////////////////
    //  When size is submitted by the user, call makeGrid()
    //////////////////////////////////////////////////
    form.submit(function () {
        if ((height) && (width) && ($('.card__tools').css('display') == 'none')) {
            makeGrid();
            // toggleCardColor();
            // toggleCardTools();
            testChain();
            setColor();
            colorGrid();
        } else {
            // alert('Please enter a valid height and width.');
            $('.toast').slideDown(100);
        }
        event.preventDefault();
    });

    //////////////////////////////////////////////////
    //  Prevent right-click context menu
    //////////////////////////////////////////////////
    $(document).bind('contextmenu', function (event) {
        return false;
    });

    //////////////////////////////////////////////////
    //  Logic for mouse clicks
    //////////////////////////////////////////////////
    let isDownLeft = false;
    let isDownRight = false;

    //Always mouseup when not on canvas; prevents "sticky" mousedown
    $(document).mouseup(function (event) {
        if (event.button == 0) {
            isDownLeft = false;
        }
        if (event.button == 2) {
            isDownRight = false;
        }
    });

    canvas.mousedown(function (event) {
        if (event.button == 0) {
            isDownLeft = true;
        }
        if (event.button == 2) {
            isDownRight = true;
        }
        window.getSelection().removeAllRanges(); //Prevents highlighting
    });

    //////////////////////////////////////////////////
    //  Make the grid (the "canvas")
    //////////////////////////////////////////////////
    function makeGrid() {
        // Clear existing grid
        canvas.children().remove();

        toggleCardCanvas();

        // Create rows and columns
        for (r = 0; r < height; r++) {
            let row = canvas.append('<tr></tr>');
        }
        for (c = 0; c < width; c++) {
            let col = $('tr').append('<td></td>');
        }
    }

    //////////////////////////////////////////////////
    //  Color or erase on the grid
    //////////////////////////////////////////////////
    function colorGrid() {
        $('td')
            .mousedown(function (event) {
                if (event.button == 0) {
                    $(this).css('background-color', color);
                }
                if (event.button == 2) {
                    $(this).css('background-color', '#FFFFFF');
                }
            })
            .mouseover(function (event) {
                if (isDownLeft) {
                    $(this).css('background-color', color);
                }
                if (isDownRight) {
                    $(this).css('background-color', '#FFFFFF');
                }
            })
    }

    //////////////////////////////////////////////////
    //  Other functions
    //////////////////////////////////////////////////
    let cardCanvas = $('.card__canvas');
    let cardColor = $('.card__color');
    let cardTools = $('.card__tools');



    function testChain() {
        cardColor.slideDown(100, function() {
            cardTools.slideDown(200).delay(50);
        })
    }





    // Toggle the "Tools" card
    function toggleCardTools() {
        if (cardTools.css('display') == 'none') {
            cardTools.slideDown(400);
        } else if (cardTools.css('display') == 'block') {
            cardTools.slideUp(150);
        }
    }

    // Toggle the "Color" card
    function toggleCardColor() {
        if (cardColor.css('display') == 'none') {
            cardColor.slideDown(150);
        } else if (cardColor.css('display') == 'block') {
            cardColor.slideUp(400);
        }
    }

    function toggleCardCanvas() {
        if (cardCanvas.css('display') == 'none') {
            cardCanvas.fadeIn(400);
        } else if (cardCanvas.css('display') == 'block') {
            cardCanvas.fadeOut(400);
        }
    }

    // Toggle opacity on currently active tools
    function toggleButton(tool) {
        tool.toggleClass('tool--on');
    }

    // Clear color from grid
    $('.tool__clear').click(function () {
        $('td').css('background-color', '#FFFFFF');
    });

    // Turn off the box shadow around the table (the "backlight")
    $('.tool__backlight').click(function () {
        canvas.toggleClass('canvas__backlight-off');
        toggleButton($(this));
    });

    // Toggle grid borders
    $('.tool__grid').click(function () {
        $('td').toggleClass('td--grid-off');
        toggleButton($(this));
    });

    //////////////////////////////////////////////////
    //  WORK IN PROGRESS
    //////////////////////////////////////////////////
    function setColor() {
        colorPickerMask.css('background', color);
        canvas.css('--color', color);
    }

    $('.alert__close').click(function() {
        $('.alert__close').parent().parent().hide();
    })

    // Change selected color using color picker
    colorPicker.change(function () {
        color = $(this).val();
        setColor();
    });

    // Reset entire grid
    formReset.click(function () {
        if (canvas.children().length) {
            $('.toast').slideUp(100);
            $('*').removeClass('tool--on canvas__backlight-off');
            toggleCardTools();
            toggleCardColor();
            toggleCardCanvas();
            canvas.children().remove();
        }
        height = '';
        width = '';
    });
})