function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appz83KQe9Ris5KeU/Districts?api_key=keyPvkpiqlEQzDX8B",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var district = record.fields["district"];
          var image = record.fields["image"];
          
          html.push(listView(id, district, image));
        });
        $(".list-view").append(html);
      }
    );
  };

  var listView = function(id, district, image) {
    return `
    <div class=".col-6">
    <div class="card">
      ${image ? `<img src="${image[0].url}">` : ``}
     <div class="card-body">
      <p class="card-text"><a href="index.html?id=${id}">${district}</p></a>
      </div>
    </div> 
    
    `;
  };

  var getOneRecord = function(id) {
  $.getJSON(
    `https://api.airtable.com/v0/appz83KQe9Ris5KeU/Districts/${id}?api_key=keyPvkpiqlEQzDX8B`,
    function(record) {
      var html = [];
      var district = record.fields["district"];
      var image = record.fields["image"];
      var highlight1 = record.fields["highlight1"];
      var highlight2 = record.fields["highlight2"];
      var highlight3 = record.fields["highlight3"];
      var description = record.fields["description"];
      var food1 = record.fields["food1"];
      var food2 = record.fields["food2"];
      var food3 = record.fields["food3"];
      html.push(
        detailView(district, image, highlight1, highlight2, highlight3, description, food1, food2, food3)
      );
      $(".detail-view").append(html);
    }
  );
};

var detailView = function(district, image, highlight1, highlight2, highlight3, description, food1, food2, food3) {
  return `
  <div class="card mb-3" style="width: 70rem;">
  <div class="row no-gutters">
    <div class="col-md-4">
    ${image ? `<img class="card-img" src="${image[0].url}">` : ``}
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h3 class="card-title">${district}</h3>
        <p class="card-text">${description}</p>
        <br>
        <h5>Highlights</h5>
        <p class="card-text">${highlight1} | ${highlight2} | ${highlight3}</p>
        <br>
        <h5>Restaurants</h5>
        <p class="card-text">${food1} | ${food2} | ${food3}
      </div>
    </div>
  </div>
</div> 
    `;
  };

  var id = getParameterByName("id");
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }