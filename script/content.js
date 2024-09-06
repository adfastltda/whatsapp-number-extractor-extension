function download(content) {
    var data = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', data);
    downloadLink.setAttribute('download', 'numeros_whatsapp.txt');
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function getContent() { 
    var content = ''; 
    for (var phone in window.sContacts) {
        content += phone + '\n';  // Adiciona cada número em uma nova linha
    }
    return content; 
}

function newButton(text, callback, position) { 
    var a = document.createElement('button'); 
    a.innerHTML = text;
    a.style.backgroundColor = '#44c767';
    a.style.backgroundImage = 'linear-gradient(#44c767, #64e787)';
    a.style.borderRadius = '28px';
    a.style.border = '1px solid #18ab29';
    a.style.display = 'inline-block';
    a.style.color = '#ffffff';
    a.style.fontSize = '17px';
    a.style.padding = '11px 31px';
    a.style.position = 'fixed';
    a.style.right = `${10 + ((150 + 15) * (position - 1))}px`;
    a.style.width = '150px';
    a.style.top = '7px';
    a.style.zIndex = '999';
    
    var b = document.getElementsByTagName('body')[0]; 
    b.appendChild(a);
    a.addEventListener('click', function() { callback(); });
}

function getNumbers() {
    if (window.sContacts === undefined) window.sContacts = [];

    // Ampliando o seletor para capturar diferentes variações dos números de telefone
    document.querySelectorAll('span[title], div._aou8._aj_h span').forEach(element => {
        var phone = '';

        // Captura o número do atributo title ou innerText (se for válido)
        if (/^((\+| |-|\d)+$)/g.test(element.title)) {
            phone = element.title;
        } else if (/^((\+| |-|\d)+$)/g.test(element.innerText)) {
            phone = element.innerText;
        }

        // Adiciona aos contatos, se um número válido foi encontrado
        if (phone !== '') {
            window.sContacts[phone] = phone;
            element.style.backgroundColor = '#00ff00'; // Destaca o elemento com número
        } else {
            element.style.backgroundColor = 'inherit';
        }
    });
}

function init() { 
    newButton('Download Números', () => { 
        download(getContent());  // Baixa o conteúdo como um arquivo de texto
    }, 1); 
    
    getNumbers(); 
    document.querySelector('#pane-side').addEventListener('scroll', getNumbers); 
}

init(); // Inicializa o botão de download e a captura de números
