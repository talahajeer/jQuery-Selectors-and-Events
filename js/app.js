'use strict';

let page1 = $('main').append("button");
console.log(page1);

function Horn(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    hornArr.push(this);
}

Horn.prototype.render = function () {
    let templete = $('#photo-template').clone();
    $('main').append(templete);
    templete.find('h2').text(this.title);
    templete.find('img').attr('src', this.image_url);
    templete.find('p').text(this.description);
    templete.removeAttr('id');
}
const hornArr = [];
const keywordArr = [];

let dropDown = $('select');

function getHornData() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    $.ajax('data/page-1.json', ajaxSettings).then(data => {
        data.forEach(value => {
            let hornObject = new Horn(value.image_url, value.title, value.description, value.keyword, value.horns);
            // console.log(hornObject);
            hornObject.render();
            if (!keywordArr.includes(value.keyword)) {
                keywordArr.push(value.keyword);
            }
        });
        keywordArr.forEach(key => {
            // console.log(key);
            let option = $('<option></option>').val(key).html(key);
            dropDown.append(option);
        });
    })
}
$('document').ready(getHornData);

$('document').ready(function () {
    $('select').on('change', function () {
        // console.log($(this));
        let selection = $(this).val();
        if (selection !== 'filter by keyword') {
            hornArr.forEach(value => {
                if (selection === value.keyword) {
                    // console.log(value);
                    value.render();
                }
            });
        }
    });
});



