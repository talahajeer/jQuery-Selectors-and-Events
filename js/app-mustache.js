'use strict';

// let id = 0;

// let input = $('<input type="button" value="new button" />');
// input.appendTo($("main")).attr("id", "page1").val("Page1");

// let input2 = input.clone().attr("id", "page2").val("Page2");
// input2.appendTo($("main"));

// function Horn(image_url, title, description, keyword, horns, id) {
//     this.image_url = image_url;
//     this.title = title;
//     this.description = description;
//     this.keyword = keyword;
//     this.horns = horns;
//     this.id = id;
//     hornArr.push(this);
// }

// Horn.prototype.render = function () {
//     let templete = $('#photo-template').clone();
//     $('main').append(templete);
//     templete.find('h2').text(this.title);
//     templete.find('img').attr('src', this.image_url);
//     templete.find('p').text(this.description);
//     templete.removeAttr('id');
//     templete.attr('id', id);
// }
// const hornArr = [];
// const keywordArr = [];
// const sortArr = ["Sort By", "No Of horns", "A-Z", "Z-A"];

// let dropDown = $('select');

// function getHornData() {

//     const ajaxSettings = {
//         method: 'get',
//         dataType: 'json'
//     }
//     $("#page1").click(function () {
//         $.ajax('data/page-1.json', ajaxSettings).then(data => {
//             data.forEach(value => {
//                 id++;
//                 let hornObject = new Horn(value.image_url, value.title, value.description, value.keyword, value.horns, id);
//                 // console.log(hornObject);
//                 hornObject.render();
//                 if (!keywordArr.includes(value.keyword)) {
//                     keywordArr.push(value.keyword);
//                 }
//             });
//             keywordArr.forEach(key => {
//                 // console.log(key);
//                 let option = $('<option></option>').val(key).html(key);
//                 dropDown.append(option);
//             });
//         })
//     })
//     $("#page2").click(function () {
//         $.ajax('data/page-2.json', ajaxSettings).then(data => {
//             data.forEach(value => {
//                 id++;
//                 let hornObject = new Horn(value.image_url, value.title, value.description, value.keyword, value.horns, id);
//                 // console.log(hornObject);
//                 hornObject.render();
//                 if (!keywordArr.includes(value.keyword)) {
//                     keywordArr.push(value.keyword);
//                 }
//             });
//             keywordArr.forEach(key => {
//                 // console.log(key);
//                 let option = $('<option></option>').val(key).html(key);
//                 dropDown.append(option);
//             });
//         })

//     })

// }
// $('document').ready(getHornData);

// $('document').ready(function () {
//     $('select').on('change', function () {
//         // console.log($(this));
//         $('div').hide();
//         let selection = $(this).val();

//         hornArr.forEach(value => {
//             if (selection !== 'default') {
//                 if (selection === value.keyword) {
//                     // console.log(value.id);
//                     $('#' + value.id).show();
//                     // console.log(selection);
//                 }
//             } else {
//                 console.log(selection);
//                 value.render();
//                 $("#photo-template").show();
//             }
//         });

//     });
// });


// $('header').append("<select></select>");

// $("select").last().attr("id", "sort");
// let sortList = $("#sort");
// // console.log(sortList);
// sortArr.forEach(key => {
//     let option = $(`<option></option>`).val(key).html(key);
//     sortList.append(option);
// });


// $('#sort').on('change', function () {
//     $('div').hide();
//     let selection = $(this).val();
//     console.log(selection);


//     if (selection === "No Of horns") {
//         hornArr.sort((a, b) => a.horns - b.horns);
//         console.log(hornArr);
//         hornArr.forEach(value => {
//             console.log(value.id);
//             $('#' + value.id).show();
//         })

//     } else if (selection === "A-Z") {
//         hornArr.sort((a, b) => a.title < b.title ? -1 : 1);
//         // console.log(hornArr);
//         hornArr.forEach(value => {
//             console.log(value.title);
//             $('#' + value.id).show();
//         })

//     } else if (selection === "Z-A") {
//         hornArr.sort((a, b) => b.title < a.title ? -1 : 1);
//         hornArr.forEach(value => {
//             console.log(value.title);
//             $('#' + value.id).show();
//         })
//     }
// });


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