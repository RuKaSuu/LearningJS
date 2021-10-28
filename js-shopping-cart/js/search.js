let no_result = document.querySelector('#no_course')
let search_target = document.querySelector("#search");


search_target.addEventListener("keyup", function(e) {
    let search_item = e.target.value.toLowerCase();
    let span_items = document.querySelectorAll(".courses__container #nom");
    let count_result = 0;
    span_items.forEach(function(item) {
        if (item.textContent.toLocaleLowerCase().indexOf(search_item) != -1) {
            item.closest(".course__item").style.display = "block";
            count_result++;
        } else {
            item.closest(".course__item").style.display = "none";
        }
    });

    if (count_result == 0) no_result.classList.remove('hidden');
    else no_result.classList.add('hidden');

})