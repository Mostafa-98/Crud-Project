var productNameInput = document.getElementById("name")
var productPriceInput = document.getElementById("price")
var productCategoryInput = document.getElementById("category")
var productImgInput = document.getElementById("img")
var productDescInput = document.getElementById("desc")
var updateBtn = document.getElementById("updateBtn")
var addBtn = document.getElementById("addBtn")

var PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#e9ecef"/><text x="40" y="46" font-size="14" text-anchor="middle" fill="#6c757d" font-family="Arial">No image</text></svg>')

var allProduct = [];

if (localStorage.getItem("all") != null) {
    allProduct = JSON.parse(localStorage.getItem("all"));
    display();
}

function check(regex, input, alertId) {
    var ok = regex.test(input.value)
    var box = document.getElementById(alertId)
    if (ok) {
        box.classList.replace("d-block", "d-none")
    } else {
        box.classList.replace("d-none", "d-block")
    }
    return ok
}
function validName() { return check(/^[A-Z][a-z]{3,9}[0-9]{0,3}$/, productNameInput, "alertName") }
function validPrice() { return check(/^[1-9][0-9]{2,4}$/, productPriceInput, "alertPrice") }
function validCategory() { return check(/^[A-Z][a-z]{3,9}[0-9]{0,3}$/, productCategoryInput, "alertCategory") }
function validDesc() { return check(/^[a-zA-Z]{5,}$/, productDescInput, "alertDesc") }

function allValid() {
    var a = validName(), b = validPrice(), c = validCategory(), d = validDesc()
    return a && b && c && d
}

function save() {
    localStorage.setItem("all", JSON.stringify(allProduct))
}

function getValues() {
    if (!allValid()) return
    var file = productImgInput.files[0]
    var make = function (img) {
        allProduct.push({
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            img: img,
            desc: productDescInput.value
        })
        save()
        clearData()
        display()
    }
    if (file) {
        var reader = new FileReader()
        reader.onload = function () { make(reader.result) }
        reader.readAsDataURL(file)
    } else {
        make(PLACEHOLDER)
    }
}

function clearData() {
    productNameInput.value = ""
    productPriceInput.value = ""
    productCategoryInput.value = ""
    productImgInput.value = ""
    productDescInput.value = ""
}

function rowHtml(i) {
    var p = allProduct[i]
    var src = p.img && p.img.indexOf("data:") === 0 ? p.img : PLACEHOLDER
    return `
        <tr>
            <td>${i + 1}</td>
            <td><img src="${src}" alt="" width="60"></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.category}</td>
            <td>${p.desc}</td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
        </tr>
    `
}

function display() {
    var cartoona = ""
    for (var i = 0; i < allProduct.length; i++) {
        cartoona += rowHtml(i)
    }
    document.getElementById("demo").innerHTML = cartoona
}

function deleteProduct(index) {
    allProduct.splice(index, 1);
    save()
    display();
}

function searchByName(term) {
    var cartoona = ""
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].name.toLowerCase().includes(term.toLowerCase().trim())) {
            cartoona += rowHtml(i)
        }
    }
    document.getElementById("demo").innerHTML = cartoona
}

var main;

function updateProduct(index) {
    productNameInput.value = allProduct[index].name
    productPriceInput.value = allProduct[index].price
    productCategoryInput.value = allProduct[index].category
    productDescInput.value = allProduct[index].desc

    addBtn.classList.replace("d-block", "d-none")
    updateBtn.classList.replace("d-none", "d-block")

    main = index
}

function preUpdate() {
    if (!allValid()) return
    var old = allProduct[main]
    var file = productImgInput.files[0]
    var finish = function (img) {
        allProduct.splice(main, 1, {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            img: img,
            desc: productDescInput.value
        })
        save()
        display()
        clearData()
        updateBtn.classList.replace("d-block", "d-none")
        addBtn.classList.replace("d-none", "d-block")
    }
    if (file) {
        var reader = new FileReader()
        reader.onload = function () { finish(reader.result) }
        reader.readAsDataURL(file)
    } else {
        finish(old.img)
    }
}
