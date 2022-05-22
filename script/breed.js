'use strict';

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementsByTagName('form');

////////////////////Hiển thị danh sách thú cưng khi tải lại trang

renderTableData(breedArr);

////////////////////Hàm lấy giá trị input

function getInput() {
	const typeInput = document.getElementById("input-type");
	const breedInput = document.getElementById("input-breed");
	const data = {
		type: typeInput.value,
		breed: breedInput.value
	}
	return data;
}

////////////////////Hàm validate form

function validatedBreed() {
	const data = getInput();
	let count = 0;
	//Kiểm tra breed
	if (data.breed === '') {
		alert('Please input Breed!');
		return;
	}
	//Kiểm tra type
	if (data.type === 'Select Type') {
		alert('Please select Type!');
		return;
	}
	breedArr.forEach(breed => {
		if (data.type === breed.type && data.breed === breed.breed) {
			alert('Please input other Breed!');
			count ++;
		}
	})
	if (count) return;
	return data;
}

////////////////////Hàm render từng thú cưng trong bảng

function genRow(row, index) {
	return `<th scope="row">${index+1}</th>
        <td>${row.breed}</td>
        <td>${row.type}</td>
        <td>
            <button type="button" class="btn btn-danger btn-delete"
            id="btn-delete" data-index="${index}">Delete</button>
        </td>
	`;
}

////////////////////Hàm hiển thị bảng danh sách thú cưng

function renderTableData(pets) {
	const tbody = document.getElementById("tbody");
	tbody.textContent = '';
	pets.forEach((pet, index) => {
		const row = document.createElement('tr');
		row.innerHTML = genRow(pet, index);
		tbody.appendChild(row);
	})
}


////////////////////Click nút Submit

submitBtn.addEventListener('click', function () {
	const data = validatedBreed();
	if (data) {
		breedArr.push(data);//Thêm breed mới vào danh sách
		renderTableData(breedArr);//Hiển thị lại danh sách breed mới
		form[0].reset();//Reset form
	}
	//Lưu dữ liệu vào localStorage khi thêm breed
	saveToStorage('breedArr');
});

////////////////////Click nút Delete
tbody.addEventListener('click', function (e) {
	if (e.target.id != "btn-delete") return;
    const breedIndex = e.target.getAttribute('data-index');
    if (!breedIndex) return;
    const isConfirm = confirm('Are you sure?');
    if (!isConfirm) return;
    //remove
    breedArr.splice(breedIndex, 1);
   	renderTableData(breedArr);//Hiển thị lại danh sách breed mới
    //Lưu dữ liệu vào localStorage khi xóa pet
    saveToStorage('breedArr');
})