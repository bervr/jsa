
document.querySelector('.myform').addEventListener('submit', e => {
    e.preventDefault();
    let fields = {}
    let arr = document.getElementsByClassName('intext')
    let newArr = [...arr]
    newArr.forEach(el => {
        fields[`${el.name}`] = `${el.value}`
    })
    checkMail(fields.email)
    checkName(fields.name)
    checkPhone(fields.phone)
});


function checkMail(email) {
    let comment = document.getElementById('aftermail');
    comment.innerHTML = '';
    block = document.querySelector('input[name="email"]')
    if (email.match(/^(\w||\-||\.)+@(\w)+.\w{1,6}$/i)) {
        block.classList.remove('redline');
    }
    else {
        block.classList.add('redline');
        comment.innerHTML = '<p style="color: red;">email может содержать строчные и заглавные буквы русского или латинского алфавита, точку и тире. Обязательно должен присутствовать символ @. Например: mymail@mail.ru, my.mail@mail.ru, my-mail@mail.ru</p>';
    }
};

function checkPhone(phone) {
    let comment = document.getElementById('afterphone');
    comment.innerHTML = '';
    block = document.querySelector('input[name="phone"]')
    if (phone.match(/^\+7\((\d){3}\)(\d){3}-(\d){2}-(\d){2}$/i) || phone.match(/^\+7(\d){10}$/i)) {
        block.classList.remove('redline');
    }
    else {
        block.classList.add('redline');
        comment.innerHTML = '<p style="color: red;">Телефон должен состоять из 11 цифр и начинаться с +7. Допускается использование формата +7(000)000-00-00 или +70000000000. </p>';
    }
};

function checkName(name) {
    let comment = document.getElementById('aftername');
    comment.innerHTML = '';
    block = document.querySelector('input[name="name"]')
    // let reg = "/^[a-zа-яё]+$/i"
    if (name.match(/^[a-zа-яё]+$/i)) {
        // if (name.match(reg)) {
        block.classList.remove('redline');
        // block.insertAdjacentHTML('afterend', '<button type="button" class="btn btn-success btn-circle">')
    }
    else {
        block.classList.add('redline');
        comment.innerHTML = '<p style="color: red;">Имя должно содержать строчные и заглавные буквы русского или латинского алфавита</p>';
    }
    // нет, я вижу что эти блоки почти одинаковые, но не придумал как регулярку передавать в match
};


