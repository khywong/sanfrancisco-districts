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
          var image = record.fields["image"];
          var highlight1 = record.fields["highlight1"];
          var highlight2 = record.fields["highlight2"];
          var highlight3 = record.fields["highlight3"];
          var description = record.fields["description"];
          var food1 = record.fields["food1"];
          var food2 = record.fields["food2"];
          var food3 = record.fields["food3"];
          html.push(listView(id, image, highlight1, highlight2, highlight3, description, food1, food2, food3));
        });
        $(".list-view").append(html);
      }
    );
  };

  var listView = function(id, image, highlight1, highlight2, highlight3, description, food1, food2, food3) {
    return `
      <p>${highlight1}</p>
    `;
  };

  var id = getParameterByName("id");
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }