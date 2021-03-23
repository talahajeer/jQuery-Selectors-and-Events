'use strict';

let id = 0;
const hornArr = [];
const keywordArr = [];
let dropDown = $('select');
let mTemplate = $("<template></template>");
// console.log(mTemplate);
mTemplate.appendTo($("main")).attr("id", "mTemplate").attr("type", "text/x-tmpl-mustache");
$("#mTemplate").append("<h2></h2> <img></img> <p></p>");
$("h2").html("{{title}}");
$("img").attr("src", "{{{image_url}}}");
$("p").html("{{description}}");

function Horn(image_url, title, description, keyword, horns, id) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    this.id = id;
    hornArr.push(this);
}

Horn.prototype.toHtml = function () {
    let template = $('#mTemplate').html();
    // console.log(template);
    let html = Mustache.render(template, this);
    return html;
}

function getHornData() {
const ajaxSettings = {
    method: 'get',
    dataType: 'json'
}
$.ajax('data/page-2.json', ajaxSettings).then(data => {
    data.forEach(value => {
        id++;
        let hornObject = new Horn(value.image_url, value.title, value.description, value.keyword, value.horns, id);
        hornObject.toHtml();
        if (!keywordArr.includes(value.keyword)) {
            keywordArr.push(value.keyword);
        }
    });
    keywordArr.forEach(key => {
        let option = $('<option></option>').val(key).html(key);
        dropDown.append(option);
    });
})
}
$("document").ready(getHornData);