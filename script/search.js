'use strict';

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");

////////////////////Hàm lấy giá trị input

function getInput() {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        type: typeInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date()
    }
    return data;
}

////////////////////Hàm nhận vào 2 object để so sánh và trả về true hoặc false

function filterObject(objectCondition, objectOrigin) {
	const check = new Array(7).fill(true);//Tọa mảng lưu trữ kết quả so sánh của 7 mục mặc định là true nếu không chọn hoặc nhập điều kiện
	let count = 0;//Biến đếm số điều kiện đúng
	if (!(objectOrigin.id).toLowerCase().includes((objectCondition.id).toLowerCase())) check[0] = false;//So sánh điều kiện về ID
	if (!(objectOrigin.name).toLowerCase().includes((objectCondition.name).toLowerCase())) check[1] = false;//So sán điều kiện về name
	if (objectCondition.type != objectOrigin.type && objectCondition.type != 'Select Type') check[2] = false;//So sán điều kiện về type
	if (objectCondition.breed != objectOrigin.breed && objectCondition.breed != 'Select Breed') check[3] = false;//So sán điều kiện về breed
	if (objectCondition.vaccinated != false) {
		if (objectCondition.vaccinated != objectOrigin.vaccinated) check[4] = false;//So sán điều kiện về vaccinated
	}
	if (objectCondition.dewormed != false) {
		if (objectCondition.dewormed != objectOrigin.dewormed) check[5] = false;//So sán điều kiện về dewormed
	}
	if (objectCondition.sterilized != false) {
		if (objectCondition.sterilized != objectOrigin.sterilized) check[6] = false;//So sán điều kiện về sterilized
	}
	//Kiểm tra mảng check xem nếu tất cả đều là true trả về true
	check.forEach(value => count = value === true ? count + 1 : count);
	if (count === 7) return true
}

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
	`;
}

////////////////////Hàm hiển thị bảng danh sách thú cưng

function renderTableData(pets) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    pets.forEach((pet) => {
        const row = document.createElement('tr');
        row.innerHTML = genRow(pet);
        tbody.appendChild(row);
    })
}

////////////////////Hàm hiển thị các breed trong mục tìm kiếm

function renderBreedFind() {
	let data = [];
	breedArr.forEach(value => data.push(value.breed));//Mảng lấy tất cả các breed từ breedArr
	data = new Set(data);//Xóa các breed giống nhau
	//Đặt select về mặc định 1 option 'Select Breed'
	breedInput.innerHTML = '<option>Select Breed</option>';
	//Hiển thị các breed trong mảng data
	if (typeInput.value === 'Select Type') {//Khi không chọn type hiển thị tất cả các breed
		data.forEach(value => {
			const option = document.createElement('option');
			option.textContent = value;
			breedInput.appendChild(option);
		})
	} else if (typeInput.value === 'Dog') {
		breedArr.filter(value => value.type === 'Dog').forEach(bread => {
			const option = document.createElement('option');
			option.textContent = bread.breed;
			breedInput.appendChild(option);
		})
	} else {
		breedArr.filter(value => value.type === 'Cat').forEach(bread => {
			const option = document.createElement('option');
			option.textContent = bread.breed;
			breedInput.appendChild(option);
		})
	}	
}

////////////////////Hiển thị các breed nếu type = Select Type

renderBreedFind();

////////////////////Hiển thị các breed khi người dùng đã chọn type và click vào breed button

typeInput.addEventListener('change', renderBreedFind);

////////////////////Click Find

findBtn.addEventListener('click', function() {
	const data = getInput();//Lấy data từ các input điều kiện
	const filterArr = petArr.filter(pet => filterObject(data, pet));//Lọc các object thỏa mãn điều kiện của data nhập vào 
	//Hiển thị kết quả tìm kiếm vào bảng
	renderTableData(filterArr);
})
