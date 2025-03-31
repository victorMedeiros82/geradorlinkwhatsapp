// Simulação de estado de usuário (em um sistema real, isso viria de um backend)
let currentUser = null;

// Lista de países movida para o escopo global
const countries = [
    { code: '+55', name: 'Brasil', flag: 'br', minDigits: 11 },
    { code: '+1', name: 'Estados Unidos', flag: 'us', minDigits: 10 },
    { code: '+351', name: 'Portugal', flag: 'pt', minDigits: 9 },
    { code: '+44', name: 'Reino Unido', flag: 'gb', minDigits: 10 },
    { code: '+34', name: 'Espanha', flag: 'es', minDigits: 9 },
    { code: '+49', name: 'Alemanha', flag: 'de', minDigits: 10 },
    { code: '+33', name: 'França', flag: 'fr', minDigits: 9 },
    { code: '+39', name: 'Itália', flag: 'it', minDigits: 10 },
    { code: '+81', name: 'Japão', flag: 'jp', minDigits: 10 },
    { code: '+86', name: 'China', flag: 'cn', minDigits: 11 },
    { code: '+7', name: 'Rússia', flag: 'ru', minDigits: 10 },
    { code: '+52', name: 'México', flag: 'mx', minDigits: 10 },
    { code: '+54', name: 'Argentina', flag: 'ar', minDigits: 10 },
    { code: '+56', name: 'Chile', flag: 'cl', minDigits: 9 },
    { code: '+57', name: 'Colômbia', flag: 'co', minDigits: 10 },
    { code: '+58', name: 'Venezuela', flag: 've', minDigits: 10 },
    { code: '+91', name: 'Índia', flag: 'in', minDigits: 10 },
    { code: '+61', name: 'Austrália', flag: 'au', minDigits: 9 },
    { code: '+27', name: 'África do Sul', flag: 'za', minDigits: 9 },
    { code: '+20', name: 'Egito', flag: 'eg', minDigits: 10 }
];

// Lista de emojis movida para o escopo global
const popularEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊',
    '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲',
    '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
    '👍', '👎', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶',
    '😱', '😨', '😰', '😥', '😓', '🫣', '🤗', '🫡', '🤔', '🫢',
    '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '👐', '🤲', '🙏',
    '🔥', '💯', '✨', '🎉', '🎊', '👏', '👍', '🙌', '✅', '⭐'
];

// Função para gerar um código curto único
function generateShortCode() {
    return Math.random().toString(36).substring(2, 8); // Gera um código de 6 caracteres
}

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.split('/').pop();

    if (path === 'index.html' || path === '') {
        initLoginPage();
    } else if (path === 'free.html') {
        initFreePage();
    } else if (path === 'premium.html') {
        initPremiumPage();
    } else if (path === 'redirect.html') {
        redirect();
    }
});

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const signupPremium = document.getElementById('signupPremium');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulação de autenticação
        currentUser = { email, plan: 'free' };
        localStorage.setItem('user', JSON.stringify(currentUser));
        window.location.href = 'free.html';
    });

    signupPremium.addEventListener('click', function() {
        currentUser = { email: 'premium@example.com', plan: 'premium' };
        localStorage.setItem('user', JSON.stringify(currentUser));
        window.location.href = 'premium.html';
    });
}

function initFreePage() {
    setupCommonElements();
    setupLogout();
    currentUser = JSON.parse(localStorage.getItem('user')) || { plan: 'free' };
    document.getElementById('planStatus').textContent = 'Gratuito';
}

function initPremiumPage() {
    setupCommonElements();
    setupPremiumElements();
    setupLogout();
    currentUser = JSON.parse(localStorage.getItem('user')) || { plan: 'premium' };
    document.getElementById('planStatus').textContent = 'Premium';
}

function setupCommonElements() {
    const whatsappForm = document.getElementById('whatsappForm');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const phoneTime = document.getElementById('phone-time');
    const messageTextInput = document.getElementById('messageText');
    const previewText = document.getElementById('previewText');
    const countrySelector = document.getElementById('countrySelector');
    const selectedFlag = document.getElementById('selectedFlag');
    const selectedCode = document.getElementById('selectedCode');
    const countriesList = document.getElementById('countriesList');
    const charCount = document.getElementById('charCount');
    const linkModal = document.getElementById('linkModal');
    const generatedLinkInput = document.getElementById('generatedLink');
    const copyButton = document.getElementById('copyButton');
    const testLink = document.getElementById('testLink');
    const closeModalButton = document.getElementById('closeModalButton');
    const emojiButton = document.getElementById('emojiButton');
    const emojiPicker = document.getElementById('emojiPicker');

    let selectedCountry = countries[0];

    init();

    function init() {
        populateCountriesList();
        populateEmojiPicker();
        setupEventListeners();
        updateCharCount();
        updatePhoneTime();
    }

    function updatePhoneTime() {
        if (!phoneTime) return;
        setInterval(() => {
            phoneTime.innerHTML = new Date().toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit',
            });
        }, 1000);
    }

    function setupEventListeners() {
        whatsappForm.addEventListener('submit', generateLink);
        messageTextInput.addEventListener('input', () => {
            updatePreview();
            updateCharCount();
        });
        countrySelector.addEventListener('click', toggleCountriesList);
        document.addEventListener('click', (e) => {
            if (!countrySelector.contains(e.target) && !countriesList.contains(e.target)) {
                countriesList.classList.add('hidden');
                countriesList.setAttribute('aria-hidden', 'true');
            }
        });
        emojiButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleEmojiPicker();
        });
        document.addEventListener('click', (e) => {
            if (!emojiPicker.contains(e.target) && e.target !== emojiButton) {
                emojiPicker.classList.add('hidden');
            }
        });
        copyButton.addEventListener('click', copyToClipboard);
        closeModalButton.addEventListener('click', () => linkModal.classList.add('hidden'));
    }

    function populateCountriesList() {
        countries.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.classList.add('country-item');
            countryItem.innerHTML = `
                <img src="https://flagcdn.com/w20/${country.flag}.png" alt="${country.name}">
                <span>${country.name}</span>
                <span class="ml-auto">${country.code}</span>
            `;
            countryItem.addEventListener('click', () => selectCountry(country));
            countriesList.appendChild(countryItem);
        });
    }

    function selectCountry(country) {
        selectedFlag.src = `https://flagcdn.com/w20/${country.flag}.png`;
        selectedFlag.alt = country.name;
        selectedCode.textContent = country.code;
        selectedCountry = country;
        countriesList.classList.add('hidden');
        countriesList.setAttribute('aria-hidden', 'true');
    }

    function toggleCountriesList() {
        const isHidden = countriesList.classList.contains('hidden');
        countriesList.classList.toggle('hidden');
        countriesList.setAttribute('aria-hidden', String(!isHidden));
    }

    function populateEmojiPicker() {
        emojiPicker.innerHTML = `
            <div class="emoji-header">Emojis Populares</div>
            <div class="emoji-container p-2 grid grid-cols-8 gap-1"></div>
        `;
        const emojiContainer = emojiPicker.querySelector('.emoji-container');
        popularEmojis.forEach(emoji => {
            const emojiSpan = document.createElement('span');
            emojiSpan.textContent = emoji;
            emojiSpan.classList.add('emoji-item');
            emojiSpan.addEventListener('click', (e) => {
                e.stopPropagation();
                insertEmoji(emoji);
            });
            emojiContainer.appendChild(emojiSpan);
        });
    }

    function toggleEmojiPicker() {
        emojiPicker.classList.toggle('hidden');
    }

    function insertEmoji(emoji) {
        const currentPos = messageTextInput.selectionStart;
        const textBefore = messageTextInput.value.substring(0, currentPos);
        const textAfter = messageTextInput.value.substring(currentPos);
        messageTextInput.value = textBefore + emoji + textAfter;
        messageTextInput.selectionStart = currentPos + emoji.length;
        messageTextInput.selectionEnd = currentPos + emoji.length;
        messageTextInput.focus();
        updatePreview();
        updateCharCount();
    }

    function updatePreview() {
        const messageText = messageTextInput.value.trim();
        previewText.textContent = messageText === '' ? 'Olá mundo' : messageText;
    }

    function updateCharCount() {
        const currentLength = messageTextInput.value.length;
        charCount.textContent = `${currentLength}/1000`;
        charCount.classList.toggle('text-yellow-500', currentLength > 900);
        if (currentLength >= 1000) {
            messageTextInput.value = messageTextInput.value.substring(0, 1000);
        }
    }

    function generateLink(e) {
        e.preventDefault();
        try {
            if (!validateForm()) return;
            const countryCode = selectedCode.textContent.trim();
            const phoneNumber = phoneNumberInput.value.trim();
            const messageText = messageTextInput.value.trim();
            const fullPhoneNumber = countryCode + phoneNumber.replace(/\D/g, '');
            const encodedMessage = encodeURIComponent(messageText);
            const whatsappUrl = `https://wa.me/${fullPhoneNumber}?text=${encodedMessage}`;
            generatedLinkInput.value = whatsappUrl;
            testLink.href = whatsappUrl;
            linkModal.classList.remove('hidden');
        } catch (error) {
            console.error('Erro ao gerar link:', error);
            alert('Ocorreu um erro ao gerar o link. Tente novamente.');
        }
    }

    function validateForm() {
        const errorDiv = document.getElementById('phone-error');
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';

        const phoneNumber = phoneNumberInput.value.trim().replace(/\D/g, '');
        if (!phoneNumber) {
            showError(phoneNumberInput, errorDiv, 'Por favor, digite seu número de telefone');
            return false;
        }
        if (phoneNumber.length < selectedCountry.minDigits) {
            showError(phoneNumberInput, errorDiv, `Digite um número válido (${selectedCountry.minDigits} dígitos para ${selectedCountry.name})`);
            return false;
        }
        return true;
    }

    function showError(input, errorDiv, message) {
        input.classList.add('input-error');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            errorDiv.classList.add('hidden');
        }, { once: true });
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(generatedLinkInput.value)
            .then(() => {
                showNotification('Link copiado!');
            })
            .catch(err => console.error('Erro ao copiar:', err));
    }
}

function setupPremiumElements() {
    // Re-declarar elementos comuns para garantir escopo correto
    const whatsappForm = document.getElementById('whatsappForm');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const messageTextInput = document.getElementById('messageText');
    const previewText = document.getElementById('previewText');
    const countrySelector = document.getElementById('countrySelector');
    const selectedFlag = document.getElementById('selectedFlag');
    const selectedCode = document.getElementById('selectedCode');
    const countriesList = document.getElementById('countriesList');
    const linkModal = document.getElementById('linkModal');
    const generatedLinkInput = document.getElementById('generatedLink');
    const testLink = document.getElementById('testLink');
    const closeModalButton = document.getElementById('closeModalButton');

    // Elementos específicos do Premium
    const generateQRCodeButton = document.getElementById('generateQRCode');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const shortenedLinkInput = document.getElementById('shortenedLink');
    const copyShortenedButton = document.getElementById('copyShortenedButton');

    let selectedCountry = countries[0]; // Padrão

    // Função ajustada para geração de link no Premium
    function generateLink(e) {
        e.preventDefault();
        console.log('generateLink foi chamada'); // Depuração
        try {
            if (!validateForm()) {
                console.log('Validação falhou');
                return;
            }
            const countryCode = selectedCode.textContent.trim();
            const phoneNumber = phoneNumberInput.value.trim();
            const messageText = messageTextInput.value.trim();
            const fullPhoneNumber = countryCode + phoneNumber.replace(/\D/g, '');
            const encodedMessage = encodeURIComponent(messageText);
            const whatsappUrl = `https://wa.me/${fullPhoneNumber}?text=${encodedMessage}`;
            console.log('Link gerado:', whatsappUrl); // Depuração
            generatedLinkInput.value = whatsappUrl;
            testLink.href = whatsappUrl;
            shortenedLinkInput.value = shortenUrl(whatsappUrl); // Gera link encurtado
            linkModal.classList.remove('hidden');
        } catch (error) {
            console.error('Erro ao gerar link:', error);
            alert('Ocorreu um erro ao gerar o link. Tente novamente.');
        }
    }

    // Função de validação ajustada para escopo local
    function validateForm() {
        const errorDiv = document.getElementById('phone-error');
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';

        const phoneNumber = phoneNumberInput.value.trim().replace(/\D/g, '');
        if (!phoneNumber) {
            showError(phoneNumberInput, errorDiv, 'Por favor, digite seu número de telefone');
            return false;
        }
        if (phoneNumber.length < selectedCountry.minDigits) {
            showError(phoneNumberInput, errorDiv, `Digite um número válido (${selectedCountry.minDigits} dígitos para ${selectedCountry.name})`);
            return false;
        }
        return true;
    }

    // Função para exibir erro
    function showError(input, errorDiv, message) {
        input.classList.add('input-error');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            errorDiv.classList.add('hidden');
        }, { once: true });
    }

    // Substituir o listener padrão pelo específico do Premium
    if (whatsappForm) {
        whatsappForm.removeEventListener('submit', generateLink); // Remove qualquer listener anterior
        whatsappForm.addEventListener('submit', generateLink);
    } else {
        console.error('Formulário whatsappForm não encontrado');
    }

    // Eventos do Premium
    if (generateQRCodeButton) {
        generateQRCodeButton.addEventListener('click', generateQRCode);
    }
    if (copyShortenedButton) {
        copyShortenedButton.addEventListener('click', copyShortenedLink);
    }
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => linkModal.classList.add('hidden'));
    }

    function generateQRCode() {
        qrCodeContainer.innerHTML = '';
        const qrCode = document.createElement('img');
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(generatedLinkInput.value)}`;
        qrCode.alt = 'QR Code do link do WhatsApp';
        qrCodeContainer.appendChild(qrCode);
        showNotification('QR Code gerado!');
    }

    function copyShortenedLink() {
        navigator.clipboard.writeText(shortenedLinkInput.value)
            .then(() => {
                showNotification('Link encurtado copiado!');
            })
            .catch(err => console.error('Erro ao copiar:', err));
    }

    // Função para encurtar URL usando localStorage
    function shortenUrl(url) {
        // Carrega os links encurtados existentes do localStorage
        let links = JSON.parse(localStorage.getItem('shortenedLinks') || '{}');

        // Gera um código curto único
        let shortCode;
        do {
            shortCode = generateShortCode();
        } while (links[shortCode]); // Garante que o código seja único

        // Armazena a associação entre o código curto e a URL longa
        links[shortCode] = url;
        localStorage.setItem('shortenedLinks', JSON.stringify(links));

        // Gera o link encurtado (baseado no domínio do seu site)
        // Substitua "https://seu-site.netlify.app" pelo seu domínio real
        return `https://victormedeiros82.github.io/geradorlinkwhatsapp/redirect.html?code=${shortCode}`;
    }

    // Função para selecionar país ajustada para escopo local
    if (countrySelector) {
        countrySelector.addEventListener('click', toggleCountriesList);
    }
    function toggleCountriesList() {
        const isHidden = countriesList.classList.contains('hidden');
        countriesList.classList.toggle('hidden');
        countriesList.setAttribute('aria-hidden', String(!isHidden));
    }

    // Preencher a lista de países
    if (countriesList) {
        countriesList.innerHTML = ''; // Limpar para evitar duplicatas
        countries.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.classList.add('country-item');
            countryItem.innerHTML = `
                <img src="https://flagcdn.com/w20/${country.flag}.png" alt="${country.name}">
                <span>${country.name}</span>
                <span class="ml-auto">${country.code}</span>
            `;
            countryItem.addEventListener('click', () => {
                selectedFlag.src = `https://flagcdn.com/w20/${country.flag}.png`;
                selectedFlag.alt = country.name;
                selectedCode.textContent = country.code;
                selectedCountry = country;
                countriesList.classList.add('hidden');
                countriesList.setAttribute('aria-hidden', 'true');
            });
            countriesList.appendChild(countryItem);
        });
    }
}

function setupLogout() {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('copy-notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

function redirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const links = JSON.parse(localStorage.getItem('shortenedLinks') || '{}');

    if (code && links[code]) {
        const longUrl = links[code];
        document.getElementById('redirectLink').href = longUrl;
        window.location.href = longUrl; // Redireciona automaticamente
    } else {
        document.body.innerHTML = '<p>Link inválido ou expirado.</p>';
    }
}
