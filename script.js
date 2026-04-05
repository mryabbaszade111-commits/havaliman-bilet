document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 60000);

    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    const clockElement = document.querySelector('.header-right .info-item i.fa-clock');
    if (clockElement && clockElement.parentElement) {
        clockElement.parentElement.lastChild.textContent = ` ${timeString}`;
    }
}

function switchTab(tabName) {
    const gedisBtn = document.querySelector('.flight-tabs .tab-btn:nth-child(1)');
    const gelisBtn = document.querySelector('.flight-tabs .tab-btn:nth-child(2)');
    const gedisTable = document.getElementById('gedis-table');
    const gelisTable = document.getElementById('gelis-table');

    if (tabName === 'gedis') {
        gedisBtn.classList.add('active');
        gelisBtn.classList.remove('active');
        gedisTable.style.display = 'block';
        gelisTable.style.display = 'none';
    } else if (tabName === 'gelis') {
        gelisBtn.classList.add('active');
        gedisBtn.classList.remove('active');
        gelisTable.style.display = 'block';
        gedisTable.style.display = 'none';
    }
}

function openModal(flightCode, destination) {
    const modal = document.getElementById('bookingModal');
    const flightInfoParagraph = document.getElementById('flight-info');
    
    if (modal && flightInfoParagraph) {
        flightInfoParagraph.textContent = `Uçuş: ${flightCode} | İstiqamət: ${destination}`;
        modal.classList.add('active'); // Class əlavə edirik
    }
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    const form = document.getElementById('registrationForm');
    
    if (modal) {
        modal.classList.remove('active'); // Class-ı silirik
        if (form) form.reset();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    alert("Qeydiyyatınız uğurla tamamlandı! Təşəkkür edirik.");
    closeModal();
}
// Formun id-sinin 'registrationForm' olduğunu fərz edirəm, əgər fərqlidirsə html-dən baxıb düzəldin
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Səhifənin yenilənməsini dayandırır

    const fullname = document.getElementById('fullname').value.trim();
    const finCode = document.getElementById('fin-code').value.trim();
    const phone = document.getElementById('phone').value.trim();

    const passengerData = {
        fullname: fullname,
        finCode: finCode,
        phone: phone
    };

    // Məlumatı serverə göndəririk
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passengerData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Məlumatlar bazaya yazıldı!");
        // Formu təmizləyirik
        document.getElementById('registrationForm').reset();
    })
    .catch(error => {
        console.error('Xəta:', error);
        alert("Serverə bağlanmaq mümkün olmadı!");
    });
});