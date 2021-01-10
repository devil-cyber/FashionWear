// File Upload
var data='';
function ekUpload(){
    function Init() {
  
      console.log("Upload Initialised");
  
      var fileSelect    = document.getElementById('file-upload'),
          fileDrag      = document.getElementById('file-drag');
           
  
      fileSelect.addEventListener('change', fileSelectHandler, false);
  
      // Is XHR2 available?
      var xhr = new XMLHttpRequest();
      if (xhr.upload) {
        // File Drop
        fileDrag.addEventListener('dragover', fileDragHover, false);
        fileDrag.addEventListener('dragleave', fileDragHover, false);
        fileDrag.addEventListener('drop', fileSelectHandler, false);
      }
    }
  
    function fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag');
  
      e.stopPropagation();
      e.preventDefault();
  
      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }
  
    function fileSelectHandler(e) {
      // Fetch FileList object
      var files = e.target.files || e.dataTransfer.files;
  
      // Cancel event and hover styling
      fileDragHover(e);
  
      // Process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        parseFile(f);
         
      }
    }
  
    // Output
    function output(msg) {
      // Response
      var m = document.getElementById('messages');
      m.innerHTML = msg;
    }
  
    function parseFile(file) {
  
      console.log(file.name);
      output(
        '<strong>' + encodeURI(file.name) + '</strong>'
      );
      
      // var fileType = file.type;
      // console.log(fileType);
      var imageName = file.name;
  
      var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
      if (isGood) {
        document.getElementById('start').classList.add("hidden");
        document.getElementById('response').classList.remove("hidden");
        document.getElementById('notimage').classList.add("hidden");
        // Thumbnail Preview
        document.getElementById('file-image').classList.remove("hidden");
        document.getElementById('file-image').src = URL.createObjectURL(file);
      }
      else {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('notimage').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        document.getElementById('response').classList.add("hidden");
        document.getElementById("file-upload-form").reset();
      }
    }
  
    function setProgressMaxValue(e) {
      var pBar = document.getElementById('file-progress');
  
      if (e.lengthComputable) {
        pBar.max = e.total;
      }
    }
  
    function updateFileProgress(e) {
      var pBar = document.getElementById('file-progress');
  
      if (e.lengthComputable) {
        pBar.value = e.loaded;
      }
    }
  
    
  
    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  }
  function encode() {
    var selectedfile = document.getElementById("file-upload").files;
    if (selectedfile.length > 0) {
      var imageFile = selectedfile[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;
        var newImage = document.createElement('img');
        newImage.src = srcData;
        data = data + srcData
        data = data.split(',')[1];
        //  console.log(data)
      }
      fileReader.readAsDataURL(imageFile);
    }
  }
  function apiCall(){
    
   let xhr = new XMLHttpRequest(); 
 let url = " https://clothing-wear.herokuapp.com//predict"; 
 var img = document.createElement('img'); 
 var para = document.createElement('p');
 var uploader = document.getElementById('file-upload-form');
 uploader.style.display='none';

 // open a connection 
 xhr.open("POST", url, true); 

 // Set the request header i.e. which type of content you are sending 
 xhr.setRequestHeader("Content-Type", "application/json"); 
 if(xhr.readyState===0 || xhr.readyState===1 || xhr.readyState===2 || xhr.readyState===3){
  para.innerHTML='Loading.....';
  document.getElementById('body').appendChild(para); 
}
 // Create a state change callback 
 xhr.onreadystatechange = function () { 
   
     if (xhr.readyState === 4 && xhr.status === 200) { 

         // Print received data from server 
         let value = JSON.parse(this.response)
         console.log(value); 
         
         para.innerHTML= `Class: ${value[0]['className']}, Confidence: ${value[0]['confidence']*100}`;
          document.getElementById('body').appendChild(para); 
         img.src= 'data:image/png;base64,'+value[1]['image'];
         document.getElementById('body').appendChild(img); 
          


     } 
      
 }; 

 // Converting JSON data to string 
 var data2 = JSON.stringify({ "image":data}); 

 // Sending data with the request 
 xhr.send(data2); 
}
  ekUpload();