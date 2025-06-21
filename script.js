let current_dragged_item;

const tire_input = document.getElementById("tire");
console.log(tire_input);

const submitbtn = document.getElementById("submit");

const itemContainer = document.getElementsByClassName("item-container");

//const tireList = document.querySelectorAll('tier-list');

for( let itemCont of itemContainer){
    setup_item_container_for_drag(itemCont);
}
    
const imageForm = document.getElementById("image-form");

imageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("image submitted");

    const image_input_item = document.getElementById("image-item");
    const image_url = image_input_item.value;
    create_tire_list_item(image_url);
    image_input_item.value = '';
})

submitbtn.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;

    create_tire_list(tire_input.value);
    tire_input.value = '';
});

function create_tire_list(tire_list_name){
    const new_tire_list = document.createElement('div');
    new_tire_list.classList.add('tier-list');

    const heading = document.createElement('h1');
    heading.textContent = tire_list_name;

    const new_tire_list_items = document.createElement('div');
    new_tire_list_items.classList.add('tier-list-items');

    new_tire_list.appendChild(heading);
    new_tire_list.appendChild(new_tire_list_items);

    setup_drop_zone_in_tire_list(new_tire_list_items);

    const tire_section = document.getElementById('tier-list-section');
    tire_section.appendChild(new_tire_list);
}

function create_tire_list_item(image_url){
    const image_div = document.createElement('div');
    image_div.setAttribute('draggable', 'true');
    image_div.classList.add('item-container');

    setup_item_container_for_drag(image_div);

    const image = document.createElement('img');
    image.src = image_url;

    image_div.appendChild(image);

    const non_tier_section = document.getElementById('non-tier-section');

    non_tier_section.appendChild(image_div);
}

function setup_item_container_for_drag(itemCont){

    itemCont.addEventListener('dragstart', (event) => {
        console.log(event.target.parentNode);
        current_dragged_item = event.target.parentNode;
    });

    itemCont.addEventListener('dblclick', (event) => {
        const parentNode = event.target.parentNode;
        const non_tier_section = document.getElementById('non-tier-section');
        non_tier_section.appendChild(parentNode);
    });
}

function setup_drop_zone_in_tire_list(tierlistItem){
    tierlistItem.addEventListener('drop', (event) => {
        event.preventDefault();
    });    

    tierlistItem.addEventListener('dragover', function (event){
        if(this !== current_dragged_item.parentNode){
            this.appendChild(current_dragged_item);
        }
    });
}