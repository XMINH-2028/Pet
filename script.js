'use strict';

const submitBtn = document.getElementById("submit-btn");
const form = document.getElementsByTagName('form');
const healthyBtn = document.getElementById('healthy-btn');
let healthyCheck = false;
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const tbody = document.getElementById("tbody");

////////////////////Hiển thị danh sách thú cưng khi tải lại trang
renderTableData(petArr);

////////////////////Hàm lấy giá trị input

function getInput() {
	const idInput = document.getElementById("input-id");
	const nameInput = document.getElementById("input-name");
	const ageInput = document.getElementById("input-age");
	const typeInput = document.getElementById("input-type");
	const weightInput = document.getElementById("input-weight");
	const lengthInput = document.getElementById("input-length");
	const colorInput = document.getElementById("input-color-1");
	const breedInput = document.getElementById("input-breed");
	const vaccinatedInput = document.getElementById("input-vaccinated");
	const dewormedInput = document.getElementById("input-dewormed");
	const sterilizedInput = document.getElementById("input-sterilized");
	const data = {
		id: idInput.value,
		name: nameInput.value,
		age: parseInt(ageInput.value),
		type: typeInput.value,
		weight: parseInt(weightInput.value),
		length: parseInt(lengthInput.value),
		color: colorInput.value,
		breed: breedInput.value,
		vaccinated: vaccinatedInput.checked,
		dewormed: dewormedInput.checked,
		sterilized: sterilizedInput.checked,
		date: new Date()
	}
	return data;
}

////////////////////Hàm lấy danh sách thú khỏe mạnh
function healthyPet() {
	const healthyArr = [];
	for (let i = 0; i < petArr.length; i++) {
		if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
			healthyArr.push(petArr[i]);
		}
	}
	return healthyArr;
}

////////////////////Click nút Show All Pet/ShowHealthy Pet
healthyBtn.addEventListener('click', function(e) {
	//Lấy trạng thái hiện tại của nút Show Healthy Pet hay Show All Pet
	healthyCheck = e.target.textContent === 'Show Healthy Pet' ? true : false;
	if (healthyCheck) {
		renderTableData(healthyPet());
		e.target.textContent = 'Show All Pet';
	} else {
		renderTableData(petArr);
		e.target.textContent = 'Show Healthy Pet';
	}
})

////////////////////Hàm validate form

function validatedForm() {
	const data = getInput();
	//Kiểm tra id
	if (data.id === '') {
		alert('Please input for id');
		return;
	} else {
		for (let i = 0; i < petArr.length; i++) {
			if (data.id === petArr[i].id) {
				alert('ID must unique!');
				return;
			}
		}
	}
	//Kiểm tra name
	if (data.name === '') {
		alert('Please input for name');
		return;
	} 
	//Kiểm tra age
	if (isNaN(data.age)) {
		alert('Please input for age');
		return;
	} else if (data.age < 1 || data.age > 15) {
		alert('Age must be between 1 and 15!');
		return;
	}	
	//Kiểm tra type
	if (data.type === 'Select Type') {
		alert('Please select Type!');
		return;
	}
	//Kiểm tra weight
	if (isNaN(data.weight)) {
		alert('Please input for weight');
		return;
	}  else if (data.weight < 1 || data.weight > 15) {
		alert('Weight must be between 1 and 15!');
		return;
	}
	//Kiểm tra length
	if (isNaN(data.length)) {
		alert('Please input for length');
		return;
	} else if (data.length < 1 || data.length > 100) {
		alert('Length must be between 1 and 100!');
		return;
	}
	//Kiểm tra breed
	if (breedInput.length > 1) {
		if (data.breed === 'Select Breed') {
			alert('Please select Breed!');
			return;
		}
	} else {
		if (data.breed === 'Select Breed') {
			alert('Please add a breed in Bread select on sidebar!');
			return;
		}
	}
	
	return data;
}

////////////////////Hiển thị các breed khi người dùng đã chọn type và click vào breed button

typeInput.addEventListener('change', renderBreed);

////////////////////Hàm render từng thú cưng trong bảng

function genRow(row) {
	return `<th scope="row">${row.id}</th>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.type}</td>
        <td>${row.weight} kg</td>
        <td>${row.length} cm</td>
        <td>${row.breed}</td>
        <td>
            <i class="bi bi-square-fill" style="color: ${row.color}"></i>
        </td>
        <td><i class="bi ${row.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"} "></i></td>
        <td><i class="bi ${row.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"} "></i></td>
        <td><i class="bi ${row.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"} "></i></td>
        <td>${formatDate(row.date).getDate()} / ${formatDate(row.date).getMonth()+1} / ${formatDate(row.date).getFullYear()}</td>
        <td>
            <button type="button" class="btn btn-danger btn-delete"
            id="btn-delete" data-id="${row.id}">Delete</button>
        </td>
	`;
}

////////////////////Hàm hiển thị bảng danh sách thú cưng

function renderTableData(pets) {
	tbody.innerHTML = '';
	pets.forEach(pet => {
		const row = document.createElement('tr');
		row.innerHTML = genRow(pet);
		tbody.appendChild(row);
	})
}

////////////////////Click nút Submit

submitBtn.addEventListener('click', function () {
	const data = validatedForm();
	if (data) {
		petArr.push(data);//Thêm pet mới vào danh sách
		renderTableData(petArr);//Hiển thị lại danh sách pet mới
		form[0].reset();//Reset form
		breedInput.innerHTML = '<option>Select Breed</option>';//Reset select input
		healthyBtn.textContent = 'Show Healthy Pet';//Chuyển về trạng thái hiển thị tất cả pet
		saveToStorage('petArr');//Lưu dữ liệu vào localStorage khi thêm pet
	}
	
});

////////////////////Click nút Delete
tbody.addEventListener('click', function (e) {
	if (e.target.id != "btn-delete") return;
    const petId = e.target.getAttribute('data-id');
    if (!petId) return;
    const isConfirm = confirm('Are you sure?');
    if (!isConfirm) return;
    //remove
    petArr.splice(petArr.findIndex(pet => pet.id == petId), 1);
    //reload khi ở 2 trạng thái Show All Pet hoặc Show HeathyPet
    healthyBtn.textContent === 'Show Healthy Pet' ? renderTableData(petArr) : renderTableData(healthyPet());
    //Lưu dữ liệu vào localStorage khi xóa pet
    saveToStorage('petArr');
})
