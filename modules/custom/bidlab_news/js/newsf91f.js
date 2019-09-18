(function ($, Drupal, drupalSettings) {
  $(document).ready(function () {
    $.noConflict();

    //re-order array by reverse
    drupalSettings.dataResultsNews = drupalSettings.dataResultsNews.reverse();

    //fill select filters dinamically
    fillFilters(drupalSettings.dataResultsNews);


    //draw data
    reDrawData(drupalSettings.dataResultsNews);


    $('#edit-field-thematic-area-target-id').change(function () {
      filterData();
    });

    $('#edit-field-type-of-article-target-id').change(function () {
      filterData();
    });

    //clear filters and draw all information that exist in drupalSettings.dataResultsNews
    $('#clearFilters').click(function () {

      $("#datepickerFrom").val("");
      $("#datepickerTo").val("");

      $(".multiselect-container").hide();
      $('#edit-field-thematic-area-target-id').multiselect("deselectAll", false).multiselect("refresh");
      $('#edit-field-type-of-article-target-id').multiselect("deselectAll", false).multiselect("refresh");
      $('.multiselect-container a').children().first().click();

      $("#edit-field-type-of-article-target-id").val("All");

      reDrawData(drupalSettings.dataResultsNews);
    });

    //logic for start date 
    $("#datepickerFrom").datepicker({
      //set min options to date dropdowns
      showOptions: {
        direction: "down"
      },
      maxDate: '0',
      dateFormat: 'dd/mm/yy',
      onSelect: function (dateText) {

        //call function to filter
        filterData();
      }
    });

    //logic for end date
    $("#datepickerTo").datepicker({
      //set min options to date dropdowns
      showOptions: {
        direction: "down"
      },
      maxDate: '0',
      dateFormat: 'dd/mm/yy',
      onSelect: function (dateText) {

        //call function to filter
        filterData();

      }
    });

    //filter data according the selected filters 
    function filterData() {

      var startDate = moment($("#datepickerFrom").val(), "DD/MM/YYYY");
      var endDate = moment($("#datepickerTo").val(), "DD/MM/YYYY");
      var thematicArea = $("#edit-field-thematic-area-target-id").val();
      var typeOfArticle = $("#edit-field-type-of-article-target-id").val();
      var jsonData = drupalSettings.dataResultsNews;

      switch (true) {
        //case if both dates are selected
        case (startDate.isValid() === true && endDate.isValid() === true):
          jsonData = _.filter(drupalSettings.dataResultsNews, function (data) {
            return moment(moment(data.date.date).format("DD-MM-YYYY")).isBetween(moment($("#datepickerFrom").val(), "DD/MM/YYYY"), moment($("#datepickerTo").val(), "DD/MM/YYYY"), null, '[]');
          });
          break;

        //case if only startDate is selected
        case (startDate.isValid() === true && endDate.isValid() === false):
          jsonData = _.filter(drupalSettings.dataResultsNews, function (data) {
            return moment(moment(data.date.date).format("DD-MM-YYYY")).isAfter(moment($("#datepickerFrom").val(), "DD/MM/YYYY"));
          });
          break;

        //case if  only endDate is selected
        case (startDate.isValid() === false && endDate.isValid() === true):
          jsonData = _.filter(drupalSettings.dataResultsNews, function (data) {
            return moment(moment(data.date.date).format("DD-MM-YYYY")).isBefore(moment($("#datepickerTo").val(), "DD/MM/YYYY"), null, '[]');
          });
          break;

        default:

      }
      if (typeOfArticle != "All" && typeOfArticle.length > 0) {
        jsonData = _.filter(jsonData, function (data) {
          return _.contains(typeOfArticle, data.type_article);
        });
      }

      if (thematicArea != "All" && thematicArea.length > 0) {
        jsonData = _.filter(jsonData, function (data) {
          return _.intersection(thematicArea, data.thematic_area).length > 0;
        });
      }

      reDrawData(jsonData);
      pagination();
    }

    //draw data according the filtered json
    function reDrawData(requiredData) {
      /**
       * Template
       */
      var templateString = 'Name: <%= name %>';
      var person = "";
      var result = "";
      var template = "";

      $(".view-content").empty(requiredData);
      var news = requiredData,
        newsTemplate = _.template(
          '<% _.each(news, function(artist, index, news) { %>' +
          '<div class="views-row">' +
          '<div class="views-field views-field-field-image">' +
          '<div class="field-content">' +
          '<a href="<%= artist.link %>" target="<%= artist.source == "iadb" ? "_blank" : "_self" %>">' +
          '<% if(artist.image == "" || artist.image == "/sites/default/files/default_images/Bid-Lab-default.jpg" ) { %>' +
          '<% if(drupalSettings.lang == "en") { %>' +
          '<img src="/sites/default/files/default_images/Logo-IDB-LAB.jpg" class="image-style-new-list"/>' +
          '<% }else{ %>' +
          '<img src="/sites/default/files/default_images/Logo-BID-LAB.jpg" class="image-style-new-list"/>' +
          '<% } %>' +
          '<% }else{ %>' +
          '<img src="<%= artist.image %>" class="image-style-new-list"/>' +
          '<% } %>' +
          '</a>' +
          '</div>' +
          '</div>' +
          '<div class="views-field views-field-field-date">' +
          '<div class="field-content">' +
          // '<%=moment(artist.date, "DD/MM/YYYY").locale(drupalSettings.lang).format("MMMM DD, Y")%>' +
          '<%= moment(artist.date.date).locale(drupalSettings.lang).format("MMMM DD, Y") %>' +
          '</div>' +
          '</div>' +
          '<div class="views-field views-field-title">' +
          '<span class="field-content">' +
          '<a href="<%= artist.link %>">' +
          '<%= artist.title %>' +
          '</a>' +
          '</span>' +
          '</div>' +
          '</div>' +
          '<% }); %>'
        ),
        content = newsTemplate({
          news: news
        });

      $(".view-content").html(content)


      $.each(requiredData, function (key, value) {

        person = {
          name: value.title
        };

        template = _.template(templateString);
        result = template(person);
      });

      pagination();

    }

    //create filters and put the into selects
    function fillFilters(json) {

      getAndDrawTaxonomy("type_of_article", "edit-field-type-of-article-target-id");
      getAndDrawTaxonomy("thematic_area", "edit-field-thematic-area-target-id");

    }

    function getAndDrawTaxonomy(taxnomyId, selectId) {
      $.ajax({
        dataType: "json",
        url: "/" + drupalSettings.lang + "/bidlab/taxonomies?vid=" + taxnomyId,
        data: "",
        success: function (data) {
          $.each(data, function (val, text) {
            $('#' + selectId).append($('<option></option>').val(text.name).html(text.name))
          });
        }
      }).done(function () {
        if (selectId == "edit-field-thematic-area-target-id") {
          $('#edit-field-thematic-area-target-id').multiselect({
            includeSelectAllOption: true,
            allSelectedText: Drupal.t("All"),
            enableFiltering: false,

            buttonText: function (options, select) {
              if (options.length == 0) {
                return Drupal.t("All");
              } else {
                var selected = '';
                options.each(function () {
                  selected += $(this).text() + ', ';
                });
                return selected.substr(0, selected.length - 2);
              }
            },
          });

          $("#edit-field-thematic-area-target-id").siblings().last().click(function () {
            $("#edit-field-thematic-area-target-id").siblings().last().find('.multiselect-container').toggle();
          });

        }else if(selectId == "edit-field-type-of-article-target-id"){
          $('#edit-field-type-of-article-target-id').multiselect({
            includeSelectAllOption: true,
            allSelectedText: Drupal.t("All"),
            enableFiltering: false,

            buttonText: function (options, select) {
              if (options.length == 0) {
                return Drupal.t("All");
              } else {
                var selected = '';
                options.each(function () {
                  selected += $(this).text() + ', ';
                });
                return selected.substr(0, selected.length - 2);
              }
            },
          });

          $("#edit-field-type-of-article-target-id").siblings().last().click(function () {
            $("#edit-field-type-of-article-target-id").siblings().last().find('.multiselect-container').toggle();
          });
        }
      });
    }

    function pagination() {
      // Grab whatever we need to paginate
      var pageParts = $("#viewContent .views-row");

      // How many parts do we have?
      var numPages = pageParts.length;
      // How many parts do we want per page?
      var perPage = 9;

      // When the document loads we're on page 1
      // So to start with... hide everything else
      pageParts.slice(perPage).hide();


      // Apply simplePagination to our placeholder
      $("#pagination-container").pagination({
        items: numPages,
        itemsOnPage: 9,
        cssStyle: 'light-theme',
        prevText: Drupal.t("Previous"),
        nextText: Drupal.t("Next"),
        onPageClick: function (pageNum) {
          // Which page parts do we show?
          var start = perPage * (pageNum - 1);
          var end = start + perPage;

          // First hide all page parts
          // Then show those just for our page
          pageParts.hide().slice(start, end).show();
        }
      });
    }
  });

})(jQuery, Drupal, drupalSettings);
