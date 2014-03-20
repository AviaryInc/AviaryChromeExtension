var imageUrl;
var editImageId = 'edit-image';
var editImage = document.getElementById(editImageId);
var urlParts = document.location.toString().split('#');

if (urlParts.length === 2) {
	imageUrl = decodeURIComponent(urlParts[1]);
	editImage.src = imageUrl;
}

var featherEditor = new Aviary.Feather({
	theme: 'modern',
	maxSize: 1200,
	//enableCORS: true,
	tools: ['enhance','effects','overlay','crop','resize','orientation','focus','brightness','contrast','saturation','warmth','sharpness','colorsplash','drawing','textwithfont','redeye','whiten','blemish'],
	onSaveButtonClicked: function(){
		featherEditor.getImageData(function(data){
				createLinkAndDownload(data);
			},
			false,
			'image/png'
		);
		return false;
	},
	onLoad: function(){
		featherEditor.launch({image: editImageId/*, url: imageUrl*/});
	}
});

var createLinkAndDownload = function(data){
	var url = window.webkitURL || window.URL || window.mozURL || window.msURL;
	var a = document.createElement('a');
	a.download = 'My Aviary Photo.png';
	a.href = url.createObjectURL(dataURIToBlob(data, 'image/png'));
	a.textContent = 'Click here to download!';
	a.dataset.downloadurl = ['png', a.download, a.href].join(':');
	a.click();
};

var dataURIToBlob = function(dataURI, mimetype) {
	var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

	var blob = new Blob([ab], {type: mimetype});
	return blob;
};
