'use strict';
$('document').ready(function () {

    let ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }


    let arrayForKey = [];
    Horns.all = [];

    function Horns(horn) {
        this.title = horn.title;
        this.description = horn.description;
        this.image_url = horn.image_url;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        Horns.all.push(this);
    }


    Horns.prototype.toRender = function () {
        let templateOne = $('#template').html();
        let html = Mustache.render(templateOne, this);
        $('main').append(html);

    }

    function render() {
        Horns.all.forEach(obj => {
            obj.toRender();
        })
    }







    function refreshTheSection() {
        $('section').remove();
        $("section").append(
            `<template id="template" type="text/x-tmpl-mustache">
            <section class="{{keyword}}">
            <h2> {{title}} #{{horns}} </h2>
            <img src="{{image_url}}" alt=""> </img>
            <p> {{description}} </p> 
        </section>
        </template>`
        )
    }


    function removeTheSelections() {

        $('select').empty();
        $('select').append(
            `<option value = "default"> Default </option>`
        )

    }





    function renderAjax(num) {
        refreshTheSection();
        arrayForKey = [];
        Horns.all = [];
        removeTheSelections();

        $.ajax(`data/page-${num}.json`, ajaxSettings).then((data) => {
            data.forEach((horn, i) => {
                let newHorn = new Horns(horn);
                newHorn.toRender();

                if (!arrayForKey.includes(Horns.all[i].keyword)) {
                    arrayForKey.push(Horns.all[i].keyword)
                    $('select').append(
                        `<option value = "${horn.keyword}"> ${horn.keyword} </option>`
                    )
                }
            })


        })


    }




    function grabTheValue() {
        $('input').on('click', function () {
            $(`input`).attr('checked', false)
            refreshTheSection();

            let value = $(this).val();
            sort(value);
            $(`#${value}`).attr("checked", true)
        })

    }

    function sort(value) {
        Horns.all.sort(function (a, b) {
            if (a[value] < b[value]) {
                return -1;

            } else if (b[value] < a[value]) {
                return 1;
            }
        })
        render();
    }

    function clickOnPage() {
        $('button').on("click", function () {
            let id = $(this).attr('id');
            renderAjax(id);
        })
    }

    function grabTheKeyWord() {
        $('select').on("click", function () {
            let selectedKeyword = $(this).val();
            filterBasedOnKeyWord(selectedKeyword)
        })
    }



    function filterBasedOnKeyWord(keyword) {
        Horns.all.forEach(horn => {

            if (keyword !== "default") {

                if (keyword !== horn.keyword) {
                    $(`.${horn.keyword}`).addClass("remove")
                } else {
                    $(`.${horn.keyword}`).removeClass("remove")
                }
            }

        })


    }


    grabTheValue();
    clickOnPage();
    renderAjax(1);
    grabTheKeyWord()





})