// Реализовать функционал переключения между постами. 
// В качестве API использовать https://jsonplaceholder.typicode.com/posts/

// Страница должна содержать 2 кнопки (вперед, назад), 
// которые переключают к следующему и предыдущему посту соответственно.
// При загрузке страницы должен отправляться запрос на получение поста с id=1.

//https://jsonplaceholder.typicode.com/posts/

// console.log("kjhkj");

const postConteiner = document.querySelector("#root");
const prevPostBtn = document.querySelector(".left");
const nextPostBtn = document.querySelector(".right");
const BASE_URL = "https://jsonplaceholder.typicode.com";
//localStorage.setItem("PostNumber", JSON.stringify(tasks));
// let postNumber = JSON.parse(localStorage.getItem("PostNumber")) || 1;
// let postNumber = localStorage.getItem("PostNumber") || 1;
let postNumber = 1;

const getPostById = async () => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postNumber}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
// 

const renderPost = (post) => {
    postConteiner.innerHTML = "";
    const title = document.createElement("p");
    const body = document.createElement("p");
    const id = document.createElement("h3");
    const container = document.createElement("div");

    title.textContent = post.title;
    body.textContent = post.body;
    id.textContent = post.id;

    container.classList.add("post");
    title.classList.add("subheader");

    container.append(id, title, body);
    postConteiner.append(container);

};

// renderPost({ id: 1, title: "hello", body: "sfdkjhdskjfhks" });
// ????? доделать renderPost(getPostById(1));
const loadPost = async () => {
    const postData = await getPostById();
    renderPost(postData);
}

loadPost();

prevPostBtn.addEventListener("click", () => {
    prevPostBtn.disabled = true;
    postConteiner.textContent = 'Loading...';
    if (postNumber > 1) {
        postNumber--;
        loadPost();
        localStorage.setItem("PostNumber", postNumber);
    }
    setTimeout(() => { prevPostBtn.disabled = false; }, 350);


    // postConteiner.textContent = 'Loading...';
    // // console.log(postNumber);
    // if (postNumber <= 1) {
    //     prevPostBtn.disabled = true;
    //     // console.log("prevPostBtn if true");
    // }
    // else {
    //     nextPostBtn.disabled = false;
    //     prevPostBtn.disabled = false;
    //     // console.log("prevPostBtn if false");
    //     postNumber--;
    //     loadPost();
    //     localStorage.setItem("PostNumber", postNumber);
    // }

});


nextPostBtn.addEventListener("click", () => {
    nextPostBtn.disabled = true;
    postConteiner.textContent = 'Loading...';
    if (postNumber < 100) {
        postNumber++;
        loadPost();
        localStorage.setItem("PostNumber", postNumber);
    }
    setTimeout(() => { nextPostBtn.disabled = false; }, 350);

    // postConteiner.textContent = 'Loading...';
    // // console.log(postNumber);
    // if (postNumber >= 100) {
    //     nextPostBtn.disabled = true;
    //     // console.log("nextPostBtn if true");
    // }
    // else {
    //     nextPostBtn.disabled = false;
    //     prevPostBtn.disabled = false;
    //     // console.log("nextPostBtn if false");
    //     postNumber++;
    //     loadPost();
    //     localStorage.setItem("PostNumber", postNumber);
    // }

});




// 1 lokalStorage -сохранять номер поста
// 2. Loading 
// 3. Валидация (достигли последнего.первого поста)
// 4. debounce (360ms - 1click) - проще всего disable кнопки