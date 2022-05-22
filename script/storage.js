'use strict';

const sidebarTitle = document.getElementById('sidebar-title');
//Lấy dữ liệu từ localStorage
let petArr = getFromStorage('petArr');
let breedArr = getFromStorage('breedArr');

////////////////////Thêm hiệu ứng cho Sidebar

//Thay đổi con trỏ khi hover
sidebarTitle.style.cursor = 'pointer'; 
//Thêm bớt class 'active' khi click vào #sidebar-title
sidebarTitle.addEventListener('click', function() {
	this.parentElement.classList.toggle('active');
})
//Viewport < 768px, click #sidebar-title => sidebar bị ẩn => dùng js để ẩn #sidebar-title
if (document.body.offsetWidth < 768) {
	sidebarTitle.style.display = 'none';
	sidebarTitle.nextElementSibling.style.padding = '0';
}
window.onresize = function() {
	if (document.body.offsetWidth < 768) {
		sidebarTitle.parentElement.classList.add('active');
		sidebarTitle.style.display = 'none';
		sidebarTitle.nextElementSibling.style.padding = '0';
	} else {
		sidebarTitle.style.display = 'block';
		sidebarTitle.nextElementSibling.style.padding = '20px 0';
	}
}

////////////////////Format date để sử dụng các method đối với date

function formatDate(date) {
	return new Date(date);
}

////////////////////Lưu dữ liệu vào LocalStorage

function saveToStorage (string) {
	if (string === 'petArr') 
		localStorage.petArr = JSON.stringify(petArr);
	else
		localStorage.breedArr = JSON.stringify(breedArr);
}

////////////////////Lấy dữ liệu từ LocalStorage

function getFromStorage(string) {
	if (string === 'petArr') //Lấy petArr từ localStarage
		if (!localStorage.petArr)
			return [];
		else
			return JSON.parse(localStorage.petArr);
	else//Lấy breedArr từ localStarage
		if (!localStorage.breedArr)
			return [];
		else
			return JSON.parse(localStorage.breedArr);
	
}

////////////////////Hàm hiển thị các breed

function renderBreed() {
	//Đặt select về mặc định 1 option 'Select Breed'
	breedInput.innerHTML = '<option>Select Breed</option>';
	//Hiển thị các breed theo giá trị của type input
	if (typeInput.value === 'Dog') {
		breedArr.filter(value => value.type === 'Dog').forEach(bread => {
			const option = document.createElement('option');
			option.textContent = bread.breed;
			breedInput.appendChild(option);
		})
	} else if (typeInput.value === 'Cat') {
		breedArr.filter(value => value.type === 'Cat').forEach(bread => {
			const option = document.createElement('option');
			option.textContent = bread.breed;
			breedInput.appendChild(option);
		})
	}
	
}








