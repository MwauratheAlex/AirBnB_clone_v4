$(document).ready(function() {

  const amenities = {}

  $("input").change(function() {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else if (amenityId in amenities) {
      delete amenities[amenityId];
    }

    let amenitiesStr = "";
    Object.values(amenities).map((amenity) => amenitiesStr += `${amenity}, `);

    $("#selected-amenities").text(amenitiesStr);

  });

    $.get("http://0.0.0.0:5001/api/v1/status/", function(data, status) {
      if (data.status === "OK") {
      	$("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }

    }).fail((err) => {
      $("#api_status").removeClass("available");
    })
})
