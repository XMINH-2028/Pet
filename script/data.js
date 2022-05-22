'use strict';

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");

////////////////////Click Import data để đọc file petArr và lưu vào localStorage
function upload() {
	const file = document.getElementById("input-file").files[0];//Trỏ tới file input
	if (file) {
	    var reader = new FileReader();
	    reader.readAsText(file, "UTF-8");
    	reader.onload = function (e) {
	        petArr = JSON.parse(reader.result);
	        saveToStorage('petArr');
	        document.getElementById("input-file").value = '';
	    }  
	} 	
}
importBtn.addEventListener('click', upload);

////////////////////Click Export data để tải file petArr về máy
function download() {
	const a = document.createElement('a');
	const file = new Blob([JSON.stringify(petArr)], {type: "text/plain;charset=utf-8"});
	a.href = URL.createObjectURL(file);
	a.download = 'petArr.json';
	a.click();
}
exportBtn.addEventListener('click', download);