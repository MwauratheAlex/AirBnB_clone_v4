$(document).ready(function () {
  const amenities = {};

  $('input').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else if (amenityId in amenities) {
      delete amenities[amenityId];
    }

    let amenitiesStr = '';
    Object.values(amenities).map((amenity) => { amenitiesStr += `${amenity}, `; return 0; });

    $('#selected-amenities').text(amenitiesStr);
  });

  checkApiStatus();
  searchPlaces({});

  $('#search').click(function () {
    searchPlaces({ amenities });
  });
});

function checkApiStatus () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }).fail(function () {
    $('#api_status').removeClass('available');
  });
}

function searchPlaces (data) {
  $('.places').empty();
  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (places) {
      $.map(places, (place) => {
        $('.places').append(`
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
              </div>
              <div class="number_rooms">
                ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
              </div>
              <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : 's'}
              </div>
            </div>
            <div class="description">${place.description || 'No description provided'}</div>
          </article>
        `);
      });
    }
  });
}
