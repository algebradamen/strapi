const API_URL = 'https://complete-health-85c8d30342.strapiapp.com'
const API_KEY = '4c9f869b9d3a2c03992f1c5b89c223ea4c6cea2f1fcb09302074c4f905aeaf4fc5d3c72e9fad3916c98f2ee82f5aa55838c94fc4a92b9e10ba822064a92d8fad7eb8af5a7f7df4392fe4c660e6b9391d3f566fb1653bbc30c520979e5f6ab13ace980cef0f2e96be898f4cf6159cba4bc4a882a6ed1bb8a47ae0c87306e632bb'



async function fetchList(contentType) {
    console.log(`fetchList for ${contentType}`);
    
    const resp = await fetch(API_URL + `/api/${contentType}?populate=*`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + API_KEY
        }
    });

    const response = await resp.json();

    for (let doc of response.data) {
        if (contentType === 'nyheter') {
            await showDocument(doc);
        } else if (contentType === 'dikts') {
            await showDikts(doc);
        }
    }
}

async function showDocument(doc) {
    document.querySelector('#Nyheter').innerHTML += `
        <h2>${doc.Tittel}</h2>
        <details>
            <summary>${doc.Ingress}</summary>
            <p>${doc.Innhold}</p>
            <p>${doc.Dato}</p>
            <p>${doc.Forfatter}</p>
            <img alt="${doc.Tittel}" src="${doc.Bilde.formats.large.url}">
        </details>
    `;
}

async function showDikts(doc) {
    document.querySelector('#Dikt').innerHTML += `
        <h2>${doc.Tittel}</h2>
            
            <pre>${doc.Tekst}</pre>
            <p>${doc.Forfatter}</p>
    `;
}


// Henter både nyheter og dikt ved lasting av siden
window.onload = () => {
    fetchList('nyheter');
    fetchList('dikts');
};



