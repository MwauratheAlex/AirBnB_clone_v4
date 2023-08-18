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
});
