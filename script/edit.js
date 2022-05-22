'use strict';

const submitBtn = document.getElementById("submit-btn");
const form = document.getElementsByTagName('form');
const editForm = document.getElementById('container-form');//Trỏ tới bảng Edit bị ẩn
const tbody = document.getElementById("tbody");
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
const inputEdit = [idInput, nameInput, ageInput, typeInput, weightInput, lengthInput, colorInput, breedInput, vaccinatedInput, dewormedInput, sterilizedInput];//Mảng chứa các selector để loop

////////////////////Hiển thị danh sách thú cưng khi tải lại trang để edit
renderTableData(petArr);

////////////////////Hàm lấy giá trị input

function getInput() {
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

////////////////////Hiển thị các breed khi người dùng đã chọn type và click vào breed button

typeInput.addEventListener('change', renderBreed);

////////////////////Hàm set giá trị cho các in put để edit 

function setInput(index) {
    inputEdit.forEach(value => {//Lặp qua các selector để truyền giá trị vào
    	let key = value.id.replace('input-','');//Mẫu id: 'input-key' => xóa 'input-' để lấy key cho object
    	if (value === colorInput) key = 'color';
    	if (key === 'breed') {
    		renderBreed();
    		value.value = petArr[index][key];//Truyền giá trị vào cho các selector theo giá trị trong Object index đã chọn
    	} else if (key === 'vaccinated' || key === 'dewormed' || key === 'sterilized') {
    		value.checked = petArr[index][key];
    	} else {
    		value.value = petArr[index][key];
    	}	
    })
}

////////////////////Hàm validate form

function validatedForm() {
	const data = getInput();
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

////////////////////Hàm render từng thú cưng trong bảng

function genRow(row, index) {
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
            <button type="button" class="btn btn-warning btn-edit"
            id="btn-edit" data-id="${index}">Edit</button>
        </td>
	`;
}

////////////////////Hàm hiển thị bảng danh sách thú cưng

function renderTableData(pets) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    pets.forEach((pet, index) => {
        const row = document.createElement('tr');
        row.innerHTML = genRow(pet, index);
        tbody.appendChild(row);
    })
}

////////////////////Click nút Edit

tbody.addEventListener('click', function(e) {
    if (e.target.id != 'btn-edit') return;
    editForm.classList.remove('hide');//Hiển thị form edit => xóa class 'hide'
    setInput(e.target.dataset.id);//Lấy giá trị cho các input theo object được chọn để chỉnh sửa
})

////////////////////Click nút Submit

submitBtn.addEventListener('click', function () {
	const data = validatedForm();
	if (data) {
		const isConfirm = confirm('Are you sure?');
		if (!isConfirm) return;
		petArr.forEach((value, index) => {
			if (value.id === data.id) {
				petArr.splice(index,1,data)
			}
		})//Xóa thoong tin cũ và thêm thông tin mới vào petArr
		renderTableData(petArr);//Hiển thị lại danh sách pet mới
		form[0].reset();//Reset form
		breedInput.innerHTML = '<option>Select Breed</option>';//Reset select input
		editForm.classList.add('hide');//Ẩn thị form edit => xóa class 'hide'
		saveToStorage('petArr');//Lưu dữ liệu vào localStorage khi thêm pet
	}
});