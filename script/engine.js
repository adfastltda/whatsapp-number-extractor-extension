const scanButton = document.querySelector("#scanButton");
scanButton.addEventListener("click", async () => {
    const [wpp] = await chrome.tabs.query({active: true, currentWindow: true});
    
    // Injeta o script na aba ativa para escanear os números
    chrome.scripting.executeScript({
        target: {tabId: wpp.id},
        function: init,
    }).then(() => console.log("script injected"));
});

// Função para obter o conteúdo dos contatos
function getContent() { 
    let content = '';
    for (const a in window.sContacts) {
        content += `${a}\n`; // Adiciona cada contato ao conteúdo
    }
    return content; // Retorna o conteúdo dos contatos
}

// Função de inicialização
function init() { 
    console.log("Initing...");

    getNumbers(); // Obtenha os números
    let content = getContent(); // Armazena o conteúdo coletado
    
    const saveButton = document.querySelector("#saveButton");
    saveButton.disabled = true;

    // Habilita o botão de salvar quando o escaneamento for concluído
    saveButton.addEventListener("click", async () => {
        await waitUserClick();  // Aguarda o clique do usuário
        download(content);      // Baixa o conteúdo coletado
        saveButton.disabled = true;
        content = null;
        console.log("SB✅");
    });

    saveButton.disabled = false; // Habilita o botão de salvar após o escaneamento

    // Função que aguarda o clique do usuário no botão de salvar
    function waitUserClick() {
        return new Promise((resolve) => {
            saveButton.addEventListener("click", function onClick() {
                resolve();
                saveButton.removeEventListener("click", onClick); // Remove o listener após o clique
            });
        });
    }
}

// Função para baixar o conteúdo como um arquivo
function download(content) { 
    let data = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content); // Codifica o conteúdo como um URI de dados
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', data);
    downloadLink.setAttribute('download', 'contatos_whatsapp.txt');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink); // Remove o link após o download
    console.log("Download✅");
}

// Função para obter números de contatos
function getNumbers() { 
    if (window.sContacts === undefined) 
        window.sContacts = {}; // Inicializa o array de contatos se não estiver definido
    
    // Seleciona todos os elementos que podem conter números de telefone e os percorre
    document.querySelectorAll('#pane-side div[role=grid] div[role=row] > div:first-child div:nth-child(2) div:first-child > div:first-child').forEach(element => { 
        let phone = '';
        
        // Verifica se o texto interno ou o título do elemento é um número de telefone
        if (/^((\+| |-|\d)+$)/g.test(element.innerText)) 
            phone = element.innerText;
        else if (/^((\+| |-|\d)+$)/g.test(element.title)) 
            phone = element.title;
        
        // Se um número de telefone válido for encontrado, adiciona-o à lista de contatos e altera a cor de fundo do elemento
        if (phone !== '') { 
            window.sContacts[phone] = phone;
            element.style.backgroundColor = '#00ff00'; // Destaca os números coletados
        } else { 
            element.style.backgroundColor = 'inherit'; // Restaura a cor de fundo original
        }
    });

    console.log(`Total de contatos coletados: ${Object.keys(window.sContacts).length}`);
}

init(); // Chama a função de inicialização
