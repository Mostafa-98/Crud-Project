

var productNameInput = document.getElementById("name")
var productPriceInput = document.getElementById("price")
var productCategoryInput = document.getElementById("category")
var productImgInput = document.getElementById("img")
var productDescInput = document.getElementById("desc")
var updateBtn = document.getElementById("updateBtn")
var addBtn = document.getElementById("addBtn")



var allProduct = [];


if (localStorage.getItem("all") != null) {

    allProduct = JSON.parse(localStorage.getItem("all"));

    display();
}

function validName() {

    var regex = /^[A-Z][a-z]{3,9}[0-9]{0,3}$/

    if (regex.test(productNameInput.value) == true) {

        document.getElementById("alertName").classList.replace("d-block", "d-none")


        return true

    }
    document.getElementById("alertName").classList.replace("d-none", "d-block")
    return false

}
function validPrice() {

    var regex = /^[1-9][0-9]{2,4}$/

    if (regex.test(productPriceInput.value) == true) {

        document.getElementById("alertPrice").classList.replace("d-block", "d-none")


        return true

    }
    document.getElementById("alertPrice").classList.replace("d-none", "d-block")
    return false
}
function validCategory() {

    var regex = /^[A-Z][a-z]{3,9}[0-9]{0,3}$/

    if (regex.test(productCategoryInput.value) == true) {

        document.getElementById("alertCategory").classList.replace("d-block", "d-none")


        return true

    }
    document.getElementById("alertCategory").classList.replace("d-none", "d-block")
    return false

}
function validDesc() {

    var regex = /^[a-zA-Z]{5,}$/

    if (regex.test(productDescInput.value) == true) {

        document.getElementById("alertDesc").classList.replace("d-block", "d-none")


        return true

    }
    document.getElementById("alertDesc").classList.replace("d-none", "d-block")
    return false

}
function getValues() {

    if (validName() == true && validPrice() == true && validCategory() == true  && validDesc() == true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            img: productImgInput.files[0]?.name,
            desc: productDescInput.value
        }


        allProduct.push(product)

        localStorage.setItem("all", JSON.stringify(allProduct))
        console.log(product)
        clearData()
        display()

    }
}

function clearData() {

    productNameInput.value = ""
    productPriceInput.value = ""
    productCategoryInput.value = ""
    productImgInput.value = ""
    productDescInput.value = ""
}

function display() {
    var cartoona = ""
    for (i = 0; i < allProduct.length; i++) {
        cartoona +=
            `
            <tr>
                <td>${i + 1}</td>
                <td><img src="../Test/Images/${allProduct[i].img}" alt=""></td>
                <td>${allProduct[i].name}</td>
                <td>${allProduct[i].price}</td>
                <td>${allProduct[i].category}</td>
                <td>${allProduct[i].desc}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>

            </tr>
        `
    }
    document.getElementById("demo").innerHTML = cartoona
}

function deleteProduct(index) {

    allProduct.splice(index, 1);
    localStorage.setItem("all", JSON.stringify(allProduct))
    display();
}

function searchByName(term) {

    var cartoona = ""

    for (i = 0; i < allProduct.length; i++) {
        if (allProduct[i].name.toLowerCase().includes(term.toLowerCase().trim()) == true) {

            cartoona +=
                `
            <tr>
                <td>${i + 1}</td>
                <td><img src="../Test/Images/${allProduct[i].img}" alt=""></td>
                <td>${allProduct[i].name}</td>
                <td>${allProduct[i].price}</td>
                <td>${allProduct[i].category}</td>
                <td>${allProduct[i].desc}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>

            </tr>
        `
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


    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        img: "4.jpg",
        desc: productDescInput.value
    }

    allProduct.splice(main, 1, product)

    localStorage.setItem("all", JSON.stringify(allProduct))

    display()
    clearData()

    updateBtn.classList.replace("d-block", "d-none")
    addBtn.classList.replace("d-none", "d-block")


}
