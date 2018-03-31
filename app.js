/*
 * Udacity Pixel Art Maker
 * by Judit Kószó
 */

 // When loading screen, generate grid on canvas, and start listening to UI events
const MAX_WIDTH = 30;
const MAX_HEIGHT = 30;

$(document).ready(function() {
	makeGrid();
  uiEvents();
});

// Generate grid on screen
function makeGrid() {

  const grid=$('#grid');

  // Delete previous grid
  while ( grid.children('tr').length > 0 ) {
    $('#grid tr:last').remove();
  }

  //Get height and width for new grid
  let gridWidth=$('#inputWidth').val();
  let gridHeight=$('#inputHeight').val();
  let gridTable = '';

  let invalidWidth = gridWidth > MAX_WIDTH;
  let invalidHeight = gridHeight > MAX_HEIGHT;

  if (invalidWidth || invalidHeight) {
    $('#gridSizeWarning').removeClass('invisible');

    if(invalidHeight) {
      gridHeight = MAX_HEIGHT;
      $('#inputHeight').val(MAX_HEIGHT);
    }

    if(invalidWidth) {
      gridWidth = MAX_WIDTH;
      $('#inputWidth').val(MAX_WIDTH);
    }
  } else {
    $('#gridSizeWarning').addClass('invisible');
  }

  // Draw new grid
  for (let j = 0; j < gridHeight; j++) {
    gridTable += '<tr>';

    for (let k = 0; k < gridWidth; k++) {
      gridTable += '<td></td>';
    }
    gridTable += '</tr>';
  }
  grid.append(gridTable);

  // Set grid border according to On/Off state
  if ($('#gridOff').hasClass('button-active')) {
    $('tr, td').toggleClass('grid-no-border');
  }

	drawEvents();

}

// Subscribe to UI events
function uiEvents () {

  // When a color is picked
  $('.colorButton').click(function() {
    setColor( $(this) );
  });

  // When 'Generate new grid' button is clicked
  $('#newGrid').click(function(){
    makeGrid();
  });

  // When 'On' button is clicked for grid border
  $('#gridOn').click(function(){
    toggleGrid();
  });

  // When 'Off' button is clicked for grid border
  $('#gridOff').click(function(){
    toggleGrid();
  });

  // When 'Fill image with chosen color' button is clicked
  $('#fillImage').click(function(){
    fillGrid();
  });

}

//Fill pixels with current color on hover or click
function drawEvents() {

	// Hover event sets the pixel to current color or white (erase)
	$('td').hover(function(event){

		const currentColor = $('#colorPicker').val();

		if (event.buttons === 1) {
			fillPixel($(this), currentColor);

		} else if (event.buttons === 2) {
			fillPixel($(this), 'white');
		}

	});

	// Left click event sets the pixel to current color or white (erase)
	$('td').mousedown(function(event){

		const currentColor = $('#colorPicker').val();

		if (event.buttons === 1) {
			fillPixel($(this), currentColor);

		} else if (event.buttons === 2) {
			fillPixel($(this), 'white');
		}

	});

  // Right click does not turn context menu
  $('td').contextmenu(function() {
    return false;
  });

}

// Set color of color picker button to current color
function setColor (senderButton) {
  const newColor = rgb2hex( senderButton.css('background-color') );
  $('#colorPicker').val(newColor);
}

/* Convert rgb color value to rgb to hex
See at: https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value --*/
function rgb2hex(rgb) {
     if (  rgb.search('rgb') == -1 ) {
          return rgb;
     } else {
          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
          function hex(x) {
               return ('0' + parseInt(x).toString(16)).slice(-2);
          }
          return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
     }
}

// Change grid border status along with On/Off button
function toggleGrid (){
  $('#gridOn').toggleClass('button-active');
  $('#gridOff').toggleClass('button-active');
  $('tr, td').toggleClass('grid-no-border');
}

// Fill the grid with current color
function fillGrid(){
  const currentColor = $('#colorPicker').val();
  $('td').css('background-color', currentColor);
}

// Fill a pixel with current color
function fillPixel(pixel, color){
  pixel.css('background-color', color);
}
