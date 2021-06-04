const products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'static/1.jpg' },
    { id: 2, title: 'Mouse', price: 20, img: 'static/2.jpg' },
    { id: 3, title: 'Keyboard', price: 200, img: 'static/3.jpg' },
    { id: 4, title: 'Gamepad', price: 50, img: 'static/4.jpg' },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (sku) => {
    // return `<div class="product-item">
    //             <h3 class="point">${sku.title}</h3>
    //             <p class="point">${sku.price}</p>
    //             <img  class="point img " src="${sku.img}" alt="картинка для ${sku.title}">
    //             <button class="point buy-btn">Купить</button>
    //         </div>`

    //но что-то мне кажется таблицей будет лучше

    return `<tr>
        <th scope="row">${sku.id}</th>
        <td>${sku.title}</td>
        <td>${sku.price}</td>
        <td> <img  class="point img " src="${sku.img}" alt="картинка для ${sku.title}"></td>
        <td><button class="point btn btn-success">Купить</button></td>
        </tr>`




};
const renderPage = list => {
    // let page =''
    let page = '<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col">товар</th><th scope="col">цена</th><th scope="col">фото</th><th scope="col">добавить в корзину</th></tr></thead><tbody>'
    //хотя после такого может и нет. но вариант с дивами рабочий, только закоментил
    const productsList = list.map(item => renderProduct(item));
    productsList.forEach(element => {
        page += element;
    });
    const tableTail = '</tbody></table>'
    page += tableTail
    document.querySelector('.products').innerHTML = page

};

renderPage(products);