window.onload = ()=>{
    let fileInput = document.getElementById('userfiles')
    let uploadBtn = document.getElementById('upload-btn');
    let form = document.getElementById('upload-form');
    let progressBars = document.getElementById('progress-bars');
    let uploadMessages = document.getElementById('upload-messages');

    let userfiles = [];

    // event listener for the file input field (images uploaded by the user)
    fileInput.addEventListener('change', (e)=>{
        let filePreview = document.getElementById('file-preview');

        filePreview.innerHTML = '';
        progressBars.innerHTML = '';
        uploadMessages.innerHTML = '';

        userfiles = [];     // reset the user files

        for(let i=0; i<fileInput.files.length; i++){

            let p = document.createElement('p');
            p.classList.add('file-preview');
            p.innerHTML = '- ' + fileInput.files[i].name;

            if (fileInput.files[i].type !== 'image/jpeg') {
                p.innerHTML += ' (image must be jpeg)';
                p.classList.add('invalid-file');
            }
            else if ((fileInput.files[i].size/1000000)>10) {
                p.innerHTML += ' (image is too big - 10mo max)';
                p.classList.add('invalid-file');
            } else {
                userfiles.push(fileInput.files[i]);
                p.innerHTML += ' <i class="check-icon fas fa-check-circle"></i>';
            }

            filePreview.appendChild(p);
        } 
    });
      
    // event listener on the form submit
    form.addEventListener('submit', function(event){

        event.preventDefault();

        console.log(userfiles);
        

        for (let i = 0; i < userfiles.length; i++) {
            const file = userfiles[i];
            
            let progressBarDiv = document.getElementById('progress-bars');
            let div = document.createElement('div');
            let bar = document.createElement('progress');
            bar.setAttribute('value', 0);
            bar.setAttribute('max', 100);
            bar.id = 'p-'+i;
            bar.style.display = 'block';
            div.appendChild(bar);
            progressBarDiv.appendChild(div);

            let xhr = new XMLHttpRequest();
            let formdata = new FormData();
            console.log(file);
            
            formdata.set("file", file);
            
            xhr.upload.onprogress = (e)=>{
                let percent = (e.loaded/e.total)*100; 
                bar.value = Math.round(percent);
            };

            xhr.onload = function(){
                console.log(this.responseText);
                
                let s = document.createElement('span');
                s.innerHTML = xhr.responseText;
                div.appendChild(s);   
            }

            xhr.open('POST', 'file_upload.php');
            xhr.send(formdata);
                            
        }
    });
}